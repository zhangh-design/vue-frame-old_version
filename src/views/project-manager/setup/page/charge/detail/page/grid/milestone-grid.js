/**
 * 里程碑信息
 */
const MilestoneGrid = {
	extends: new TjUI.grid.Grid(),
	props: ['setUpApplyEditPanel'],
    data() {
      return {
		  	you: 'bbbbbbbb',
            conurl: 'project/setup/charge/readMilestonePage',
            queryParams: {
				 token: this.$store.getters['user/getToken'],
				 processid: ''
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
  export default MilestoneGrid
