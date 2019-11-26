/**
 * 编辑详情页
 */
import tjWindow from '@/components/common/window'
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
            conurl: 'buy/payment/manager/doSubmitManager',
            rejectConurl: 'buy/payment/manager/doRejectManager',
            detailConurl: 'buy/payment/manager/getDetail',
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
            formButtons: [{
                text: '流程详情', name: 'process', style: 'float:right', listeners: {
                    click: this.doProcessDetail
                }
            }],
        }
    },
    methods: {
        doProcessDetail(){
            if(this.record.process.processcode!=null){
                let processPanel = new processDetail
                processPanel.defaults = {
                    imgconurl: 'buy/payment/manager',
                    dataconurl: `buy/payment/manager/doStep`,
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.record.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `buy/payment/manager/detail-edit-${this.record.id}-process`},processPanel)
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
            let detailWin = new tjWindow({panel: this,mainGrid: this.getPanel,title: '查看/下载发票附件',height: 400,width: 500})
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
                {span: 1,name: 'tickettime',type: 'DateTimePicker',width: 350,label: '收发票时间',disabled:true},
                {span: 1,name: 'projectname',type: 'TextField',width: 350,label: '项目名称',disabled:true},
                {span: 1,name: 'contractid',type: 'TextField',width: 350,label: '合同ID',disabled:true},
                {span: 1,name: 'payBtn',type: 'Button',label:'付款附件',text:'查看/下载付款附件',listeners: {
                    click: this.doCheckFileList
                }},
                {span: 1,name: 'ticketBtn',type: 'Button',label:'发票附件',text: '查看/下载发票附件',listeners: {
                    click: this.doCheckFileLists
                }},
                {span: 1,name: 'projectid',type: 'TextHidden',width: 350},
            ]
        },
        //同意
        confirmFn(value){
            Object.assign(this.formParams,{advice: value})
            this.$api[this.conurl](this.formParams).then(resData=>{
                this.doResult(resData)
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
            if(!this.validate()){
                return
            }
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