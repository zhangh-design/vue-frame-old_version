/**
 * 员工信息管理 api 文档接口 领域模型
 */
export default [
    {
        name: 'readPersonPage',
        method: 'GET',
        desc: '获取员工信息管理-分页',
        path: '/hr/person/page',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
            page_page: 0,
            page_size: 30,
            name: '',
            code: '',
            deptcode: '',
            status: '',
            begintime1: '',
            begintime2: '',
        },
        validator:{
            page_page: {required: true,type: Number,sqlxss: true,not: '', msg: 'page_page不能为空!'},
            page_size: {required: true,type: Number,sqlxss: true,not: '', msg: 'page_size不能为空!'}
        }
    },
    {
        name: 'readRolePage',
        method: 'GET',
        desc: '获取人员角色列表',
        path: '/hr/person/roleuser/{id}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            id: ''
        },
        restfulValidator: {
            id: {required: true,type: Number,not: null, msg: 'userid不能为空,请先同步人员!'}
        }
    },
    {
        name: 'ChangeRole',
        method: 'POST',
        desc: '修改角色权限',
        path: '/hr/person/changerole',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            userid:'',
            roleid:'',
            rolename:''
        },
    },
    {
        name: 'deleteRole',
        method: 'DELETE',
        desc: '删除',
        path: '/hr/person/{userid}/{roleid}/delroleuser',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            userid: '',
            roleid:''
        }
    },
    {
        name: 'readRoleList',
        method: 'GET',
        desc: '获取角色列表',
        path: '/hr/person/rolelist',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: ''
        },
    },
    {
        name: 'getPersonDetail',
        method: 'GET',
        desc: '获取申请详情',
        path: '/hr/person/{processid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            processid: ''
        }
    },
    {
        name: 'readContractPage',
        method: 'GET',
        desc: '获取员工信息管理-合同-分页',
        path: '/hr/person/contract/page',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            pid:'',
            code:'',
            page_page: 0,
            page_size: 30
        },
        validator:{
            page_page: {required: true,type: Number,sqlxss: true,not: '', msg: 'page_page不能为空!'},
            page_size: {required: true,type: Number,sqlxss: true,not: '', msg: 'page_size不能为空!'}
        }
    },
    {
        name: 'readStationPage',
        method: 'GET',
        desc: '获取员工信息管理-岗位-分页',
        path: '/hr/person/station/page',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            pid:'',
            code:'',
            page_page: 0,
            page_size: 30
        },
        validator:{
            page_page: {required: true,type: Number,sqlxss: true,not: '', msg: 'page_page不能为空!'},
            page_size: {required: true,type: Number,sqlxss: true,not: '', msg: 'page_size不能为空!'}
        }
    },
    {
        name: 'readPayPage',
        method: 'GET',
        desc: '获取员工信息管理-薪资-分页',
        path: '/hr/person/pay/page',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            pid:'',
            code:'',
            page_page: 0,
            page_size: 30
        },
        validator:{
            page_page: {required: true,type: Number,sqlxss: true,not: '', msg: 'page_page不能为空!'},
            page_size: {required: true,type: Number,sqlxss: true,not: '', msg: 'page_size不能为空!'}
        }
    },
    {
        name: 'readIncentivePage',
        method: 'GET',
        desc: '获取员工信息管理-奖惩-分页',
        path: '/hr/person/incentive/page',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            pid:'',
            code:'',
            page_page: 0,
            page_size: 30
        },
        validator:{
            page_page: {required: true,type: Number,sqlxss: true,not: '', msg: 'page_page不能为空!'},
            page_size: {required: true,type: Number,sqlxss: true,not: '', msg: 'page_size不能为空!'}
        }
    },
    {
        name: 'insertContract',
        method: 'POST',
        desc: '新增',
        path: '/hr/person/contract',
        mockPath: '',
        headers: ['token'],
        params: {
            personid:'',
            token: '',
            personname: '',
            code:'',
            name: '',
            begintime: '',
            endtime: '',
            remark: ''
           // accessory: '',
        }
    },
    {
        name: 'insertStation',
        method: 'POST',
        desc: '新增',
        path: '/hr/person/station',
        mockPath: '',
        headers: ['token'],
        params: {
            personid:'',
            token: '',
            personname: '',
            processcode:'',
            station: '',
            oldstation: '',
            changedtime: '',
            reason: '',
            remark: ''
           // accessory: '',
        }
    },
    {
        name: 'insertPay',
        method: 'POST',
        desc: '新增',
        path: '/hr/person/pay',
        mockPath: '',
        headers: ['token'],
        params: {
            personid:'',
            token: '',
            personname: '',
            processcode:'',
            pay: '',
            oldpay: '',
            changedtime: '',
            reason: '',
            remark: ''
           // accessory: '',
        }
    },
    {
        name: 'insertIncentive',
        method: 'POST',
        desc: '新增',
        path: '/hr/person/incentive',
        mockPath: '',
        headers: ['token'],
        params: {
            personid:'',
            token: '',
            personname: '',
            sort:'',
            name: '',
            content: '',
            begintime: '',
            org: '',
            remark: ''
           // accessory: '',
        }
    },
    {
        name: 'insertPerson',
        method: 'POST',
        desc: '新增',
        path: '/hr/person/',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
          //  code: '',
            name:'',
            sex: '',
            birthday: '',
            address: '',
            idcard: '',
            phone:'',
            begintime: '',
            station: '',
            stationlevel: '',
            deptcode: '',
            deptname:'',
            linkman: '',
            linkphone: '',
            status: '',
            married: '',
            logincode:'',
            profession:'',
            education:'',
            politics:'',
            hkaddress:'',
            bank:'',
            account:'',
            region:'',
            doorcode:'',
           // accessory: '',
        }
    },
    {
        name: 'updateContract',
        method: 'PUT',
        desc: '保存',
        path: '/hr/person/contract/{contractid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            contractid:'',
            personid:'',
            id:'',
            personname: '',
            code:'',
            name: '',
            begintime: '',
            endtime: '',
            remark: '',
            dirty: true
        }
    },
    {
        name: 'updateStation',
        method: 'PUT',
        desc: '保存',
        path: '/hr/person/station/{stationid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            stationid:'',
            personid:'',
            id:'',
            personname: '',
            processcode:'',
            station: '',
            oldstation: '',
            changedtime: '',
            reason: '',
            remark: '',
            dirty: true
        }
    },
    {
        name: 'updatePay',
        method: 'PUT',
        desc: '保存',
        path: '/hr/person/pay/{payid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            payid:'',
            personid:'',
            id:'',
            personname: '',
            processcode:'',
            pay: '',
            oldpay: '',
            changedtime: '',
            reason: '',
            remark: '',
            dirty: true
        }
    },
    {
        name: 'updateIncentive',
        method: 'PUT',
        desc: '保存',
        path: '/hr/person/incentive/{incentiveid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            incentiveid:'',
            personid:'',
            id:'',
            personname: '',
            sort:'',
            name: '',
            content: '',
            begintime: '',
            org: '',
            remark: '',
            dirty: true
        }
    },
    {
        name: 'doUpdatePerson',
        method: 'PUT',
        desc: '保存',
        path: '/hr/person/{personid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            personid:'',
            code:'',
            id:'',
            userid:'',
            name:'',
            sex: '',
            birthday: '',
            address: '',
            idcard: '',
            phone:'',
            begintime: '',
            station: '',
            stationlevel: '',
            deptcode: '',
            deptname:'',
            linkman: '',
            linkphone: '',
            status: '',
            married: '',
            logincode:'',
            profession:'',
            education:'',
            politics:'',
            hkaddress:'',
            bank:'',
            account:'',
            region:'',
            doorcode:'',
            dirty: true
        }
    },
    {
        name: 'doSubmitPerson',
        method: 'POST',
        desc: '提交',
        path: '/hr/person/{id}/submit',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            id: '',
            advice: ''
        }
    },
    {
        name: 'deletePerson',
        method: 'DELETE',
        desc: '删除',
        path: '/hr/person/{id}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            id: ''
        }
    },
    {
        name: 'sanmePerson',
        method: 'POST',
        desc: '同步',
        path: '/hr/person/{id}/sync',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            id: ''
        }
    },
    {
        name: 'deleteContract',
        method: 'DELETE',
        desc: '删除',
        path: '/hr/person/contract/{contractid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            id: '',
            contractid:''
        }
    },
    {
        name: 'deleteStation',
        method: 'DELETE',
        desc: '删除',
        path: '/hr/person/station/{stationid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            id: '',
            stationid:''
        }
    },
    {
        name: 'deletePay',
        method: 'DELETE',
        desc: '删除',
        path: '/hr/person/pay/{payid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            id: '',
            payid:''
        }
    },
    {
        name: 'deleteIncentive',
        method: 'DELETE',
        desc: '删除',
        path: '/hr/person/incentive/{incentiveid}',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            id: '',
            incentiveid:''
        }
    },
    {
        name: 'readSex',
        method: 'GET',
        desc: '读取性别列表',
        path: '/root/dict/sex',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
        }
    },
    {
        name: 'readAccessoryPage',
        method: 'GET',
        desc: '附件分页',
        path: '/hr/person/{id}/accessor/page',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            id: '',
            page_page: 0,
            page_size: 30
        },
        validator:{
            page_page: {required: true,type: Number,sqlxss: true,not: '', msg: 'page_page不能为空!'},
            page_size: {required: true,type: Number,sqlxss: true,not: '', msg: 'page_size不能为空!'}
        }
    },
    {
        name: 'contractAccessoryPage',
        method: 'GET',
        desc: '附件分页',
        path: '/hr/person/contract/{id}/accessor/page',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            id: '',
            page_page: 0,
            page_size: 30
        },
        validator:{
            page_page: {required: true,type: Number,sqlxss: true,not: '', msg: 'page_page不能为空!'},
            page_size: {required: true,type: Number,sqlxss: true,not: '', msg: 'page_size不能为空!'}
        }
    },
    {
        name: 'deleteFile',
        method: 'DELETE',
        desc: '删除',
        path: '/hr/person/{id}/accessor',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            id: '',
            name: ''
        }
    },
    {
        name: 'deleteContractFile',
        method: 'DELETE',
        desc: '删除',
        path: '/hr/person/contract/{id}/accessor',
        mockPath: '',
        restful: true,
        headers: ['token'],
        params: {
            token: '',
            id: '',
            name: ''
        }
    },
    {
        name: 'readDept',
        method: 'GET',
        desc: '读取部门列表',
        path: '/root/dept/list',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
        }
    },
    {
        name: 'readStatus',
        method: 'GET',
        desc: '读取状态列表',
        path: '/root/dict/personstatus',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
        }
    },
    {
        name: 'readMarried',
        method: 'GET',
        desc: '读取婚姻状态列表',
        path: '/root/dict/married',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
        }
    },
    {
        name: 'readType',
        method: 'GET',
        desc: '读取类型列表',
        path: '/root/dict/incentive',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
        }
    },
    {
        name: 'setEnable',
        method: 'POST',
        desc: '启用',
        path: '/hr/person/{id}/enable',
        mockPath: '',
        headers: ['token'],
        restful: true,
        params: {
            token: '',
            id: '',
        }
    },
    {
        name: 'setDiscard',
        method: 'POST',
        desc: '废弃',
        path: '/hr/person/{id}/discard',
        mockPath: '',
        headers: ['token'],
        restful: true,
        params: {
            token: '',
            id: '',
        }
    }
]
