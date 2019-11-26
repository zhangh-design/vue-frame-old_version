/**
 * 项目列表查询-搜索栏
 */
const SearchPanel = {
    extends: new TjUI.grid.searchPanel.SearchPanel(),
    data(){
        return {
            defaults: {
                columns: 3,
                width: 290,
                labelWidth: 136,
            }
        }
    },
    methods: {
        initDetailData(){
            this.detailData = [
                {span: 3,name: 'projectname',label: '项目名称',type: 'TextField',width: 150,emptyText: '项目名称'},
                {span: 1,name: 'paytime1',label: '申请时间范围(开始)',type: 'DatePicker',width: 150},
                {span: 1,name: 'paytime2',label: '申请时间范围(结束)',type: 'DatePicker',width: 150},
                {span: 1,name: 'operbtns',type: 'ButtonGroup',width: 160,columns: 2,style:'margin-left:-100px',border: false,gutter: '0px',
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
