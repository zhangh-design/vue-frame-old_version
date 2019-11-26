/**
 * 项目回款 api 文档接口 领域模型
 */
export default[
    {
    name: 'readApplyPage',
    method: 'GET',
    desc: '获取项目回款-申请-分页',
    path: '/project/payment/apply/page',
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
        path: '/project/payment/apply/{processid}/step',
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
        desc: '获取项目回款-收款信息导入-取得',
        path: '/project/payment/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: ''
        }
    },
    {
        name: 'insertApply',
        method: 'POST',
        desc: '新增',
        path: '/project/payment/apply/',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
            amount: '',
            organization: '',
            leadtime: '',
            info: ''
        }
    },
    {
        name: 'doSaveApply',
        method: 'POST',
        desc: '保存',
        path: '/project/payment/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: '',
            id: '',
            amount: '',
            organization: '',
            leadtime: '',
            info: '',
            dirty: true
        }
    },
    {
        name: 'doSubmitApply',
        method: 'POST',
        desc: '提交',
        path: '/project/payment/apply/{processid}/submit',
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
        path: '/project/payment/apply/{processid}/reject',
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
        name: 'deleteApply',
        method: 'DELETE',
        desc: '删除',
        path: '/project/payment/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: ''
        }
    },
    {
        name: 'readDetail',
        method: 'GET',
        desc: '获取包详情',
        path: '/project/payment/apply/tender/{processid}/page',
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
]