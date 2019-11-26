/**
 * 合同会签 上级审批 api 文档接口 领域模型
 */
export default [
    {
        name: 'readSuperiorPage',
        method: 'GET',
        desc: '获取项目会签-上级审批-分页',
        path: '/project/contract/superior/page',
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
        path: '/project/contract/superior/{processid}/step',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
    {
        name: 'doSubmitSuperior',
        method: 'post',
        desc: '项目会签-上级审批-流程提交',
        path: '/project/contract/superior/{processid}/submit',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            advice: ''
        },
        validator:{
            advice: {type: String,sqlxss: true, msg: 'advice参数异常!'},
        }
    },
    {
        name: 'doRejectSuperior',
        method: 'POST',
        desc: '项目会签-上级审批-流程回退',
        path: '/project/contract/superior/{processid}/reject',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            advice: ''
        },
        validator:{
            advice: {type: String,sqlxss: true, msg: 'advice参数异常!'},
        }
    },
    {
        name: 'readContractFilePage',
        method: 'GET',
        desc: '项目会签-上级审批-获取合同附件列表',
        path: '/project/contract/superior/{processid}/accessor/page',
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
        name: 'readSuperiorTenderPage',
        method: 'GET',
        desc: '获取项目会签-关联招标-分页',
        path: '/project/contract/superior/tender/{processid}/page',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            page_page: 0,
            page_size: 30
        },
        validator:{
            page_page: {required: true,type: Number,sqlxss: true,not: '', msg: 'page_page不能为空!'},
            page_size: {required: true,type: Number,sqlxss: true,not: '', msg: 'page_size不能为空!'}
        }
    },
    {
        name: 'readTenderDetail',
        method: 'GET',
        desc: '获取包详情列表',
        path: '/project/contract/superior/tender/{processid}/page',
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
        name: 'getSuperiorDetail',
        method: 'GET',
        desc: '获取申请详情',
        path: '/project/contract/superior/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: ''
        }
    },
    {
        name: 'getContractPageDetail',
        method: 'GET',
        desc: '获取包详情',
        path: '/project/contract/superior/tender/{processid}/{id}',
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