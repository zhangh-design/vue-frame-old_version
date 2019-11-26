/**
 * 员工离职 人事部审核
 */
export default [
	{
        name: 'readHumanPage',
        method: 'GET',
        desc: '员工离职 人事部审核-分页',
        path: '/hr/turnofforder/human/page',
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
        name: 'saveHuman',
        method: 'POST',
        desc: '保存',
        path: '/hr/turnofforder/human/{processid}',
        mockPath: '',
        headers: ['token'],
        restful: true,
        params: {
            token: '',
            dirty: true,
            deviceshift: '',
            devicetime: '',
            deviceinfo: '',
            id: '',
            processid: '',
        }
    },
	{
        name: 'submitHuman',
        method: 'POST',
        desc: '提交',
        path: '/hr/turnofforder/human/{processid}/submit',
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
        name: 'rejectHuman',
        method: 'POST',
        desc: '回退',
        path: '/hr/turnofforder/human/{processid}/reject',
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
        path: '/hr/turnofforder/human/{processid}/step',
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
        path: '/hr/turnofforder/human/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
]