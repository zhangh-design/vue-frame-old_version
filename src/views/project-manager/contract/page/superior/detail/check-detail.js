/**
 * 查看详情页
 */
import { mapGetters } from 'vuex'
import {CONST_DEFAULT_CONFIG} from '@/config'
import tjWindow from '@/components/common/window'
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
            conurl: 'project/contract/superior/doSubmitSuperior',
            rejectConurl: 'project/contract/superior/doRejectSuperior',
            detailConurl: 'project/contract/superior/getSuperiorDetail',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id
            },
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id
            },
            formButtons: [
                {text: '流程详情',name:'process',style:'float:right',listeners: {click: this.readDetail}}
                ],
            defaults: {
                border: false,
                columns: 3,
                width: 340,
                labelWidth: 130,
                buttonPosition: 'left',
            },
            buttonsLayout: 'top',
        }
    },
    computed: {
        ...mapGetters({
			userData: 'user/getUserInfo'
        })
    },
    methods: {
        readDetail(){
            if(this.record.process.processcode!=null){
                let processPanel = new processDetail
                processPanel.defaults = {
                    imgconurl: 'project/contract/superior',
                    dataconurl: 'project/contract/superior/doStep',
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.record.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `contract/superior/detail-edit-${this.record.id}-process`},processPanel)
            }else{
                this.$message({type: 'success', message: '当前步骤没有流程!'});
            }
        },
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'name',type: 'TextField',width: 200,disabled:true,label: '合同名称'},
                {span: 1,name: 'amount',type: 'TextField',width: 200,disabled:true,label: '合同金额(万)'},
                {span: 1,name: 'signtime',type: 'DatePicker',width: 200,disabled:true,label: '签订日期'},
                {span: 1,name: 'expiretime',type: 'DatePicker',width: 200,disabled:true,label: '合同到期日期'},
                {span: 1,name: 'stamptime',type: 'DatePicker',width: 200,disabled:true,label: '合同盖章日期'},
                {span: 1,name: 'printnum',type: 'TextField',width: 200,disabled:true,label: '打印份数'},
                {span: 1,name: 'archivetime',type: 'DatePicker',width: 200,disabled:true,label: '归档日期'},
                {span: 1,name: 'customerunit',label: '客户单位',type: 'TextField',width: 200,disabled:true},
                {span: 1,name: 'manager',type: 'TextField',width: 200,label: '合同负责人',disabled:true},
                {span: 1,name: 'deptname',value:this.userData.dept.name,type: 'TextField',width: 200,label: '部门名称',disabled: true},
                {span: 1,name: 'uploadcontractFileBtn',type: 'Button',text: '查看合同附件列表',label:'合同附件',listeners: {
                    click: this.doCheckFileList
                }},
                {span: 1,name: 'deptcode',value:this.userData.dept.code,type: 'TextHidden',width: 200},
            ]
        },
        doCheckFileList(){
            let detailWin = new tjWindow({panel: this,mainGrid: this.mainGrid,title: '合同附件-列表',height: 300,width: 500})
            detailWin.add(fileListPanel)
            detailWin.show()
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
                this.$message({type: 'success',message: '操作成功!'});
                !!this.mainGrid && this.mainGrid.reloadGrid();
                !!this.window && this.window.close()
                this.getLinkComponent('link-content-panel').getTabContent().removeTab(this.tabName)
            }
        }
    }
}
export default Detail