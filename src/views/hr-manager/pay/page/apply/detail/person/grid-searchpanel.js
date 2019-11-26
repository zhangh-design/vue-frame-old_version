/**
 * 项目列表查询-搜索栏
 */
const SearchPanel = {
    extends: new TjUI.grid.searchPanel.SearchPanel(),
    data(){
        return {
            defaults: {
                columns: 3,
                width: 240,
                labelWidth: 80,
            }
        }
    },
    methods: {
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'name',label: '员工姓名',type: 'TextField',width: 150,emptyText: '员工姓名'},
                {span: 1,name: 'deptname',label: '员工部门',displayField: 'name',valueField: 'name',type: 'ComboBox',conurl:'hr/person/person/readDept',queryParams: {token: this.$store.getters['user/getToken']},width: 150},
                {span: 1,name: 'operbtns',type: 'ButtonGroup',width: 150,style:'margin-left: -60px',columns: 2,border: false,gutter: '0px',
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