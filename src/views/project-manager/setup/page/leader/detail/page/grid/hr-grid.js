/**
 * 人力投入
 */
const HrGrid = {
	extends: new TjUI.grid.Grid(),
	props: ['setUpApplyEditPanel'],
    data() {
      return {
            conurl: 'project/setup/leader/readHrPage',
            queryParams: {
				 token: this.$store.getters['user/getToken'],
				 processid: ''
            },
            selMode: 'simple',
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
	},
	mounted(){
		if(this.setUpApplyEditPanel.curRow!==null){
			this.queryParams.processid = this.setUpApplyEditPanel.curRow.process.id
		}
	},
    methods: {
		reloadGrid(){
			if(this.setUpApplyEditPanel.curRow!==null){
				this.setQueryParams({token: this.$store.getters['user/getToken'],processid: this.setUpApplyEditPanel.curRow.process.id})
				!!this.getLinkComponent(this.tableLink) && this.getLinkComponent(this.tableLink).loadStore()
			}
        }
	}
  }
  export default HrGrid
