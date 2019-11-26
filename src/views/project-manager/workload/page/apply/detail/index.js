import editDetail from './edit-detail'
import addDetail from './add-detail'
import editGrid from './grid'

const EditPanel = {
    extends: new TjUI.panel.Panel(),
    props: ['moduleid','mainPanel','mainGrid','window','type','row','tabName'],
    data(){
        return {
            layout: 'border',
            editGridLink: `link-editGrid-${this._uid}`
        }
    },
    mounted(){
        this.initEditPanel()
    },
    methods: {
        initEditPanel(){
            let north = {
                component: this.type==='edit' ? editDetail : addDetail,
                props: {
                    mainPanel: this.mainPanel,
                    mainGrid: this.mainGrid,
                    window: this.window,
                    editPanel: this,
                    moduleid: this.moduleid,
                    row: this.row,
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
                    row: this.row,
                    type: this.type,
                    moduleid: this.moduleid,
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