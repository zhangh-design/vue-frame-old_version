/**
 * 里程碑信息
 */
const MilestoneGrid = {
	extends: new TjUI.grid.Grid(),
    props: {
        setUpApplyEditPanel: {
            type: Object,
            default: null
        },
        type: {
            type: String,
            default: 'edit'
        },
        row: {
            type: Object,
            default: null
        }
    },
    data() {
      return {
            conurl: 'expense/travel/finance/readFinanceSubsidyPage',
            queryParams: {
				 token: this.$store.getters['user/getToken'],
				 processid: ''
            },
            selMode: 'simple',
			columns: [
				{label:'出差地',field:'address'},
                {label:'出差天数',field:'howday'},
                {label:'出差补助(元)',field:'expense'},
                {label:'住宿费(元)',field:'roomexpense'},
                {label:'住宿费张数',field:'roomnum'},
                {label:'市内交通费(元)',field:'vehicleexpense'},
                {label:'市内交通费张数',field:'vehiclenum'},
                {label:'其他费用(元)',field:'otherexpense'},
                {label:'其他费用张数',field:'othernum'},
                {label:'备注',field:'remark'},
			],
      }
	},
	mounted(){
        if(this.setUpApplyEditPanel.curRow!==null){
            this.queryParams.processid = this.setUpApplyEditPanel.curRow.process.id
        }
	}
  }
  export default MilestoneGrid
