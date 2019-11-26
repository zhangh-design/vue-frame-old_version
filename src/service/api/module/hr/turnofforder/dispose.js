/**
 * 员工离职 任务交接
 */
export default [
	{
        name: 'readDisposePage',
        method: 'GET',
        desc: '员工离职 任务交接-分页',
        path: '/hr/turnofforder/dispose/page',
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
        name: 'saveDispose',
        method: 'POST',
        desc: '保存',
        path: '/hr/turnofforder/dispose/{processid}',
        mockPath: '',
        headers: ['token'],
        restful: true,
        params: {
            token: '',
            dirty: true,
            workshift: '',
            workshiftname: '',
            workshifttime: '',
            workinfo: '',
            id: '',
            processid: '',
        }
    },
	{
        name: 'submitDispose',
        method: 'POST',
        desc: '提交',
        path: '/hr/turnofforder/dispose/{processid}/submit',
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
        name: 'rejectDispose',
        method: 'POST',
        desc: '回退',
        path: '/hr/turnofforder/dispose/{processid}/reject',
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
        path: '/hr/turnofforder/dispose/{processid}/step',
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
        path: '/hr/turnofforder/dispose/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
]