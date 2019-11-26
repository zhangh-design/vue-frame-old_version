/**
 * 搜索栏
 */
import { mapGetters } from 'vuex'
const SearchPanel = {
    extends: new TjUI.grid.searchPanel.SearchPanel(),
    data(){
        return {
            defaults: {
				width: 225,
				columns: 4,
				labelWidth: 68,
            }
        }
	},
	computed: {
        ...mapGetters({
			userData: 'user/getUserInfo'
        })
    },
    methods: {
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'code',label: '编号',type: 'TextField',width: 150},
				{span: 1,name: 'name',label: '名称',type: 'TextField',width: 150},
				{span: 1,name: 'sort',label: '类型',displayField: 'name',valueField: 'code',type: 'ComboBox',conurl:'dict/readProjectsort',queryParams: {token: this.$store.getters['user/getToken']},width: 150},
				{span: 1,name: 'deptcode',label: '承建部门',displayField: 'name',valueField: 'value',type: 'ComboBox',conurl:'project/contract/apply/readTenderDept',queryParams: {token: this.$store.getters['user/getToken']},width: 150},
				{span: 2,name: 'begintime1',label: '开始',type: 'DatePicker',width: 150},
				{span: 1,name: 'begintime2',label: '结束',type: 'DatePicker',width: 150},
				{span: 1,name: 'searchBtn',type:'Button',text:'查询',style: 'margin-left:-40px;',listeners: {
                    click: this.doQuery
                }}
            ]
        }
    }
}
export default SearchPanel