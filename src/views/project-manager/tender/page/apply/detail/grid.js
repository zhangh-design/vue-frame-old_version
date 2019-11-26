/**
 * 包信息grid
 */
import dateformat from 'dateformat-util'
import detailTbar from './tbar'
import editDetail from './page/edit-detail'

const Grid = {
    extends: new TjUI.grid.Grid(),
    props: ['row', 'type','moduleid'],
    data() {
        return {
            curModuleId: this.moduleid,
            curRow: null,
            conurl: 'project/tender/apply/readDetail',
            processID: 0,
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: ''
            },
            selMode: 'simple',
            tbar: detailTbar,
            detailPanel: editDetail,
            isReloadGrid: this.type === 'add' ? false : true,
            columns: [
                {label: '编号', field: 'code'},
                {label: '包号', field: 'packagenum'},
                {label: '包名', field: 'packagename'},
                {label: '类型', field: 'sort'},
                {label: '预计费用(万)', field: 'plancost'},
                {label: '标书费用(万)', field: 'charge'},
                {label: '投标保证金(万)', field: 'deposit'},
                {label: '中标服务费(万)', field: 'cost'},
                // {label:'中标信息',field:'flag'},
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
