/**
 * 合同付款 api 文档接口 领域模型
 */
export default[
    {
    name: 'readApplyPage',
    method: 'GET',
    desc: '获取项目回款-申请-分页',
    path: '/expense/account/apply/page',
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
        name: 'getApplyDetail',
        method: 'GET',
        desc: '获取申请详情',
        path: '/expense/account/apply/{processid}',
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
        path: '/expense/account/apply/',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
            projectid: '',
            projectname: '',
            begintime: '',
            pay:'',
            sort: '',
            remark: '',
            userid:'',
            username: '',
            deptcode: '',
            deptname:'',
        }
    },
    {
        name: 'doSaveApply',
        method: 'POST',
        desc: '保存',
        path: '/expense/account/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: '',
            id: '',
            projectid: '',
            projectname: '',
            begintime: '',
            pay:'',
            sort: '',
            remark: '',
            userid:'',
            username: '',
            deptcode: '',
            deptname:'',
            dirty: true
        }
    },
    {
        name: 'doSubmitApply',
        method: 'POST',
        desc: '提交',
        path: '/expense/account/apply/{processid}/submit',
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
        path: '/expense/account/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: ''
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
        name: 'readDetail',
        method: 'GET',
        desc: '获取包详情列表',
        path: '/expense/account/apply/detail/{processid}/page',
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
        name: 'deleteDetail',
        method: 'DELETE',
        desc: '删除包详情列表',
        path: '/expense/account/apply/detail/{processid}/{id}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            id:''
        }
    },
    {
        name: 'addDetail',
        method: 'POST',
        desc: '添加包详情列表',
        path: '/expense/account/apply/detail/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            begintime:'',
            sort:'',
            pay:'',
            num:'',
            remark:'',
            pid:''
        }
    },
    {
        name: 'saveDetail',
        method: 'PUT',
        desc: '添加包详情列表',
        path: '/expense/account/apply/detail/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            dirty:true,
            token: '',
            processid: '',
            begintime:'',
            sort:'',
            pay:'',
            num:'',
            id:'',
            remark:'',
            pid:''
        }
    },
    {
        name: 'accountsort',
        method: 'GET',
        desc: '获取费用类别列表',
        path: '/root/dict/accountsort',
        mockPath: '',
       // restful: true,
        headers: ['token'],
        params: {
            token: '',
        }
    },
    {
        name: 'doStep',
        method: 'GET',
        desc: '流程步骤',
        path: '/expense/account/apply/{processid}/step',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
]