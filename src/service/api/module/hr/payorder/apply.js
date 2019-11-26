
/**
 * 员工薪资调整申请 api 文档接口 领域模型
 */
export default [
    {
        name: 'readApplyPage',
        method: 'GET',
        desc: '获取员工信息管理-分页',
        path: '/hr/payorder/apply/page',
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
        path: '/hr/payorder/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: ''
        }
    },
    {
        name: 'doStep',
        method: 'GET',
        desc: '流程步骤',
        path: '/hr/payorder/apply/{processid}/step',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
    {
        name: 'readUserPage',
        method: 'GET',
        desc: '获取员工信息管理-分页',
        path: '/hr/payorder/apply/person/page',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
            name: '',
            deptname: '',
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
        path: '/hr/payorder/apply/',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
            personid:'',
            personcode: '',
            personname: '',
            deptname: '',
            deptcode: '',
            // paytime: '',
            changedtime: '',
            reason: '',
            remark: '',
        }
    },
    {
        name: 'doSaveApply',
        method: 'POST',
        desc: '保存',
        path: '/hr/payorder/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            id: '',
            payid: '',
            personid:'',
            personcode: '',
            personname: '',
            deptname: '',
            deptcode: '',
            // paytime: '',
            changedtime: '',
            reason: '',
            remark: '',
            dirty: true,
        }
    },
    {
        name: 'doSubmitApply',
        method: 'POST',
        desc: '提交',
        path: '/hr/payorder/apply/{processid}/submit',
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
        path: '/hr/payorder/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: ''
        }
    },
    {
        name: 'savePay',
        method: 'POST',
        desc: '保存薪资',
        path: '/hr/payorder/apply/pay/{person_id}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            person_id: '',
            personid: '',
            personname: '',
            socialbase: '',
            basepay: '',
            meritpay: '',
            commsub: '',
            trafficsub: '',
            homesub: '',
            otherpay: '',
            homepay: '',
            socialpay: '',
            substitute: '',
            nohome: '',
            nosocial: '',
            reason: '',
            remark: '',
            id: '',	//员工(PayOder) payid
            pid: '',//员工(PayOder) id
        }
    },
    {
        name: 'readPayList',
        method: 'GET',
        desc: '薪资信息',
        path: '/hr/payorder/apply/pay/{personid}/history/list',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            personid: '',
        }
    },
    {
        name: 'readPay',
        method: 'GET',
        desc: '薪资信息-取得',
        path: '/hr/payorder/apply/pay/{processid}/list',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    }
]