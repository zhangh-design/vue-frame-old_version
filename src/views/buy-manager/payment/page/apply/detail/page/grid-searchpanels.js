/**
 * 项目列表查询-搜索栏
 */
const SearchPanel = {
    extends: new TjUI.grid.searchPanel.SearchPanel(),
    data(){
        return {
            defaults: {
                columns: 3,
                width: 250,
                labelWidth: 80,
            }
        }
    },
    methods: {
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'projectname',label: '项目名称',type: 'TextField',width: 150,emptyText: '项目名称'},
                {span: 1,name: 'deptname',label: '承建部门',type: 'TextField',width: 150,emptyText: '承建部门'},
                {span: 1,name: 'operbtns',type: 'ButtonGroup',width: 160,columns: 2,style: 'margin-left:-80px',border: false,gutter: '0px',
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