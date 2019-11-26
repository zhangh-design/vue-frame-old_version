/**
 * 采购申请采购 api 文档接口 领域模型
 */
export default [
    {
        name: 'readProjectPage',
        method: 'GET',
        desc: '项目列表查询-申请-分页',
        path: '/project/common/project/page',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
            name: '',
            begintime1:'',
            begintime2: '',
            deptcode: '',
            managername: '',
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
        path: '/buy/orders/dispose/{processid}/step',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
    {
        name: 'readDisposePage',
        method: 'GET',
        desc: '获取项目回款-申请-分页',
        path: '/buy/orders/dispose/page',
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
        name: 'readDetail',
        method: 'GET',
        desc: '项目列表查询-申请-分页',
        path: '/buy/orders/dispose/detail/{processid}/page',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid:'',
            page_page: 0,
            page_size: 30
        },
        validator: {
            page_page: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_page不能为空!'},
            page_size: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_size不能为空!'}
        }
    },
    {
        name: 'getPackDetail',
        method: 'GET',
        desc: '取得',
        path: '/buy/orders/dispose/detail/{processid}/{id}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            id:'',
            token: ''
        }
    },
    {
        name: 'updateDetail',
        method: 'PUT',
        desc: '包信息-修改',
        path:'/buy/orders/dispose/detail/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: '',
            id: '',
            pid: '',
            name: '',
            payamount:'',
            amounttotal:'',
            sort: '',
            num: '',
            amount: '',
            amounttotal: '',
            remark: '',
            dirty: true
        }
    },
    {
        name: 'doSaveDispose',
        method: 'POST',
        desc: '保存',
        path: '/buy/orders/dispose/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: '',
            id: '',
            projectid: '',
            projectname: '',
            name:'',
            info: '',
            sort: '',
            amount: '',
            payamount: '',
            financepay: '',
            payinfo: '',
            dirty: true
        }
    },
    {
        name: 'doSubmitDispose',
        method: 'POST',
        desc: '提交',
        path: '/buy/orders/dispose/{processid}/submit',
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
        path: '/buy/orders/dispose/{processid}/reject',
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
        name: 'getDisposeDetail',
        method: 'GET',
        desc: '获取申请详情',
        path: '/buy/orders/dispose/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: ''
        }
    },
    {
        name: 'readTicketPage',
        method: 'GET',
        desc: '财务开票-开票附件分页',
        path: '/buy/orders/dispose/{processid}/invoice/page',
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
        name: 'readPayPage',
        method: 'GET',
        desc: '财务开票-开票附件分页',
        path: '/buy/orders/dispose/{processid}/paycert/page',
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
]
