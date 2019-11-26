/**
 * 岗位信息
 */
import stationtTbar from './station/tbar'
import editDetail from './station/edit-detail'

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
            conurl: 'hr/person/person/readStationPage',
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
				{label:'变更编号',field:'processcode'},
				{label:'当前岗位',field:'station'},
				{label:'原岗位',field:'oldstation'},
                {label:'变更日期',field:'changedtime'},
                {label:'变更原因',field:'reason'},
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
