import editDetail from './edit-detail'
import addDetail from './add-detail'
import editGrid from './grid-edit'
import addGrid from './grid-add'

const EditPanel = {
    extends: new TjUI.panel.Panel(),
    props: ['moduleid','mainPanel','mainGrid','window','type','row','tabName'],
    data(){
        return {
            you:'iiiiiii',
            curRow:this.row,
            layout: 'border',
            editGridLink: `link-editGrid-${this._uid}`,
            detailGridLink: `link-detailGrid-${this._uid}`,
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
                props: {
                    link:this.detailGridLink,
                    mainPanel: this.mainPanel,
                    mainGrid: this.mainGrid,
                    window: this.window,
                    editPanel: this,
                    type:this.type,
                    moduleid: this.moduleid,
                    row: this.row,
                    tabName: this.tabName,
                },
                style: {
                    height: height
                },
                slot: 'north'
            }
            let center = {
                component: this.type==='edit' ? editGrid : addGrid,
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
        },
        getDetailGrid(){
            return this.getLinkComponent(this.detailGridLink)
        }
    }
}
export default EditPanel