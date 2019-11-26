/**
 * 搜索栏
 */
import {mapGetters} from 'vuex'

const SearchPanel = {
    extends: new TjUI.grid.searchPanel.SearchPanel(),
    data() {
        return {
            defaults: {
                width: 250,
                columns: 4,
                labelWidth: 90,
            }
        }
    },
    computed: {
        ...mapGetters({
            userData: 'user/getUserInfo'
        })
    },
    methods: {
        initDetailData() {
            this.detailData = [
                {span: 1, name: 'code', label: '合同编号', type: 'TextField', width: 150},
                {span: 1, name: 'name', label: '合同名称', type: 'TextField', width: 150},
                {span: 1, name: 'signtime1', label: '签订日期从', type: 'DatePicker', width: 150},
                {span: 1, name: 'signtime2', label: '到', type: 'DatePicker', width: 150},
                {span: 1, name: 'customerunit', label: '客户单位', type: 'TextField', width: 150},
                {span: 1, name: 'manager', label: '合同负责人', type: 'TextField', width: 150},
                // {span: 1,name: 'flag',label: '中标信息',displayField: 'name',valueField: 'code',type: 'ComboBox',conurl: 'dict/readTenderFlag',queryParams: {token: this.$store.getters['user/getToken']},width: 150},
                {
                    span: 1, name: 'searchBtn', type: 'Button', text: '查询', style: 'margin-left:-90px;', listeners: {
                        click: this.doQuery
                    }
                }
            ]
        }
    }
}
export default SearchPanel
