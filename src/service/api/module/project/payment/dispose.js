/**
 * 项目回款 api 文档接口 领域模型
 */
export default[
    {
        name: 'readDisposePage',
        method: 'GET',
        desc: '获取项目回款-申请-分页',
        path: '/project/payment/dispose/page',
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
        path: '/project/payment/dispose/{processid}/step',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
    {
        name: 'getDisposeDetail',
        method: 'GET',
        desc: '获取项目回款-认领-取得',
        path: '/project/payment/dispose/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: ''
        }
    },
    {
        name: 'readProjectPage',
        method: 'GET',
        desc: '获取项目回款-申请-分页',
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
        name: 'doRejectDispose',
        method: 'POST',
        desc: '回退',
        path: '/project/payment/dispose/{processid}/reject',
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
        name: 'doSaveDispose',
        method: 'POST',
        desc: '保存',
        path: '/project/payment/dispose/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: '',
            id: '',
            amount: '',
            projectid:'',
            projectname:'',
            organization: '',
            leadtime: '',
            info: '',
            dirty: true
        }
    },
    {
        name: 'doSubmitDispose',
        method: 'POST',
        desc: '提交',
        path: '/project/payment/dispose/{processid}/submit',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            // projectid:'',
            // projectname:'',
            advice: '',
        }
    },
    {
        name: 'getDept',
        method: 'GET',
        desc: '承建部门列表',
        path: '/project/common/project/dept',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
        }
    },
]