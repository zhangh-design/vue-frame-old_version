/**
 * 采购申请单 出纳打款
 */
import applyTbar from './tbar'
import detailPanel from './detail'
const Teller = {
	extends: new TjUI.grid.Grid(),
    props: {
        moduleid: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
            conurl: 'buy/orders/teller/readTellerPage',
            queryParams: {
                token: this.$store.getters['user/getToken']
            },
            selMode: 'simple',
            tbar: applyTbar,
            columns: [
                {label:'采购名称',field: 'name'},
				{label:'采购要求',field:'info'},
                {label:'物质性质',field:'sort'},
                {label:'项目名称',field:'projectname'},
                {label:'预算金额(元)',field:'amount'},
                {label:'部门名称',field:'deptname'},
                {label:'实际金额(元)',field:'payamount'},
                {label:'打款时间',field:'paytime'},
                {label:'入库时间',field:'puttime'},
                {label:'发票归档时间',field:'invoicetime'},
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
                tabName: `buy/orders/teller/detail-edit-${row.id}`,
                moduleid: this.moduleid,
            }
            this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '详情',name: detailPanel.defaults.tabName},detailPanel)
        },
    }
}
export default Teller