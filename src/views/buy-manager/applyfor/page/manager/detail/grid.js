/**
 * 包信息grid
 */

const Grid = {
    extends: new TjUI.grid.Grid(),
    props: ['row','type'],
    data(){
        return {
            curRow: null,
            conurl: 'buy/applyfor/manager/readItem',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: !!this.row ? this.row.process.id : ''
            },
            selMode: 'simple',
            columns: [
                // {label:'PID',field:'pid'},
                {label:'物质名称',field:'name'},
                {label:'物资型号',field:'sort'},
                {label:'物质数量',field:'num'},
                {label:'单价',field:'unionprice'},
                {label:'金额(元)',field:'price'},
                {label:'说明',field:'remark'},
            ],
        }
    }
}
export default Grid
