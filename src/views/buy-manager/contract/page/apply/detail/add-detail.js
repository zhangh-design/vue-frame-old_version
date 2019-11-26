/**
 * 新增详情页
 */
import {mapGetters} from 'vuex'
import tjWindow from '@/components/common/window'
import { CompareObj, apply} from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import pageDetail from "./page/project/add-grid"
import pageDetailApplyfor from "./page/applyfor/add-grid"
import validatorField from '@/plugins/validator-field'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    props: ['mainPanel', 'mainGrid', 'window', 'editPanel', 'type'],
    data() {
        return {
            conurl: 'buy/contract/apply/insertApply',
            updateConurl: 'buy/contract/apply/doSaveApply',
            submitConurl: 'buy/contract/apply/doSubmitApply',
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: '',
                id: ''
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
                {text: '流程详情', name: 'process', style: 'float:right', listeners: {click: () => {this.$message({type: 'success', message: '当前步骤没有流程!'});}}}
            ],
            processID: null,
            formType: 'add',
            buttonsLayout: 'top',
            submitBtnLink: `link-buyContractApply-subbtn-${this._uid}`,
            resetBtnLink: `link-buyContractApply-restbtn-${this._uid}`,
            projectinfoLink: `link-buyContractApply-projectinfo-${this._uid}`,
            projectidLink: `link-buyContractApply-projectid-${this._uid}`,
            applyidLink: `link-buyContractApply-applyid-${this._uid}`,
            lastFormDetail: {}
        }
    },
    computed: {
        ...mapGetters({
            userData: 'user/getUserInfo'
        })
    },
    created() {
        this.formParams.oprtid = this.userData.user.id
    },
    methods: {
        initButtons() {
            this.formButtons.push({text: '提交',disabled: true,link: this.submitBtnLink,authority: ['write'],listeners: {click: this.doSubmit}})
            if(this.formType === 'add'){
                this.formButtons.push({text: '重置',link: this.resetBtnLink,authority: ['write'],listeners: {click: this.resetForm}})
            }
        },
        //设置关联项目
        setSelectProjectinfo(row) {
            this.getLinkComponent(this.projectinfoLink).setTextValue(row.name);
            this.getLinkComponent(this.projectidLink).setTextValue(row.id);
        },
        //设置关联项目
        setSelectApplyforinfo(row) {
            this.getLinkComponent(this.applyidLink).setTextValue(row.id);
        },
        initDetailData() {
            this.detailData = [
                {span: 1,name: 'projectname',type: 'TextField',readonly: true,link: this.projectinfoLink,width: 350,label: '项目名称',rule: [
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
                        })
                        detailWin.add(pageDetail);
                        detailWin.show()
                    }
                }},
                {span: 1,name: 'applyid',type: 'TextField',width: 350,label: '关联申请单',link: this.applyidLink,readonly: true,rule: [
                    {required: true, message: '请选择关联申请单', trigger: 'blur'},
                ]},
                {span: 1,name: 'projectBtn',type: 'Button',style: 'margin-left:-130px;',text: '选取关联申请单',listeners: {
                    click: () => {
                        if (!this.formDetail.projectid) {
                            this.$message({
                                message: "请先选择项目!",
                                type: "warning"
                            });
                            return false;
                        }
                        let detailWin = new tjWindow({
                            panel: this,
                            mainGrid: this.getPanel,
                            title: '关联申请单列表查询',
                            height: 500,
                            width: 1000
                        })
                        detailWin.add(pageDetailApplyfor);
                        detailWin.show()
                    }
                }},
                {span: 1, name: 'code', type: 'TextField', width: 350, label: '合同编号',rule: [
                    {required: true, message: '请输入合同编号', trigger: 'blur'},
                ]},
                {span: 1, name: 'name', type: 'TextField', width: 350, label: '合同名称',rule: [
                    {required: true, message: '请输入合同名称', trigger: 'blur'},
                ]},
                {span: 1,name: 'sort',label: '合同类型',width: 350,displayField: 'name',valueField: 'code',type: 'ComboBox',conurl: 'dict/readProjectsort',queryParams: {token: this.$store.getters['user/getToken']},rule: [
                    {required: true, message: '请选择合同类型', trigger: 'trigger'},
                ]},
                {span: 1, name: 'amount', type: 'TextField', width: 350, label: '合同金额(万)', rule: [
                    {validator: this.checkPaymentNum, trigger: 'blur'},
                    {required: true, message: '请输入合同金额(万)', trigger: 'blur'},
                ]},
                {span: 1, name: 'org', type: 'TextField', width: 350, label: '客户单位',rule: [
                    {required: true, message: '请输入客户单位', trigger: 'blur'},
                ]},
                {span: 1,name: 'deptname',type: 'TextField',width: 350,label: '承建部门',disabled: true},
                {span: 1, name: 'signtime', type: 'DateTimePicker', width: 350, label: '合同签订时间', disabled: true},
                {span: 1, name: 'expiretime', type: 'DateTimePicker', width: 350, label: '合同到期日期', disabled: true},
                {span: 1, name: 'stamptime', type: 'DateTimePicker', width: 350, label: '合同盖章日期', disabled: true},
                {span: 1, name: 'printnum', type: 'TextField', width: 350, label: '合同份数', disabled: true},
                {span: 1,name: 'accessory',type: 'Button',text: '查看合同附件',label: '查看合同附件',disabled: true,},
                {span: 1,name: 'projectid',type: 'TextHidden',width: 350,disabled: true,link: this.projectidLink,},
                {span: 1,name: 'deptcode',type: 'TextHidden',width: 350,disabled: true},
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
            this.getLinkComponent(this.detailLink).getForm().validate((valid, object) => {
                if (valid) {
                    this.$api[!this.formParams.id ? this.conurl : this.updateConurl]({...this.formParams, ...this.formDetail}).then(resData => {
                        //...
                        if (resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode) {
                            !!this.mainGrid && this.mainGrid.reloadGrid();
                            !!this.window && this.window.close()
                            this.$message({type: 'success', message: '操作成功!'});
                        }
                        this.doResult(resData)
                        if (resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode) {
                            this.formParams = {...this.formParams, ...resData.data,dirty: true};
                            if (resData.data.process && resData.data.process.id) {
                                this.formParams.processid = resData.data.process.id;
                            }
                            apply(this.formDetail, this.formParams);
                            apply(this.lastFormDetail, this.formDetail);
                        }
                    })
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
                    this.getLinkComponent('link-content-panel').getTabContent().removeTab(`buy/contract/apply/detail-add`)
                }
            })
        },
        doSubmit(){
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

                //设置流程id
                this.processID = resData.data.process.id
                this.formParams.id = resData.data.id
                this.formParams.processid = resData.data.process.id
            }
        }
    }
}
export default Detail
