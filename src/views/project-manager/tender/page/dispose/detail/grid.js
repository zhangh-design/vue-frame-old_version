/**
 * 包信息grid
 */
import dateformat from 'dateformat-util'
import editDetail from './page/edit-detail'

const Grid = {
    extends: new TjUI.grid.Grid(),
    props: ['row','moduleid'],
    data(){
        return {
            curRow: this.row,
            conurl: 'project/tender/dispose/readDetail',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id,
            },
            selMode: 'simple',
            detailPanel: editDetail,
            columns: [
                {label:'编号',field:'code'},
                {label: '包号',field: 'packagenum'},
				{label: '包名',field: 'packagename'},
                {label:'类型',field:'sort'},
                {label:'预计费用(万)',field:'plancost'},
                {label:'标书费用(万)',field:'charge'},
                {label:'投标保证金(万)',field:'deposit'},
                {label:'中标服务费(万)',field:'cost'},
                // {label:'投标文件',field:'tenderfile'},
                {field: 'flag',label: '中标信息'},
            ],
        }
    },
    methods: {}
}
export default Grid