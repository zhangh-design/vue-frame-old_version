/**
 * 包信息grid
 */
const Grid = {
    extends: new TjUI.grid.Grid(),
    props: ['row','moduleid'],
    data(){
        return {
            curRow: this.row,
            curModuleId: this.moduleid,
            conurl: 'expense/account/finance/readDetail',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id,
            },
            selMode: 'simple',
            columns: [
                {label:'用途',field:'sort'},
                {label:'发生时间',field:'begintime',sort: true},
                {label:'金额(元)',field:'pay'},
                {label:'发票张数',field:'num'},
                {label:'说明',field:'remark'}
            ],
        }
    }
}
export default Grid