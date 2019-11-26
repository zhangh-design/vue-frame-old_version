/**
 * 编辑详情页
 */
import { mapGetters } from 'vuex'
import {CONST_DEFAULT_CONFIG} from '@/config'
import { Authority,AuthorityProps } from '@/plugins/authority'
import processDetail from '@/components/process-card'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    mixins: [new Authority({key: 'formButtons',formKey: 'detailData'}),AuthorityProps],
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
            conurl: 'expense/account/superior/doSubmitSuperior',
            rejectConurl: 'expense/account/superior/doRejectSuperior',
            detailConurl: 'expense/account/superior/getSuperiorDetail',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id
            },
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id,
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
                {text: '流程详情',name:'process',style:'float:right',listeners: {click: this.readDetail}}
            ],
        }
    },
    computed: {
        ...mapGetters({
			userData: 'user/getUserInfo'
        })
    },
    methods: {
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'username',type: 'TextField',value:this.userData.user.name,width: 350,label: '员工姓名',disabled:true},
                {span: 1,name: 'begintime',type: 'DateTimePicker',width: 350,label: '发生时间',disabled:true},
                {span: 1,name: 'pay',type: 'TextField',width: 350,label: '报销费用（元）',disabled:true},
                {span: 1,name: 'sort',type: 'TextField',label: '费用类别',width: 350,disabled:true},
                {span: 1,name: 'projectname',type: 'TextField',width: 350,label: '项目名称',disabled:true},
                {span: 1,name: 'projectBtn',type: 'Button',style: 'margin-left:-130px;',text:'选取关联项目',disabled:true},               
                {span: 2,name: 'deptname',type: 'TextField',width: 350,label: '部门名称',disabled: true},
                {span: 2,name: 'remark',type: 'TextArea',width: 350,label: '说明',disabled:true},
            ]
        },
        readDetail(){
            if(this.record.process.processcode!=null){
                let processPanel = new processDetail
                processPanel.defaults = {
                    imgconurl: 'expense/account/superior',
                    dataconurl: 'expense/account/superior/doStep',
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.record.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `account/superior/detail-edit-${this.record.id}-process`},processPanel)
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
                this.$message({type: 'success',message: '操作成功!'});
                !!this.mainGrid && this.mainGrid.reloadGrid();
                !!this.window && this.window.close()
                this.getLinkComponent('link-content-panel').getTabContent().removeTab(this.tabName)

            }
        }
    }
}
export default Detail