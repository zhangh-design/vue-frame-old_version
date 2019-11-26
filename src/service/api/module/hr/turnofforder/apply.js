/**
 * 员工离职 申请
 */
export default [
	{
        name: 'readApplyPage',
        method: 'GET',
        desc: '员工离职 申请-分页',
        path: '/hr/turnofforder/apply/page',
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
        name: 'insertApply',
        method: 'POST',
        desc: '新增',
        path: '/hr/turnofforder/apply/',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
            phone: '',
            reason: '',
        }
    },
    {
        name: 'saveApply',
        method: 'POST',
        desc: '保存',
        path: '/hr/turnofforder/apply/{processid}',
        mockPath: '',
        headers: ['token'],
        restful: true,
        params: {
            token: '',
            dirty: true,
            phone: '',
            reason: '',
            id: '',
            processid: '',
        }
    },
    {
        name: 'deleteApply',
        method: 'DELETE',
        desc: '删除',
        path: '/hr/turnofforder/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
    {
        name: 'submitApply',
        method: 'POST',
        desc: '提交',
        path: '/hr/turnofforder/apply/{processid}/submit',
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
        path: '/hr/turnofforder/apply/{processid}/step',
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
        path: '/hr/turnofforder/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
]