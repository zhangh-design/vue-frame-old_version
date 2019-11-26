/**
 * 编辑详情页
 */
import tjWindow from '@/components/common/window'
import {CONST_DEFAULT_CONFIG} from '@/config'
import fileListPanel from '../../fileList/file-list'
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
    data() {
        return {
            conurl: 'buy/contract/finance/doSubmitFinance',
            rejectConurl: 'buy/contract/finance/doRejectFinance',
            detailConurl: 'buy/contract/finance/getDetail',
            processID: this.row.process.id,
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id
            },
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id,
                advice: '',
            },
            defaults: {
                border: false,
                columns: 2,
                width: 500,
                labelWidth: 100,
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
                    imgconurl: 'buy/contract/finance',
                    dataconurl: `buy/contract/finance/doStep`,
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.record.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `buy/contract/finance/detail-edit-${this.record.id}-process`},processPanel)
            }else{
                this.$message({type: 'success', message: '当前步骤没有流程!'});
            }
        },
        initDetailData() {
            this.detailData = [
                //{span: 1, name: 'projectid', type: 'TextField', width: 350, label: '项目ID', disabled: true},
                {span: 1, name: 'projectname', type: 'TextField', width: 350, label: '项目名称', disabled: true},
                {span: 1, name: 'applyid', type: 'TextField', width: 350, label: '关联申请单', disabled: true},
                {span: 1, name: 'code', type: 'TextField', width: 350, label: '合同编号', disabled: true},
                {span: 1, name: 'name', type: 'TextField', width: 350, label: '合同名称', disabled: true},
                {span: 1, name: 'sort', type: 'TextField', width: 350, label: '合同类型', disabled: true},
                {span: 1, name: 'amount', type: 'TextField', width: 350, label: '合同金额(万)', disabled: true},
                {span: 1, name: 'org', type: 'TextField', width: 350, label: '客户单位', disabled: true}, 
                {span: 1, name: 'deptname', type: 'TextField', width: 350, label: '承建部门名称', disabled: true},
                {span: 1, name: 'signtime', type: 'DateTimePicker', width: 350, label: '合同签订时间', disabled: true},
                {span: 1, name: 'expiretime', type: 'DateTimePicker', width: 350, label: '合同到期日期', disabled: true},
                {span: 1, name: 'stamptime', type: 'DateTimePicker', width: 350, label: '合同盖章日期', disabled: true},
                {span: 1, name: 'printnum', type: 'TextField', width: 350, label: '合同份数', disabled: true},
                {span: 1,name: 'accessory',type: 'Button',text: '查看合同附件',label: '查看合同附件',
                    listeners: {
                        click: () => {
                            let detailWin = new tjWindow({
                                panel: this,
                                mainGrid: this.mainGrid,
                                title: '合同附件文件-列表',
                                height: 450,
                                width: 700
                            })
                            detailWin.add(fileListPanel)
                            detailWin.show()
                        }
                    }
                },
                {span: 1,name: 'deptcode',type: 'TextHidden',width: 350}
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
