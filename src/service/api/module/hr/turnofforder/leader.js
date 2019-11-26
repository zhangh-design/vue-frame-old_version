/**
 * 员工离职 部门领导审核
 */
export default [
	{
        name: 'readLeaderPage',
        method: 'GET',
        desc: '员工离职 上级审核-分页',
        path: '/hr/turnofforder/leader/page',
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
        name: 'submitLeader',
        method: 'POST',
        desc: '提交',
        path: '/hr/turnofforder/leader/{processid}/submit',
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
        name: 'rejectLeader',
        method: 'POST',
        desc: '回退',
        path: '/hr/turnofforder/leader/{processid}/reject',
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
        path: '/hr/turnofforder/leader/{processid}/step',
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
        path: '/hr/turnofforder/leader/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
]