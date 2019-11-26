/**
 * 薪资信息
 */
import superiorTbar from './tbar'
import { CONST_DEFAULT_CONFIG } from '@/config'

const PayGrid = {
	extends: new TjUI.grid.Grid(),
	props: ['hrPayEditPanel','moduleid','type','editPanel','row'],
	data() {
	  return {
			conurl: 'hr/payorder/superior/readPayList',
			queryParams: {
				token: this.$store.getters['user/getToken'],
            	// personid: this.row.personid,
				personid: ''
			},
			selMode: 'simple',
			isReloadGrid: false,
			isShowIndex: false,
			isSelectFirstRow: false,
			isPagination: false,
			loadFilter: this.doLoadFilter,
			tbar: superiorTbar,
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
		this.$nextTick(() => {
			this.$api['hr/payorder/superior/getSuperiorDetail']({token: this.$store.getters['user/getToken'],processid: this.row.process.id}).then(resData=>{
				if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
					this.queryParams.personid = resData.data.personid
					this.setQueryParams(this.queryParams)
					this.reloadGrid()
				}
			})
		})
	},
	methods: {
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
export default PayGrid