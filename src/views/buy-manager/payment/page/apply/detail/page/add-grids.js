/**
 *关联项目 添加
 */
import { apply } from '@/utils/tools'
import gridSearch from './grid-searchpanels'
import gridTbar from './grid-tabs'
import _forIn from 'lodash/forIn'

const FileList = {
    extends: new TjUI.grid.Grid(),
    props: ['mainPanel','mainGrid','window'],
    data(){
        return {
            conurl: 'buy/payment/apply/readContractPage',
            queryParams: {
                token: this.$store.getters['user/getToken'],
            },
            selMode: 'simple',
            tbar:gridTbar,
            searchPanel:gridSearch,
            columns: [
                {label:'项目名称',field:'projectname'},
                {label:'合同名称',field:'name'},
                {label:'合同类型',field:'sort'},
                {label:'客户单位',field:'org'},
                {label:'承建部门',field:'deptname'},
            ],
        }
    },
}
export default FileList