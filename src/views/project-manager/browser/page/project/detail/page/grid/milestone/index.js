/**
 * 里程碑查询
 */
const Milestone = TjUI.extend(js.base.fn,{
	extends: new TjUI.grid.Grid(),
	props: {
		browserProjectPanel: {
			type: Object,
			default: null
		}
	},
	data(){
		return {
			conurl: 'project/browser/project/readMilestonePage',
            queryParams: {
				token: this.$store.getters['user/getToken'],
				pid: this.browserProjectPanel.curRow.id
            },
            selMode: 'simple',
			columns: [
				{label:'阶段',field:'stage'},
				{label:'计划开始时间',field:'planbegin'},
				{label:'计划结束时间',field:'planend'},
				{label:'关联回款比例',field:'paymentrate'},
				{label:'关联回款金额(万)',field:'paymentnum'},
				{label:'工作内容',field:'content'},
			],
		}
	}
})
export default Milestone