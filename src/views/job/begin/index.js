/**
 * 我发起的
 */
import beginSearchPanel from './search-panel'
import permissionRolesRoutes from '@/routes/permission-module-index'
import { CONST_DEFAULT_CONFIG } from '@/config'
import beginTbar from './tbar'

const Begin = {
    extends: new TjUI.grid.Grid(),
    props: {
        moduleid: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
            conurl: 'job/begin/readPage',
            workflowConurl: 'job/begin/getWorkFlow',
            queryParams: {
                token: this.$store.getters['user/getToken']
            },
            selMode: 'simple',
            tbar: beginTbar,
            searchPanel: beginSearchPanel,
            columns: [
                {label:'流程ID',field:'id'},
                {label:'流程名称',field: 'name'},
                {label:'发起人',field:'ownername'},
                {label:'发起部门',field:'deptname'},
                {label:'发起时间',field:'starttime'},
                {label:'处理人',field:'handlername'},
                {label:'处理部门',field:'handlerdept'},
                {label:'处理时间',field:'handlertime'},
				{label:'流程类型',field:'processname'},
                {label:'任务步骤',field:'taskname'},
            ],
        }
    },
    methods: {
        rowDblclick(row, event) {
            this.$api[this.workflowConurl]({token: this.$store.getters['user/getToken'],processkey: row.processkey,taskkey: row.taskkey}).then(resData => {
                let curRow = {...row}
                let tabName = `${resData.data[2]}/${resData.data[1]}/detail-${curRow.businessid}`
                let fileRouter = permissionRolesRoutes[`${resData.data[2]}${CONST_DEFAULT_CONFIG.sep}${resData.data[1]}${CONST_DEFAULT_CONFIG.sep}detail`]
                new fileRouter().then((fileData)=>{
                    fileData.default.defaults = {mainPanel: this,mainGrid: this,window: null,row: {process: {id: curRow.id},id: curRow.businessid,userid: curRow.ownerid,deptcode: curRow.deptcode},moduleid: resData.data[0],tabName: tabName,type: 'edit'}
                    this.getLinkComponent(`link-content-panel`).getTabContent().addTab({
                        title: curRow.processname+'-'+curRow.taskname,
                        name: tabName,
                    }, fileData.default
                    )
                })
            })
        }
    }
}
export default Begin