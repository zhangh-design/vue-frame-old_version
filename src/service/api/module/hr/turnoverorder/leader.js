
/**
 * 员工入职上级审批 api 文档接口 领域模型
 */
export default [
    {
        name: 'readLeaderPage',
        method: 'GET',
        desc: '获取员工信息管理-分页',
        path: '/hr/turnoverorder/leader/page',
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
        name: 'getLeaderDetail',
        method: 'GET',
        desc: '获取申请详情',
        path: '/hr/turnoverorder/leader/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: ''
        }
    },
    {
        name: 'doSubmitLeader',
        method: 'POST',
        desc: '提交',
        path: '/hr/turnoverorder/leader/{pid}/submit',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            pid:'',
            processid: '',
            advice: '',
        }
    },
    {
        name: 'doRejectLeader',
        method: 'POST',
        desc: '回退',
        path: '/hr/turnoverorder/leader/{processid}/reject',
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
        name: 'doSaveLeader',
        method: 'POST',
        desc: '保存',
        path: '/hr/turnoverorder/leader/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: '',
            id: '',
            sort:'',
            positivetime:'',
            remark: '',
            dirty: true,
        }
    },
    {
        name: 'doStep',
        method: 'GET',
        desc: '流程步骤',
        path: '/hr/turnoverorder/leader/{processid}/step',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
]