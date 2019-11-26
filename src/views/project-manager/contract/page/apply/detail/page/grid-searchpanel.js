/**
 * 搜索模板
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
                {span: 1,name: 'org',label: '招标机构',type: 'TextField',width: 150,emptyText: '招标机构'},
                {span: 1,name: 'tendertime1',label: '项目开始时间(开始)',type: 'DatePicker',width: 150},
                {span: 1,name: 'tendertime2',label: '项目开始时间(结束)',type: 'DatePicker',width: 150},
                {span: 1,name: 'deptcode',label: '经办部门',displayField: 'name',valueField: 'value',type: 'ComboBox',conurl:'project/contract/apply/readTenderDept',queryParams: {token: this.$store.getters['user/getToken']},width: 150},
                {span: 1,name: 'oprtname',label: '经办人',type: 'TextField',width: 150,emptyText: '经办人'},
                {span: 1,name: 'operbtns',type: 'ButtonGroup',style:'margin-left:-140px;',width: 160,columns: 2,border: false,gutter: '0px',
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