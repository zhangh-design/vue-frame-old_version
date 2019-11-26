/**
 * 项目浏览-项目查询
 */
import projectSearchPanel from './search-panel'
import detailPanel from './detail'

const Query = {
    extends: new TjUI.grid.Grid(),
    data(){
        return {
            conurl: 'project/browser/tender/readTenderPage',
            queryParams: {
                token: this.$store.getters['user/getToken']
            },
            selMode: 'simple',
            searchPanel: projectSearchPanel,

            columns: [
                {label:'名称',field: 'name'},
                {label:'批次',field:'code'},
                {label:'招标地区',field:'area'},
                {label:'招标机构',field:'org'},
                {label:'标书购买时间',field:'buytime',sort: true},
                {label:'投标时间',field:'tendertime',sort: true},
                {label:'经办部门名称',field:'deptname'},
                {label:'经办人名称',field:'oprtname'},
            ],
        }
    },
    methods: {
        rowDblclick(row, event) {
            detailPanel.defaults = {
                mainPanel: this,
                mainGrid: this,
                row: {...row},
            }
            this.getLinkComponent(`link-content-panel`).getTabContent().addTab({
                title: '详情',
                name: `browser/tender/detail-check-${row.id}`
            }, detailPanel)
        },
    }
}
export default Query
