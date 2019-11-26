/**
 * 新增详情页
 */
import { mapGetters } from 'vuex'
import { CompareObj, apply } from '@/utils/tools'
import { CONST_DEFAULT_CONFIG } from '@/config'
import { Authority,AuthorityProps } from '@/plugins/authority'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    mixins: [new Authority({key: 'formButtons'}),AuthorityProps],
    props: ['mainPanel', 'mainGrid', 'window', 'editPanel'],
    data() {
        return {
            conurl: 'project/tender/apply/insertApply',
            updateConurl: 'project/tender/apply/doSaveApply',
            submitConurl: 'project/tender/apply/doSubmitApply',
            formParams: {
                token: this.$store.getters['user/getToken'],
                deptcode: '',
                oprtid: '',
                processid: '',
                id: '',
                advice: '',
            },
            defaults: {
                border: false,
                columns: 3,
                width: 340,
                labelWidth: 130,
                buttonPosition: 'left',
            },
            formButtons: [{
                text: '保存', authority: ['write'],link: `link-tenderApply-savebtn-${this._uid}`, listeners: {
                    click: this.doSave
                    }
                },
                {text: '流程详情',name:'process',style:'float:right',listeners: {click: this.readDetail}}
            ],
            formType: 'add',
            buttonsLayout: 'top',
            submitBtnLink: `link-tenderApply-subbtn-${this._uid}`,
            resetBtnLink: `link-tenderApply-restbtn-${this._uid}`,
            codeLink: `link-code-field-${this._uid}`,
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
        this.formParams.oprtid = this.userData.user.id
    },
    methods: {
        initButtons(){
            this.formButtons.push({text: '提交',disabled: true,link: this.submitBtnLink,authority: ['write'],listeners: {click: this.doSubmit}})
            if(this.formType === 'add'){
                this.formButtons.push({text: '重置',link: this.resetBtnLink,authority: ['write'],listeners: {click: this.resetForm}})
            }
        },
        initDetailData() {
            this.detailData = [
                {span: 1, name: 'name', type: 'TextField', width: 200, label: '名称', rule: [
                    {required: true, message: '请输入名称', trigger: 'blur'}
                ]},
                {span: 1, name: 'code', type: 'TextField', link: this.codeLink, width: 200, label: '批次', rule: [
                    {required: true, message: '请输入批次', trigger: 'blur'}
                ]},
                {span: 1, name: 'area', type: 'TextField', width: 200, label: '招标地区', rule: [
                    {required: true, message: '请输入招标地区', trigger: 'blur'}
                ]},
                {span: 1, name: 'org', type: 'TextField', width: 200, label: '招标机构', rule: [
                    {required: true, message: '请输入招标机构', trigger: 'blur'}
                ]},
                {span: 1, name: 'proxyorg', type: 'TextField', width: 200, label: '代理机构', rule: [
                    {required: true, message: '请输入代理机构', trigger: 'blur'}
                ]},
                {span: 1, name: 'buytime', type: 'DatePicker', width: 200, label: '标书购买时间', rule: [
                    {required: true, message: '请输入标书购买时间', trigger: 'blur'}
                ]},
                {span: 1, name: 'tendertime', type: 'DatePicker', width: 200, label: '投标时间', rule: [
                    {required: true, message: '请输入投标时间', trigger: 'blur'}
                ]},
                {span: 1,name: 'charge',type: 'TextField',width: 200,label: '标书费用(万)',disabled: true,emptyText: ''},
                {span: 1,name: 'deposit',type: 'TextField',width: 200,label: '投标保证金（万）',disabled: true,emptyText: ''},
                {span: 1,name: 'cost',type: 'TextField',width: 200,label: '中标服务费（万）',disabled: true,emptyText: ''},
                // {span: 1,name: 'deptcode',value: this.userData.dept.code,type: 'TextField',width: 140,label: '经办部门CODE',disabled: true},
                {span: 1,name: 'deptname',value: this.userData.dept.name,type: 'TextField',width: 200,disabled: true,label: '经办部门名称'},
                // {span: 1,name: 'oprtid',value: this.userData.user.code,type: 'TextField',width: 140,label: '经办人ID',disabled: true},
                {span: 1,name: 'oprtname',value: this.userData.user.name,type: 'TextField',width: 200,disabled: true,label: '经办人名称'},
                {span: 1,name: 'paymentnum',type: 'TextField',width: 200,label: '付款金额（万）',disabled: true,emptyText: ''},
                // {span: 2,name: 'paymentfile',type: 'TextField',width: 200,label: '付款凭证',disabled: true,emptyText: ''},
                {span: 2, name: 'uploadbidsfile', type: 'Button', text: '查看付款凭证', label: '付款凭证', disabled: true},
                {span: 3, name: 'remark', type: 'TextArea', width: 540, label: '备注'},
            ]
        },
        readDetail(){
            this.$message({type: 'success', message: '当前步骤没有流程!'});
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
                            //覆盖值
                            apply(this.lastFormDetail, this.formDetail)
                        }
                        this.doResult(resData)
                        if (resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode) {
                            apply(this.formParams,{...resData.data,dirty: true})
                            if (resData.data.process && resData.data.process.id) {
                                this.formParams.processid = resData.data.process.id;
                            }
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
        confirmFn(value){
            Object.assign(this.formParams, {advice: value})
            this.$api[this.submitConurl]({...this.formParams, ...this.formDetail}).then(resData => {
                //...
                if (resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode) {
                    this.mainGrid.reloadGrid();
                    !!this.window && this.window.close()
                    this.getLinkComponent('link-content-panel').getTabContent().removeTab(`tender/apply/detail-add`)
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
                // this.getLinkComponent(`link-tenderApply-savebtn-${this._uid}`).setDisabled()
                this.getLinkComponent(this.submitBtnLink).setDisabled(false)
                this.getLinkComponent(this.resetBtnLink).setDisabled()
                this.getLinkComponent(this.codeLink).setDisabled()
                //设置 包grid 按钮启用
                this.editPanel.getPageGrid().getTbar()[0].$children[0].setDisabled(false)
                this.editPanel.getPageGrid().getTbar()[0].$children[1].setDisabled(false)
                //用返回值设置 传入包grid的项目申请单数据row
                this.editPanel.getPageGrid().setCurRow(resData.data)
            }
        }
    }
}
export default Detail
