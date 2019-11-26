//发起申请
import applyTbar from './tbar'
import detailPanel from './detail'

const Apply = {
  extends: new TjUI.grid.Grid(),
  props: {
	  	link: {
			type: String,
			default: 'link-setup-panel'
		},
		moduleid: {
			type: String,
			default: ''
		}
  },
  data() {
    return {
      	conurl: 'project/setup/apply/readApplyPage',
      	queryParams: {
       		token: this.$store.getters['user/getToken']
      	},
      	selMode: 'simple',
	  	tbar: applyTbar,
		columns: [
			{label:'项目编号',field:'code'},
			{label:'项目名称',field:'name'},
			{label:'承建部门名称',field:'deptname'},
			{label:'项目类型',field:'sort'},
			{label:'开始时间',field:'begintime'},
			{label:'结束时间',field:'endtime'},
			{label:'项目经理',field:'managername'},
			{label:'合同金额(万)',field:'amount'},
			// {label:'关联预算',field:'budgetid'},
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
				tabName: `setup/apply/detail-edit-${row.id}`,
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
