/**
 * 包信息grid
 */
const Grid = {
    extends: new TjUI.grid.Grid(),
    props: ['row', 'type','moduleid'],
    data() {
        return {
            curModuleId: this.moduleid,
            curRow: null,
            conurl: 'buy/orders/finance/readDetail',
            processID: 0,
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: ''
            },
            selMode: 'simple',
            //tbar: detailTbar,
            //detailPanel: editDetail,
            isReloadGrid: this.type === 'add' ? false : true,
            columns: [
                {label: '名称', field: 'name'},
                {label: '型号', field: 'sort'},
                {label: '数量', field: 'num'},
                {label: '预算单价(元)', field: 'amount'},
                {label: '实际单价(元)', field: 'payamount'},
                {label: '预算综合(元)', field: 'amounttotal'},
                {label: '实际总额(元)', field: 'payamounttotal'},
            ],
        }
    },
    mounted() {
        this.initProcessID()
    },
    methods: {
        initProcessID() {
            if (!!this.row) {
                !(!!this.curRow) && (this.curRow = this.row)
                this.queryParams.processid = this.curRow.process.id
            }
        },
        setProcessID(row) {
            this.queryParams.processid = row.process.id
        },
        getCurRow() {
            return this.curRow
        },
        setCurRow(row) {
            this.setProcessID(row)
            this.curRow = row
        },
        reloadGrid() {
            this.getLinkComponent(this.tableLink).setQueryParams(this.queryParams)
            this.getLinkComponent(this.tableLink).loadStore()
        }
    }
}
export default Grid
