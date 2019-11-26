/**
 * 搜索栏
 */
import {mapGetters} from 'vuex'

const SearchPanel = {
    extends: new TjUI.grid.searchPanel.SearchPanel(),
    data() {
        return {
            defaults: {
                width: 220,
                columns: 5,
                labelWidth: 70,
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
                {span: 1, name: 'code', label: '批次', type: 'TextField', width: 130},
                {span: 1, name: 'area', label: '招标地区', type: 'TextField', width: 130},
                {span: 1, name: 'org', label: '招标机构', type: 'TextField', width: 130},
                {span: 1, name: 'deptname', label: '经办部门', type: 'TextField', width: 130},
                {span: 1, name: 'oprtname', label: '经办人', type: 'TextField', width: 130},
                {span: 1, name: 'tendertime1', label: '开始', type: 'DatePicker', width: 130},
                {span: 1, name: 'tendertime2', label: '结束', type: 'DatePicker', width: 130},
                
                {
                    span: 1,
                    name: 'flag',
                    label: '状态',
                    displayField: 'name',
                    valueField: 'code',
                    type: 'ComboBox',
                    conurl: 'dict/readTenderFlag',
                    queryParams: {token: this.$store.getters['user/getToken']},
                    width: 130
                },
                {
                    span: 1, name: 'searchBtn', type: 'Button', text: '查询', style: 'margin-left:0px;', listeners: {
                        click: this.doQuery
                    }
                }
            ]
        }
    }
}
export default SearchPanel
