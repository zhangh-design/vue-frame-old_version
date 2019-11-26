import editDetail from './edit-detail'

const EditPanel = {
    extends: new TjUI.panel.Panel(),
    props: ['mainPanel','mainGrid','window','type','row','moduleid','tabName'],
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
            let center = {
                component: editDetail,
                props: {
                    mainPanel: this.mainPanel,
                    mainGrid: this.mainGrid,
                    window: this.window,
                    editPanel: this,
                    row: this.row,
                    moduleid: this.moduleid,
                    tabName: this.tabName,
                },
                slot: 'center'
            }
            this.add(center)
        },
        getPageGrid(){
            return this.getLinkComponent(this.editGridLink)
        }
    }
}
export default EditPanel