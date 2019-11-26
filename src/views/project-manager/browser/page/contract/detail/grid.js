/**
 * 包信息grid
 */
import {apply} from '@/utils/tools'
import _forIn from 'lodash/forIn'

const Grid = {
    extends: new TjUI.grid.Grid(),
    props: ['row', 'type', 'link'],
    data() {
        return {
            curRow: null,
            conurl: 'project/browser/contract/readContractTenderPage',
            processID: 0,
            contractID: 0,   //合同id
            queryParams: {
                token: this.$store.getters['user/getToken'],
                pid: ''
            },
            selMode: 'simple',
            loadFilter: this.doLoadFilter,
            columns: [
                {label: '编号', field: 'name'},
                {label: '招标地区', field: 'area'},
                {label: '投标时间', field: 'tendertime', sort: true},
                {label: '包-编号', field: 'd-code'},
                {label: '包号', field: 'd-packagenum'},
                {label: '包名', field: 'd-packagename'},
                {label: '类型', field: 'd-sort'},
                {label: '预计费用', field: 'd-plancost'},
                {label: '标书费用', field: 'd-charge'},
                {label: '投标保证金', field: 'd-deposit'},
                {label: '中标服务费', field: 'd-cost'},
                {label: '中标信息', field: 'd-flag'},
            ],
        }
    },
    created() {
        this.queryParams.pid = this.row.id;
    },
    mounted() {},
    methods: {
        initProcessID() {
            if (!!this.row) {
                !(!!this.curRow) && (this.curRow = this.row)
                this.queryParams.processid = this.curRow.process.id
                this.queryParams.pid = this.row.id
                this.processID = this.curRow.process.id
                this.contractID = this.curRow.id
            }
        },
        setProcessID(row) {
            this.queryParams.processid = row.process.id
            this.processID = row.process.id
        },
        setConractID(row) {
            this.contractID = row.id
        },
        getCurRow() {
            return this.curRow
        },
        setCurRow(row) {
            this.setProcessID(row)
            this.setConractID(row)
            this.curRow = row
        },
        reloadGrid() {
            this.getLinkComponent(this.tableLink).setQueryParams(this.queryParams)
            this.getLinkComponent(this.tableLink).loadStore()
        },
        doLoadFilter(resData) {
            let content = []
            resData.data.content.forEach(item => {
                let row = {...item.view.tender, ...{contracttenderid: item.id}}
                let detail = {}
                _forIn(item.view.detail, (value, key) => {
                    apply(detail, {['d-' + key]: value})
                })
                apply(row, detail)
                content.push(row)
            })
            resData.data.content = content
            return resData
        }
    }
}
export default Grid