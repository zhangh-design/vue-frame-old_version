//发起申请
import detailPanel from './detail'
import managerTbar from './tbar'

const Manager = {
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
      	conurl: 'expense/travel/manager/readManagerPage',
      	queryParams: {
       		token: this.$store.getters['user/getToken']
      	},
		selMode: 'simple',
		tbar: managerTbar,
		columns: [
            ////{label:'员工ID',field:'userid'},
            {label:'员工姓名',field:'username'},
			//{label:'项目ID',field:'projectid'},
			{label:'项目名称',field:'projectname'},
			{label:'出差事由',field:'reasons'},
			{label:'出差时间',field:'begintime'},
			{label:'出差天数',field:'howday'},
			{label:'报销金额(元)',field:'pay'},
			//{label:'部门编号',field:'deptcode'},
			{label:'部门名称',field:'deptname'},
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
				row: row,
				tabName: `expense/travel/manager/detail-edit-${row.id}`,
                moduleid: this.moduleid,
			}
			this.getLinkComponent(`link-content-panel`).getTabContent().addTab({
				title: '详情',
				name: detailPanel.defaults.tabName
			}, detailPanel)
    	},
  }
}
export default Manager
