/**
 * 合同付款 api 文档接口 领域模型
 */
export default [
    {
        name: 'getDetail',
        method: 'GET',
        desc: '取得',
        path: '/buy/payment/apply/{processid}',
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
        path: '/buy/payment/apply/{processid}/step',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
    {
        name: 'readApplyPage',
        method: 'GET',
        desc: '获取项目回款-申请-分页',
        path: '/buy/payment/apply/page',
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
        name: 'insertApply',
        method: 'POST',
        desc: '新增',
        path: '/buy/payment/apply/',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
            projectid: '',
            projectname: '',
            contractid: '',
            org: '',
            planamount: '',
            plantime: '',
        }
    },
    {
        name: 'doSaveApply',
        method: 'POST',
        desc: '保存',
        path: '/buy/payment/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: '',
            id: '',
            org: '',
            projectid: '',
            projectname: '',
            contractid: '',
            planamount: '',
            plantime: '',
            dirty: true
        }
    },
    {
        name: 'doSubmitApply',
        method: 'POST',
        desc: '提交',
        path: '/buy/payment/apply/{processid}/submit',
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
        name: 'doRejectApply',
        method: 'POST',
        desc: '回退',
        path: '/buy/payment/apply/{processid}/reject',
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
        name: 'deleteApply',
        method: 'DELETE',
        desc: '删除',
        path: '/buy/payment/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: ''
        }
    },
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
        name: 'readContractPage',
        method: 'GET',
        desc: '项目列表查询-申请-分页',
        path: '/buy/common/contract/page',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
            projectname: '',
            deptname: '',
            page_page: 0,
            page_size: 30
        },
        validator: {
            page_page: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_page不能为空!'},
            page_size: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_size不能为空!'}
        }
    },
    {
        name: 'readDisposeFilePage',
        method: 'GET',
        desc: '财务开票-发票附件分页',
        path: '/buy/payment/apply/{processid}/ticketaccessory/page',
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
        path: '/buy/payment/apply/{processid}/payaccessory/page',
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
