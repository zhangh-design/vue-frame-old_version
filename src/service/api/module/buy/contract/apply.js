export default [
    {
        name: 'doStep',
        method: 'GET',
        desc: '流程步骤',
        path: '/buy/contract/apply/{processid}/step',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
    {
        name: 'readContractAccessorPage',
        method: 'GET',
        desc: '获取合同附件列表',
        path: '/buy/contract/apply/{processid}/accessor/page',
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
        name: 'readApplyPage',
        method: 'GET',
        desc: '获取物质合同会签-申请-分页',
        path: '/buy/contract/apply/page',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
            page_page: 0,
            page_size: 30
        },
        validator: {
            page_page: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_page不能为空!'},
            page_size: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_size不能为空!'}
        }
    },
    {
        name: 'insertApply',
        method: 'POST',
        desc: '新增',
        path: '/buy/contract/apply/',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
            projectid: '',
            projectname: '',
            applyid: '',
            code: '',
            name: '',
            sort: '',
            amount: '',
            org: '',
            deptcode: '',
            deptname: ''
        }
    },
    {
        name: 'doSaveApply',
        method: 'POST',
        desc: '保存',
        path: '/buy/contract/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            id: '',
            token: '',
            processid: '',
            projectid: '',
            projectname: '',
            applyid: '',
            code: '',
            name: '',
            sort: '',
            amount: '',
            org: '',
            deptcode: '',
            deptname: '',
            dirty: true
        }
    },
    {
        name: 'doSubmitApply',
        method: 'POST',
        desc: '提交',
        path: '/buy/contract/apply/{processid}/submit',
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
        name: 'getDetail',
        method: 'GET',
        desc: '取得',
        path: '/buy/contract/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: ''
        }
    },
    {
        name: 'deleteApply',
        method: 'DELETE',
        desc: '删除',
        path: '/buy/contract/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: ''
        }
    },
]
