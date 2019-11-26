//发起申请
import applyTbar from './tbar'
import detailPanel from './detail'

const Apply = {
    extends: new TjUI.grid.Grid(),
    props: {
        moduleid: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
            conurl: 'project/contract/apply/readApplyPage',
            queryParams: {
                token: this.$store.getters['user/getToken']
            },
            selMode: 'simple',
            tbar: applyTbar,
            columns: [
                {label:'合同编号',field:'code'},
                {label:'合同名称',field:'name'},
                {label:'合同金额(万)',field:'amount'},
                // {label:'签订日期',field:'signtime',sort: true},
                // {label:'合同到期日期',field:'expiretime',sort: true},
               // {label:'合同盖章日期',field:'stamptime',sort: true},
               // {label:'打印份数',field:'printnum'},
               // {label:'归档日期',field:'archivetime',sort: true},
                {label:'客户单位',field:'customerunit'},
                {label:'合同负责人',field:'manager'},
                {label:'部门名称',field:'deptname'},
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
                tabName: `contract/apply/detail-edit-${row.id}`,
                moduleid: this.moduleid,
            }
            this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '详情',name: detailPanel.defaults.tabName},detailPanel)
        },
    }
}
export default Apply