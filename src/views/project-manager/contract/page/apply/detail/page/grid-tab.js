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
            if(!this.getPanel.getStore().length || !this.getPanel.getSelectedRows().length){
                this.$message({type: 'warning',duration:1000,message: '请先勾选数据!'});
                return;
            }
            this.$confirm('此操作将提交该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let contractID = this.getPanel.mainPanel.getPanel.contractID
                let processID = this.getPanel.mainPanel.getPanel.processID
                let times = this.getPanel.getSelectedRows().length
                let num = 0
                this.getPanel.getSelectedRows().forEach(element => {
                    this.$api['project/contract/apply/insertTender']({processid:processID,pid:contractID,tenderdetail:element['d-id'],token: this.$store.getters['user/getToken']}).then(resData=>{
                        this.$message({type: 'success',duration:1000,message: '提交成功!'});
                        num++
                        (num===times) && this.doLoadGrid()
                    }).catch(error=>{
                        num++
                        (num===times) && this.doLoadGrid()
                    })
                });
            }).catch(() => {});
        },
        doLoadGrid(){
            this.getPanel.mainPanel.getPanel.reloadGrid()
            this.getPanel.window.close()
        }
    }
}
export default Tbar