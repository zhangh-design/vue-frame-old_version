/**
 * 项目投标 api 文档接口 领域模型
 */
export default [
    {
        name: 'readFinancePage',
        method: 'GET',
        desc: '获取项目投标-财务付款-分页',
        path: '/project/tender/finance/page',
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
        path: '/project/tender/finance/{processid}/step',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
    {
        name: 'readDetail',
        method: 'GET',
        desc: '获取包详情',
        path: '/project/tender/finance/detail/{processid}/page',
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
        name: 'doSubmitFinance',
        method: 'POST',
        desc: '提交',
        path: '/project/tender/finance/{processid}/submit',
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
        name: 'doSaveFinance',
        method: 'POST',
        desc: '保存',
        path: '/project/tender/finance/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: '',
            id: '',
            name: '',
            code: '',
            area: '',
            org: '',
            proxyorg: '',
            buytime: '',
            tendertime: '',
            deptcode: '',
            deptname: '',
            oprtid: '',
            oprtname: '',
            paymentnum:'',
            paymentfile:'',
            dirty: true
        }
    },
    {
        name: 'doRejectFinance',
        method: 'POST',
        desc: '回退',
        path: '/project/tender/finance/{processid}/reject',
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
        name: 'readBidsfilePage',
        method: 'GET',
        desc: '包信息-获取上传招标附件列表',
        path: '/project/tender/finance/detail/{processid}/{id}/bids/page',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            id: '',
            page_page: 0,
            page_size: 30
        }
    },
    {
        name: 'readTenderfilePage',
        method: 'GET',
        desc: '包信息-获取上传投标附件列表',
        path: '/project/tender/finance/detail/{processid}/{id}/tender/page',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            id: '',
            page_page: 0,
            page_size: 30
        }
    },
    {
        name: 'readPayFilePage',
        method: 'GET',
        desc: '获取得付款凭证附件列表',
        path: '/project/tender/finance/{processid}/{id}/paymentfile/page',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            id:'',
            processid: '',
            page_page: 0,
            page_size: 30
        }
    },
    {
        name: 'deletePayFile',
        method: 'DELETE',
        desc: '删除',
        path: '/project/tender/finance/{processid}/{id}/paymentfile',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            id:'',
            processid: '',
            name: ''
        }
    },
    {
        name: 'getfinanceDetail',
        method: 'GET',
        desc: '获取申请详情',
        path: '/project/tender/finance/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: ''
        }
    },
    {
        name: 'getTenderPageDetail',
        method: 'GET',
        desc: '获取包详情',
        path: '/project/tender/finance/detail/{processid}/{id}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            id: '',
        }
    },
]