/**
 * 项目开票-财务开票
 */
import detailPanel from './detail/edit-detail'
import financeTbar from './tbar'

const Finance = {
    extends: new TjUI.grid.Grid(),
    props: {
        moduleid: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
            conurl: 'project/invoice/finance/readFinancePage',
            queryParams: {
                token: this.$store.getters['user/getToken']
            },
            selMode: 'simple',
            tbar: financeTbar,
            columns: [
                {label: '项目名称',field: 'projectname'},
				{label:'开票金额(万)',field:'amount'},
                {label:'开票信息',field:'info'},
                {label:'开票时间',field:'invoicetime'},
                {label:'备注',field:'remark'},
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
                tabName: `invoice/finance/detail-edit-${row.id}`,
                moduleid: this.moduleid,
            }
            this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '详情',name: detailPanel.defaults.tabName},detailPanel)
        },
    }
}
export default Finance