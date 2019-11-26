/**
 * 合同会签 财务部审批 api 文档接口 领域模型
 */
export default [
    {
        name: 'readFinancePage',
        method: 'GET',
        desc: '获取项目会签-财务审批-分页',
        path: '/project/contract/finance/page',
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
        path: '/project/contract/finance/{processid}/step',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
    {
        name: 'readFinanceTenderPage',
        method: 'GET',
        desc: '获取包详情',
        path: '/project/common/tender/page',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
        //    processid: '',
            page_page: 0,
            page_size: 30
        }
    },
    {
        name: 'doSubmitFinance',
        method: 'POST',
        desc: '提交',
        path: '/project/contract/finance/{processid}/submit',
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
        name: 'doRejectFinance',
        method: 'POST',
        desc: '回退',
        path: '/project/contract/finance/{processid}/reject',
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
    {
        name: 'readBidsfilePage',
        method: 'GET',
        desc: '包信息-获取上传招标附件列表',
        path: '/project/contract/finance/{processid}/accessor/page',
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
        name: 'readTenderDetail',
        method: 'GET',
        desc: '获取包详情列表',
        path: '/project/contract/finance/tender/{processid}/page',
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
        name: 'getFinanceDetail',
        method: 'GET',
        desc: '获取申请详情',
        path: '/project/contract/finance/{processid}',
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
        path: '/project/contract/finance/tender/{processid}/{id}',
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