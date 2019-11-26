/**
 * 采购申请单 采购
 */
import applyTbar from './tbar'
import detailPanel from './detail'
const Dispose = {
	extends: new TjUI.grid.Grid(),
    props: {
        moduleid: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
            conurl: 'buy/orders/dispose/readDisposePage',
            queryParams: {
                token: this.$store.getters['user/getToken']
            },
            selMode: 'simple',
            tbar: applyTbar,
            columns: [
                {label:'采购编号',field: 'code'},
                {label:'采购名称',field: 'name'},
                {label:'部门名称',field:'deptname'},
				{label:'采购要求',field:'info'},
                {label:'项目名称',field:'projectname'},
                {label:'预算金额(元)',field:'amount'},
                {label:'实际金额(元)',field:'payamount'}
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
                tabName: `buy/orders/dispose/detail-edit-${row.id}`,
                moduleid: this.moduleid,
            }
            this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '详情',name: detailPanel.defaults.tabName},detailPanel)
        },
    }
}
export default Dispose