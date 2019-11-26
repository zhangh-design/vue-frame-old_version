//发起申请
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
            conurl: 'project/workload/superior/readSuperiorPage',
            queryParams: {
                token: this.$store.getters['user/getToken']
            },
            selMode: 'simple',
            tbar: superiorTbar,
            columns: [
                {label:'项目名称',field:'projectname'},
                //{label:'部门代码',field:'deptcode'},
                {label:'部门名称',field:'deptname'},
                //{label:'人员ID',field:'workerid'},
                {label:'人员名称',field:'workername'},
                {label:'工作时间',field:'worktime'},
                {label:'工作量（天）',field:'workload'}
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
                tabName: `workload/superior/detail-edit-${row.id}`,
                moduleid: this.moduleid,
            }
            this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '详情',name: detailPanel.defaults.tabName},detailPanel)
        },
    }
}
export default Superior