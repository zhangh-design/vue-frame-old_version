export default [
    {
        name: 'readApplyPage',
        method: 'GET',
        desc: '获取合同会签-申请-分页',
        path: '/project/workload/apply/page',
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
        path: '/project/workload/apply/{processid}/step',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
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
        name: 'insertApply',
        method: 'POST',
        desc: '新增',
        path: '/project/workload/apply/',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
            projectid:'',
            projectname:'',
            deptcode: '',
            deptname: '',
            workerid: '',
            workername: '',
            worktime: '',
            workload: '',
        }
    },
    {
        name: 'readWorkloadDetail',
        method: 'GET',
        desc: '获取包详情列表',
        path: '/project/workload/apply/detail/{processid}/page',
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
        name: 'doSaveApply',
        method: 'POST',
        desc: '保存',
        path: '/project/workload/apply/{processid}',
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
            worktime: '',
            workload: '',
            dirty: true
        }
    },
    {
        name: 'doSubmitApply',
        method: 'POST',
        desc: '提交',
        path: '/project/workload/apply/{processid}/submit',
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
        path: '/project/workload/apply/{processid}',
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
        path: '/project/workload/apply/detail/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: '',
            workloadid:'',
            taskname:'',
            totalload:'',
            loaded:'',
            overload:''
        }
    },
    {
        name: 'updateDetail',
        method: 'PUT',
        desc: '包信息-修改',
        mockPath: '',
        path: '/project/workload/apply/detail/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: '',
            workloadid: '',
            taskname:'',
            totalload:'',
            loaded:'',
            overload:'',
            id:'',
            dirty: true
        }
    },
    {
        name: 'deleteDetail',
        method: 'DELETE',
        desc: '包信息-删除',
        path: '/project/workload/apply/detail/{processid}/{id}',
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
        name: 'getApplyDetail',
        method: 'GET',
        desc: '项目报工-详情',
        path: '/project/workload/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: ''
        }
    },
    {
        name: 'getPageDetail',
        method: 'GET',
        desc: '项目报工-详情',
        path: '/project/workload/apply/detail/{processid}/{id}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            id: ''
        }
    },
]