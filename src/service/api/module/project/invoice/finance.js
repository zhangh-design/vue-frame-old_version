/**
 * 财务开票 api 文档接口 领域模型
 */
export default [
    {
        name: 'readFinancePage',
        method: 'GET',
        desc: '获取项目-财务开票-分页',
        path: '/project/invoice/finance/page',
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
        path: '/project/invoice/finance/{processid}/step',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
    {
        name: 'doSaveFinance',
        method: 'POST',
        desc: '保存',
        path: '/project/invoice/finance/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            projectid: '',
            projectname:'',
            amount: '',
            info: '',
            remark: '',
            id: '',
            accessory: '',
            dirty: true,
            invoicetime:''
        }
    },
    {
        name: 'doSubmitFinance',
        method: 'POST',
        desc: '提交',
        path: '/project/invoice/finance/{processid}/submit',
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
        name: 'doRejectFinance',
        method: 'POST',
        desc: '拒绝',
        path: '/project/invoice/finance/{processid}/reject',
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
        name: 'readFinanceFilePage',
        method: 'GET',
        desc: '财务开票-开票附件分页',
        path: '/project/invoice/finance/{processid}/accessor/page',
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
        name: 'deleteFinanceFile',
        method: 'DELETE',
        desc: '删除',
        path: '/project/invoice/finance/{processid}/accessor',
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
        name: 'getFinanceDetail',
        method: 'GET',
        desc: '项目开票-详情',
        path: '/project/invoice/finance/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    }
]