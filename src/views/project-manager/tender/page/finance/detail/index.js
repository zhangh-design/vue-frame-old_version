import editDetail from './edit-detail'
import editGrid from './grid'

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
            let north = {
                component: editDetail,
                props: {
                    mainPanel: this.mainPanel,
                    mainGrid: this.mainGrid,
                    window: this.window,
                    moduleid: this.moduleid,
                    row: this.row,
                    tabName: this.tabName,
                },
                style: {
                    'background-color':'#fff',
                    height: '275px'
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
            this.add([north,center])
        }
    }
}
export default EditPanel