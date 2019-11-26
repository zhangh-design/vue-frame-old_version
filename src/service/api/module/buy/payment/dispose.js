/**
 * 合同付款 api 文档接口 领域模型
 */
export default [
    {
        name: 'getDetail',
        method: 'GET',
        desc: '取得',
        path: '/buy/payment/dispose/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: ''
        }
    },
    {
        name: 'readDisposePage',
        method: 'GET',
        desc: '获取项目回款-申请-分页',
        path: '/buy/payment/dispose/page',
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
        name: 'insertDispose',
        method: 'POST',
        desc: '新增',
        path: '/buy/payment/dispose/',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
            projectid: '',
            projectname: '',
            contractid: '',
            ticketaccessory: '',
            tickettime: '',
            //   amount:'',
            //    paytime:'',
            org: '',
            planamount: '',
            plantime: '',
            //    payaccessory:'',
        }
    },
    {
        name: 'doSaveDispose',
        method: 'POST',
        desc: '保存',
        path: '/buy/payment/dispose/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            tickettime: '',
            ticketaccessory: '',
            id: '',
            processid: '',
            dirty: true
        }
    },
    {
        name: 'doSubmitDispose',
        method: 'POST',
        desc: '提交',
        path: '/buy/payment/dispose/{processid}/submit',
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
        name: 'doRejectDispose',
        method: 'POST',
        desc: '回退',
        path: '/buy/payment/dispose/{processid}/reject',
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
        name: 'deleteDispose',
        method: 'DELETE',
        desc: '删除',
        path: '/buy/payment/dispose/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: ''
        }
    },
    {
        name: 'readDisposeFilePage',
        method: 'GET',
        desc: '财务收票-发票附件分页',
        path: '/buy/payment/dispose/{processid}/ticketaccessory/page',
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
        name: 'readTellerFilePage',
        method: 'GET',
        desc: '财务开票-付款附件分页',
        path: '/buy/payment/dispose/{processid}/payaccessory/page',
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
        name: 'deleteDisposeFile',
        method: 'DELETE',
        desc: '删除',
        path: '/buy/payment/dispose/{processid}/ticketaccessory',
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
        name: 'doStep',
        method: 'GET',
        desc: '流程步骤',
        path: '/buy/payment/dispose/{processid}/step',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
]
