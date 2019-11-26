<template>
	<tj-form :width="width" :userRef="userRef" :layout="layout" :buttons="buttons" :detailData="detailData()"></tj-form>
</template>
<script>
export default {
	name: 'test-tjform-component',
	components: {
        tjForm: new TjUI.form.Form()
	},
	data(){
		return {
			width: 730,
			userRef: `form-${this._uid}`,
			layout: {
				columns: 3,
				width: 240,
				labelWidth: 80,
				buttonPosition: 'left'
			},
			buttons: [
				{text: '自定义按钮',listeners: {click: ()=>{
					console.info(this.$options.name);
				}}},
				{text: '更多',menu: [
					{text: '喝水',listeners: {click: (event)=>{console.info('1',event);}}},
					{text: '吃饭',listeners: {click: (event)=>{console.info('2',event);}}}
					]
				}
			],
			partName: '野营',
			num: 10,
			comboboxValue: ['03'],
			comboboxInputValue: "桃子",
			treeValue: ['系统维护','角色维护'],
			defaultCheckedKeys: [22,29],
			comboGrid: {
				defaultCheckedKeys: [34,2],
				value: ['于洋超','陈楼凯']
			},
			startdate: '2018-09-11',
			enddatetime: '2018-12-24 15:22:12',
			usercolor: '#4A8AF4',
			radion: {
                value: '02',
                options: [{label: '室内',value: '01'},{label: '室外',value: '02'}]
            },
            checkbox: {
                value: ['02','01'],
                options: [{label: '爬山',value: '01'},{label: '美食',value: '02'}]
			},
			isgo: false,
			hiddenid: '123'
		}
	},
	mounted(){
		setTimeout(() => {
			console.info('模拟响应式')
			this.partName = '钓鱼'
			this.num = 12
			this.comboboxValue = ['03','04']
			this.comboboxInputValue = "西瓜"
			this.usercolor = '#1CA261'

			this.startdate = '2018-12-24'
			this.enddatetime = '2018-12-24 15:24:20'

			this.treeValue = ['角色维护']
			this.defaultCheckedKeys = [29]

			this.comboGrid = {
				defaultCheckedKeys: [24,32],
				value: ['黄进求','刘春宇']
			}
			this.isgo = true
			this.radion.value = '01'
			this.checkbox.value = ['01']
			this.hiddenid = 'abc'
		}, 3000);
	},
	methods: {
		detailData(){
			return [
				{span: 1,name: 'part',value: this.partName,link: `paty-${this._uid}`,label: '活动名称',type: 'TextField',width: 130,emptyText: '活动名称',
					rule: [
						// {required: true,message: '请输入活动名称', trigger: 'blur'},
						// {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'},
						{validator: this.checkAge, trigger: 'blur'},
					]
				},
				{span: 1,name: 'num',value: this.num,label: '统计',type: 'InputNumber',labelWidth: '40px',width: 130},
				{span: 1,name: 'remark',value: '请带好干粮',type: 'Label',width: 200},
				{span: 1,name: 'goods',value: this.comboboxValue,returnType: 'string',returnTypeSep:',',displayField:'label',valueField:'value',label: '物品选择',type: 'ComboBox',width: 130,multiple: true,
					options: [{value:'01',label:'苹果'},{value:'02',label:'香梨'},{value:'03',label:'西瓜'},{value:'04',label:'桃子'},{value:'05',label:'猕猴桃'}]
				},
				{span: 1,name: 'fruit',value: this.comboboxInputValue,displayField:'label',labelWidth: '40px',label: '水果',type: 'ComboBoxInput',width: 130,
					options: [{label:'苹果'},{label:'香梨'},{label:'西瓜'},{label:'桃子'},{label:'猕猴桃'}]
				},
				{span: 1,name: 'vehicle',displayField:'name',valueField:'id',value: this.treeValue,defaultCheckedKeys:this.defaultCheckedKeys,labelWidth: '70px',label: '交通工具',type: 'ComboTree',returnType:'string',multiple: true,expanded: false,width: 150,emptyText: '交通工具',conurl: 'user/readRoleMenus',queryParams: {syscode: 'oa',token: 'test_123'},
					listeners: {
						change: (data)=>{
							console.info('bbbbb ',data);
						}
					}
				},
				{span: 1,name: 'userlist',type: 'ComboGrid',width: 130,label: '用户列表',multiple: true,
					collapseTags: false,defaultCheckedKeys: this.comboGrid.defaultCheckedKeys,value: this.comboGrid.value,
					// returnType: 'array',
					conurl: 'hr/payorder/apply/readUserPage',queryParams:{token: 'test_123'},
					columns:[
						{label:'名称',field:'name',sort: true,render: (h,{ row,column,field,$index })=>{
							return h('i',{"class":{'el-icon-time':'el-icon-time'}},row[field])
						},renderHeader: (h, { column, $index })=>{
							return h('span',{style:{color: '#0E9F5A'}},column.label)
							//return column.label
						}}
					],
					listeners: {
						change: (values) => {
							console.info('选中的值 ',values);
						}
					}
				},
				{span: 1,name: 'startdate',value: this.startdate,type: 'DatePicker',width: 130,label: '出发日期'},
				{span: 1,name: 'enddatetime',value: this.enddatetime,type: 'DateTimePicker',width: 130,label: '截止时间'},
				{span: 1,name: 'usercolor',value: this.usercolor,type: 'Color',width: 170,label: '主题'},
				{span: 1,name: 'isgo',value: this.isgo,label: '即时出发',type: 'SwitchButton',width: 130},
				{span: 1,name: 'partyarea',value: this.radion.value,options: this.radion.options,label: '活动区域',type: 'Radio',width: 130},
				{span: 1,name: 'partycontent',value: this.checkbox.value,options: this.checkbox.options,label: '内容',type: 'CheckBox',width: 130},
				{span: 1,name: 'hiddenid',value: this.hiddenid,type: 'TextHidden',width: 170},
			]
		},
		checkAge(rule, value, callback){
			if (!value) {
				callback(new Error('年龄不能为空'));
			}
			callback();
		}
	}
}
</script>
