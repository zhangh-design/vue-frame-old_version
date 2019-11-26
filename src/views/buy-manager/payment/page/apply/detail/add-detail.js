/**
 * 新增详情页
 */
import { mapGetters } from 'vuex'
import tjWindow from '@/components/common/window'
import { CompareObj, apply } from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import pageDetail from './page/add-grid'
import pageDetails from './page/add-grids'
import validatorField from '@/plugins/validator-field'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    props: ['mainPanel','mainGrid','window','editPanel'],
    data(){
        return {
            conurl: 'buy/payment/apply/insertApply',
            updateConurl: 'buy/payment/apply/doSaveApply',
            submitConurl: 'buy/payment/apply/doSubmitApply',
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: '',
                id: ''
            },
            defaults: {
                border: false,
                columns: 2,
                width: 500,
                labelWidth: 120,
                buttonPosition: 'left',
            },
            formButtons: [
                {text: '保存', link: `link-tenderApply-savebtn-${this._uid}`, listeners: {click: this.doSave}},
                {text: '流程详情', name: 'process', style: 'float:right', listeners: {click: () => {this.$message({type: 'success', message: '当前步骤没有流程!'});}}}
            ],
            processID: null,
            formType: 'add',
            buttonsLayout: 'top',
            submitBtnLink: `link-buypaymentApply-subbtn-${this._uid}`,
            resetBtnLink: `link-buypaymentApply-restbtn-${this._uid}`,
            projectinfoLink: `link-buypaymentApply-projectinfo-${this._uid}`,
            projectidLink: `link-buypaymentApply-projectid-${this._uid}`,
            contractidLink: `link-buypaymentApply-contractid-${this._uid}`,
            lastFormDetail: {}
        }
    },
    computed: {
        ...mapGetters({
			userData: 'user/getUserInfo'
        })
    },
    created(){
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
        setSelectProjectinfo(row){
            this.getLinkComponent(this.projectinfoLink).setTextValue(row.name)
            this.getLinkComponent(this.projectidLink).setTextValue(row.id)
        },
        //设置关联合同
        setSelectContractinfo(row){
            this.getLinkComponent(this.contractidLink).setTextValue(row.id)
        },
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'planamount',type: 'TextField',width: 350,label: '付款金额(万)',rule:[
                    {required: true,message: '请输入付款金额(万)', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ]},
                {span: 1,name: 'org',type: 'TextField',width: 350,label: '付款单位',rule:[
                    {required: true,message: '请输入付款单位', trigger: 'blur'}
                ]},
                {span: 1,name: 'plantime',type: 'DateTimePicker', width: 350,label: '计划付款时间',rule:[
                    {required: true,message: '请输入计划付款时间', trigger: 'blur'}
                ]},
                {span: 1,name: 'amount',type: 'TextField',width: 350,label: '实际付款金额(万)',disabled:true},
                {span: 1,name: 'paytime',type: 'DateTimePicker',width: 350,label: '付款时间',disabled:true},
                {span: 1,name: 'tickettime',type: 'DateTimePicker',width: 350,label: '收发票时间',disabled:true},
                {span: 1,name: 'projectname',link: this.projectinfoLink,type: 'TextField',width: 350,label: '项目名称',readonly:true,rule:[
                    {required: true,message: '请输入项目名称', trigger: 'blur'}
                ]},
                {span: 1,name: 'projectBtn',type: 'Button',style: 'margin-left:-130px;',text:'选取关联项目',listeners: {
                    click: ()=>{
                        let detailWin = new tjWindow({panel: this,mainGrid: this.getPanel,title: '关联-项目列表查询',height: 500,width: 1000})
                        detailWin.add(pageDetail)
                        detailWin.show()
                    }
                }},
                {span: 1,name: 'contractid',link: this.contractidLink,type: 'TextField',width: 350,label: '合同ID',readonly:true,rule:[
                    {required: true,message: '请输入合同ID', trigger: 'blur'}
                ]},
                {span: 1,name: 'contractBtn',type: 'Button',style: 'margin-left:-130px;',text:'选取关联合同',listeners: {
                    click: ()=>{
                        let detailWin = new tjWindow({panel: this,mainGrid: this.getPanel,title: '关联-合同列表查询',height: 500,width: 1000})
                        detailWin.add(pageDetails)
                        detailWin.show()
                    }
                }},
                {span: 1,name: 'projectid',link: this.projectidLink,type: 'TextHidden',width: 350,readonly:true},
            ]
        },
        checkPaymentNum(rule, value, callback){
            let checkNumber = validatorField.validate('checkNumber',value)
            if(!checkNumber.result){
                callback(new Error(checkNumber.msg));
            }
			callback();
        },
        doSave(){
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
                    this.getLinkComponent('link-content-panel').getTabContent().removeTab(`buy/payment/apply/detail-add`)
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