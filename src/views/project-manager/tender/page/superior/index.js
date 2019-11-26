//上级审批
import detailPanel from './detail'
import applyTbar from './tbar'

const Superior = {
    extends: new TjUI.grid.Grid(),
    props: {
        moduleid: {
            type: String,
            return: ''
        }
    },
    data(){
        return {
            conurl: 'project/tender/superior/readSuperiorPage',
            queryParams: {
                token: this.$store.getters['user/getToken']
            },
            tbar: applyTbar,
            selMode: 'simple',
            columns: [
                {label:'名称',field: 'name'},
				{label:'批次',field:'code'},
                {label:'招标地区',field:'area'},
                {label:'招标机构',field:'org'},
                {label:'标书购买时间',field:'buytime',sort: true},
                {label:'投标时间',field:'tendertime',sort: true},
                {label:'经办部门',field:'deptname'},
                {label:'经办人',field:'oprtname'},
            ],
        }
    },
    methods:{
        rowDblclick(row, event){
            detailPanel.defaults = {
                mainPanel: this,
                mainGrid: this,
                window: null,
                type: 'edit',
                row: row,
                tabName: `tender/superior/detail-edit-${row.id}`,
                moduleid: this.moduleid,
            }
            this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '详情',name: detailPanel.defaults.tabName},detailPanel)
        },
    },
}
export default Superior