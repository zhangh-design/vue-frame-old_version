import editDetail from './edit-detail'
import addDetail from './add-detail'

const EditPanel = {
    extends: new TjUI.panel.Panel(),
    props: ['moduleid','mainPanel','mainGrid','window','type','row','tabName'],
    data(){
        return {
            curMoudleid: this.moduleid,
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
                slot: 'center'
            }
            this.add(north)
        }
    }
}
export default EditPanel