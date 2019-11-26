/**
 * 项目浏览 合同查询 api 文档接口 领域模型
 */
export default [
    {
        name: 'readContractPage',
        method: 'GET',
        desc: '项目浏览 合同查询-分页',
        path: '/project/contract/query/page',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
            code: '',
            name: '',
            signtime1: '',
            signtime2: '',
            customerunit: '',
            manager: '',
            flag: '',
            page_page: 0,
            page_size: 30
        },
        validator: {
            page_page: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_page不能为空!'},
            page_size: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_size不能为空!'}
        }
    },
    {
        name: 'readContractAccessorPage',
        method: 'GET',
        desc: '项目浏览 合同查询-取得合同附件分页',
        path: '/project/contract/query/{id}/accessor/page',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            id: '',
            page_page: 0,
            page_size: 30
        },
        validator: {
            page_page: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_page不能为空!'},
            page_size: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_size不能为空!'}
        }
    },
    {
        name: 'DlContractAccessor',
        method: 'GET',
        desc: '项目浏览 合同查询-下载合同附件',
        path: '/project/contract/query/{id}/accessor',
        mockPath: '',
        headers: ['token'],
        restful: true,
        params: {
            token: '',
            name: '',
            id: '',
        },
        validator: {
            page_page: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_page不能为空!'},
            page_size: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_size不能为空!'}
        }
    },
    {
        name: 'readContractTenderPage',
        method: 'GET',
        desc: '项目浏览 合同查询-关联招标分页',
        path: '/project/contract/query/tender/{pid}/page',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            pid: '',
            page_page: 0,
            page_size: 30
        },
        validator: {
            page_page: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_page不能为空!'},
            page_size: {required: true, type: Number, sqlxss: true, not: '', msg: 'page_size不能为空!'}
        }
    },
]
