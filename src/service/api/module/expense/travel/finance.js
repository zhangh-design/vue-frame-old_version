export default [
    {
        name: 'readFinancePage',
        method: 'GET',
        desc: '获取合同会签-申请-分页',
        path: '/expense/travel/finance/page',
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
        name: 'readFinanceDetailPage',
        method: 'GET',
        desc: '获取行程详细-申请-分页',
        path: '/expense/travel/finance/detail/{processid}/page',
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
        name: 'readFinanceSubsidyPage',
        method: 'GET',
        desc: '获取出差补贴-申请-分页',
        path: '/expense/travel/finance/subsidy/{processid}/page',
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
        name: 'doSubmitFinance',
        method: 'POST',
        desc: '提交',
        path: '/expense/travel/finance/{processid}/submit',
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
        name: 'doRejectFinance',
        method: 'POST',
        desc: '提交',
        path: '/expense/travel/finance/{processid}/reject',
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
        name: 'getFinanceDetail',
        method: 'GET',
        desc: '项目负责人审批-详情',
        path: '/expense/travel/finance/{processid}',
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
        path: '/expense/travel/finance/{processid}/step',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
]
