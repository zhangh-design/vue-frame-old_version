/**
 * 项目开票 api 文档接口 领域模型
 */
export default [
    {
        name: 'readApplyPage',
        method: 'GET',
        desc: '获取项目-申请-分页',
        path: '/project/invoice/apply/page',
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
        path: '/project/invoice/apply/{processid}/step',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
    {
        name: 'insertApply',
        method: 'POST',
        desc: '新增',
        path: '/project/invoice/apply/',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
            projectid: '',
            projectname:'',
            amount: '',
            info: '',
            remark: '',
        }
    },
    {
        name: 'doSaveApply',
        method: 'POST',
        desc: '保存',
        path: '/project/invoice/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            projectid: '',
            projectname:'',
            amount: '',
            info: '',
            remark: '',
            id: '',
            accessory: '',
            dirty: true
        }
    },
    {
        name: 'doSubmitApply',
        method: 'POST',
        desc: '提交',
        path: '/project/invoice/apply/{processid}/submit',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            advice: ''
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
            deptcode: '',
            managername: '',
            begintime1: '',
            begintime2: '',
            page_page: 0,
            page_size: 30
        },
        validator:{
            page_page: {required: true,type: Number,sqlxss: true,not: '', msg: 'page_page不能为空!'},
            page_size: {required: true,type: Number,sqlxss: true,not: '', msg: 'page_size不能为空!'}
        }
    },
    {
        name: 'deleteApply',
        method: 'DELETE',
        desc: '删除',
        path: '/project/invoice/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: ''
        }
    },
    {
        name: 'readInvoiceFilePage',
        method: 'GET',
        desc: '获取得上传开票附件列表',
        path: '/project/invoice/apply/{processid}/accessor/page',
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
        name: 'getApplyDetail',
        method: 'GET',
        desc: '项目开票-详情',
        path: '/project/invoice/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
]