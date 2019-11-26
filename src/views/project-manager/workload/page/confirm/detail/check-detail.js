/**
 * 编辑详情页
 */
import { mapGetters } from 'vuex'
import tjWindow from '@/components/common/window'
import {CONST_DEFAULT_CONFIG} from '@/config'
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
            conurl: 'project/workload/confirm/doSubmitConfirm',
            //saveConurl: 'workload/superior/doSaveSuperior',
            rejectConurl: 'project/workload/confirm/doRejectConfirm',
            detailConurl: 'project/workload/confirm/getConfirmDetail',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id
            },
            processID: this.row.process.id,
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id,
                id: this.row.id,
                deptcode:  this.row.deptcode,
                oprtid: '',
                workerid: this.row.workerid,
                projectid: this.row.projectid,
                advice: '',
            },
            defaults: {
                border: false,
                columns: 2,
                width: 500,
                labelWidth: 100,
                buttonPosition: 'left'
            },
            buttonsLayout: 'top',
            formButtons: [
                {text: '流程详情', style:'float:right',listeners: {click: this.doProcessDetail}}
            ],
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
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'deptname',type: 'TextField',width: 350,label: '部门名称',disabled: true},
                {span: 1,name: 'workername',type: 'TextField',width: 350,label: '人员名称',disabled: true},
                {span: 1,name: 'worktime',type: 'DatePicker',width: 350,label: '工作时间',disabled: true},
                {span: 1,name: 'workload',type: 'TextField',width: 350,label: '工作量（天）',disabled: true},
                {span: 1,name: 'projectname',type: 'TextField',width: 350,label: '关联项目',disabled: true},
                {span: 1,name: 'projectBtn',type: 'Button',style: 'margin-left:-130px;',text:'选取关联项目',disabled:true},
                {span: 1,name: 'rate',type: 'TextField',width: 350,value:"1",label: '工作量系数',disabled: true},
            ]
        },
        doProcessDetail(){
            if(this.record.process.processcode!=null){
                let processPanel = new processDetail
                processPanel.defaults = {
                    imgconurl: 'project/workload/confirm',
                    dataconurl: 'project/workload/confirm/doStep',
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.record.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `workload/confirm/detail-edit-${this.record.id}-process`},processPanel)
            }else{
                this.$message({type: 'success', message: '当前步骤没有流程!'});
            }
        },
        //同意
        confirmFn(value){
            Object.assign(this.formParams,{advice: value})
            this.$api[this.conurl]({...this.formParams,...this.formDetail}).then(resData=>{
                this.doResult(resData)
            })
        },
        //不同意
        cancelFn(value){
            Object.assign(this.formParams,{advice: value})
            this.$api[this.rejectConurl]({...this.formParams,...this.formDetail}).then(resData=>{
                this.doResult(resData)
            })
        },
        doSubmit() {
            if (!this.validate()) {
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