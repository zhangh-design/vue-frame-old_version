export default [
    {
        name: 'readTellerPage',
        method: 'GET',
        desc: '获取合同会签-申请-分页',
        path: '/expense/travel/teller/page',
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
        name: 'readTellerDetailPage',
        method: 'GET',
        desc: '获取行程详细-申请-分页',
        path: '/expense/travel/teller/detail/{processid}/page',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            page_page: 0,
            page_size: 30
        },
        validator: {
            page_page: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_page不能为空!'},
            page_size: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_size不能为空!'}
        }
    },
    {
        name: 'readTellerSubsidyPage',
        method: 'GET',
        desc: '获取出差补贴-申请-分页',
        path: '/expense/travel/teller/subsidy/{processid}/page',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            page_page: 0,
            page_size: 30
        },
        validator: {
            page_page: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_page不能为空!'},
            page_size: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_size不能为空!'}
        }
    },
    {
        name: 'doSubmitTeller',
        method: 'POST',
        desc: '提交',
        path: '/expense/travel/teller/{processid}/submit',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            advice: '',
        },
    },
    {
        name: 'doRejectTeller',
        method: 'POST',
        desc: '提交',
        path: '/expense/travel/teller/{processid}/reject',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            advice: '',
        },
        validator: {
            advice: {type: String, sqlxss: true, not: '', msg: '意见字段格式有问题!'}
        }
    },
    ,
    {
        name: 'getTellerDetail',
        method: 'GET',
        desc: '项目负责人审批-详情',
        path: '/expense/travel/teller/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: ''
        }
    },
    {
        name: 'doStep',
        method: 'GET',
        desc: '流程步骤',
        path: '/expense/travel/teller/{processid}/step',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
]
