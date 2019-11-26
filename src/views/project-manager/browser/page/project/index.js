/**
 * 项目浏览-项目查询
 */
import projectSearchPanel from './search-panel'
import detailPanel from './detail' 

const Query = {
	extends: new TjUI.grid.Grid(),
	data(){
		return {
			conurl: 'project/browser/project/readProjectPage',
			queryParams: {
				token: this.$store.getters['user/getToken']
			},
			selMode: 'simple',
			searchPanel: projectSearchPanel,
			columns: [
				{label: '项目编号',field:'code'},
				{label: '项目名称',field:'name'},
				{label: '承建部门名称',field:'deptname'},
				{label: '项目类型',field:'sort'},
				{label: '开始时间',field:'begintime'},
				{label: '结束时间',field:'endtime'},
				{label: '项目经理',field:'managername'},
				{label: '合同金额(万)',field:'amount'},
				// {label:'关联预算',field:'budgetid'},
				{label: "项目预算总成本(万)", field: "cost"},
				{label: "项目预算毛利润(万)", field: "profit"},
				{label: "项目预算毛利润率%", field: "profitratestring"},
				{label: "预算奖金(万)", field: "bonus"},
				// {label: "奖金系数(万)", field: "bonusrate"},
			],
		}
	},
	methods: {
		rowDblclick(row, event) {
			detailPanel.defaults = {
				mainPanel: this,
				mainGrid: this,
				row: {...row},
			}
			this.getLinkComponent(`link-content-panel`).getTabContent().addTab({
				title: '详情',
				name: `browser/project/detail-check-${row.id}`
			}, detailPanel)
    	},
	}
}
export default Query