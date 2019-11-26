/**
 * 项目浏览 项目查询 api 文档接口 领域模型readProjectPage
 */
export default [
	{
		name: 'readProjectPage',
		method: 'GET',
		desc: '项目浏览 项目查询-分页',
		path: '/project/browser/page',
		mockPath: '',
		headers: ['token'],
		params: {
			token: '',
			page_page: 0,
			page_size: 30,
			code: '',
			name: '',
			sort: '',
			deptcode: '',
			begintime1: '',
			begintime2: '',
		},
		validator: {
			page_page: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_page不能为空!'},
			page_size: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_size不能为空!'}
		}
	},
	{
		name: 'getContractInfo',
		method: 'GET',
		desc: '项目浏览 项目查询-获取合同',
		path: '/project/browser/contract/{contractid}',
		mockPath: '',
		restful: true,
		headers: ['token'],
		params: {
			token: '',
			contractid: ''	//合同id
		}
	},
	{
		name: 'readContractFilePage',
		method: 'GET',
		desc: '项目浏览 项目查询-获取合同-取得合同附件列表',
		path: '/project/browser/contract/{contractid}/accessor/page',
		mockPath: '',
		restful: true,
		headers: ['token'],
		params: {
			token: '',
			contractid: '',	//合同id
			page_page: 0,
			page_size: 30,
		}
	},
	{
		name: 'downContractFile',
		method: 'GET',
		desc: '项目浏览 项目查询-获取合同-下载合同附件列表',
		path: '/project/browser/contract/{contractid}/accessor',
		mockPath: '',
		restful: true,
		headers: ['token'],
		params: {
			token: '',
			contractid: ''	//合同id
		}
	},
	{
		name: 'readMilestonePage',
		method: 'GET',
		desc: '项目浏览 项目查询-获取里程碑',
		path: '/project/browser/milestone/page',
		mockPath: '',
		headers: ['token'],
		params: {
			token: '',
			pid: '',	//项目编号
			page_page: 0,
			page_size: 30,
		}
	},
	{
		name: 'readHrPage',
		method: 'GET',
		desc: '项目浏览 项目查询-获取人力信息',
		path: '/project/browser/hr/page',
		mockPath: '',
		headers: ['token'],
		params: {
			token: '',
			pid: '',	//项目编号
			page_page: 0,
			page_size: 30,
		}
	},
	{
		name: 'getHr',
		method: 'GET',
		desc: '项目浏览 项目查询-获取人力成本统计',
		path: '/project/browser/{id}/hr',
		mockPath: '',
		restful: true,
		headers: ['token'],
		params: {
			token: '',
			id: '',	//项目编号
		}
	},
	{
		name: 'getConst',
		method: 'GET',
		desc: '项目浏览 项目查询-成本统计',
		path: '/project/browser/{id}/const',
		mockPath: '',
		restful: true,
		headers: ['token'],
		params: {
			token: '',
			id: '',	//项目编号
		}
	},
	{
		name: 'getBudget',
		method: 'GET',
		desc: '项目浏览 项目查询-成本预算信息',
		path: '/project/browser/{id}/budget',
		mockPath: '',
		restful: true,
		headers: ['token'],
		params: {
			token: '',
			id: '',	//项目编号
		}
	},
	{
		name: 'readInvoicePage',
		method: 'GET',
		desc: '项目浏览 项目查询-获取开票统计分页',
		path: '/project/browser/{id}/invoice/page',
		mockPath: '',
		restful: true,
		headers: ['token'],
		params: {
			token: '',
			id: '',	//项目编号
			page_page: 0,
			page_size: 30,
		}
	},
	{
		name: 'getInvoice',
		method: 'GET',
		desc: '项目浏览 项目查询-获取开票统计',
		path: '/project/browser/{id}/invoice',
		mockPath: '',
		restful: true,
		headers: ['token'],
		params: {
			token: '',
			id: '',	//项目编号
		}
	},
	{
		name: 'readPaymentPage',
		method: 'GET',
		desc: '项目浏览 项目查询-获取回款统计分页',
		path: '/project/browser/{id}/payment/page',
		mockPath: '',
		restful: true,
		headers: ['token'],
		params: {
			token: '',
			id: '',	//项目编号
			page_page: 0,
			page_size: 30,
		}
	},
	{
		name: 'getPayment',
		method: 'GET',
		desc: '项目浏览 项目查询-获取回款统计',
		path: '/project/browser/{id}/payment',
		mockPath: '',
		restful: true,
		headers: ['token'],
		params: {
			token: '',
			id: '',	//项目编号
		}
	},
	{
		name: 'readWorkloadPage',
		method: 'GET',
		desc: '项目浏览 项目查询-获取工作量统计分页',
		path: '/project/browser/{id}/workload/page',
		mockPath: '',
		restful: true,
		headers: ['token'],
		params: {
			token: '',
			id: '',	//项目编号
			page_page: 0,
			page_size: 30,
		}
	},
	{
		name: 'getWorkload',
		method: 'GET',
		desc: '项目浏览 项目查询-获取工作量统计',
		path: '/project/browser/{id}/workload',
		mockPath: '',
		restful: true,
		headers: ['token'],
		params: {
			token: '',
			id: '',	//项目编号
		}
	},
]