import tbar from './tbar'
import {apply} from '@/utils/tools'
import _omit from 'lodash/omit'

const Panel = {
    extends: new TjUI.sysModule.SysModule,
    data() {
        return {
            isShowTree: false,
            gridDefaults: {
                conurl: 'hr/person/person/readPersonPage',
				queryParams: {
					token: this.$store.getters['user/getToken']
				},
                selMode: 'simple',
                columns: [
                    {label:'员工编号',field:'code'},
					{label:'员工姓名',field:'name'},
					{label:'性别',field:'sex'},
					{label:'电话号码',field:'phone'},
					{label:'入职时间',field:'begintime'},
					{label:'工作岗位',field:'station'},
					{label:'岗位等级',field:'stationlevel'},
					{label:'部门名称',field:'deptname'},
					{label:'员工状态',field:'status'},
					{label:'状态',field:'flagname'},
                ]
            }
        }
    },
    methods: {
        initTabs(){
            let tabs = []
            tabs.push(
                {
                    title: '角色权限分配',
                    queryField: 'userid',
                    queryParamName: 'id',
                    defaults: {
                        conurl: 'hr/person/person/readRolePage',
                        queryParams: {
                            token: this.$store.getters['user/getToken']
                        },
                        tbar: tbar,
                        isShowIndex: false,
                        isPagination: false,
                        loadFilter: this.doLoadFilter,
                        selMode: 'simple',
                        gridRow: {
                            roleid: '',
                            rolename: '',
                            userid:'',
                            rid:'',
                            change: {
                                //手动修改过的字段标识
                            }
                        },
                        columns: [
							{label:'角色id',field:'roleid'},
							{label:'角色名称',field:'rolename'},
							{label:'用户id',field:'userid'}
						]
                    }
                }
            )
            return tabs
        },
        doLoadFilter(resData){
            console.log(resData)
            let row = resData.data;
            // let row = resData !== void(0) ? resData.data[0] : this.gridRow;
            console.log(row)
			if(resData !== void(0)){
				// row = apply(this.gridRow,_omit(resData.data[0],Object.keys(this.gridRow)))
			}
			let pageData = {
				code: 200,
				data: {
					content: [
                        ...row
						// {
						// 	...row
						// }
					],
					totalElements: 1
				}
            }
            console.log(pageData)
			return pageData
		}
    },
}
export default Panel