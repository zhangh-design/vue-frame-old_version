/**
 * 项目列表查询-搜索栏
 */
const SearchPanel = {
    extends: new TjUI.grid.searchPanel.SearchPanel(),
    data(){
        return {
            defaults: {
                columns: 10,
                width: 300,
                labelWidth: 140,
            }
        }
    },
    methods: {
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'name',label: '项目名称',type: 'TextField',width: 150,emptyText: '项目名称'},
                {span: 1,name: 'deptcode',label: '承建部门',displayField: 'name',valueField: 'value',type: 'ComboBox',conurl:'project/payment/dispose/getDept',queryParams: {token: this.$store.getters['user/getToken']},width: 150},
                {span: 1,name: 'managername',label: '项目经理',type: 'TextField',width: 150,emptyText: '项目经理'},
                {span: 1,name: 'begintime1',label: '项目开始时间(开始)',type: 'DatePicker',width: 150},
                {span: 1,name: 'begintime2',label: '项目开始时间(结束)',type: 'DatePicker',width: 150},
                {span: 1,name: 'operbtns',type: 'ButtonGroup',width: 160,style:'margin-left: -140px',columns: 2,border: false,gutter: '0px',
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