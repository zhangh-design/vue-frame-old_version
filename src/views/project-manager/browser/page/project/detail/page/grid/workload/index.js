/**
 * 开票统计
 */
import workLoadTbar from './tbar'

const WorkLoad = TjUI.extend(js.base.fn,{
	extends: new TjUI.grid.Grid(),
	props: {
		browserProjectPanel: {
			type: Object,
			default: null
		}
	},
    data() {
		return {
			conurl: 'project/browser/project/readWorkloadPage',
			queryParams: {
				token: this.$store.getters['user/getToken'],
				id: this.browserProjectPanel.curRow.id
			},
			selMode: 'simple',
			tbar: workLoadTbar,
			columns: [
				{label:'人员',field:'workername'},
				{label:'部门',field:'deptname'},
				{label:'累计工作量(天)',field:'workload'},
				{label:'当月工作量(天)',field:'totalworkload'},
				// {label:'工作占比',field:'rate'},
				{label:'比率%（工作占比）',field: 'rateString'}
			],
		}
	}
})
export default WorkLoad