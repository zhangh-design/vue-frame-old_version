/**
 * 编辑详情页
 */
import { mapGetters } from 'vuex'
import tjWindow from '@/components/common/window'
import { CompareObj } from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import fileListPanel from './file-list'
import { Authority,AuthorityProps } from '@/plugins/authority'
import processDetail from '@/components/process-card'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    mixins: [new Authority({key: 'formButtons'}),AuthorityProps],
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
            conurl: 'project/invoice/superior/doSubmitApply',
            rejectConurl: 'project/invoice/superior/doRejectApply',
            detailConurl: 'project/invoice/superior/getSuperiorDetail',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id
            },
            processID: null,
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id,
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
                {text: '流程详情', style:'float:right',authority: ['write'],listeners: {click: this.doProcessDetail}}
            ],
        }
    },
    computed: {
        ...mapGetters({
			userData: 'user/getUserInfo'
        })
    },
    methods: {
        doCheckFileList(){
            let detailWin = new tjWindow({panel: this,mainGrid: this.getPanel,title: '开票附件-列表',height: 400,width: 600})
            detailWin.add(fileListPanel)
            detailWin.show()
        },
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'projectname',link: this.projectinfoLink,type: 'TextField',width: 350,label: '关联项目',disabled: true,emptyText:'请先选取关联项目'},
                {span: 1,name: 'projectBtn',type: 'Button',style: 'margin-left:-130px;',text:'选取关联项目',disabled:true},
                {span: 2,name: 'amount',type: 'TextField',width: 350,label: '开票金额（万）',disabled:true},
                {span: 2,name: 'info',type: 'TextArea',rows:5,width: 570,maxlength: 600,label: '开票信息',disabled:true},
                {span: 2,name: 'invoicetime',type: 'DateTimePicker',width: 350,label: '开票时间',disabled:true},
                {span: 2,name: 'accessoryBtn',type: 'Button',label:'发票附件',text:'查看/下载发票附件',listeners: {
                    click: ()=>{
                        let detailWin = new tjWindow({panel: this,mainGrid: this.getPanel,title: '查看/下载发票附件',height: 400,width: 500})
                        detailWin.add(fileListPanel)
                        detailWin.show()
                    }
                }},
                {span: 2,name: 'remark',type: 'TextArea',width: 350,label: '备注',disabled:true},
            ]
        },
        doProcessDetail(){
            if(this.record.process.processcode!=null){
                let processPanel = new processDetail
                processPanel.defaults = {
                    imgconurl: 'project/invoice/superior',
                    dataconurl: 'project/invoice/superior/doStep',
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.record.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `invoice/superior/detail-edit-${this.record.id}-process`},processPanel)
            }else{
                this.$message({type: 'success', message: '当前步骤没有流程!'});
            }
        },
        //同意
        confirmFn(value){
            Object.assign(this.formParams,{advice: value})
            this.$api[this.conurl]({...this.formParams}).then(resData=>{
                this.doResult(resData)
            })
        },
        //不同意
        cancelFn(value){
            Object.assign(this.formParams,{advice: value})
            this.$api[this.rejectConurl]({...this.formParams}).then(resData=>{
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
        doResult(resData){
            if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                !!this.mainGrid && this.mainGrid.reloadGrid();
                !!this.window && this.window.close()
                this.$message({type: 'success',message: '操作成功!'});
                this.getLinkComponent('link-content-panel').getTabContent().removeTab(this.tabName)
            }
        }
    }
}
export default Detail