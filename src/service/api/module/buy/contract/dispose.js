export default [
    {
        name: 'doStep',
        method: 'GET',
        desc: '流程步骤',
        path: '/buy/contract/dispose/{processid}/step',
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
        desc: '取得',
        path: '/buy/contract/dispose/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: ''
        }
    },
    {
        name: 'readDisposePage',
        method: 'GET',
        desc: '获取物质合同会签-经营部会签-分页',
        path: '/buy/contract/dispose/page',
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
        name: 'doSaveDispose',
        method: 'POST',
        desc: '保存',
        path: '/buy/contract/dispose/{processid}',
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
            signtime: '',
            expiretime: '',
            stamptime: '',
            printnum: '',
            accessory: '',
            dirty: true
        }
    },
    {
        name: 'doSubmitDispose',
        method: 'POST',
        desc: '提交',
        path: '/buy/contract/dispose/{processid}/submit',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            advice: '',
        },
    },
    {
        name: 'doRejectDispose',
        method: 'POST',
        desc: '回退',
        path: '/buy/contract/dispose/{processid}/reject',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            advice: '',
        },
        validator: {
            advice: {type: String, sqlxss: true, not: '', msg: '意见字段格式有问题!'}
        }
    },

    {
        name: 'readContractAccessorPage',
        method: 'GET',
        desc: '获取合同附件列表',
        path: '/buy/contract/dispose/{processid}/accessor/page',
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
        desc: '删除合同附件列表',
        path: '/buy/contract/dispose/{processid}/accessor',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            name: ''
        }
    },
]
