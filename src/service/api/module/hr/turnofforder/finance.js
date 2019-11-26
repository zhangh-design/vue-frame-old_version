/**
 * 员工离职 财务部审核
 */
export default [
	{
        name: 'readFinancePage',
        method: 'GET',
        desc: '员工离职 财务部审核-分页',
        path: '/hr/turnofforder/finance/page',
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
        name: 'saveFinance',
        method: 'POST',
        desc: '保存',
        path: '/hr/turnofforder/finance/{processid}',
        mockPath: '',
        headers: ['token'],
        restful: true,
        params: {
            token: '',
            dirty: true,
            finance: '',
            consttime: '',
            financeinfo: '',
            consts: 0,
            id: '',
            processid: '',
        }
    },
	{
        name: 'submitFinance',
        method: 'POST',
        desc: '提交',
        path: '/hr/turnofforder/finance/{processid}/submit',
        mockPath: '',
        headers: ['token'],
        restful: true,
        params: {
            token: '',
            processid: '',
            advice: '',
        }
    },
    {
        name: 'rejectFinance',
        method: 'POST',
        desc: '回退',
        path: '/hr/turnofforder/finance/{processid}/reject',
        mockPath: '',
        headers: ['token'],
        restful: true,
        params: {
            token: '',
            processid: '',
            advice: '',
        }
    },
    {
        name: 'doStep',
        method: 'GET',
        desc: '流程步骤',
        path: '/hr/turnofforder/finance/{processid}/step',
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
        path: '/hr/turnofforder/finance/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
]