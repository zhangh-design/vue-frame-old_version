export default [
    {
        name: 'readSuperiorPage',
        method: 'GET',
        desc: '获取合同会签-申请-分页',
        path: '/project/workload/superior/page',
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
        path: '/project/workload/superior/{processid}/step',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
    {
        name: 'readWorkloadDetail',
        method: 'GET',
        desc: '获取包详情列表',
        path: '/project/workload/superior/detail/{processid}/page',
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
        name: 'doSaveSuperior',
        method: 'POST',
        desc: '保存',
        path: '/project/workload/superior/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            id:'',
            processid: '',
            token: '',
            projectid:'',
            projectname:'',
            deptcode: '',
            deptname: '',
            workerid: '',
            workername: '',
            rate:'',
            worktime: '',
            workload: '',
            rate:'',
            dirty: true
        }
    },
    {
        name: 'doSubmitSuperior',
        method: 'POST',
        desc: '提交',
        path: '/project/workload/superior/{processid}/submit',
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
        name: 'doRejectSuperior',
        method: 'POST',
        desc: '回退',
        path: '/project/workload/superior/{processid}/reject',
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
        name: 'getSuperiorDetail',
        method: 'GET',
        desc: '项目报工-上级审批-详情',
        path: '/project/workload/superior/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: ''
        }
    },
]