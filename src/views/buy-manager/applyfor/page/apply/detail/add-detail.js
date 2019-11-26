/**
 * 新增详情页
 */
import {mapGetters} from 'vuex'
import { CompareObj, apply} from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import pageDetail from "./page/project/add-grid"
import tjWindow from '@/components/common/window'
import validatorField from '@/plugins/validator-field'
import { Authority,AuthorityProps } from '@/plugins/authority'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    mixins: [new Authority({key: 'formButtons'}),AuthorityProps],
    props: ['mainPanel', 'mainGrid', 'window', 'editPanel'],
    data() {
        return {
            conurl: 'buy/applyfor/apply/insertApply',
            updateConurl: 'buy/applyfor/apply/doSaveApply',
            submitConurl: 'buy/applyfor/apply/doSubmitApply',
            formParams: {
                token: this.$store.getters['user/getToken'],
                deptcode: '',
                userid: '',
            },
            defaults: {
                border: false,
                columns: 2,
                width: 500,
                labelWidth: 110,
                buttonPosition: 'left',
            },
            formButtons: [
                {text: '保存', link: `link-tenderApply-savebtn-${this._uid}`, listeners: {click: this.doSave}},
                {text: '流程详情', name: 'process', style: 'float:right', listeners: {click: this.doProcessDetail}}
            ],
            buttonsLayout: 'top',
            formType: 'add',
            submitBtnLink: `link-tenderApply-subbtn-${this._uid}`,
            resetBtnLink: `link-tenderApply-restbtn-${this._uid}`,
            projectinfoLink: `link-buyApplyforApply-projectinfo-${this._uid}`,
            projectidLink: `link-buyApplyforApply-projectid-${this._uid}`,
            lastFormDetail: {}
        }
    },
    computed: {
        ...mapGetters({
            userData: 'user/getUserInfo'
        })
    },
    created() {
        this.formParams.deptcode = this.userData.dept.code
        this.formParams.userid = this.userData.user.id
    },
    methods: {
        initButtons() {
            this.formButtons.push({text: '提交',disabled: true,link: this.submitBtnLink,authority: ['write'],listeners: {click: this.doSubmit}})
            if(this.formType === 'add'){
                this.formButtons.push({text: '重置',link: this.resetBtnLink,authority: ['write'],listeners: {click: this.resetForm}})
            }
        },
        doProcessDetail(){
            this.$message({type: 'success', message: '当前步骤没有流程!'});
        },
        //设置关联项目
        setSelectProjectinfo(row) {
            this.getLinkComponent(this.projectinfoLink).setTextValue(row.name);
            this.getLinkComponent(this.projectidLink).setTextValue(row.id);
        },
        initDetailData() {
            this.detailData = [
                {span: 1,name: 'projectname',type: 'TextField',width: 350,label: '项目名称',readonly: true,link: this.projectinfoLink,rule: [
                        {required: true, message: '请选择项目', trigger: 'blur'},
                ]},
                {span: 1,name: 'projectBtn',type: 'Button',style: 'margin-left:-130px;',text: '选取项目',listeners: {
                    click: () => {
                        let detailWin = new tjWindow({
                            panel: this,
                            mainGrid: this.getPanel,
                            title: '项目列表查询',
                            height: 500,
                            width: 1000
                        });
                        detailWin.add(pageDetail);
                        detailWin.show()
                    }
                }},
                {span: 1, name: 'matter', type: 'TextField', width: 350, label: '采购物质',rule: [
                    {required: true, message: '请填写采购物质', trigger: 'blur'},
                ]},
                {span: 1, name: 'pay', type: 'TextField', width: 350, label: '采购预算(元)', rule: [
                    {validator: this.checkPaymentNum, trigger: 'blur'},
                    {required: true, message: '请填写采购预算', trigger: 'blur'},
                ]},
                {span: 1, name: 'paytime', type: 'TextField', width: 350, label: '申请时间', disabled: true},
                {span: 1, name: 'username', type: 'TextField', width: 350, label: '申请人名称', disabled: true},
                {span: 2, name: 'deptname', type: 'TextField', width: 350, label: '部门名称', disabled: true},
                {span: 2, name: 'remark', type: 'TextArea',rows: 3, label: '采购说明',rule: [
                    {required: true, message: '请填写采购说明', trigger: 'blur'},
                ]},
                {span: 1,name: 'projectid',type: 'TextHidden',width: 350,link: this.projectidLink},
            ]
        },
        checkPaymentNum(rule, value, callback) {
            let checkNumber = validatorField.validate('checkNumber', value)
            if (!checkNumber.result) {
                callback(new Error(checkNumber.msg));
            }
            callback();
        },
        doSave() {
            if (!this.validate()) {
                return
            }
            this.doBeforeSave()
            //...
            console.info(this.conurl, this.formParams, this.formDetail);
            this.getLinkComponent(this.detailLink).getForm().validate((valid, object) => {
                if (valid) {
                    this.$api[!this.formParams.id ? this.conurl : this.updateConurl]({...this.formParams, ...this.formDetail}).then(resData => {
                        //...
                        if (resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode) {
                            this.mainGrid.reloadGrid();
                            !!this.window && this.window.close()
                            this.$message({type: 'success', message: '操作成功!'});
                        }
                        this.doResult(resData);
                        if (resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode) {
                            this.formParams = {...this.formParams, ...resData.data,dirty: true};
                            if (resData.data.process && resData.data.process.id) {
                                this.formParams.processid = resData.data.process.id;
                            }
                            apply(this.formDetail, this.formParams);
                            apply(this.lastFormDetail, this.formDetail);
                        }
                    });
                    return true;
                } else {
                    console.info('form validate error');
                    return false;
                }
            })
        },
        submitValidate(){
            let compareResult = CompareObj(this.formDetail, this.lastFormDetail, true)
            if (!compareResult) {
                this.$message({message: '警告，修改后请先保存!', duration: 1000, type: 'warning'});
                return false
            }
            return true
        },
        confirmFn( value ){
            Object.assign(this.formParams, {advice: value})
            this.$api[this.submitConurl](this.formParams).then(resData => {
                if (resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode) {
                    !!this.mainGrid && this.mainGrid.reloadGrid();
                    !!this.window && this.window.close()
                    this.getLinkComponent('link-content-panel').getTabContent().removeTab(`buy/applyfor/apply/detail-add`)
                }
            })
        },
        doSubmit() {
            if (!this.submitValidate()) {
                return
            }
            this.doBeforeSave()
            //...
            this.getLinkComponent(this.detailLink).getForm().validate((valid, object) => {
                if (valid) {
                    TjUI.dialog.prompt(this.confirmFn)
                    return true;
                } else {
                    console.info('form validate error');
                    return false;
                }
            })
        },
        doResult(resData) {
            if (resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode && !this.formParams.id) {
                this.getLinkComponent(this.submitBtnLink).setDisabled(false)
                this.getLinkComponent(this.resetBtnLink).setDisabled()
                //设置 包grid 按钮启用
                this.editPanel.getPageGrid().getTbar()[0].$children[0].setDisabled(false)
                this.editPanel.getPageGrid().getTbar()[0].$children[1].setDisabled(false)
                //用返回值设置 传入包grid的项目申请单数据row
                this.editPanel.getPageGrid().setCurRow(resData.data)

                this.formParams.id = resData.data.id
                this.formParams.processid = resData.data.process.id
            }
        }
    }
}
export default Detail
