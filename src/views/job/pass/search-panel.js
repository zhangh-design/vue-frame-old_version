/**
 * 搜索栏
 */
import { mapGetters } from 'vuex'
const SearchPanel = {
    extends: new TjUI.grid.searchPanel.SearchPanel(),
    data(){
        return {
            taskkeyLink: `taskkey-link-${this._uid}`,
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
                {span: 1,name: 'processkey',label: '流程类型',displayField: 'name',valueField: 'value',type: 'ComboBox',conurl:'dict/readProcessList',queryParams: {token: this.$store.getters['user/getToken']},width: 150,listeners: {
                    change: (val)=>{
                        if(!!val){
                            this.getLinkComponent(this.taskkeyLink).reloadStore({process: val['value']})
                        }
                    }
                }},
                {span: 1,name: 'taskkey',link: this.taskkeyLink,label: '任务步骤',displayField: 'name',valueField: 'value',type: 'ComboBox',conurl:'dict/readTaskList',queryParams: {token: this.$store.getters['user/getToken'],process: 'a'},width: 150},
                {span: 2,name: 'name',label: '名称',type: 'TextField',width: 150},
				{span: 1,name: 'starttime1',label: '开始',type: 'DateTimePicker',width: 150},
				{span: 1,name: 'starttime2',label: '结束',type: 'DateTimePicker',width: 150},
				{span: 1,name: 'searchBtn',type:'Button',text:'查询',style: 'margin-left:-40px;',listeners: {
                    click: this.doQuery
                }}
            ]
        }
    }
}
export default SearchPanel