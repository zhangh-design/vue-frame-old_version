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
            you: 'ddddddddddd',
            conurl: 'buy/orders/dispose/readProjectPage',
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
    mounted(){
       // apply(this.queryParams,{processid: this.mainGrid.currentRow.process.id})
       console.info('aaaaaaaaaaa ',this.mainPanel);
    },
    methods: {}
}
export default FileList