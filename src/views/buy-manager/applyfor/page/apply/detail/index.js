import editDetail from './edit-detail'
import addDetail from './add-detail'
import editGrid from './grid'

const EditPanel = {
    extends: new TjUI.panel.Panel(),
    props: ['mainPanel', 'mainGrid', 'window', 'type', 'row','moduleid','tabName'],
    data() {
        return {
            layout: 'border',
            editGridLink: `link-editGrid-${this._uid}`
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
                    height: '300px'
                },
                slot: 'north'
            }
            let center = {
                component: editGrid,
                props: {
                    link: this.editGridLink,
                    row: this.row,
                    type: this.type,
                    moduleid: this.moduleid,
                },
                style: {
                    'background-color': '#f2f4f8'
                },
                slot: 'center'
            }
            this.add([north, center])
        },
        getPageGrid() {
            return this.getLinkComponent(this.editGridLink)
        }
    }
}
export default EditPanel
