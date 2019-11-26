/**
 * 编辑详情页
 */
import {mapGetters} from 'vuex'
import {intNumToStr, isEmptyObject, CompareObj, apply} from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import detail from '@/components/common/grid/detail/detail'
import {Authority, AuthorityProps} from '@/plugins/authority'
import processDetail from '@/components/process-card'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    mixins: [new Authority({key: 'formButtons'}), AuthorityProps],
    props: ['row','tabName'],
    data() {
        return {
            conurl: 'buy/applyfor/manager/doSubmitManager',
            detailConurl: 'buy/applyfor/manager/getDetail',
            rejectConurl: 'buy/applyfor/manager/doRejectManager',
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
            processID: this.row.process.id,
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
    computed: {
        ...mapGetters({
            userData: 'user/getUserInfo'
        })
    },
    methods: {
        doProcessDetail(){
            if(this.record.process.processcode!=null){
                let processPanel = new processDetail
                processPanel.defaults = {
                    imgconurl: 'buy/applyfor/manager',
                    dataconurl: `buy/applyfor/manager/doStep`,
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.record.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `buy/applyfor/manager/detail-edit-${this.record.id}-process`},processPanel)
            }else{
                this.$message({type: 'success', message: '当前步骤没有流程!'});
            }
        },
        initDetailData() {
            this.detailData = [
                {span: 1,name: 'projectname',type: 'TextField',width: 350,label: '项目名称',disabled: true,},
                {span: 1, name: 'matter', type: 'TextField', width: 350, label: '采购物质', disabled: true,},
                {span: 1, name: 'pay', type: 'TextField', width: 350, label: '采购预算(元)', disabled: true,},
                {span: 1, name: 'paytime', type: 'TextField', width: 350, label: '申请时间', disabled: true},
                {span: 1, name: 'username', type: 'TextField', width: 350, label: '申请人名称', disabled: true},
                {span: 2, name: 'deptname', type: 'TextField', width: 350, label: '部门名称', disabled: true},
                {span: 2, name: 'remark', type: 'TextArea',rows: 3, label: '采购说明', disabled: true},
            ]
        },
        confirmFn( value ){
            Object.assign(this.formParams,{advice: value})
            this.$api[this.conurl]({...this.formParams}).then(resData=>{
                this.doResult(resData)
            })
        },
        cancelFn( value ){
            Object.assign(this.formParams,{advice: value})
            this.$api[this.rejectConurl]({...this.formParams}).then(resData=>{
                this.doResult(resData)
            })
        },
        doSubmit() {
            TjUI.dialog.process(this.confirmFn,this.cancelFn)
        },
        doResult(resData) {
            if (resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode) {
                !!this.mainGrid && this.mainGrid.reloadGrid();
                !!this.window && this.window.close()
                this.getLinkComponent('link-content-panel').getTabContent().removeTab(this.tabName)
            }
        }
    }
}
export default Detail
