export default [
    {
        name: 'doStep',
        method: 'GET',
        desc: '流程步骤',
        path: '/buy/contract/finance/{processid}/step',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
    {
        name: 'getDetail',
        method: 'GET',
        desc: '取得',
        path: '/buy/contract/finance/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: ''
        }
    },
    {
        name: 'readContractAccessorPage',
        method: 'GET',
        desc: '获取合同附件列表',
        path: '/buy/contract/finance/{processid}/accessor/page',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            // id: '',
            page_page: 0,
            page_size: 30
        }
    },
    {
        name: 'readFinancePage',
        method: 'GET',
        desc: '获取物质合同会签-经营部会签-分页',
        path: '/buy/contract/finance/page',
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
        name: 'doSubmitFinance',
        method: 'POST',
        desc: '提交',
        path: '/buy/contract/finance/{processid}/submit',
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
        path: '/buy/contract/finance/{processid}/reject',
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
]
