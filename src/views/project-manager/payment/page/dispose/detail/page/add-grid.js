/**
 *关联项目 添加
 */
import dateformat from 'dateformat-util'
import { apply } from '@/utils/tools'
import gridSearch from './grid-searchpanels'
import gridTbar from './grid-tabs'
import _forIn from 'lodash/forIn'

const FileList = {
    extends: new TjUI.grid.Grid(),
    props: ['mainPanel','mainGrid','window'],
    data(){
        return {
            you: 'ddddddddddd',
            conurl: 'project/payment/dispose/readProjectPage',
            queryParams: {
                token: this.$store.getters['user/getToken'],
            },
            selMode: 'simple',
            tbar:gridTbar,
            searchPanel:gridSearch,
            columns: [
                {label:'项目编号',field:'code'},
                {label:'项目名称',field:'name'},
                {label:'承建部门名称',field:'deptname'},
                {label:'项目类型',field:'sort'},
                {label:'开始时间',field:'begintime',sort: true},
                {label:'结束时间',field:'endtime',sort: true},
                {label:'项目经理',field:'managername'},
                {label:'合同金额',field:'amount'}
            ],
        }
    },
    mounted(){},
    methods: {}
}
export default FileList