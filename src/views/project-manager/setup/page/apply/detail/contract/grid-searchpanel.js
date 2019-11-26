/**
 * 项目列表查询-搜索栏
 */
const SearchPanel = {
    extends: new TjUI.grid.searchPanel.SearchPanel(),
    data(){
        return {
            defaults: {
                columns: 3,
                width: 300,
                labelWidth: 120,
            }
        }
    },
    methods: {
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'name',label: '合同名称',type: 'TextField',width: 150,emptyText: '合同名称'},
                {span: 1,name: 'customerunit',label: '客户单位',type: 'ComboBoxInput',conurl:'project/contract/apply/readCustomers',queryParams: {token: this.$store.getters['user/getToken']},
                loadFilter: (resData)=>{
                    return resData.map(data => ({name:data,id:data}))
                },width: 150},
                {span: 1,name: 'manager',label: '合同负责人',type: 'TextField',width: 150,emptyText: '合同负责人'},
                {span: 1,name: 'signtime1',label: '签订时间(开始)',type: 'DatePicker',width: 150},
                {span: 1,name: 'signtime2',label: '签订时间(结束)',type: 'DatePicker',width: 150},
                {span: 1,name: 'operbtns',type: 'ButtonGroup',width: 160,columns: 2,border: false,gutter: '0px',
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