/**
 * 项目立项 经管部审批 api 文档接口 领域模型
 */
export default[
	{
        name: 'readChargePage',
        method: 'GET',
        desc: '获取项目立项-经管部审批-分页',
        path: '/project/setup/charge/page',
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
        path: '/project/setup/charge/{processid}/step',
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
        desc: '经管部审批-获取里程碑信息',
        path: '/project/setup/charge/milestone/{processid}/page',
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
		desc: '经管部审批-人力预算信息查询',
		path: '/project/setup/charge/hr/{processid}/page',
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
        name: 'doSubmitCharge',
        method: 'POST',
        desc: '提交',
        path: '/project/setup/charge/{processid}/submit',
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
        name: 'doRejectCharge',
        method: 'POST',
        desc: '回退',
        path: '/project/setup/charge/{processid}/reject',
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
		desc: '项目立项-经管部审批-获取项目预算',
		path: '/project/setup/charge/{processid}/budget',
		mockPath: '',
		restful: true,
		headers: ['token'],
		params: {
			token: '',
			processid: '',
		}
    },
    {
        name: 'getChargeDetail',
        method: 'GET',
        desc: '获取申请详情',
        path: '/project/setup/charge/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: ''
        }
    },
]