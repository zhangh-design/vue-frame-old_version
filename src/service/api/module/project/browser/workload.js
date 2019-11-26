/**
 * 项目浏览 合同查询 api 文档接口 领域模型
 */
export default [
    {
        name: 'readWorkloadPage',
        method: 'GET',
        desc: '项目浏览 项目报工查询-分页',
        path: '/project/workload/query/page',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
            projectname: '',
            deptname: '',
            workerid: '',
            workername: '',
            worktime1: '',
            worktime2: '',
            page_page: 0,
            page_size: 30
        },
        validator: {
            page_page: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_page不能为空!'},
            page_size: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_size不能为空!'}
        }
    },
    {
        name: 'readWorkloadDetailPage',
        method: 'GET',
        desc: '项目浏览 项目报工查询-工作内容分页',
        path: '/project/workload/query/detail/page',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            workloadid: '',
            page_page: 0,
            page_size: 30
        },
        validator: {
            page_page: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_page不能为空!'},
            page_size: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_size不能为空!'}
        }
    },
]
