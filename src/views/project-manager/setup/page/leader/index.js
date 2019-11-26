//经管部审批
import detailPanel from './detail'
import leaderTbar from './tbar'

const Apply = {
	extends: new TjUI.grid.Grid(),
	props: {
		moduleid: {
			type: String,
			default: ''
		}
	},
  data() {
    return {
		conurl: 'project/setup/leader/readLeaderPage',
		queryParams: {
			token: this.$store.getters['user/getToken']
		},
		selMode: 'simple',
		tbar: leaderTbar,
		columns: [
			{label: "项目编号", field: "code"},
			{label: "项目名称", field: "name"},
			{label: "承建部门名称", field: "deptname"},
			{label: "项目类型", field: "sort"},
			{label: "开始时间", field: "begintime"},
			{label: "结束时间", field: "endtime"},
			{label: "项目经理",field: "managername"},
			{label: "合同金额(万)", field: "amount"},
			/* {label: "项目总成本", field: "cost"},
			{label: "项目毛利润", field: "profit"},
			{label: "项目毛利润率", field: "profitrate"},
			{label: "累计开票额", field: "ticket"},
			{label: "累计开票比例", field: "ticketrate"},
			{label: "累计回款额", field: "payment"},
			{label: "累计回款比例", field: "paymentrate"},
			{label: "关联合同id", field: "contractid"},
			{label: "关联备忘录", field: "memoid"},
			{label: "关联预算", field: "budgetid"} */
		],
	}
  },
  methods: {
    rowDblclick(row, event) {
		detailPanel.defaults = {
			mainPanel: this,
			mainGrid: this,
			window: null,
			type: 'edit',
			row: {...row},
			tabName: `project/setup/leader/detail-edit-${row.id}`,
			moduleid: this.moduleid,
		}
		this.getLinkComponent(`link-content-panel`).getTabContent().addTab({
			title: '详情',
      		name: detailPanel.defaults.tabName
		}, detailPanel)
    },
  }
}
export default Apply
