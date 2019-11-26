/**
 * 人力
 */
import hrTbar from './tbar'
import {mapGetters} from 'vuex'

const Hr = TjUI.extend(js.base.fn,{
	extends: new TjUI.grid.Grid(),
	props: {
		browserProjectPanel: {
			type: Object,
			default: null
		}
	},
    data() {
		return {
			conurl: 'project/browser/project/readHrPage',
			queryParams: {
				token: this.$store.getters['user/getToken'],
				pid: this.browserProjectPanel.curRow.id
			},
			selMode: 'simple',
			tbar: hrTbar,
			columns: [
				{label:'人员名称',field:'user'},
				{label:'岗位',field:'station'},
				{label:'数量',field:'num'},
				{label:'所在部门',field:'dept'},
				{label:'计划入场时间',field:'begintime'},
				{label:'计划退场时间',field:'endtime'},
				{label:'工作内容',field:'content'},
				{label:'预计工作量(人天）',field:'workload'},
				{label:'预计成本(万)',field:'consts'},
			],
		}
	}
})
export default Hr