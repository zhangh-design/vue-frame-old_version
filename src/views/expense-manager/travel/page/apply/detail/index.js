import editDetail from './edit-detail'
import addDetail from './add-detail'
import tabGrid from './page'

const EditPanel = {
    extends: new TjUI.panel.Panel(),
    props: ['mainPanel', 'mainGrid', 'window', 'type', 'row', 'moduleid','tabName'],
    data() {
        return {
            curRow: this.row,
            curModuleid: this.moduleid,
            layout: 'border',
        }
    },
    mounted() {
        this.initEditPanel()
    },
    methods: {
        initEditPanel() {
            let north = {
                component: this.type === 'edit' ? editDetail : addDetail,
                props: {
                    mainPanel: this.mainPanel,
                    mainGrid: this.mainGrid,
                    window: this.window,
                    editPanel: this,
                    row: this.row,
                    moduleid: this.moduleid,
                    tabName: this.tabName,
                },
                style: {
                    height: '260px'
                },
                slot: 'north'
            }
            let center = {
                component: tabGrid,
                props: {
                    link: this.editGridLink,
                    setUpApplyEditPanel: this,
                    type: this.type,
                    row: this.row,
                    moduleid: this.moduleid
                },
                style: {
                    'background-color': '#f2f4f8'
                },
                slot: 'center'
            }
            this.add([north, center])
        },
        setCurRow(row) {
            this.curRow = row
        },
        getCurRow() {
            return this.curRow
        }
    }
}
export default EditPanel
