import checkDetail from './check-detail'
import editGrid from './page/grid'

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
                component: checkDetail,
                props: {
                    mainPanel: this.mainPanel,
                    mainGrid: this.mainGrid,
                    window: this.window
                },
                style: {
                  //  'background-color':'#fff',
                    height: '230px'
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