/**
 * 项目立项 api 文档接口 领域模型
 */

export default [
	{
		name: 'readApplyPage',
		method: 'GET',
		desc: '获取项目立项-申请-分页',
		path: '/project/setup/apply/page',
		mockPath: '',
		headers: ['token'],
		params: {
		token: '',
			page_page: 0,
			page_size: 30
		},
		validator: {
			page_page: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_page不能为空!'},
			page_size: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_size不能为空!'}
		}
	},
	{
        name: 'doStep',
        method: 'GET',
        desc: '流程步骤',
        path: '/project/setup/apply/{processid}/step',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
	{
		name: 'readContractPage',
		method: 'GET',
		desc: '获取项目立项-申请-合同列表查询',
		path: '/project/common/contract/page',
		mockPath: '',
		headers: ['token'],
		params: {
		token: '',
			page_page: 0,
			page_size: 30,
			name: '',
			customerunit: '',
			signtime1: '',
			signtime2: '',
			manager: '',
		},
		validator: {
			page_page: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_page不能为空!'},
			page_size: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_size不能为空!'}
		}
	},
	{
		name: 'insertApply',
		method: 'POST',
		desc: '新增',
		path: '/project/setup/apply/',
		mockPath: '',
		headers: ['token'],
		params: {
			token: '',
			name: '',
			sort: '',
			begintime: '',
			endtime: '',
			amount: '',
			bonusrate: '',
			contractid: '0',
			contractname: ''
		}
	},
	{
		name: 'doUpdateApply',
		method: 'POST',
		desc: '修改',
		path: '/project/setup/apply/{processid}',
		mockPath: '',
		headers: ['token'],
		restful: true,
		params: {
			token: '',
			processid: '',
			id: '',
			name: '',
			sort: '',
			begintime: '',
			endtime: '',
			amount: '',
			bonusrate: '',
			contractid: '0',
			dirty: true,
			contractname: '',
			budgetid: ''
		}
	},
	{
		name: 'doSubmitApply',
		method: 'POST',
		desc: '提交流程',
		path: '/project/setup/apply/{processid}/submit',
		mockPath: '',
		headers: ['token'],
		restful: true,
		params: {
			token: '',
			processid: '',
			advice: ''
		}
	},
	{
		name: 'readMilestonePage',
		method: 'GET',
		desc: '获取项目立项-申请-历程碑信息查询',
		path: '/project/setup/apply/milestone/{processid}/page',
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
		name: 'getBudget',
		method: 'GET',
		desc: '项目立项-获取项目预算',
		path: '/project/setup/apply/{processid}/budget',
		mockPath: '',
		restful: true,
		headers: ['token'],
		params: {
			token: '',
			processid: '',
		}
	},
	{
		name: 'insertBudget',
		method: 'POST',
		desc: '项目立项-保存项目预算',
		path: '/project/setup/apply/{processid}/budget',
		mockPath: '',
		restful: true,
		headers: ['token'],
		params: {
			token: '',
			processid: '',
			totalcost: 0,
			laborcost: 0,
			travelcost: 0,
			businesscost: 0,
			materialcost: 0,
			peripheralcost: 0,
			capitalcost: 0,
			othercost: 0,
			id: '',
			budgetid: '',
		}
	},
	{
		name: 'deleteApply',
		method: 'DELETE',
		desc: '项目立项-删除立项',
		path: '/project/setup/apply/{processid}',
		mockPath: '',
		restful: true,
		headers: ['token'],
		params: {
			token: '',
			processid: '',
		}
	},
	{
		name: 'insertMilestone',
		method: 'POST',
		desc: '项目立项-添加-里程碑信息',
		path: '/project/setup/apply/milestone/{processid}',
		mockPath: '',
		restful: true,
		headers: ['token'],
		params: {
			token: '',
			processid: '',
			projectid: '',
			stage: '',
			planbegin: '',
			planend: '',
			paymentrate: '',
			paymentnum: '',
			content: '',
		}
	},
	{
		name: 'deleteMilestone',
		method: 'DELETE',
		desc: '项目立项-删除-里程碑信息',
		path: '/project/setup/apply/milestone/{processid}/{id}',
		mockPath: '',
		restful: true,
		headers: ['token'],
		params: {
			token: '',
			processid: '',
			id: '',
		}
	},
	{
		name: 'updateMilestone',
		method: 'PUT',
		desc: '项目立项-修改-里程碑信息',
		path: '/project/setup/apply/milestone/{processid}',
		mockPath: '',
		restful: true,
		headers: ['token'],
		params: {
			token: '',
			processid: '',
			projectid: '',
			id: '',
			stage: '',
			planbegin: '',
			planend: '',
			paymentrate: '',
			paymentnum: '',
			content: '',
			dirty: true
		}
	},
	{
		name: 'readHrPage',
		method: 'GET',
		desc: '获取项目立项-申请-人力预算信息查询',
		path: '/project/setup/apply/hr/{processid}/page',
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
		name: 'insertHr',
		method: 'POST',
		desc: '项目立项-添加-人力预算信息',
		path: '/project/setup/apply/hr/{processid}',
		mockPath: '',
		restful: true,
		headers: ['token'],
		params: {
			token: '',
			processid: '',
			projectid: '',
			user: '',
			station: '',
			num: '',
			dept: '',
			begintime: '',
			endtime : '',
			content: '',
			workload: '',
			consts: '',
		}
	},
	{
		name: 'updateHr',
		method: 'PUT',
		desc: '项目立项-修改-人力信息信息',
		path: '/project/setup/apply/hr/{processid}',
		mockPath: '',
		restful: true,
		headers: ['token'],
		params: {
			token: '',
			processid: '',
			projectid: '',
			id: '',
			user: '',
			station: '',
			num: '',
			dept: '',
			begintime: '',
			endtime : '',
			content: '',
			workload: '',
			consts: '',
			dirty: true
		}
	},
	{
		name: 'deleteHr',
		method: 'DELETE',
		desc: '项目立项-删除-人力信息',
		path: '/project/setup/apply/hr/{processid}/{id}',
		mockPath: '',
		restful: true,
		headers: ['token'],
		params: {
			token: '',
			processid: '',
			id: '',
		}
	},
	{
        name: 'getApplyDetail',
        method: 'GET',
        desc: '获取申请详情',
        path: '/project/setup/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: ''
        }
	},
	{
        name: 'getApplyHrDetail',
        method: 'GET',
        desc: '获取申请详情-人力投入',
        path: '/project/setup/apply/hr/{processid}/{id}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
			processid: '',
			id: ''
        }
	},
	{
        name: 'getApplyMilestoneDetail',
        method: 'GET',
        desc: '获取申请详情-里程碑',
        path: '/project/setup/apply/milestone/{processid}/{id}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
			processid: '',
			id: ''
        }
	},
]
