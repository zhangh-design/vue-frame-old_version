/**
 * 行程明细
 */
import detailTbar from './detail/tbar'
import editDetail from './detail/edit-detail'

const DetailGrid = {
    extends: new TjUI.grid.Grid(),
    props: ['row', 'setUpApplyEditPanel', 'type', 'moduleid'],
    data() {
        return {
            conurl: 'expense/travel/apply/readApplyDetailPage',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: ''
            },
            selMode: 'simple',
            tbar: detailTbar,
            detailPanel: editDetail,
            isReloadGrid: this.type === 'add' ? false : true,
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
        if (this.setUpApplyEditPanel.curRow !== null) {
            this.queryParams.processid = this.setUpApplyEditPanel.curRow.process.id
        }
    },
    methods: {
        reloadGrid() {
            if (this.setUpApplyEditPanel.curRow !== null) {
                this.setQueryParams({
                    token: this.$store.getters['user/getToken'],
                    processid: this.setUpApplyEditPanel.curRow.process.id
                })
                !!this.getLinkComponent(this.tableLink) && this.getLinkComponent(this.tableLink).loadStore()
            }
        }
    }
}
export default DetailGrid
