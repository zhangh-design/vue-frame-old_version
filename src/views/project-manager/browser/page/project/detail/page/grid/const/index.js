/**
 * 成本
 */
import {userError} from '@/utils/tools'
import constTbar from './tbar'

const Const = TjUI.extend(js.base.fn,{
	extends: new TjUI.grid.Grid(),
	props: {
		browserProjectPanel: {
			type: Object,
			default: null
		}
	},
    data() {
		return {
			conurl: 'project/browser/project/getConst',
			budgetConurl: 'project/browser/project/getBudget',
			queryParams: {
				token: this.$store.getters['user/getToken'],
				id: this.browserProjectPanel.curRow.id
			},
			selMode: 'simple',
			tbar: constTbar,
			userLoadStore: this.hrLoadStore,
			isPagination: false,
			columns: [
				{label:'',field:'type'},
				{label:'总成本',field:'totalcost'},
				{label:'人工成本',field:'laborcost'},
				{label:'差旅成本',field:'travelcost'},
				{label:'商务成本',field:'businesscost'},
				{label:'物质成本',field:'materialcost'},
				{label:'外委成本',field:'peripheralcost'},
				{label:'资金占用成本',field:'capitalcost'},
				{label:'其他成本',field:'othercost'},
			],
		}
	},
	methods: {
		hrLoadStore: function(content){
			this.$axios.all([this.$api[this.conurl](this.queryParams),this.$api[this.budgetConurl](this.queryParams)]).then(this.$axios.spread(function (constData, budgetData) {
				console.info(constData,budgetData);
				constData.data.type = '成本'
				budgetData.data.type = '预算'
				content.getPanel.setTotal(2)
				content.tableData.splice(0,content.tableData.length,...[
					constData.data,budgetData.data
				])
			}));
		}
	}
})
export default Const