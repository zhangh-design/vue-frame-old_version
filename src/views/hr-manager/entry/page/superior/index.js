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
            conurl: 'hr/entry/superior/readSuperiorPage',
            queryParams: {
                token: this.$store.getters['user/getToken']
            },
            selMode: 'simple',
            tbar: applyTbar,
            columns: [
                {label:'员工姓名',field:'name'},
                {label:'性别',field:'sex'},
                {label:'电话号码',field:'phone'},
                {label:'入职时间',field:'begintime'},
                {label:'工作岗位',field:'station'},
                {label:'岗位等级',field:'stationlevel'},
                {label:'部门姓名',field:'deptname'},
                {label:'员工状态',field:'status'},
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
                tabName: `hr/entry/superior/detail-edit-${row.id}`,
                moduleid: this.moduleid,
            }
            this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '详情',name: detailPanel.defaults.tabName},detailPanel)
        },
    }
}
export default Apply