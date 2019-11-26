/**
 * 项目投标 api 文档接口 领域模型
 */
export default [
    {
        name: 'readDisposePage',
        method: 'GET',
        desc: '获取项目投标-投标处理-分页',
        path: '/project/tender/dispose/page',
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
        path: '/project/tender/dispose/{processid}/step',
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
        path: '/project/tender/dispose/detail/{processid}/page',
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
        name: 'addDetail',
        method: 'POST',
        desc: '包信息-新增',
        path: '/project/tender/dispose/detail/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: '',
            id:'',
            pid: 0,
            code: '',
            packagenum: '',
            packagename: '',
            sort: '',
            tenderfile:'',
            plancost: 0,
            charge: 0,
            deposit: 0,
            cost: 0,
            flag: ''
        }
    },
    {
        name: 'updateDetail',
        method: 'PUT',
        desc: '包信息-新增',
        path: '/project/tender/dispose/detail/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: '',
            id:'',
            pid: 0,
            code: '',
            packagenum: '',
            packagename: '',
            sort: '',
            tenderfile:'',
            plancost: 0,
            charge: 0,
            deposit: 0,
            cost: 0,
            flag: '',
            dirty: true
        }
    },
    {
        name: 'readsoloDetail',
        method: 'GET',
        desc: '取得获取包详情',
        path: '/project/tender/dispose/detail/{processid}/{id}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            id:'',
            page_page: 0,
            page_size: 30
        },
    },
    {
        name: 'doSubmitDispose',
        method: 'POST',
        desc: '提交',
        path: '/project/tender/dispose/{processid}/submit',
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
        path: '/project/tender/dispose/{processid}/reject',
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
        path: '/project/tender/dispose/detail/{processid}/{id}/bids/page',
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
        name: 'readTenderFilePage',
        method: 'GET',
        desc: '包信息-获取上传投标附件列表',
        path: '/project/tender/dispose/detail/{processid}/{id}/tender/page',
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
        name: 'deleteTenderFile',
        method: 'DELETE',
        desc: '包信息-删除投标招标附件',
        path: '/project/tender/dispose/detail/{processid}/{id}/tender',
        mockPath: '',
        removeInvalidChar: false,
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            id: '',
            name: ''
        }
    },
    {
        name: 'readPayFilePage',
        method: 'GET',
        desc: '获取得付款凭证附件列表',
        path: '/project/tender/dispose/{processid}/{id}/paymentfile/page',
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
        name: 'getDisposeDetail',
        method: 'GET',
        desc: '获取申请详情',
        path: '/project/tender/dispose/{processid}',
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
        path: '/project/tender/dispose/detail/{processid}/{id}',
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