/**
 * 文件上传列表 按钮工具栏
 */
import {ajaxBaseURL} from "@/config/env";

const Tbar = {
    extends: new TjUI.grid.defineTbar.DefineTbar(),
    data() {
        return {
            defaultBtns: [
                {text: '下载', name: 'down', listeners: {click: this.doDown}},
            ],
            userStyle: {
                'background-color': '#fff'
            }
        }
    },
    mounted() {
    },
    methods: {
        //上传文件成功
        onSuccess(data) {
            this.getPanel.reloadGrid()
        },
        doDown() {
            if (!this.getPanel.getStore().length) {
                this.$message({type: 'warning', duration: 1000, message: '请先上传文件!'});
                return
            }
            let fileName = this.getPanel.getSelectedRow()['name']
            let id = this.getPanel.mainPanel.record.id
            //let detailID = this.getPanel.mainPanel.record.id
            /* var a = document.createElement("a");
            a.setAttribute("style", "display:none;");
            a.href = `${ajaxBaseURL}/project/contract/query/${id}/accessor?name=${fileName}&token=${this.$store.getters['user/getToken']}`;
            a.download = "download";
            a.click(); */
            window.open(`${ajaxBaseURL}/project/contract/query/${id}/accessor?name=${encodeURIComponent(fileName)}&token=${this.$store.getters['user/getToken']}`, '_self');
        },
        doDelete() {
            if (!this.getPanel.getStore().length) {
                this.$message({type: 'warning', duration: 1000, message: '请先上传文件!'});
                return
            }
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let fileName = this.getPanel.getSelectedRow()['name']
                // let processID = this.getPanel.mainGrid.currentRow.process.id
                let processID = this.getPanel.mainPanel.processID
                this.$api['project/contract/apply/deleteContractFile']({
                    processid: processID,
                    name: fileName,
                    token: this.$store.getters['user/getToken']
                }).then(resData => {
                    this.$message({type: 'success', duration: 1000, message: '操作成功!'});
                    this.getPanel.reloadGrid()
                })
            }).catch(() => {
            });
        }
    }
}
export default Tbar
