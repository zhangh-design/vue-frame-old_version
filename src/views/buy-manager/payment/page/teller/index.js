//发起申请
import detailPanel from './detail'
import tellerTbar from './tbar'

const Teller = {
    extends: new TjUI.grid.Grid(),
    data(){
        return {
            conurl: 'buy/payment/teller/readTellerPage',
            queryParams: {
                token: this.$store.getters['user/getToken']
            },
            selMode: 'simple',
            tbar: tellerTbar,
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
                tabName: `buy/payment/teller/detail-edit-${row.id}`
            }
            this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '详情',name: detailPanel.defaults.tabName},detailPanel)
        },
    }
}
export default Teller