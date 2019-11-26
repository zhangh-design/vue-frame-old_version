/**
 * 出差补贴
 */
import subsidyTbar from './subsidy/tbar'
import editDetail from './subsidy/edit-detail'

const SubsidyGrid = {
    extends: new TjUI.grid.Grid(),
    props: {
        setUpApplyEditPanel: {
            type: Object,
            default: null
        },
        type: {
            type: String,
            default: 'edit'
        },
        row: {
            type: Object,
            default: null
        },
        moduleid: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            conurl: 'expense/travel/apply/readApplySubsidyPage',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: ''
            },
            selMode: 'simple',
            tbar: subsidyTbar,
            detailPanel: editDetail,
            isReloadGrid: this.type === 'add' ? false : true,
            columns: [
                {label: '出差地', field: 'address'},
                {label: '出差天数', field: 'howday'},
                {label: '出差补助(元)', field: 'expense'},
                {label: '住宿费(元)', field: 'roomexpense'},
                {label: '住宿费张数', field: 'roomnum'},
                {label: '市内交通费(元)', field: 'vehicleexpense'},
                {label: '市内交通费张数', field: 'vehiclenum'},
                {label: '其他费用(元)', field: 'otherexpense'},
                {label: '其他费用张数', field: 'othernum'},
                {label: '备注', field: 'remark'},
            ],
        }
    },
    mounted() {
        if (this.setUpApplyEditPanel.curRow !== null ) {
            this.queryParams.processid = this.setUpApplyEditPanel.curRow.process.id
        }
    },
    methods: {
        reloadGrid() {
            if (this.setUpApplyEditPanel.curRow !== null) {
                this.setQueryParams({
                    token: this.$store.getters['user/getToken'],
                    processid: this.setUpApplyEditPanel.curRow.process.id
                })
                !!this.getLinkComponent(this.tableLink) && this.getLinkComponent(this.tableLink).loadStore()
            }
        }
    }
}
export default SubsidyGrid
