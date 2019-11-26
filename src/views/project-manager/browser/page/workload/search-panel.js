/**
 * 搜索栏
 */
import {mapGetters} from 'vuex'

const SearchPanel = {
    extends: new TjUI.grid.searchPanel.SearchPanel(),
    data() {
        return {
            defaults: {
                width: 260,
                columns: 4,
                labelWidth: 100,
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
                {span: 1, name: 'projectname', label: '项目名称（like）', type: 'TextField', width: 150},
                {span: 1, name: 'deptname', label: '部门名称（like）', type: 'TextField', width: 150},
                {span: 1, name: 'workerid', label: '人员ID', type: 'TextField', width: 150},
                {span: 1, name: '人员名称（like）', label: '人员名称（like）', type: 'TextField', width: 150},
                {span: 1, name: 'worktime1', label: '结束', type: 'DatePicker', width: 150},
                {span: 1, name: 'worktime2', label: '开始', type: 'DatePicker', width: 150},
                {
                    span: 1,
                    name: 'flag',
                    label: '状态',
                    displayField: 'name',
                    valueField: 'code',
                    type: 'ComboBox',
                    conurl: 'dict/readTenderFlag',
                    queryParams: {token: this.$store.getters['user/getToken']},
                    width: 150
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
