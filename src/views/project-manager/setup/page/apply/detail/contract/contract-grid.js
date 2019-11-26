/**
 * 合同列表
 */
import dateformat from 'dateformat-util'
import { apply } from '@/utils/tools'
import _forIn from 'lodash/forIn'
import gridSearch from './grid-searchpanel'
import gridTbar from './grid-tab'

const ContractPage = {
    extends: new TjUI.grid.Grid(),
    props: ['mainPanel','mainGrid','window'],
    data(){
        return {
            conurl: 'project/setup/apply/readContractPage',
            queryParams: {
                token: this.$store.getters['user/getToken'],
            },
            selMode: 'simple',
            tbar:gridTbar,
            searchPanel:gridSearch,
            columns: [
                {label:'合同编号',field:'code'},
                {label:'合同名称',field:'name'},
                {label:'合同金额',field:'amount'},
                {label:'签订日期',field:'signtime',sort: true},
                // {label:'合同到期日期',field:'expiretime',sort: true},
                // {label:'合同盖章日期',field:'stamptime'},
                // {label:'打印份数',field:'printnum'},
                // {label:'归档日期',field:'archivetime'},
                {label:'客户单位',field:'customerunit'},
                {label:'合同负责人',field:'manager'},
                {label:'部门名称',field:'deptname'},
            ],
        }
    },
    mounted(){},
    methods: {}
}
export default ContractPage