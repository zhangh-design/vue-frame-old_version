/**
 * 文件上传列表 按钮工具栏
 */
import {ajaxBaseURL} from "@/config/env";
import {Authority, AuthorityProps} from '@/plugins/authority'

const Tbar = {
    extends: new TjUI.grid.defineTbar.DefineTbar(),
    mixins: [new Authority({key: 'defaultBtns'}), AuthorityProps],
    props: {
        moduleid: {
            type: String,
            default() {
                return this.getPanel.mainGrid.moduleid
            }
        }
    },
    data() {
        return {
            defaultBtns: this.getPanel.beforeUrl.indexOf("dispose") > -1 ? [
                {
                    text: '上传', name: 'upload', margin: '0px 10px 0px 0px', type: 'FileBox', authority: ['write'],
                    action: `${ajaxBaseURL}${this.getPanel.beforeUrl}${this.getPanel.mainPanel.processID}/accessor`,
                    data: {
                        token: this.$store.getters['user/getToken'],
                    },
                    listeners: {
                        'on-success': this.onSuccess
                    }
                },
                {text: '下载', name: 'down', listeners: {click: this.doDown}},
                {text: '删除', name: 'delete', authority: ['write'], link: '', listeners: {click: this.doDelete}},
            ] : [{text: '下载', name: 'down', listeners: {click: this.doDown}},],
            userStyle: {
                'background-color': '#fff'
            }
        }
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
            let processid = this.getPanel.mainPanel.record.process.id
            //let detailID = this.getPanel.mainPanel.record.id
            /* var a = document.createElement("a");
            a.setAttribute("style", "display:none;");
            a.href = `${ajaxBaseURL}${this.getPanel.beforeUrl}${processid}/accessor?name=${fileName}&token=${this.$store.getters['user/getToken']}`;
            a.download = "download";
            a.click(); */
            window.open(`${ajaxBaseURL}${this.getPanel.beforeUrl}${processid}/accessor?name=${encodeURIComponent(fileName)}&token=${this.$store.getters['user/getToken']}`, '_self');
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
                this.$api[`${this.getPanel.beforeUrl}deleteContractFile`]({
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
