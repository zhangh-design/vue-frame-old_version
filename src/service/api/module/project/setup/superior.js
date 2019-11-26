/**
 * 项目立项 上级审核 api 文档接口 领域模型
 */
export default [
    {
        name: 'readSuperiorPage',
        method: 'GET',
        desc: '获取项目立项-上级审批-分页',
        path: '/project/setup/superior/page',
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
        path: '/project/setup/superior/{processid}/step',
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
        desc: '上级审批-获取里程碑信息',
        path: '/project/setup/superior/milestone/{processid}/page',
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
		desc: '上级审批-人力预算信息查询',
		path: '/project/setup/superior/hr/{processid}/page',
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
        name: 'doSubmitSuperior',
        method: 'POST',
        desc: '提交',
        path: '/project/setup/superior/{processid}/submit',
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
        name: 'doRejectSuperior',
        method: 'POST',
        desc: '回退',
        path: '/project/setup/superior/{processid}/reject',
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
		desc: '项目立项-获取项目预算',
		path: '/project/setup/superior/{processid}/budget',
		mockPath: '',
		restful: true,
		headers: ['token'],
		params: {
			token: '',
			processid: '',
		}
    },
    {
        name: 'getSuperiorDetail',
        method: 'GET',
        desc: '获取申请详情',
        path: '/project/setup/superior/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: ''
        }
    },
    {
        name: 'getSuperiorHrDetail',
        method: 'GET',
        desc: '获取申请详情-人力投入',
        path: '/project/setup/superior/hr/{processid}/{id}',
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
        name: 'getSuperiorMilestoneDetail',
        method: 'GET',
        desc: '获取申请详情-里程碑',
        path: '/project/setup/superior/milestone/{processid}/{id}',
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
