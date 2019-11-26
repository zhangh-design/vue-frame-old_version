/**
 * 编辑详情页
 */
import { mapGetters } from 'vuex'
import { CompareObj } from '@/utils/tools'
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
            conurl: 'project/setup/superior/doSubmitSuperior',
            rejectConurl: 'project/setup/superior/doRejectSuperior',
            detailConurl: 'project/setup/superior/getSuperiorDetail',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id
            },
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id,
                id: this.row.id,
                advice: '',
            },
            defaults: {
                border: false,
                columns: 3,
                width: 350,
                labelWidth: 145,
                buttonPosition: 'left',
            },
            buttonsLayout: 'top',
            formButtons: [
                {text: '流程详情', style:'float:right',listeners: {click: this.doProcessDetail}}
            ],
            formType: 'edit',
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
                {span: 1,name: 'code',type: 'TextField',width: 200,disabled: true,label: '项目编号'},
                {span: 1,name: 'name',type: 'TextField',width: 200,label: '项目名称',disabled: true,},
                {span: 1,name: 'deptname',type: 'TextField',width: 200,disabled: true,label: '承建部门名称'},
                {span: 1,name: 'sort',label: '类型',disabled: true,type: 'TextField',},
                {span: 1,name: 'begintime',type: 'DatePicker',width: 200,label: '开始时间',disabled: true,},
                {span: 1,name: 'endtime',type: 'DatePicker',width: 200,label: '结束时间',disabled: true,},
                {span: 1,name: 'managername',type: 'TextField',width: 200,disabled: true,label: '项目经理'},
                {span: 1,name: 'amount',type: 'TextField',width: 200,label: '合同金额(万)',disabled: true,},
                {span: 1,name: 'cost',type: 'TextField',width: 200,disabled: true,label: '预计总成本（万）'},
                {span: 1,name: 'profit',type: 'TextField',width: 200,disabled: true,label: '预计毛利润（万）'},
                // {span: 1,name: 'profitrate',type: 'TextField',width: 200,disabled: true,label: '预计毛利润率'},
                {span: 1,name: 'profitratestring',type: 'TextField',width: 200,disabled: true,label: '预计毛利润率%'},
                {span: 1, name: 'bonus', type: 'TextField', width: 200, disabled: true, label: '预计奖金(万)'},
                {span: 1,name: 'bonusrate',type: 'TextField',width: 200,label: '奖金系数',disabled: true,},
                {span: 1,name: 'contractname',link: this.contractinfoLink,type: 'TextField',width: 200,label: '关联合同',disabled: true,emptyText:'请先选取关联合同'},
                {span: 1,name: 'contractid',link: this.contractidLink,type: 'TextHidden',width: 200},
            ]
        },
        doProcessDetail(){
            if(this.record.process.processcode!=null){
                let processPanel = new processDetail
                processPanel.defaults = {
                    imgconurl: 'project/setup/superior',
                    dataconurl: 'project/setup/superior/doStep',
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.record.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `setup/superior/detail-edit-${this.record.id}-process`},processPanel)
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
                this.$message({type: 'success',message: '操作成功!'})
                !!this.mainGrid && this.mainGrid.reloadGrid()
                !!this.window && this.window.close()
                this.getLinkComponent('link-content-panel').getTabContent().removeTab(this.tabName)
            }
        }
    }
}
export default Detail
