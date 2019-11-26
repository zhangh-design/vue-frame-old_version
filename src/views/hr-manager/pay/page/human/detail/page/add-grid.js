/**
 * 调整后
 */
import { apply } from '@/utils/tools'

const AddGrid = {
	extends: new TjUI.grid.Grid(),
	props: ['hrPayEditPanel','moduleid','type','editPanel','row'],
	data() {
	  return {
			conurl: 'hr/payorder/human/readPay',
			queryParams: {
				token: this.$store.getters['user/getToken'],
				processid: this.row.process.id
			},
			selMode: 'simple',
			isShowIndex: false,
			isPagination: false,
			showHeader: false,
			loadFilter: this.doLoadFilter,
			gridRow: {
				changedtime: '',
				personid: '',
            	personname: '',
				socialbase: '',
				basepay: '',
				meritpay: '',
				commsub: '',
				trafficsub: '',
				homesub: '',
				otherpay: '',
				homepay: '',
				socialpay: '',
				substitute: '',
				nohome: 'false',
				nosocial: 'false',
				reason: '',
				remark: '',
				id: '',	//员工(PayOder) payid
				pid: '',//员工(PayOder) id
			},
			columns: [
				{label:'时间',field:'changed-time'},
				{label:'社保基数',field:'socialbase'},
				{label:'基本工资',field:'basepay'},
				{label:'绩效工资',field:'meritpay'},
				{label:'通讯补贴',field:'commsub'},
				{label:'交通补贴',field:'trafficsub'},
				{label:'住房补贴',field:'homesub'},
				{label:'其他补贴',field:'otherpay'},
				{label:'住房公积金调整',field:'homepay'},
				{label:'社保调整',field:'socialpay'},
				{label:'其他代缴',field:'substitute'},
				{label:'不交住房公积金',field:'nohome',filter: 'BOOLEAN_BOOLEAN_TYPE'},
				{label:'不交社保',field:'nosocial',filter: 'BOOLEAN_BOOLEAN_TYPE'},
			],
	  	}
	},
	methods: {
		doLoadFilter(resData){
			let row = resData !== void(0) ? resData.data[0] : this.gridRow;
			if(resData !== void(0)){
				apply(this.gridRow,resData.data[0])
			}
			let pageData = {
				code: 200,
				data: {
					content: [
						{
							'changed-time': '调整后',
							...row
						}
					],
					totalElements: 1
				}
			}
			return pageData
		}
	}
}
export default AddGrid