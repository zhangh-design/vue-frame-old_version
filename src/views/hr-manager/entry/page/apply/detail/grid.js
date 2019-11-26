/**
 * 包信息grid
 */
import dateformat from 'dateformat-util'
import detailTbar from './tbar'
//import editDetail from './page/edit-detail'

const Grid = {
    extends: new TjUI.grid.Grid(),
    props: ['row', 'type','moduleid'],
    data() {
        return {
            you: 'cccccccc',
            curModuleId: this.moduleid,
            curRow: null,
            curType:this.type,
            conurl: 'hr/entry/apply/readDetail',
            processID: 0,
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: ''
            },
            selMode: 'simple',
            tbar: detailTbar,
            //detailPanel: editDetail,
            isReloadGrid: this.type === 'add' ? false : true,
            columns: [
                {label: '员工姓名', field: 'personname'},
                {label: '社保基数(元)', field: 'socialbase'},
                {label: '基本工资(元)', field: 'basepay'},
                {label: '绩效工资(元)', field: 'meritpay'},
                {label: '通讯补贴(元)', field: 'commsub'},
                {label: '交通补贴(元)', field: 'trafficsub'},
                {label: '住房补贴(元)', field: 'homesub'},
                {label: '其他补贴(元)', field: 'otherpay'},
                {label: '公积金调整(元)', field: 'homepay'},
                {label: '社保调整(元)', field: 'socialpay'},
                {label: '其他代缴(元)', field: 'otherpay'},
                {label: '变更日期', field: 'changedtime'},
                {label: '变更原因', field: 'reason'},
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
