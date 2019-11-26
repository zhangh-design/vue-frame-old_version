/**
 * 工具栏
 */
import { Authority,AuthorityProps } from '@/plugins/authority'

const Tbar = {
    extends: new TjUI.grid.defineTbar.DefineTbar(),
    mixins: [new Authority({key: 'items'}),AuthorityProps],
    props: {
        moduleid: {
            type: String,
            default(){
                return this.getPanel.mainPanel.curMoudleid
            }
        }
    },
    data(){
        return {
            defaultBtns: [],
            items: [{text: '提交',authority: ['write'],listeners: {click: this.doConfirm}}],
            userStyle: {
                'background-color': '#fff'
            }
        }
    },
    mounted(){
        console.log(this.getPanel.mainPanel.curMoudleid)
    },
    methods: {
        doConfirm(){
            if(!this.getPanel.getStore().length){
                this.$message({type: 'warning',duration:1000,message: '请先勾选数据!'});
                return;
            }
            this.getPanel.mainPanel.setSelectProjectinfo(this.getPanel.getSelectedRow())
            this.getPanel.window.close()
        }
    }
}
export default Tbar