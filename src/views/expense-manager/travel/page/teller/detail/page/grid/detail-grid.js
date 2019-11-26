/**
 * 里程碑信息
 */
const MilestoneGrid = {
    extends: new TjUI.grid.Grid(),
    props: {
        setUpApplyEditPanel: {
            type: Object,
            default: null
        },
        type: {
            type: String,
            default: 'edit'
        },
        row: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            conurl: 'expense/travel/teller/readTellerDetailPage',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: ''
            },
            selMode: 'simple',
            columns: [
                {label: '出发地', field: 'startaddress'},
                {label: '目的地', field: 'targetaddress'},
                {label: '出发时间', field: 'starttime'},
                {label: '到达时间', field: 'endtime'},
                {label: '出差类型', field: 'sort'},
                {label: '交通工具', field: 'vehicle'},
                {label: '票价(元)', field: 'pay'},
                {label: '备注', field: 'remark'},
            ],
        }
    },
    mounted() {
        if(this.setUpApplyEditPanel.curRow!==null){
            this.queryParams.processid = this.setUpApplyEditPanel.curRow.process.id
        }
    }
}
export default MilestoneGrid
