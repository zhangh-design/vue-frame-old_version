import editDetail from './edit-detail'
import editGrid from './grid-edit'

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
                component: editDetail,
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
                    height: '365px'
                },
                slot: 'north'
            }
            let center = {
                component:  editGrid,
                props: {
                    link: this.editGridLink,
                    mainPanel: this.mainPanel,
                    editPanel: this,
                    aaa: this,
                    mainGrid: this.mainGrid,
                    moduleid: this.moduleid,
                    row: this.row,
                    type:this.type,
                },
                style: {
                    //height: '265px'
                },
                slot: 'center'
            }
            this.add([center,north])
        },
        getPageGrid(){
            return this.getLinkComponent(this.editGridLink)
        }
    }
}
export default EditPanel