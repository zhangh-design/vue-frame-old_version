/**
 * 项目浏览 合同查询 api 文档接口 领域模型
 */
export default [
    {
        name: 'readTenderPage',
        method: 'GET',
        desc: '项目浏览 投标查询-分页',
        path: '/project/tender/query/page',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
            code: '',
            area: '',
            org: '',
            tendertime1: '',
            tendertime2: '',
            deptname: '',
            oprtname: '',
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
        name: 'readPaymentfilePage',
        method: 'GET',
        desc: '项目浏览 投标查询-取得付款凭证分页',
        path: '/project/tender/query/{id}/paymentfile/page',
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
        name: 'readBidsfilePage',
        method: 'GET',
        desc: '项目浏览 投标查询-取得招标附件分页',
        path: '/project/tender/query/detail/{id}/bids/page',
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
        name: 'readTenderfilePage',
        method: 'GET',
        desc: '项目浏览 投标查询-取得投标附件分页',
        path: '/project/tender/query/detail/{id}/tender/page',
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
        path: '/project/contract/query/detail/{id}/accessor',
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
        name: 'readTenderDetailPage',
        method: 'GET',
        desc: '项目浏览 投标查询-包信息分页',
        path: '/project/tender/query/detail/page',
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
