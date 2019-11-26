/**
 * 项目浏览-项目查询
 */
import projectSearchPanel from './search-panel'
import detailPanel from './detail'

const Query = {
    extends: new TjUI.grid.Grid(),
    data(){
        return {
            conurl: 'project/browser/workload/readWorkloadPage',
            queryParams: {
                token: this.$store.getters['user/getToken']
            },
            selMode: 'simple',
            searchPanel: projectSearchPanel,
            columns: [
                {label:'项目名称',field:'projectname'},
                {label:'部门代码',field:'deptcode',hide:true},
                {label:'部门名称',field:'deptname'},
                {label:'人员ID',field:'workerid',hide:true},
                {label:'人员名称',field:'workername'},
                {label:'工作时间',field:'worktime'},
                {label:'工作量（天）',field:'workload'}
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
                name: `browser/workload/detail-check-${row.id}`
            }, detailPanel)
        },
    }
}
export default Query
