import editDetail from './edit-detail'
import tabGrid from './page'

const EditPanel = {
    extends: new TjUI.panel.Panel(),
    props: ['mainPanel','mainGrid','window','type','row','moduleid','tabName'],
    data(){
        return {
            layout: 'border',
            curRow: this.row,
            curModuleid: this.moduleid,
            curTabName: this.tabName,
            editGridLink: `link-editGrid-${this._uid}`
        }
    },
    mounted(){
        this.initEditPanel()
    },
    methods: {
        initEditPanel(){
            let north = {
                component: editDetail,
                props: {
                    mainPanel: this.mainPanel,
                    mainGrid: this.mainGrid,
                    window: this.window,
                    editPanel: this,
                    moduleid: this.curModuleid,
                    row: this.row,
                    tabName: this.curTabName,
                },
                style: {
                    height: '265px'
                },
                slot: 'north'
            }
            let center = {
                component: tabGrid,
                props: {
                    link: this.editGridLink,
                    setUpApplyEditPanel: this,
                    type: this.type,
                },
                style: {
                    'background-color': '#f2f4f8'
                },
                slot: 'center'
            }
            this.add([north,center])
        },
        getPageGrid(){
            return this.getLinkComponent(this.editGridLink)
        }
    }
}
export default EditPanel
