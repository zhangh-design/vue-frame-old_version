import editDetail from './edit-detail'
import addDetail from './add-detail'
import tabGrid from './page'

const EditPanel = {
    extends: new TjUI.panel.Panel(),
    props: {
        mainPanel: {
            type: Object,
            default: null
        },
        mainGrid: {
            type: Object,
            default: null
        },
        window: {
            type: Object,
            default: null
        },
        type: {
            type: String,
            default: 'edit'
        },
        row: {
            type: Object,
            default: null
        },
        moduleid: {
            type: String,
            default: ''
        },
        tabName: {
            type: String,
            default: '' 
        }
    },
    data(){
        return {
            layout: 'border',
            //tip：需要定义本地row,如果使用this.row 则对象会指向最后一个
            curRow: this.row,
            curType: this.type,
            curTabName: this.tabName,
            curModuleid: this.moduleid,
            detailLink: `budgetLink-${this._uid}`
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
                    moduleid: this.curModuleid,
                    row: this.row,
                    tabName: this.curTabName,
                    link: this.detailLink,
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
                    row: this.row,
                    moduleid: this.curModuleid,
                },
                style: {
                    'background-color': '#f2f4f8'
                },
                slot: 'center'
            }
            this.add([north, center])
        },
        setCurRow(row){
            this.curRow = row
        },
        getCurRow(){
            return this.curRow
        }
    }
}
export default EditPanel
