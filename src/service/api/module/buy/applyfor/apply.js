/**
 * 项目投标 api 文档接口 领域模型
 */
export default [
    {
        name: 'getDetail',
        method: 'GET',
        desc: '取得',
        path: '/buy/applyfor/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: ''
        }
    },
    {
        name: 'getItemDetail',
        method: 'GET',
        desc: '子包-取得',
        path: '/buy/applyfor/apply/item/{processid}/{id}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            id: '',
            token: ''
        }
    },
    {
        name: 'doStep',
        method: 'GET',
        desc: '流程步骤',
        path: '/buy/applyfor/apply/{processid}/step',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
        }
    },
    {
        name: 'readApplyPage',
        method: 'GET',
        desc: '获取项目投标-申请-分页',
        path: '/buy/applyfor/apply/page',
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
        name: 'readItem',
        method: 'GET',
        desc: '获取包详情',
        path: '/buy/applyfor/apply/item/{processid}/page',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            page_page: 0,
            page_size: 30
        }
    },
    {
        name: 'insertApply',
        method: 'POST',
        desc: '新增',
        path: '/buy/applyfor/apply/',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
            projectid: '',
            projectname: '',
            matter: '',
            remark: '',
            pay: '',
            paytime: '',
            userid: '',
            username: '',
            deptcode: '',
            deptname: '',
        }
    },
    {
        name: 'doSaveApply',
        method: 'POST',
        desc: '保存',
        path: '/buy/applyfor/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: '',
            id: '',
            projectid: '',
            projectname: '',
            matter: '',
            remark: '',
            pay: '',
            paytime: '',
            userid: '',
            username: '',
            deptcode: '',
            deptname: '',
            dirty: true,
        }
    },
    {
        name: 'doSubmitApply',
        method: 'POST',
        desc: '提交',
        path: '/buy/applyfor/apply/{processid}/submit',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            advice: '',
        },
    },
    {
        name: 'deleteApply',
        method: 'DELETE',
        desc: '删除',
        path: '/buy/applyfor/apply/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: ''
        }
    },
    {
        name: 'addItem',
        method: 'POST',
        desc: '物质清单信息-新增',
        path: '/buy/applyfor/apply/item/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: '',
            pid:'',
            name:'',
            sort:'',
            num:'',
            unionprice:'',
            price:'',
            remark:''
        }
    },
    {
        name: 'updateItem',
        method: 'PUT',
        desc: '物质清单信息-修改',
        path: '/buy/applyfor/apply/item/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            processid: '',
            token: '',
            id: '',
            pid:'',
            name:'',
            sort:'',
            num:'',
            unionprice:'',
            price:'',
            remark:'',
            dirty: true
        }
    },
    {
        name: 'deleteItem',
        method: 'DELETE',
        desc: '包信息-删除',
        path: '/buy/applyfor/apply/item/{processid}/{id}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: '',
            id: ''
        }
    },
    {
        name: 'getBuyContractPage',
        method: 'GET',
        desc: '获取物质合同列表 (grid列表请求url)',
        path: '/buy/common/contract/page',
        headers: ['token'], //如果url不需要headers参数，则headers可以不写
        mockPath: '',
        params: {
            token:'',
            projectname: '',
            deptname: '',
            page_page: '',
            page_size: ''
        }
    },
]
