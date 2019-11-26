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
            conurl: 'hr/turnoverorder/apply/readApplyPage',
            queryParams: {
                token: this.$store.getters['user/getToken']
            },
            selMode: 'simple',
            tbar: applyTbar,
            columns: [
                {label:'员工姓名',field:'personname'},
                {label:'工作岗位',field:'station'},
                {label:'入职时间',field:'begintime',sort: true},
                {label:'联系电话',field:'phone'},
                {label:'转正报告',field:'sort'},
                {label:'部门名称',field:'deptname'},
                // {label:'备注',field:'remark'}
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
                tabName: `hr/turnoverorder/apply/detail-edit-${row.id}`,
                moduleid: this.moduleid,
            }
            this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '详情',name: detailPanel.defaults.tabName},detailPanel)
        },
    }
}
export default Apply