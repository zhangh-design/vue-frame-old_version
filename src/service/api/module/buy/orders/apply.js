/**
 * 采购申请 api 文档接口 领域模型
 */
export default [
    {
        name: 'getDetail',
        method: 'GET',
        desc: '取得',
        path: '/buy/orders/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: ''
        }
    },
    {
        name: 'getPackDetail',
        method: 'GET',
        desc: '取得',
        path: '/buy/orders/apply/detail/{processid}/{id}',
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
        name: 'getApplyDetail',
        method: 'GET',
        desc: '获取申请详情',
        path: '/buy/orders/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: ''
        }
    },
    {
        name: 'doStep',
        method: 'GET',
        desc: '流程步骤',
        path: '/buy/orders/apply/{processid}/step',
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
        path: '/buy/orders/apply/page',
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
        path: '/buy/orders/apply/',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
            projectid: '',
            projectname: '',
            name:'',
            info: '',
            sort: '',
            amount: '',
        }
    },
    {
        name: 'addDetail',
        method: 'POST',
        desc: '新增',
        path: '/buy/orders/apply/detail/{processid}',
        mockPath: '',
        headers: ['token'],
        restful: true,
        params: {
            token: '',
            processid:'',
            pid: '',
            name: '',
            sort: '',
            num: '',
            amount: '',
            amounttotal: '',
            remark: ''

        }
    },
    {
        name: 'doSaveApply',
        method: 'POST',
        desc: '保存',
        path: '/buy/orders/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: '',
            id: '',
            code:'',
            projectid: '',
            projectname: '',
            name:'',
            info: '',
            sort: '',
            amount: '',
            dirty: true
        }
    },
    {
        name: 'doSubmitApply',
        method: 'POST',
        desc: '提交',
        path: '/buy/orders/apply/{processid}/submit',
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
        path: '/buy/orders/apply/{processid}/reject',
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
        path: '/buy/orders/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: ''
        }
    },
    {
        name: 'deleteDetail',
        method: 'DELETE',
        desc: '删除',
        path: '/buy/orders/apply/detail/{processid}/{id}',
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
        path:'/buy/orders/apply/detail/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: '',
            id: '',
            pid: '',
            name: '',
            sort: '',
            num: '',
            amount: '',
            amounttotal: '',
            remark: '',
            dirty: true
        }
    },
    {
        name: 'readDetail',
        method: 'GET',
        desc: '项目列表查询-申请-分页',
        path: '/buy/orders/apply/detail/{processid}/page',
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
        name: 'readTicketPage',
        method: 'GET',
        desc: '财务开票-开票附件分页',
        path: '/buy/orders/apply/{processid}/invoice/page',
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
        path: '/buy/orders/apply/{processid}/paycert/page',
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
