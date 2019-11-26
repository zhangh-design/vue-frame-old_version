/**
 * 岗位信息
 */
import stationtTbar from './incentive/tbar'
import editDetail from './incentive/edit-detail'

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
            conurl: 'hr/person/person/readIncentivePage',
            queryParams: {
				 token: this.$store.getters['user/getToken'],
				 pid: '',
				 code:''
            },
            selMode: 'simple',
			tbar: stationtTbar,
			detailPanel: editDetail,
			isReloadGrid: this.setUpApplyEditPanel.curType==='add' ? false : true,
			columns: [
				{label:'员工姓名',field:'personname'},
				{label:'类别',field:'sort'},
				{label:'名称',field:'name'},
				{label:'内容',field:'content'},
                {label:'发生时间',field:'begintime'},
                {label:'发布单位',field:'org'},
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
