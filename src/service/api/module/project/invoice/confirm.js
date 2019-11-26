/**
 * 申请人确认 api 文档接口 领域模型
 */
export default [
    {
        name: 'readConfirmPage',
        method: 'GET',
        desc: '申请人确认-分页',
        path: '/project/invoice/confirm/page',
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
        path: '/project/invoice/confirm/{processid}/step',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
    {
        name: 'doSubmitConfirm',
        method: 'POST',
        desc: '提交',
        path: '/project/invoice/confirm/{processid}/submit',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            advice: ''
        }
    },
    {
        name: 'doRejectCnfirm',
        method: 'POST',
        desc: '拒绝',
        path: '/project/invoice/confirm/{processid}/reject',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            advice: ''
        }
    },
    {
        name: 'readConfirmFilePage',
        method: 'GET',
        desc: '财务开票-开票附件分页',
        path: '/project/invoice/confirm/{processid}/accessor/page',
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
        name: 'getConfirmDetail',
        method: 'GET',
        desc: '项目开票-详情',
        path: '/project/invoice/confirm/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    }
]