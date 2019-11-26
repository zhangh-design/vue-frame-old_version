/**
 * 工具栏
 */
const Tbar = {
    extends: new TjUI.grid.defineTbar.DefineTbar(),
    data(){
        return {
            defaultBtns: [],
            items: [{text: '提交',listeners: {click: this.doConfirm}}],
            userStyle: {
                'background-color': '#fff'
            }
        }
    },
    mounted(){},
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