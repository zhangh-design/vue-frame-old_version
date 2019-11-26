//发起申请
import applyTbar from './tbar'
import detailPanel from './detail'
import searchPanel from './search'

const Apply = {
  	extends: new TjUI.grid.Grid(),
  	props: {
		moduleid: {
			type: String,
			default: ''
		},
		link: {
			type: String,
			default: 'link-person-panel'
		}
  	},
  	data() {
    return {
      	conurl: 'hr/person/person/readPersonPage',
      	queryParams: {
       		token: this.$store.getters['user/getToken']
      	},
      	selMode: 'simple',
		tbar: applyTbar,
		detailPanel: detailPanel,
		searchPanel: searchPanel,
		columns: [
			{label:'员工编号',field:'code'},
			{label:'员工姓名',field:'name'},
			{label:'性别',field:'sex'},
			{label:'电话号码',field:'phone'},
			{label:'入职时间',field:'begintime'},
			{label:'工作岗位',field:'station'},
			{label:'岗位等级',field:'stationlevel'},
			{label:'部门名称',field:'deptname'},
			{label:'员工状态',field:'status'},
			{label:'状态',field:'flagname'},
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
			tabName: `hr/person/person/detail-edit-${row.id}`,
			row: {...row},
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
