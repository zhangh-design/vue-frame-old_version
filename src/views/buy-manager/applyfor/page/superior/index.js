//发起申请
import applyTbar from './tbar'
import detailPanel from './detail'

const Superior = {
    extends: new TjUI.grid.Grid(),
    props: {
        moduleid: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            conurl: 'buy/applyfor/superior/readSuperiorPage',
            queryParams: {
                token: this.$store.getters['user/getToken']
            },
            selMode: 'simple',
            tbar: applyTbar,
            columns: [
                //{label: '项目ID', field: 'projectid'},
                {label: '项目名称', field: 'projectname'},
                {label: '采购物质', field: 'matter'},
                {label: '采购说明', field: 'remark'},
                {label: '采购预算(元)', field: 'pay'},
                {label: '申请时间', field: 'paytime', sort: true},
                //{label: '申请人', field: 'userid'},
                {label: '申请人名称', field: 'username'},
                //{label: '部门编号', field: 'deptcode'},
                {label: '部门名称', field: 'deptname'},
            ],
        }
    },
    methods: {
        rowDblclick(row, event) {
            detailPanel.defaults = {
                mainPanel: this,
                mainGrid: this,
                window: null,
                type: 'edit',
                row: row,
                tabName: `buy/applyfor/superior/detail-edit-${row.id}`,
                moduleid: this.moduleid,
            }
            this.getLinkComponent(`link-content-panel`).getTabContent().addTab({
                title: '详情',
                name: detailPanel.defaults.tabName
            }, detailPanel)
        },
    }
}
export default Superior
