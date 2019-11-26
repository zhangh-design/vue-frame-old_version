/**
 * 上级审核 api 文档接口 领域模型
 */
export default [
    {
        name: 'readSuperiorPage',
        method: 'GET',
        desc: '获取项目-上级审核-分页',
        path: '/project/invoice/superior/page',
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
        path: '/project/invoice/superior/{processid}/step',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
    {
        name: 'doSubmitApply',
        method: 'POST',
        desc: '获取项目-上级审核-提交',
        path: '/project/invoice/superior/{processid}/submit',
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
        name: 'doRejectApply',
        method: 'POST',
        desc: '获取项目-上级审核-回退',
        path: '/project/invoice/superior/{processid}/reject',
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
        name: 'readFinanceFilePage',
        method: 'GET',
        desc: '财务开票-开票附件分页',
        path: '/project/invoice/superior/{processid}/accessor/page',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            page_page: 0,
            page_size: 30
        },
        validator:{
            page_page: {required: true,type: Number,sqlxss: true,not: '', msg: 'page_page不能为空!'},
            page_size: {required: true,type: Number,sqlxss: true,not: '', msg: 'page_size不能为空!'}
        }
    },
    {
        name: 'getSuperiorDetail',
        method: 'GET',
        desc: '项目开票-详情',
        path: '/project/invoice/superior/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    }
]