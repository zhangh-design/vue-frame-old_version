export default [
    {
        name: 'readApplyPage',
        method: 'GET',
        desc: '获取合同会签-申请-分页',
        path: '/project/contract/apply/page',
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
        path: '/project/contract/apply/{processid}/step',
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
        path: '/project/contract/apply/',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
            code:'',
            name: '',
            amount: '',
            customerunit: '',
            manager: '',
            deptcode: '',
            deptname: '',
            accessory: '',
            tenderDetail: '1',
        }
    },
    {
        name: 'readTenderDetail',
        method: 'GET',
        desc: '获取包详情列表',
        path: '/project/contract/apply/tender/{processid}/page',
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
        path: '/project/contract/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            id:'',
            processid: '',
            token: '',
            code:'',
            name: '',
            amount: '',
            customerunit: '',
            manager: '',
            deptcode: '',
            deptname: '',
            accessory: '',
            dirty: true
        }
    },
    {
        name: 'doSubmitApply',
        method: 'POST',
        desc: '提交',
        path: '/project/contract/apply/{processid}/submit',
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
        path: '/project/contract/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: ''
        }
    },
    {
        name: 'readContractFilePage',
        method: 'GET',
        desc: '获取上传招标附件列表',
        path: '/project/contract/apply/{processid}/accessor/page',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
           // id: '',
            page_page: 0,
            page_size: 30
        }
    },
    {
        name: 'deleteContractFile',
        method: 'DELETE',
        desc: '删除上传招标附件列表',
        path: '/project/contract/apply/{processid}/accessor',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            name: ''
        }
    },
    {
        name: 'insertTender',
        method: 'POST',
        desc: '关联招标-新增',
        path: '/project/contract/apply/tender/{processid}',
        mockPath: '',
        headers: ['token'],
        restful: true,
        params: {
            token: '',
            processid: '',
            pid: '',    //合同id
            tenderdetail: ''
        }
    },
    {
        name: 'deleteTender',
        method: 'DELETE',
        desc: '关联招标-删除',
        path: '/project/contract/apply/tender/{processid}/{id}',
        mockPath: '',
        headers: ['token'],
        restful: true,
        params: {
            token: '',
            processid: '',
            id: '',
        }
    },
    {
        name: 'readTenderPage',
        method: 'GET',
        desc: '关联招标-招标包ID-中标列表查询',
        path: '/project/common/tender/page',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
            page_page: 0,
            page_size: 30,
            org: '',
            tendertime1: '',
            tendertime2: '',
            deptcode: '',
            oprtname: ''
        }
    },
    {
        name: 'readTenderDept',
        method: 'GET',
        desc: '关联招标-招标包ID-经办部门列表',
        path: '/project/common/tender/dept',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
            page_page: 0,
            page_size: 30,
        }
    },
    {
        name: 'readCustomers',
        method: 'GET',
        desc: '客户单位列表',
        path: '/project/common/contract/customers',
        mockPath: '',
        headers: ['token'],
        params: {
            token: ''
        }
    },
    {
        name: 'getApplyDetail',
        method: 'GET',
        desc: '获取申请详情',
        path: '/project/contract/apply/{processid}',
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
        path: '/project/contract/apply/tender/{processid}/{id}',
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