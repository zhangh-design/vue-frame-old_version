/**
 * 项目投标 api 文档接口 领域模型
 */
export default [
    {
        name: 'readApplyPage',
        method: 'GET',
        desc: '获取项目投标-申请-分页',
        path: '/project/tender/apply/page',
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
        path: '/project/tender/apply/{processid}/step',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
    {
        name: 'getApplyDetail',
        method: 'GET',
        desc: '获取申请详情',
        path: '/project/tender/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: ''
        }
    },
    {
        name: 'readDetail',
        method: 'GET',
        desc: '获取包详情-列表',
        path: '/project/tender/apply/detail/{processid}/page',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            page_page: 0,
            page_size: 30
        }
    },
    {
        name: 'getTenderPageDetail',
        method: 'GET',
        desc: '获取包详情',
        path: '/project/tender/apply/detail/{processid}/{id}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            id: '',
        }
    },
    {
        name: 'insertApply',
        method: 'POST',
        desc: '新增',
        path: '/project/tender/apply/',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
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
            remark: '',
        }
    },
    {
        name: 'doSaveApply',
        method: 'POST',
        desc: '保存',
        path: '/project/tender/apply/{processid}',
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
            remark: '',
            dirty: true,
        }
    },
    {
        name: 'doSubmitApply',
        method: 'POST',
        desc: '提交',
        path: '/project/tender/apply/{processid}/submit',
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
        path: '/project/tender/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: ''
        }
    },
    {
        name: 'addDetail',
        method: 'POST',
        desc: '包信息-新增',
        path: '/project/tender/apply/detail/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: '',
            //id: '',
            pid: 0,
            code: '',
            packagenum: '',
            packagename: '',
            sort: '',
            plancost: 0,
            charge: 0,
            deposit: 0,
            cost: 0,
        }
    },
    {
        name: 'updateDetail',
        method: 'PUT',
        desc: '包信息-修改',
        path: '/project/tender/apply/detail/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: '',
            id: '',
            pid: 0,
            code: '',
            packagenum: '',
            packagename: '',
            sort: '',
            plancost: 0,
            charge: 0,
            deposit: 0,
            cost: 0,
            bidsfile: '',
            dirty: true
        }
    },
    {
        name: 'deleteDetail',
        method: 'DELETE',
        desc: '包信息-删除',
        path: '/project/tender/apply/detail/{processid}/{id}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            id: ''
        }
    },
    {
        name: 'readBidsfilePage',
        method: 'GET',
        desc: '包信息-获取上传招标附件列表',
        path: '/project/tender/apply/detail/{processid}/{id}/bids/page',
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
        name: 'deleteBidsfile',
        method: 'DELETE',
        desc: '包信息-删除上传招标附件',
        path: '/project/tender/apply/detail/{processid}/{id}/bids',
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
        name: 'readTenderfilePage',
        method: 'GET',
        desc: '包信息-获取上传投标附件列表',
        path: '/project/tender/apply/detail/{processid}/{id}/tender/page',
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
        path: '/project/tender/apply/{processid}/{id}/paymentfile/page',
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
]