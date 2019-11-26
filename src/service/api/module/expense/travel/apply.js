export default [
    {
        name: 'readApplyPage',
        method: 'GET',
        desc: '获取合同会签-申请-分页',
        path: '/expense/travel/apply/page',
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
        name: 'readApplyDetailPage',
        method: 'GET',
        desc: '获取行程详细-申请-分页',
        path: '/expense/travel/apply/detail/{processid}/page',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            page_page: 0,
            page_size: 30
        },
        validator: {
            page_page: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_page不能为空!'},
            page_size: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_size不能为空!'}
        }
    },
    {
        name: 'readApplySubsidyPage',
        method: 'GET',
        desc: '获取出差补贴-申请-分页',
        path: '/expense/travel/apply/subsidy/{processid}/page',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
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
        path: '/expense/travel/apply/',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
            projectid: '',
            projectname: '',
            reasons: '',
            begintime: '',
            howday: '',
            pay: '',

        }
    },
    {
        name: 'insertApplyDetail',
        method: 'POST',
        desc: '新增',
        path: '/expense/travel/apply/detail/{processid}',
        mockPath: '',
        headers: ['token'],
        restful: true,
        params: {
            token: '',
            processid: '',
            pid: '',
            startaddress: '',
            targetaddress: '',
            starttime: '',
            endtime: '',
            sort: '',
            vehicle: '',
            pay: '',
            remark: ''
        }
    },
    {
        name: 'insertApplySubsidy',
        method: 'POST',
        desc: '新增',
        path: '/expense/travel/apply/subsidy/{processid}',
        mockPath: '',
        headers: ['token'],
        restful: true,
        params: {
            token: '',
            processid: '',
            pid: '',
            address: '',
            howday: '',
            expense: '',
            roomexpense: '',
            roomnum: '',
            vehicleexpense: '',
            vehiclenum: '',
            otherexpense: '',
            othernum: '',
            remark: '',
        }
    },
    {
        name: 'doSaveApply',
        method: 'POST',
        desc: '保存',
        path: '/expense/travel/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            id: '',
            processid: '',
            token: '',
            projectid: '',
            projectname: '',
            reasons: '',
            begintime: '',
            howday: '',
            pay: '',
            dirty: true
        }
    },
    {
        name: 'doSaveApplyDetail',
        method: 'PUT',
        desc: '保存',
        path: '/expense/travel/apply/detail/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            id: '',
            processid: '',
            token: '',
            pid: '',
            startaddress: '',
            targetaddress: '',
            starttime: '',
            endtime: '',
            sort: '',
            vehicle: '',
            pay: '',
            remark: '',
            dirty: true
        }
    },
    {
        name: 'doSaveApplySubsidy',
        method: 'PUT',
        desc: '保存',
        path: '/expense/travel/apply/subsidy/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            id: '',
            processid: '',
            token: '',
            pid: '',
            address: '',
            howday: '',
            expense: '',
            roomexpense: '',
            roomnum: '',
            vehicleexpense: '',
            vehiclenum: '',
            otherexpense: '',
            othernum: '',
            remark: '',
            dirty: true
        }
    },
    {
        name: 'readApplyDetail',
        method: 'GET',
        desc: '获取行程明细列表',
        path: '/expense/travel/apply/detail/{processid}/page',
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
        name: 'readSubsidyDetail',
        method: 'GET',
        desc: '获取行程明细列表',
        path: '/expense/travel/apply/subsidy/{processid}/page',
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
        name: 'doSubmitApply',
        method: 'POST',
        desc: '提交',
        path: '/expense/travel/apply/{processid}/submit',
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
        name: 'deleteApply',
        method: 'DELETE',
        desc: '删除',
        path: '/expense/travel/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: ''
        }
    },
    {
        name: 'getApply',
        method: 'GET',
        desc: '取得',
        path: '/expense/travel/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: ''
        }
    },
    {
        name: 'deleteApplyDetail',
        method: 'DELETE',
        desc: '删除',
        path: '/expense/travel/apply/detail/{processid}/{id}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            id: '',
            token: ''
        }
    },
    {
        name: 'deleteApplySubsidy',
        method: 'DELETE',
        desc: '删除',
        path: '/expense/travel/apply/subsidy/{processid}/{id}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            id: '',
            token: ''
        }
    },
    {
        name: 'getApplyDetail',
        method: 'GET',
        desc: '申请-详情',
        path: '/expense/travel/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: ''
        }
    },
    {
        name: 'getTravelDetail',
        method: 'GET',
        desc: '行程明细-详情',
        path: '/expense/travel/apply/detail/{processid}/{id}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            id: '',
            token: ''
        }
    },
    {
        name: 'getSubsidyDetail',
        method: 'GET',
        desc: '出差补贴-详情',
        path: '/expense/travel/apply/subsidy/{processid}/{id}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            id: '',
            token: ''
        }
    },
    {
        name: 'doStep',
        method: 'GET',
        desc: '流程步骤',
        path: '/expense/travel/apply/{processid}/step',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
    {
        name: 'getBuyApplyforPage',
        method: 'GET',
        desc: '获取物质采购申请列表 (grid列表请求url)',
        path: '/buy/common/applyfor/page',
        headers: ['token'], //如果url不需要headers参数，则headers可以不写
        mockPath: '',
        params: {
            token:'',
            projectname: '',
            paytime1: '',
            paytime2: '',
            page_page: '',
            page_size: ''
        }
    },
    {
        name: 'getProjectPage',
        method: 'GET',
        desc: '获取项目列表 (grid列表请求url)',
        path: '/project/common/project/page',
        headers: ['token'], //如果url不需要headers参数，则headers可以不写
        mockPath: '',
        params: {
            token:'',
            name: '',
            deptcode: '',
            managername: '',
            begintime1: '',
            begintime2: '',
            page_page: '',
            page_size: ''
        }
    }
]
