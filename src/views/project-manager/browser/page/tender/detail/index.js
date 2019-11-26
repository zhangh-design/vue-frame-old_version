import editDetail from './edit-detail'
import editGrid from './grid'

const EditPanel = {
    extends: new TjUI.panel.Panel(),
    props: ['mainPanel','mainGrid','window',"type","row"],
    data(){
        return {
            layout: 'border'
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
                    window: this.window
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
                    row:this.row
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