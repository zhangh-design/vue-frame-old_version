/**
 * 合同查询
 */
import {mapGetters} from 'vuex'
import detail from '@/components/common/grid/detail/detail'
import tjWindow from '@/components/common/window'
import fileListPanel from './file-list'

const Contract = {
	extends: new TjUI.grid.detail.Detail(),
	props: {
		browserProjectPanel: {
			type: Object,
			default: null
		}
	},
	data() {
		return {
			detailConurl: 'project/browser/project/getContractInfo',
			queryParams: {contractid: this.browserProjectPanel.curRow.contractid,token: this.$store.getters['user/getToken']},
			defaults: {
				border: false,
				columns: 3,
				width: 270,
				labelWidth: 100,
			},
		}
	},
	computed: {
        //grid当前选中row行
        record(){
            return null
        }
	},
	methods: {
		initPanel() {
			let panel = {
				component: detail,
				props: {
					link: this.detailLink,
					...this.$data,
					buttons: [],
				}
			}
			this.add(panel)
		},
		initDetailData() {
			this.detailData = [
				{span: 1,name: 'code',type: 'TextField',width: 150,readonly:true,label: '编号'},
				{span: 1,name: 'customerunit',type: 'TextField',width: 150,readonly:true,label: '客户单位'},
				{span: 1,name: 'stamptime',type: 'TextField',width: 150,readonly:true,label: '合同盖章日期'},
				{span: 1,name: 'name',type: 'TextField',width: 150,readonly:true,label: '名称'},
				{span: 1,name: 'amount',type: 'TextField',width: 150,readonly:true,label: '金额(万)'},
				{span: 1,name: 'expiretime',type: 'TextField',width: 150,readonly:true,label: '合同到期日期'},
				{span: 1,name: 'manager',type: 'TextField',width: 150,readonly:true,label: '合同负责人'},
				{span: 1,name: 'signtime',type: 'TextField',width: 150,readonly:true,label: '签订日期'},
				{span: 1,name: 'archivetime',type: 'TextField',width: 150,readonly:true,label: '归档日期'},
				{span: 1,name: 'deptname',type: 'TextField',width: 150,readonly:true,label: '部门名称'},
				{span: 2,name: 'printnum',type: 'TextField',width: 150,readonly:true,label: '打印份数'},
				{span: 1,name: 'contractFileBtn',type: 'Button',text: '查看合同附件',label: '查看合同附件',listeners: {
					click: ()=>{
						let detailWin = new tjWindow({panel: this,mainGrid: this.mainGrid,title: '合同附件-列表',height: 350,width: 500})
                        detailWin.add(fileListPanel)
                        detailWin.show()
					}
				}},
				{span: 1,name: 'id',type: 'TextHidden',width: 150,readonly:true},
			]
		},
	}
}
export default Contract