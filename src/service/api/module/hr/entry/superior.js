
/**
 * 员工入职上级审批 api 文档接口 领域模型
 */
export default [
    {
        name: 'readSuperiorPage',
        method: 'GET',
        desc: '获取员工信息管理-分页',
        path: '/hr/entry/superior/page',
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
        name: 'getSuperiorDetail',
        method: 'GET',
        desc: '获取申请详情',
        path: '/hr/entry/superior/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: ''
        }
    },
    {
        name: 'readUserFilePage',
        method: 'GET',
        desc: '获取得简历附件列表',
        path: '/hr/entry/superior/{processid}/accessor/page',
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
        name: 'doSubmitSuperior',
        method: 'POST',
        desc: '提交',
        path: '/hr/entry/superior/{personid}/submit',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            personid:'',
            processid: '',
            advice: '',
        }
    },
    {
        name: 'doRejectSuperior',
        method: 'POST',
        desc: '回退',
        path: '/hr/entry/superior/{processid}/reject',
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
        name: 'doStep',
        method: 'GET',
        desc: '流程步骤',
        path: '/hr/entry/superior/{processid}/step',
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
        desc: '获取申请详情',
        path: '/hr/entry/superior/pay/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: ''
        }
    },
]