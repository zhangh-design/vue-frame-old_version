//发起申请
import dateformat from 'dateformat-util'
import managerTbar from './tbar'
import detailPanel from './detail'

const Manager = {
    extends: new TjUI.grid.Grid(),
    props: {
        moduleid: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            conurl: 'buy/contract/manager/readManagerPage',
            queryParams: {
                token: this.$store.getters['user/getToken']
            },
            selMode: 'simple',
            tbar: managerTbar,
            columns: [
                //{label: '项目ID', field: 'projectid'},
                {label: '项目名称', field: 'projectname'},
                {label: '关联申请单', field: 'applyid'},
                {label: '合同编号', field: 'code'},
                {label: '合同名称', field: 'name'},
                {label: '合同类型', field: 'sort'},
                {label: '合同金额(万)', field: 'amount'},
                {label: '客户单位', field: 'org'},
                {label: '合同签订时间', field: 'signtime', sort: true},
                {label: '合同到期日期', field: 'expiretime', sort: true},
                {label: '合同盖章日期', field: 'stamptime', sort: true},
                {label: '合同份数', field: 'printnum'},
                //{label: '合同附件', field: 'accessory'},
                //{label: '承建部门编号', field: 'deptcode'},
                {label: '承建部门名称', field: 'deptname'},
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
                tabName: `buy/contract/manager/detail-edit-${row.id}`,
                moduleid: this.moduleid,
            }
            this.getLinkComponent(`link-content-panel`).getTabContent().addTab({
                title: '详情',
                name: detailPanel.defaults.tabName
            }, detailPanel)
        },
    }
}
export default Manager
