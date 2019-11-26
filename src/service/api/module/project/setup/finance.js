/**
 * 项目立项 财务部审批 api 文档接口 领域模型
 */
export default[
	{
        name: 'readFinancePage',
        method: 'GET',
        desc: '获取项目立项-财务部审批-分页',
        path: '/project/setup/finance/page',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
            page_page: 0,
            page_size: 30
        },
        validator:{
            page_page: {required: true,type: Number,sqlxss: true,not: '', msg: 'page_page不能为空!'},
            page_size: {required: true,type: Number,sqlxss: true,not: '', msg: 'page_size不能为空!'}
        }
    },
    {
        name: 'doStep',
        method: 'GET',
        desc: '流程步骤',
        path: '/project/setup/finance/{processid}/step',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
    {
        name: 'readMilestonePage',
        method: 'GET',
        desc: '财务部审批-获取里程碑信息',
        path: '/project/setup/finance/milestone/{processid}/page',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            page_page: 0,
            page_size: 30
        },
    },
    {
		name: 'readHrPage',
		method: 'GET',
		desc: '财务部审批-人力预算信息查询',
		path: '/project/setup/finance/hr/{processid}/page',
		mockPath: '',
		restful: true,
		headers: ['token'],
		params: {
			token: '',
			processid: '0',
			page_page: 0,
			page_size: 30
		},
		validator: {
			page_page: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_page不能为空!'},
			page_size: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_size不能为空!'}
		}
	},
    {
        name: 'doSubmitFinance',
        method: 'POST',
        desc: '提交',
        path: '/project/setup/finance/{processid}/submit',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            advice: '',
        }
    },
    {
        name: 'doRejectFinance',
        method: 'POST',
        desc: '回退',
        path: '/project/setup/finance/{processid}/reject',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            advice: '',
        },
        validator:{
            advice: {type: String,sqlxss: true,not: '', msg: '意见字段格式有问题!'}
        }
    },
    {
		name: 'getBudget',
		method: 'GET',
		desc: '项目立项-财务部审批-获取项目预算',
		path: '/project/setup/finance/{processid}/budget',
		mockPath: '',
		restful: true,
		headers: ['token'],
		params: {
			token: '',
			processid: '',
		}
    },
    {
        name: 'getFinanceDetail',
        method: 'GET',
        desc: '获取申请详情',
        path: '/project/setup/finance/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: ''
        }
    },
]