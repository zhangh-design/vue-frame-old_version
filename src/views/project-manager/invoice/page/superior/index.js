/**
 * 项目开票-上级审批
 */
import detailPanel from './detail/check-detail'
import superiorTbar from './tbar'

const Superior = {
    extends: new TjUI.grid.Grid(),
    props: {
        moduleid: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
            conurl: 'project/invoice/superior/readSuperiorPage',
            queryParams: {
                token: this.$store.getters['user/getToken']
            },
            selMode: 'simple',
            tbar: superiorTbar,
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
                tabName: `invoice/superior/detail-edit-${row.id}`,
                moduleid: this.moduleid,
            }
            this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '详情',name: detailPanel.defaults.tabName},detailPanel)
        },
    }
}
export default Superior