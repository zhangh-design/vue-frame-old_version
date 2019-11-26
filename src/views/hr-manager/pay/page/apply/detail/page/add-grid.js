/**
 * 调整后
 */
import { apply } from '@/utils/tools'
import validatorField from '@/plugins/validator-field'
import _omit from 'lodash/omit'

const AddGrid = {
	extends: new TjUI.grid.Grid(),
	props: ['hrPayEditPanel','moduleid','type','editPanel','row'],
	data() {
	  return {
			conurl: this.type === 'add' ? '' : 'hr/payorder/apply/readPay',
			queryParams: this.type === 'add' ? {} : {
				token: this.$store.getters['user/getToken'],
				processid: this.row.process.id
			},
			selMode: 'simple',
			isShowIndex: false,
			isPagination: false,
			showHeader: false,
			loadFilter: this.doLoadFilter,
			gridRow: {
				changedtime: '',
				personid: '',
            	personname: '',
				socialbase: '',
				basepay: '',
				meritpay: '',
				commsub: '',
				trafficsub: '',
				homesub: '',
				otherpay: '',
				homepay: '',
				socialpay: '',
				substitute: '',
				nohome: 'false',
				nosocial: 'false',
				reason: '',
				remark: '',
				id: '',	//员工(PayOder) payid
				pid: '',//员工(PayOder) id
				change: {
					//手动修改过的字段标识
				}
			},
			columns: [
				{label:'时间',field:'changed-time'},
				{label:'社保基数',field:'socialbase',render: (h,{ row,column,field,$index })=>{
                    return h('el-input',{style: {border: '1px solid #DC5145','border-radius': '5px'},props: {value: row[field]},on: {input:(val)=>{this.gridRow.socialbase=val}},on: {input:(val)=>{
						let result = this.checkPaymentNum(val)
						if(!result){
							this.$message({message: '社保基数为数字!',duration:1500,type: 'warning'});
							return
						}
						this.gridRow.socialbase=val
						this.gridRow.change.socialbase = true
					}}})
                }},
				{label:'基本工资',field:'basepay',render: (h,{ row,column,field,$index })=>{
                    return h('el-input',{style: {border: '1px solid #DC5145','border-radius': '5px'},props: {value: row[field]},on: {input:(val)=>{
						let result = this.checkPaymentNum(val)
						if(!result){
							this.$message({message: '基本工资为数字!',duration:1500,type: 'warning'});
							return
						}
						this.gridRow.basepay=val
						this.gridRow.change.basepay = true
					}}})
                }},
				{label:'绩效工资',field:'meritpay',render: (h,{ row,column,field,$index })=>{
                    return h('el-input',{style: {border: '1px solid #DC5145','border-radius': '5px'},props: {value: row[field]},on: {input:(val)=>{
						let result = this.checkPaymentNum(val)
						if(!result){
							this.$message({message: '绩效工资为数字!',duration:1500,type: 'warning'});
							return
						}
						this.gridRow.meritpay=val
						this.gridRow.change.meritpay = true
					}}})
                }},
				{label:'通讯补贴',field:'commsub',render: (h,{ row,column,field,$index })=>{
                    return h('el-input',{props: {value: row[field]},on: {input:(val)=>{
						let result = this.checkPaymentNum(val)
						if(!result){
							this.$message({message: '通讯补贴为数字!',duration:1500,type: 'warning'});
							return
						}
						this.gridRow.commsub=val
						this.gridRow.change.commsub = true
					}}})
                }},
				{label:'交通补贴',field:'trafficsub',render: (h,{ row,column,field,$index })=>{
                    return h('el-input',{props: {value: row[field]},on: {input:(val)=>{
						let result = this.checkPaymentNum(val)
						if(!result){
							this.$message({message: '交通补贴为数字!',duration:1500,type: 'warning'});
							return
						}
						this.gridRow.trafficsub=val
						this.gridRow.change.trafficsub = true
					}}})
                }},
				{label:'住房补贴',field:'homesub',render: (h,{ row,column,field,$index })=>{
                    return h('el-input',{props: {value: row[field]},on: {input:(val)=>{
						let result = this.checkPaymentNum(val)
						if(!result){
							this.$message({message: '住房补贴为数字!',duration:1500,type: 'warning'});
							return
						}
						this.gridRow.homesub=val
						this.gridRow.change.homesub = true
					}}})
                }},
				{label:'其他补贴',field:'otherpay',render: (h,{ row,column,field,$index })=>{
                    return h('el-input',{props: {value: row[field]},on: {input:(val)=>{
						let result = this.checkPaymentNum(val)
						if(!result){
							this.$message({message: '其他补贴为数字!',duration:1500,type: 'warning'});
							return
						}
						this.gridRow.otherpay=val
						this.gridRow.change.otherpay = true
					}}})
                }},
				{label:'住房公积金调整',field:'homepay',render: (h,{ row,column,field,$index })=>{
                    return h('el-input',{props: {value: row[field]},on: {input:(val)=>{
						let result = this.checkPaymentNum(val)
						if(!result){
							this.$message({message: '住房公积金调整为数字!',duration:1500,type: 'warning'});
							return
						}
						this.gridRow.homepay=val
						this.gridRow.change.homepay = true
					}}})
                }},
				{label:'社保调整',field:'socialpay',render: (h,{ row,column,field,$index })=>{
                    return h('el-input',{props: {value: row[field]},on: {input:(val)=>{
						let result = this.checkPaymentNum(val)
						if(!result){
							this.$message({message: '社保调整为数字!',duration:1500,type: 'warning'});
							return
						}
						this.gridRow.socialpay=val
						this.gridRow.change.socialpay = true
					}}})
                }},
				{label:'其他代缴',field:'substitute',render: (h,{ row,column,field,$index })=>{
                    return h('el-input',{props: {value: row[field]},on: {input:(val)=>{
						let result = this.checkPaymentNum(val)
						if(!result){
							this.$message({message: '其他代缴为数字!',duration:1500,type: 'warning'});
							return
						}
						this.gridRow.substitute=val
						this.gridRow.change.substitute = true
					}}})
                }},
				{label:'不交住房公积金',field:'nohome',render: (h,{ row,column,field,$index })=>{
                    return h(
						new TjUI.form.tools.ComboBox,
						{
							props: {
								value: [row[field]+''],
								options: [{id:'true',name:'是'},{id:'false',name:'否'}],
								emptyText: "请选择",
								clearable: false,
								listeners: {
									change: (val) => {
										this.gridRow.nohome = val['id']
										this.gridRow.change.nohome = true
									}
								}
							}
						})
                }},
				{label:'不交社保',field:'nosocial',render: (h,{ row,column,field,$index })=>{
                    return h(
						new TjUI.form.tools.ComboBox,
						{
							props: {
								value: [row[field]+''],
								options: [{id:'true',name:'是'},{id:'false',name:'否'}],
								emptyText: "请选择",
								clearable: false,
								listeners: {
									change: (val) => {
										this.gridRow.nosocial = val['id']
										this.gridRow.change.nosocial = true
									}
								}
							}
						})
                }},
			],
	  	}
	},
	mounted(){
		console.info(this.gridRow);
	},
	methods: {
		checkPaymentNum(value){
            let checkNumber = validatorField.validate('checkNumber',value)
            if(!checkNumber.result){
				return false
            }
			return true
		},
		doLoadFilter(resData){
			let row = resData !== void(0) ? resData.data[0] : this.gridRow;
			if(resData !== void(0)){
				row = apply(this.gridRow,_omit(resData.data[0],Object.keys(this.gridRow.change)))
			}
			let pageData = {
				code: 200,
				data: {
					content: [
						{
							'changed-time': '调整后',
							...row
						}
					],
					totalElements: 1
				}
			}
			return pageData
		}
	}
}
export default AddGrid