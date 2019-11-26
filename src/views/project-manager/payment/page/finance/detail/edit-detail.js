/**
 * 编辑详情页
 */
import { mapGetters } from 'vuex'
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
            conurl: 'project/payment/finance/doSubmitFinance',
            rejectConurl: 'project/payment/finance/doRejectFinance',
            detailConurl: 'project/payment/finance/getFinanceDetail',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id
            },
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id,
                id: this.row.id,
                deptcode: '',
                oprtid: '',
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
        this.formParams.deptcode = this.userData.dept.code
        this.formParams.oprtid = this.userData.user.id
    },
    methods: {
        initDetailData(){
            this.detailData = [
               // {span: 1,name: 'projectname',type: 'TextField',width: 350,label: '项目名称'},
               {span: 1,name: 'organization',type: 'TextField',width: 350,label: '回款单位',disabled:true},
               {span: 1,name: 'amount',type: 'TextField',width: 350,label: '回款金额(万)',disabled:true},
               {span: 1,name: 'leadtime',type: 'DateTimePicker',width: 350,label: '回款时间',disabled:true},
               {span: 1,name: 'info',type: 'TextField',width: 350,label: '摘要',disabled:true},
               {span: 1,name: 'projectname',type: 'TextField',width: 350,label: '项目名称',disabled:true},
               {span: 1,name: 'projectBtn',type: 'Button',style: 'margin-left:-130px;',text:'选取关联项目',disabled:true},             
               //  {span: 1,name: 'deptcode',type: 'TextHidden',width: 350},
            ]
        },
        doProcessDetail(){
            if(this.record.process.processcode!=null){
                let processPanel = new processDetail
                processPanel.defaults = {
                    imgconurl: 'project/payment/finance',
                    dataconurl: 'project/payment/finance/doStep',
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.record.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `payment/finance/detail-edit-${this.record.id}-process`},processPanel)
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
        doSubmit(){
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