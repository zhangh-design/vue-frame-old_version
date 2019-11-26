/**
 * 包信息grid
 */
import dateformat from 'dateformat-util'
import checkDetail from './page/detail'

const Grid = {
    extends: new TjUI.grid.Grid(),
    props: ['row'],
    data() {
        return {
            curRow: this.row,
            conurl: 'project/browser/tender/readTenderDetailPage',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                pid: this.row.id,
            },
            selMode: 'simple',
            detailPanel: checkDetail,
            columns: [
                {label: '编号', field: 'code'},
                {label: '包号', field: 'packagenum'},
                {label: '包名', field: 'packagename'},
                {label: '类型', field: 'sort'},
                {label: '预计费用(万)', field: 'plancost'},
                {label: '标书费用(万)', field: 'charge'},
                {label: '投标保证金(万)', field: 'deposit'},
                {label: '中标服务费(万)', field: 'cost'},
                {label: '中标信息', field: 'flag'},
            ],
        }
    }
}
export default Grid
