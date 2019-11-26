/**
 * 项目回款 api 文档接口 领域模型
 */
export default[
    {
    name: 'readFinancePage',
    method: 'GET',
    desc: '获取项目回款-申请-分页',
    path: '/project/payment/finance/page',
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
        path: '/project/payment/finance/{processid}/step',
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
        desc: '获取项目回款-财务确认-取得',
        path: '/project/payment/finance/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: ''
        }
    },
    {
        name: 'doRejectFinance',
        method: 'POST',
        desc: '回退',
        path: '/project/payment/finance/{processid}/reject',
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
        name: 'doSubmitFinance',
        method: 'POST',
        desc: '提交',
        path: '/project/payment/finance/{processid}/submit',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            advice: '',
        }
    },
]