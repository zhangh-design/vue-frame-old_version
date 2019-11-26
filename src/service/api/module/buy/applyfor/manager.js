/**
 * 项目投标 api 文档接口 领域模型
 */
export default [

    {
        name: 'doStep',
        method: 'GET',
        desc: '流程步骤',
        path: '/buy/applyfor/manager/{processid}/step',
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
        path: '/buy/applyfor/manager/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: ''
        }
    },
    {
        name: 'readManagerPage',
        method: 'GET',
        desc: '获取项目投标-申请-分页',
        path: '/buy/applyfor/manager/page',
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
        name: 'readItem',
        method: 'GET',
        desc: '获取包详情',
        path: '/buy/applyfor/manager/item/{processid}/page',
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
        name: 'doSubmitManager',
        method: 'POST',
        desc: '提交',
        path: '/buy/applyfor/manager/{processid}/submit',
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
        name: 'doRejectManager',
        method: 'POST',
        desc: '提交',
        path: '/buy/applyfor/manager/{processid}/reject',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            advice: '',
        },
        validator:{
            advice: {type: String,sqlxss: true,not: '', msg: '意见字段格式有问题!'}
        }
    },
]
