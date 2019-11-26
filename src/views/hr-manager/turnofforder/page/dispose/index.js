/**
 * 员工离职 任务交接
 */
import disposeTbar from './tbar'
import detailPanel from './detail'

const Dispose = {
	extends: new TjUI.grid.Grid(),
    props: {
        moduleid: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
            conurl: 'hr/turnofforder/dispose/readDisposePage',
            queryParams: {
                token: this.$store.getters['user/getToken']
            },
            selMode: 'simple',
            tbar: disposeTbar,
            columns: [
                {label:'部门编号',field:'deptcode'},
                {label:'员工姓名',field:'personname'},
                {label:'工作岗位',field:'station'},
                {label:'联系电话',field:'phone'},
                {label:'入职时间',field:'begintime'},
				{label:'离职原因',field:'reason'},
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
                tabName: `turnofforder/dispose/detail-edit-${row.id}`,
                moduleid: this.moduleid,
            }
            this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '详情',name: detailPanel.defaults.tabName},detailPanel)
        }
    }
}
export default Dispose