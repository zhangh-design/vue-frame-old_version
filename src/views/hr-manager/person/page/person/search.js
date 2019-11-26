/**
 * 员工信息管理 -搜索栏
 */
const SearchPanel = {
    extends: new TjUI.grid.searchPanel.SearchPanel(),
    data(){
        return {
            defaults: {
                columns: 4,
                width: 270,
                labelWidth: 110,
            }
        }
    },
    methods: {
        initDetailData(){
            this.detailData = [
				{span: 1,name: 'name',label: '姓名',type: 'TextField',width: 150,emptyText: '姓名'},
				{span: 1,name: 'code',label: '编号',type: 'TextField',width: 150,emptyText: '编号'},
                {span: 1,name: 'deptcode',label: '所属部门',displayField: 'name',valueField: 'code',type: 'ComboBox',conurl:'dict/getDept',queryParams: {token: this.$store.getters['user/getToken']},width: 150},
				{span: 1,name: 'status',label: '员工状态',displayField: 'name',valueField: 'name',type: 'ComboBox',conurl:'dict/getPersonStatus',queryParams: {token: this.$store.getters['user/getToken']},width: 150},
				{span: 1,name: 'begintime1',label: '入职时间(开始)',type: 'DatePicker',width: 150},
                {span: 1,name: 'begintime2',label: '入职时间(结束)',type: 'DatePicker',width: 150},
                {span: 1,name: 'operbtns',type: 'ButtonGroup',width: 160,style:'margin-left: -110px',columns: 2,border: false,gutter: '0px',
                buttonGroup: [
                    {text:'查询',listeners: {
                        click: this.doQuery
                    }},
                    {text:'重置',listeners: {
                        click: this.doReset
                    }}
                ]
                }
            ]
        }
    }
}
export default SearchPanel