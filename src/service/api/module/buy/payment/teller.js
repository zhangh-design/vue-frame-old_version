/**
 * 合同付款 api 文档接口 领域模型
 */
export default [
    {
        name: 'getDetail',
        method: 'GET',
        desc: '取得',
        path: '/buy/payment/teller/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: ''
        }
    },
    {
        name: 'readTellerPage',
        method: 'GET',
        desc: '获取项目回款-申请-分页',
        path: '/buy/payment/teller/page',
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
        name: 'insertTeller',
        method: 'POST',
        desc: '新增',
        path: '/buy/payment/teller/',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
            projectid: '',
            projectname: '',
            contractid: '',
            // ticketaccessory:'',
            // tickettime:'',
            amount: '',
            paytime: '',
            org: '',
            planamount: '',
            plantime: '',
            payaccessory: '',
        }
    },
    {
        name: 'doSaveTeller',
        method: 'POST',
        desc: '保存',
        path: '/buy/payment/teller/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            id: '',
            amount: '',
            paytime: '',
            payaccessory: '',
            dirty: true
        }
    },
    {
        name: 'doSubmitTeller',
        method: 'POST',
        desc: '提交',
        path: '/buy/payment/teller/{processid}/submit',
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
        name: 'doRejectTeller',
        method: 'POST',
        desc: '回退',
        path: '/buy/payment/teller/{processid}/reject',
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
        name: 'deleteTeller',
        method: 'DELETE',
        desc: '删除',
        path: '/buy/payment/teller/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: ''
        }
    },
    {
        name: 'readTellerFilePage',
        method: 'GET',
        desc: '财务开票-开票附件分页',
        path: '/buy/payment/teller/{processid}/payaccessory/page',
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
        name: 'deleteTellerFile',
        method: 'DELETE',
        desc: '删除',
        path: '/buy/payment/teller/{processid}/payaccessory',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            name: ''
        }
    },
    {
        name: 'readDisposeFilePage',
        method: 'GET',
        desc: '财务开票-开票附件分页',
        path: '/buy/payment/teller/{processid}/ticketaccessory/page',
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
        name: 'doStep',
        method: 'GET',
        desc: '流程步骤',
        path: '/buy/payment/teller/{processid}/step',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
]
