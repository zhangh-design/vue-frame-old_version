/**
 * 项目额外成本
 */
// import applyTbar from './tbar'
// import detailPanel from './detail'

const ConstGrid = {
  extends: new TjUI.grid.Grid(),
  data() {
    return {
      	conurl: 'project/setup/apply/readApplyPage',
      	queryParams: {
       		token: this.$store.getters['user/getToken']
      	},
      	selMode: 'simple',
		  // tbar: applyTbar,
		columns: [
			{label:'项目名称',field:'projectname'},
			{label:'时间',field:'begintime'},
			{label:'人工额外成本',field:'laborcost'},
			{label:'资金占用成本(万)',field:'capitalcost'},
			{label:'其他成本(万)',field:'othercost'},
		],
    }
  },
  methods: {
    /* rowDblclick(row, event) {
      detailPanel.defaults = {
        mainPanel: this,
        mainGrid: this,
        window: null,
        type: 'edit',
        row: row,
      }
      this.getLinkComponent(`link-content-panel`).getTabContent().addTab({
        title: '详情',
        name: `setup/apply/detail-edit-${row.id}`
      }, detailPanel)
    }, */
  }
}
export default ConstGrid
