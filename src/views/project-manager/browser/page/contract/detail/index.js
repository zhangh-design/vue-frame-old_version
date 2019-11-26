import editDetail from './edit-detail'
import editGrid from './grid'

const EditPanel = {
    extends: new TjUI.panel.Panel(),
    props: ['mainPanel', 'mainGrid', 'window', "type", "row"],
    data() {
        return {
            layout: 'border',
            editGridLink: `link-editGrid-${this._uid}`,
            curRow: this.row
        }
    },
    mounted() {
        this.initEditPanel()
    },
    methods: {
        initEditPanel() {
            let north = {
                component: editDetail,
                props: {
                    mainPanel: this.mainPanel,
                    mainGrid: this.mainGrid,
                    window: this.window,
                    editPanel: this
                },
                style: {
                    // 'background-color': '#fff',
                    height: '190px'
                },
                slot: 'north'
            }
            let center = {
                component: editGrid,
                props: {
                    link: this.editGridLink,
                    row: this.row,
                    type: this.type
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
