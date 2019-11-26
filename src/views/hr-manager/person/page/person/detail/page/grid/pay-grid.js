/**
 * 岗位信息
 */
import stationtTbar from './pay/tbar'
import editDetail from './pay/edit-detail'

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
			//conurl: 'hr/person/person/readPayPage',
			conurl: 'hr/payorder/leader/readPayList',
            queryParams: {
				token: this.$store.getters['user/getToken'],
				personid: ''
            },
            selMode: 'simple',
			//tbar: stationtTbar,
			//detailPanel: editDetail,
			isPagination: false,
			loadFilter: this.doLoadFilter,
			isReloadGrid: this.setUpApplyEditPanel.curType==='add' ? false : true,
			columns: [
				{label:'时间',field:'changedtime'},
				{label:'社保基数',field:'socialbase'},
				{label:'基本工资(元)',field:'basepay'},
				{label:'绩效工资(元)',field:'meritpay'},
				{label:'通讯补贴(元)',field:'commsub'},
				{label:'交通补贴(元)',field:'trafficsub'},
				{label:'住房补贴(元)',field:'homesub'},
				{label:'其他补贴(元)',field:'otherpay'},
				{label:'住房公积金调整(元)',field:'homepay'},
				{label:'社保调整(元)',field:'socialpay'},
				{label:'其他代缴(元)',field:'substitute'},
				{label:'不交住房公积金',field:'nohome',filter: 'BOOLEAN_BOOLEAN_TYPE'},
				{label:'不交社保',field:'nosocial',filter: 'BOOLEAN_BOOLEAN_TYPE'},
			],
      }
	},
	mounted(){
		// if(this.row){
		// 	this.queryParams.personid = this.row.id
		// }
		if(this.setUpApplyEditPanel.curRow!==null){
			this.queryParams.personid = this.setUpApplyEditPanel.curRow.id
			//this.queryParams.contractid = this.setUpApplyEditPanel.curRow.id
		}
	},
    methods: {
        reloadGrid(){
			if(this.setUpApplyEditPanel.curRow!==null){
				this.setQueryParams({token: this.$store.getters['user/getToken'],pid: this.setUpApplyEditPanel.curRow.id})
				!!this.getLinkComponent(this.tableLink) && this.getLinkComponent(this.tableLink).loadStore()
			}
		},
		doLoadFilter( resData ){
			let pageData = {
				code: 200,
				data: {
					content: resData.data,
					totalElements: resData.data.length
				}
			}
			return pageData
		}
	}
  }
  export default ContractGrid
