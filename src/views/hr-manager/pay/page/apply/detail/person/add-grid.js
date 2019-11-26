/**
 *关联项目 添加
 */
import dateformat from 'dateformat-util'
import { apply } from '@/utils/tools'
import gridSearch from './grid-searchpanel'
import gridTbar from './grid-tab'
import _forIn from 'lodash/forIn'

const FileList = {
    extends: new TjUI.grid.Grid(),
    props: ['mainPanel','mainGrid','window'],
    data(){
        return {
            conurl: 'hr/payorder/apply/readUserPage',
            queryParams: {
                token: this.$store.getters['user/getToken'],
            },
            selMode: 'simple',
            tbar:gridTbar,
            searchPanel:gridSearch,
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
    }
}
export default FileList