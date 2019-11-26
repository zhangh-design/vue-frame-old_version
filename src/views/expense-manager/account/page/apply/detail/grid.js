/**
 * 包信息grid
 */
import detailTbar from './tbar'
import editDetail from './page/edit-detail'
import _forIn from 'lodash/forIn'

const Grid = {
    extends: new TjUI.grid.Grid(),
    props: ['row','type','moduleid'],
    data(){
        return {
            curModuleId: this.moduleid,
            curRow: null,
            conurl: 'expense/account/apply/readDetail',
            isReloadGrid: false,
            processID: 0,
            contractID: 0,   //合同id
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: ''
            },
            selMode: 'simple',
            tbar: detailTbar,
            detailPanel: editDetail,
            isReloadGrid: this.type === 'add' ? false : true,
            columns: [
                {label:'用途',field:'sort'},
                {label:'发生时间',field:'begintime',sort: true},
                {label:'金额(元)',field:'pay'},
                {label:'发票张数',field:'num'},
                {label:'说明',field:'remark'}
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
                this.processID = this.curRow.process.id
                this.contractID = this.curRow.id
            }
        },
        setProcessID(row){
            this.queryParams.processid = row.process.id
            this.processID = row.process.id
        },
        setConractID(row){
            this.contractID = row.id 
        },
        getCurRow(){
            return this.curRow
        },
        setCurRow(row){
            this.setProcessID(row)
            this.setConractID(row)
            this.curRow = row
        },
        reloadGrid(){
            this.getLinkComponent(this.tableLink).setQueryParams(this.queryParams)
			this.getLinkComponent(this.tableLink).loadStore()
        }
    }
}
export default Grid