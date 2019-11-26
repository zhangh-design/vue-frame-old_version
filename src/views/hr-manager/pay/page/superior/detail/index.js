import editDetail from './edit-detail'
import editGrid from './page'

const EditPanel = {
    extends: new TjUI.panel.Panel(),
    props: ['moduleid','mainPanel','mainGrid','window','type','row','tabName'],
    data(){
        return {
            layout: 'border',
            curRow: this.row,
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
                component: editGrid,
                props: {
                    link: this.editGridLink,
                    hrPayEditPanel: this,
                    mainPanel: this.mainPanel,
                    mainGrid: this.mainGrid,
                    window: this.window,
                    editPanel: this,
                    moduleid: this.moduleid,
                    type: this.type,
                    row: this.curRow,
                    tabName: this.tabName,
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