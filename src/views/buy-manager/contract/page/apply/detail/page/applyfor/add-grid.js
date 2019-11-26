/**
 *关联项目 添加
 */
import dateformat from 'dateformat-util'
import {apply} from '@/utils/tools'
import gridSearch from './grid-searchpanel'
import gridTbar from './grid-tab'
import _forIn from 'lodash/forIn'

const FileList = {
    extends: new TjUI.grid.Grid(),
    props: ['mainPanel', 'mainGrid', 'window'],
    data() {
        return {
            conurl: 'expense/travel/apply/getBuyApplyforPage',
            queryParams: {
                token: this.$store.getters['user/getToken'],
            },
            selMode: 'simple',
            tbar: gridTbar,
            searchPanel: gridSearch,
            columns: [
                {label: '项目名称', field: 'projectname'},
                {label: '承建部门名称', field: 'deptname'},
                {label: '开始时间', field: 'paytime', sort: true},
                {label: '项目经理', field: 'username'},
                {label: '合同金额(万)', field: 'pay'}
            ],
        }
    },
}
export default FileList
