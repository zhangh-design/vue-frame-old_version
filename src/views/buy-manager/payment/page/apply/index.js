//发起申请
import applyTbar from './tbar'
import detailPanel from './detail'

const Apply = {
    extends: new TjUI.grid.Grid(),
    props: {
        moduleid: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
            conurl: 'buy/payment/apply/readApplyPage',
            queryParams: {
                token: this.$store.getters['user/getToken']
            },
            selMode: 'simple',
            tbar: applyTbar,
            columns: [
                {label:'项目名称',field:'projectname'},
                {label:'付款金额(万)',field:'planamount'},
                {label:'付款单位',field:'org'},
                {label:'实际付款金额(万)',field:'amount'},
                {label:'付款单位',field:'org'},
                {label:'计划付款时间',field:'plantime',sort: true},
                {label:'付款时间',field:'paytime',sort: true},
                {label:'收发票时间',field:'tickettime',sort: true},
            ],
        }
    },
    methods:{
        rowDblclick(row, event){
            detailPanel.defaults = {
                mainPanel: this,
                mainGrid: this,
                window: null,
                type: 'edit',
                row: row,
                moduleid: this.moduleid,
                tabName: `buy/payment/apply/detail-edit-${row.id}`
            }
            this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '详情',name: detailPanel.defaults.tabName},detailPanel)
        },
    }
}
export default Apply