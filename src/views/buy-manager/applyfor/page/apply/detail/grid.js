/**
 * 包信息grid
 */
import dateformat from 'dateformat-util'
import detailTbar from './tbar'
import editItem from './page/edit-detail'

const Grid = {
    extends: new TjUI.grid.Grid(),
    props: ['row','type','moduleid'],
    data(){
        return {
            curRow: this.row,
            conurl: 'buy/applyfor/apply/readItem',
            processID: 0,
            curModuleId: this.moduleid,
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: ''
            },
            selMode: 'simple',
            tbar: detailTbar,
            detailPanel: editItem,
            isReloadGrid: this.type === 'add' ? false : true,
            columns: [
                {label:'物质名称',field:'name'},
                {label:'物资型号',field:'sort'},
                {label:'物质数量',field:'num'},
                {label:'单价',field:'unionprice'},
                {label:'金额(元)',field:'price'},
                {label:'说明',field:'remark'},
            ],
        }
    },
    mounted(){
        this.initProcessID()
    },
    methods:{
        initProcessID(){
            if(!!this.row){
                !(!!this.curRow) && (this.curRow = this.row)
                this.queryParams.processid = this.curRow.process.id
            }
        },
        setProcessID(row){
            this.queryParams.processid = row.process.id
        },
        getCurRow(){
            return this.curRow
        },
        setCurRow(row){
            this.setProcessID(row)
            this.curRow = row
        },
        reloadGrid(){
            this.getLinkComponent(this.tableLink).setQueryParams(this.queryParams)
			this.getLinkComponent(this.tableLink).loadStore()
        }
    }
}
export default Grid
