/**
 * 编辑详情页
 */
import tjWindow from '@/components/common/window'
import { CompareObj,apply } from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import pageDetail from './page/add-grid'
import payDetail from './page/file-list'
import ticketDetail from './page/file-lists'
import pageDetails from './page/add-grids'
import fileListPanel from './page/file-list'
import fileListPanels from './page/file-lists'
import validatorField from '@/plugins/validator-field'
import {Authority, AuthorityProps} from '@/plugins/authority'
import processDetail from '@/components/process-card'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    mixins: [new Authority({key: 'formButtons', formKey: 'detailData'}), AuthorityProps],
    props: {
        row: {
            type: Object,
            default: null
        },
        tabName: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
            conurl: 'buy/payment/apply/doSubmitApply',
            saveConurl: 'buy/payment/apply/doSaveApply',
            detailConurl: 'buy/payment/apply/getDetail',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id
            },
            processID: this.row.process.id,
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id,
                id: this.row.id,
                deptcode: this.row.deptcode,
                advice: '',
            },
            defaults: {
                border: false,
                columns: 2,
                width: 500,
                labelWidth: 120,
                buttonPosition: 'left',
            },
            contractidLink: `link-buypaymentApply-contractid-${this._uid}`,
            contractinfoLink:`link-buypaymentApply-contractinfo-${this._uid}`,
            projectinfoLink: `link-buypaymentApply-projectinfo-${this._uid}`,
            projectidLink: `link-buypaymentApply-projectid-${this._uid}`,
            buttonsLayout: 'top',
            formButtons: [
                {text: '保存',listeners: {click: this.doSave}},
                {text: '流程详情', name: 'process', style: 'float:right', listeners: {click: this.doProcessDetail}}
            ],
            lastFormDetail: {}
        }
    },
    created(){
        this.$on(this.events.afterFormRender, () => {
            Object.assign(this.lastFormDetail, this.formDetail)
        })
    },
    methods: {
        doProcessDetail(){
            if(this.record.process.processcode!=null){
                let processPanel = new processDetail
                processPanel.defaults = {
                    imgconurl: 'buy/payment/apply',
                    dataconurl: `buy/payment/apply/doStep`,
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.record.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `buy/payment/apply/detail-edit-${this.record.id}-process`},processPanel)
            }else{
                this.$message({type: 'success', message: '当前步骤没有流程!'});
            }
        },
        //设置关联项目
        setSelectProjectinfo(row){
            this.getLinkComponent(this.projectinfoLink).setTextValue(row.name)
            this.getLinkComponent(this.projectidLink).setTextValue(row.id)
        },
        //设置关联项目
        setSelectContractinfo(row){
            this.getLinkComponent(this.contractidLink).setTextValue(row.id)
        },
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'planamount',type: 'TextField',width: 350,label: '付款金额(万)',rule:[{validator: this.checkPaymentNum, trigger: 'blur'}]},
                {span: 1,name: 'org',type: 'TextField',width: 350,label: '付款单位'},
                {span: 1,name: 'plantime',type: 'DateTimePicker', width: 350,label: '计划付款时间'},
                {span: 1,name: 'amount',type: 'TextField',width: 350,label: '实际付款金额(万)',disabled:true},
                {span: 1,name: 'paytime',type: 'DateTimePicker',width: 350,label: '付款时间',disabled:true},
                {span: 1,name: 'tickettime',type: 'DateTimePicker',width: 350,label: '收发票时间',disabled:true},
                {span: 1,name: 'projectname',link: this.projectinfoLink,type: 'TextField',width: 350,label: '项目名称',readonly:true},
                {span: 1,name: 'projectBtn',type: 'Button',disabled: true,style: 'margin-left:-130px;',text:'选取关联项目',listeners: {
                    click: ()=>{
                        let detailWin = new tjWindow({panel: this,mainGrid: this.getPanel,title: '关联-项目列表查询',height: 500,width: 1000})
                        detailWin.add(pageDetail)
                        detailWin.show()
                    }
                }},
                {span: 1,name: 'contractid',link: this.contractidLink,type: 'TextField',width: 350,label: '合同ID',readonly:true},
                {span: 1,name: 'contractBtn',type: 'Button',disabled: true,style: 'margin-left:-130px;',text:'选取关联合同',listeners: {
                    click: ()=>{
                        let detailWin = new tjWindow({panel: this,mainGrid: this.getPanel,title: '关联-合同列表查询',height: 500,width: 1000})
                        detailWin.add(pageDetails)
                        detailWin.show()
                    }
                }},
                {span: 1,name: 'payBtn',type: 'Button',label:'付款附件',text:'查看/下载付款附件',listeners: {
                    click: ()=>{
                        let detailWin = new tjWindow({panel: this,mainGrid: this.getPanel,title: '查看/下载付款附件',height: 400,width: 500})
                        detailWin.add(payDetail)
                        detailWin.show()
                    }
                }},
                {span: 1,name: 'ticketBtn',type: 'Button',label:'发票附件',text: '查看/下载发票附件',listeners: {
                    click: ()=>{
                        let detailWin = new tjWindow({panel: this,mainGrid: this.getPanel,title: '查看/下载发票附件',height: 400,width: 500})
                        detailWin.add(ticketDetail)
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
            if (!this.validate()) {
                return
            }
            this.doBeforeSave()
            this.getLinkComponent(this.detailLink).getForm().validate((valid, object) => {
                if (valid) {
                    this.$api[this.saveConurl]({...this.formParams, ...this.formDetail}).then(resData => {
                        //...
                        if (resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode) {
                            !!this.mainGrid && this.mainGrid.reloadGrid();
                            !!this.window && this.window.close()
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
            this.$api[this.conurl](this.formParams).then(resData => {
                if (resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode) {
                    !!this.mainGrid && this.mainGrid.reloadGrid();
                    !!this.window && this.window.close()
                    this.getLinkComponent('link-content-panel').getTabContent().removeTab(this.tabName)
                }
                this.doResult(resData)
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
        doResult(resData){
            if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                Object.assign(this.lastFormDetail,this.formDetail)
                this.$message({type: 'success',message: '操作成功!'});
            }
        }
    }
}
export default Detail