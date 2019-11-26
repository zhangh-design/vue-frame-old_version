/**
 * 查看详情页
 */
import {mapGetters} from 'vuex'
import detail from '@/components/common/grid/detail/detail'

const Detail = {
	extends: new TjUI.grid.detail.Detail(),
	props: {
		mainPanel: {
			type: Object,
			default: null
		},
		mainGrid: {
			type: Object,
			default: null
		},
		row: {
			type: Object,
			default: null
		}
	},
	data() {
		return {
			formParams: {
				token: this.$store.getters['user/getToken'],
				processid: ''
			},
			defaults: {
				border: false,
				columns: 4,
				width: 270,
				labelWidth: 110,
				buttonPosition: 'left',
			},
			lastFormDetail: {},
		}
	},
	computed: {
		//grid当前选中row行
		record(){
			return this.row
		}
	},
	methods: {
		initPanel() {
			let panel = {
				component: detail,
				props: {
				link: this.detailLink,
				...this.$data,
				buttons: [],
				}
			}
			this.add(panel)
		},
		initDetailData() {
			this.detailData = [
				{span: 1,name: 'code',type: 'TextField',width: 150,readonly:true,label: '编号'},
				{span: 1,name: 'begintime',type: 'DatePicker',width: 150,readonly:true,label: '开始时间'},
				{span: 1,name: 'deptname',type: 'TextField',width: 150,readonly:true,label: '承建部门'},
				{span: 1,name: 'profit',type: 'TextField',width: 150,readonly:true,label: '预算毛利润(万)'},
				{span: 1,name: 'name',type: 'TextField',width: 150,readonly:true,label: '项目名称'},
				{span: 1,name: 'endtime',type: 'DatePicker',width: 150,readonly:true,label: '结束时间'},
				{span: 1,name: 'amount',type: 'TextField',width: 150,readonly:true,label: '合同金额(万)'},
				{span: 1,name: 'profitratestring',type: 'TextField',width: 150,readonly:true,label: '预算毛利润率%'},
				{span: 1,name: 'sort',type: 'TextField',width: 150,readonly:true,label: '项目类型'},
				{span: 1,name: 'managername',type: 'TextField',width: 150,readonly:true,label: '项目经理'},
				{span: 1,name: 'cost',type: 'TextField',width: 150,readonly:true,label: '预算总成本(万)'},
				{span: 1,name: 'bonus',type: 'TextField',width: 150,readonly:true,label: '预算奖金(万)'},
			]
		},
	}
}
export default Detail
