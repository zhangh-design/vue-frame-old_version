//负责人审批
import detailPanel from './detail'
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
            conurl: 'expense/account/superior/readSuperiorPage',
            queryParams: {
                token: this.$store.getters['user/getToken']
            },
            selMode: 'simple',
            tbar: superiorTbar,
            columns: [
                {label:'员工姓名',field:'username'},
                {label:'项目名称',field:'projectname'},
                {label:'发生时间',field:'begintime'},
                {label:'报销费用(元)',field:'pay'},
                {label:'费用类别',field:'sort'},
                {label:'部门名称',field:'deptname',sort: true},
                {label:'说明',field:'remark'},
            ],
        }
    },
    methods:{
        rowDblclick(row){
            detailPanel.defaults = {
                mainPanel: this,
                mainGrid: this,
                window: null,
                type: 'edit',
                row: row,
                tabName: `expense/account/superior/detail-edit-${row.id}`,
                moduleid: this.moduleid,
            }
            this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '详情',name: detailPanel.defaults.tabName},detailPanel)
        },
    },
}
export default Superior