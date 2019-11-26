/**
 * 编辑详情页
 */
import tjWindow from '@/components/common/window'
import { CompareObj, apply} from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import fileListPanel from './page/file-list'
import fileListPanels from './page/file-lists'
import processDetail from '@/components/process-card'
import {Authority, AuthorityProps} from '@/plugins/authority'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    mixins: [new Authority({key: 'formButtons'}), AuthorityProps],
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
            conurl: 'buy/payment/dispose/doSubmitDispose',
            saveConurl: 'buy/payment/dispose/doSaveDispose',
            rejectConurl: 'buy/payment/dispose/doRejectDispose',
            detailConurl: 'buy/payment/dispose/getDetail',
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
            buttonsLayout: 'top',
            formButtons: [
                {text: '保存', authority: ['write'], listeners: {click: this.doSave}},
                {text: '流程详情', name: 'process', style: 'float:right', listeners: {click: this.doProcessDetail}}
            ],
            lastFormDetail: {}
        }
    },
    created() {
        this.$on(this.events.afterFormRender, () => {
            Object.assign(this.lastFormDetail, this.formDetail)
        })
    },
    methods: {
        doProcessDetail(){
            if(this.record.process.processcode!=null){
                let processPanel = new processDetail
                processPanel.defaults = {
                    imgconurl: 'buy/payment/dispose',
                    dataconurl: `buy/payment/dispose/doStep`,
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.record.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `buy/payment/dispose/detail-edit-${this.record.id}-process`},processPanel)
            }else{
                this.$message({type: 'success', message: '当前步骤没有流程!'});
            }
        },
        doCheckFileList(){
            let detailWin = new tjWindow({panel: this,mainGrid: this.getPanel,title: '查看/下载付款附件',height: 400,width: 500})
            detailWin.add(fileListPanel)
            detailWin.show()
        },
        doCheckFileLists(){
            let detailWin = new tjWindow({panel: this,mainGrid: this.getPanel,title: '查看/上传发票附件',height: 400,width: 500})
            detailWin.add(fileListPanels)
            detailWin.show()
        },
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'planamount',type: 'TextField',width: 350,label: '付款金额(万)',disabled:true},
                {span: 1,name: 'org',type: 'TextField',width: 350,label: '付款单位',disabled:true},
                {span: 1,name: 'plantime',type: 'DateTimePicker', width: 350,label: '计划付款时间',disabled:true},
                {span: 1,name: 'amount',type: 'TextField',width: 350,label: '实际付款金额(万)',disabled:true},
                {span: 1,name: 'paytime',type: 'DateTimePicker',width: 350,label: '付款时间',disabled:true},
                {span: 1,name: 'tickettime',type: 'DateTimePicker',width: 350,label: '收发票时间',rule:[
                    {required: true,message: '请输入收发票时间', trigger: 'blur'}
                ]},
                {span: 1,name: 'projectname',type: 'TextField',width: 350,label: '项目名称',disabled:true},
                {span: 1,name: 'contractid',type: 'TextField',width: 350,label: '合同ID',disabled:true},
                {span: 1,name: 'payBtn',type: 'Button',label:'付款附件',text:'查看/下载付款附件',listeners: {
                    click: this.doCheckFileList
                }},
                {span: 1,name: 'ticketBtn',type: 'Button',label:'发票附件',text: '上传发票附件',listeners: {
                    click: this.doCheckFileLists
                }},
                {span: 1,name: 'projectid',type: 'TextHidden',width: 350},
                {span: 1,name: 'ticketaccessory',type: 'TextHidden',width: 350},
            ]
        },
        doSave() {
            if (!this.validate()) {
                return
            }
            this.doBeforeSave()
            this.getLinkComponent(this.detailLink).getForm().validate((valid, object) => {
                if (valid) {
                    this.$api[this.saveConurl]({...this.formParams, ...this.formDetail}).then(resData => {
                        //...
                        if (resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode) {
                            this.$message({type: 'success', message: '操作成功!'});
                            !!this.mainGrid && this.mainGrid.reloadGrid();
                            !!this.window && this.window.close()
                        }
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
            let compareResult = CompareObj(this.formDetail,this.lastFormDetail,true)
            if(!compareResult){
                this.$message({message: '警告，修改后请先保存!',duration:1000,type: 'warning'});
                return false
            }
            return true
        },
        //同意
        confirmFn(value){
            if(!this.submitValidate()){
                return
            }
            this.getLinkComponent(this.detailLink).getForm().validate((valid, object) => {
                if (valid) {
                    Object.assign(this.formParams,{advice: value})
                    this.$api[this.conurl](this.formParams).then(resData=>{
                        this.doResult(resData)
                    })
                    return true;
                } else {
                    this.$message({message: '警告，表单内容不完整!',duration:1000,type: 'warning'});
                    console.info('form validate error');
                    return false;
                }
            })
        },
        //不同意
        cancelFn(value){
            Object.assign(this.formParams,{advice: value})
            this.$api[this.rejectConurl](this.formParams).then(resData=>{
                this.doResult(resData)
            })
        },
        doSubmit(){
            this.doBeforeSave()
            TjUI.dialog.process(this.confirmFn,this.cancelFn)
        },
        doResult(resData) {
            if (resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode) {
                this.$message({type: 'success', message: '操作成功!'});
                !!this.mainGrid && this.mainGrid.reloadGrid();
                this.getLinkComponent('link-content-panel').getTabContent().removeTab(this.tabName)
            }
        }
    }
}
export default Detail