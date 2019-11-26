//发起申请
import detailPanel from './detail'
import disposeTbar from './tbar'

const Dispose = {
    extends: new TjUI.grid.Grid(),
    props: {
        moduleid: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
            conurl: 'project/payment/dispose/readDisposePage',
            queryParams: {
                token: this.$store.getters['user/getToken']
            },
            selMode: 'simple',
            tbar: disposeTbar,
            columns: [
                {label:'回款单位',field:'organization'},
                {label:'回款金额(万)',field:'amount'},
                {label:'回款时间',field:'leadtime',sort: true},
                {label:'摘要',field:'info'},
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
                tabName: `payment/dispose/detail-edit-${row.id}`,
                moduleid: this.moduleid,
            }
            this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '详情',name: detailPanel.defaults.tabName},detailPanel)
        },
    }
}
export default Dispose