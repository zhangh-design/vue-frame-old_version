import editDetail from './edit-detail'
import addDetail from './add-detail'
import tabGrid from './page'

const EditPanel = {
    extends: new TjUI.panel.Panel(),
    props: ['moduleid','mainPanel','mainGrid','window','type','row'],
    /* props: {
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
        }
    }, */
    data(){
        return {
            curRow: this.row,
            curType: this.type,
            curMoudleid: this.moduleid,
            layout: 'border',
            // html: `${this._uid}`
        }
    },
    mounted(){
        this.initEditPanel()
    },
    methods: {
        initEditPanel(){
            var height = '';
            if(document.body.clientHeight < 650){
                height = '228px';
            }else{
                height = '368px';
            }
            let north = {
                component: this.type==='edit' ? editDetail : addDetail,
               // component:addDetail,
                props: {
                    mainPanel: this.mainPanel,
                    mainGrid: this.mainGrid,
                    window: this.window,
                    moduleid: this.moduleid,
                    row: this.row,
                    editPanel: this,
                },
                style: {
                    height: height
                },
                slot: 'north'
            }
            let center = {
                component: tabGrid,
                props: {
                    link: this.editGridLink,
                    setUpApplyEditPanel: this,
                    type: this.type,
                    moduleid: this.moduleid,
                    row: this.row
                },
                style: {
                    'background-color': '#f2f4f8'
                },
                slot: 'center'
            }
            this.add([north,center])
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
