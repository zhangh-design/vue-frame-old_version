/**
 * 合同信息
 */
import contractTbar from './contract/tbar'
import editDetail from './contract/edit-detail'

const ContractGrid = {
	extends: new TjUI.grid.Grid(),
	// props: ['setUpApplyEditPanel'],
	props: {
		setUpApplyEditPanel: {
			type: Object,
			default: null
		},
		row: {
			type: Object,
			default: null
		},
		moduleid: {
			type: String,
			default: ''
		}
	},
    data() {
      return {
		  	you:'22222222222222',
            conurl: 'hr/person/person/readContractPage',
            queryParams: {
				 token: this.$store.getters['user/getToken'],
				 pid: '',
				 code:''
            },
            selMode: 'simple',
			tbar: contractTbar,
			detailPanel: editDetail,
			isReloadGrid: this.setUpApplyEditPanel.curType==='add' ? false : true,
			columns: [
				{label:'员工姓名',field:'personname'},
				{label:'合同编号',field:'code'},
				{label:'合同名称',field:'name'},
				{label:'合同生效时间',field:'begintime'},
				{label:'合同终止时间',field:'endtime'},
				{label:'备注',field:'remark'},
			],
      }
	},
	mounted(){
		if(this.setUpApplyEditPanel.curRow!==null){
			this.queryParams.pid = this.setUpApplyEditPanel.curRow.id
			//this.queryParams.contractid = this.setUpApplyEditPanel.curRow.id
		}
	},
    methods: {
        reloadGrid(){
			if(this.setUpApplyEditPanel.curRow!==null){
				this.setQueryParams({token: this.$store.getters['user/getToken'],pid: this.setUpApplyEditPanel.curRow.id})
				!!this.getLinkComponent(this.tableLink) && this.getLinkComponent(this.tableLink).loadStore()
			}
        }
	}
  }
  export default ContractGrid
