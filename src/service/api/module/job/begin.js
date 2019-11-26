/**
 * 我的任务 我发起的
 */
export default [
	{
		name: 'readPage',
        method: 'GET',
        desc: '取得 分页',
        path: '/job/begin/page',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
            processkey: '',
            taskkey: '',
            name: '',
            starttime1: '',
            starttime2: '',
			page_page: 0,
            page_size: 30
        }
    },
    {
		name: 'getWorkFlow',
        method: 'GET',
        desc: '流程路由查询',
        path: '/root/workflow',
        mockPath: '',
        headers: ['token'],
        params: {
			token: '',
			processkey: '',
            taskkey: ''
        }
	}
]