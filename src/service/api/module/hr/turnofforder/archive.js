/**
 * 员工离职 人事部归档
 */
export default [
	{
        name: 'readArchivePage',
        method: 'GET',
        desc: '员工离职 财务部审核-分页',
        path: '/hr/turnofforder/archive/page',
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
        name: 'saveArchive',
        method: 'POST',
        desc: '保存',
        path: '/hr/turnofforder/archive/{processid}',
        mockPath: '',
        headers: ['token'],
        restful: true,
        params: {
            token: '',
            dirty: true,
            prove: '',
			provetime: '',
			proveinfo: '',
            id: '',
            processid: '',
        }
    },
	{
        name: 'submitArchive',
        method: 'POST',
        desc: '提交',
        path: '/hr/turnofforder/archive/{processid}/submit',
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
        name: 'rejectArchive',
        method: 'POST',
        desc: '回退',
        path: '/hr/turnofforder/archive/{processid}/reject',
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
        path: '/hr/turnofforder/archive/{processid}/step',
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
        path: '/hr/turnofforder/archive/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
]