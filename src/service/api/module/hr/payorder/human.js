
/**
 * 薪资调整人事部备案 api 文档接口 领域模型
 */
export default [
    {
        name: 'readHumanPage',
        method: 'GET',
        desc: '获取员工信息管理-分页',
        path: '/hr/payorder/human/page',
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
        name: 'doSubmitHuman',
        method: 'POST',
        desc: '提交',
        path: '/hr/payorder/human/{processid}/submit',
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
        name: 'doRejectHuman',
        method: 'POST',
        desc: '回退',
        path: '/hr/payorder/human/{processid}/reject',
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
        name: 'getHumanDetail',
        method: 'GET',
        desc: '获取申请详情',
        path: '/hr/payorder/human/{processid}',
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
        path: '/hr/payorder/human/{processid}/step',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
    {
        name: 'readPayList',
        method: 'GET',
        desc: '薪资信息',
        path: '/hr/payorder/human/pay/{personid}/history/list',
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
        path: '/hr/payorder/human/pay/{processid}/list',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    }
]