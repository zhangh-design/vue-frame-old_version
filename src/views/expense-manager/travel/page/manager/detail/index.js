import editDetail from './edit-detail'
import tabGrid from './page'

const EditPanel = {
    extends: new TjUI.panel.Panel(),
    props: ['mainPanel', 'mainGrid', 'window', 'type', 'row','moduleid', 'tabName'],
    data() {
        return {
            curRow: this.row,
            layout: 'border',
        }
    },
    mounted() {
        this.initEditPanel()
    },
    methods: {
        initEditPanel() {
            let north = {
                component: editDetail ,
                props: {
                    mainPanel: this.mainPanel,
                    mainGrid: this.mainGrid,
                    window: this.window,
                    editPanel: this,
                    moduleid: this.moduleid,
                    row: this.curRow,
                    tabName: this.tabName,
                },
                style: {
                    height: '220px'
                },
                slot: 'north'
            }
            let center = {
                component: tabGrid,
                props: {
                    link: this.editGridLink,
                    setUpApplyEditPanel: this,
                    type: this.type,
                    moduleid: this.moduleid,
                    row: this.curRow
                },
                style: {
                    'background-color': '#f2f4f8'
                },
                slot: 'center'
            }
            this.add(this.type === 'edit' ? [north, center] : [north])
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
