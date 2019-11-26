/**
 * 项目浏览-项目查询
 */
import projectSearchPanel from './search-panel'
import detailPanel from './detail'

const Query = {
    extends: new TjUI.grid.Grid(),
    data(){
        return {
            conurl: 'project/browser/contract/readContractPage',
            queryParams: {
                token: this.$store.getters['user/getToken']
            },
            selMode: 'simple',
            searchPanel: projectSearchPanel,
            columns: [
                {label:'合同编号',field:'code'},
                {label:'合同名称',field:'name'},
                // {label:'合同金额',field:'amount'},
                {label:'签订日期',field:'signtime',sort: true},
                {label:'合同到期日期',field:'expiretime',sort: true},
                // {label:'合同盖章日期',field:'stamptime',sort: true},
                // {label:'打印份数',field:'printnum'},
                // {label:'归档日期',field:'archivetime',sort: true},
                {label:'客户单位',field:'customerunit'},
                {label:'合同负责人',field:'manager'},
                {label:'部门名称',field:'deptname'},
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
                row: {...row},
            };
            this.getLinkComponent(`link-content-panel`).getTabContent().addTab({
                title: '详情',
                name: `browser/contract/detail-check-${row.id}`
            }, detailPanel)
        },
    }
}
export default Query
