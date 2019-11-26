import editDetail from './edit-detail'

const EditPanel = {
    extends: new TjUI.panel.Panel(),
    props: ['mainPanel', 'mainGrid', 'window', 'type', 'row', 'moduleid', 'tabName'],
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
                component: editDetail,
                props: {
                    mainPanel: this.mainPanel,
                    mainGrid: this.mainGrid,
                    window: this.window,
                    editPanel: this,
                    row: this.row,
                    tabName: this.tabName,
                    moduleid: this.moduleid,
                },
                slot: 'center'
            }
            this.add([north])
        },
        getPageGrid() {
            return this.getLinkComponent(this.editGridLink)
        }
    }
}
export default EditPanel