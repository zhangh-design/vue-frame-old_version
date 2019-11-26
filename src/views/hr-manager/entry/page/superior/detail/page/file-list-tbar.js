/**
 * 文件上传列表 按钮工具栏
 */
import { ajaxBaseURL } from "@/config/env";
import { Authority,AuthorityProps } from '@/plugins/authority'

const Tbar = {
    extends: new TjUI.grid.defineTbar.DefineTbar(),
    mixins: [new Authority({key: 'defaultBtns'}),AuthorityProps],
    props: {
        moduleid: {
            type: String,
            default(){
                return this.getPanel.mainPanel.moduleid
            }
        }
    },
    data(){
        return {
            defaultBtns: [
                {text: '下载',name:'down',listeners: {click: this.doDown}},
            ],
            userStyle: {
                'background-color': '#fff'
            }
        }
    },
    mounted(){},
    methods: {
        //上传文件成功
        onSuccess(data){
            this.getPanel.reloadGrid()
        },
        doDown(){
            if(!this.getPanel.getStore().length){
                this.$message({type: 'warning',duration:1000,message: '请先上传文件!'});
                return
            }
            let fileName = this.getPanel.getSelectedRow()['name']
            let processID = this.getPanel.mainPanel.record.process.id
            let detailID = this.getPanel.mainPanel.record.id
            /* var a = document.createElement("a");
            a.setAttribute("style","display:none;");
            a.href = `${ajaxBaseURL}/hr/entry/superior/${processID}/accessor?name=${fileName}&token=${this.$store.getters['user/getToken']}`;
            a.download = "download";
            a.click(); */
            window.open(`${ajaxBaseURL}/hr/entry/superior/${processID}/accessor?name=${encodeURIComponent(fileName)}&token=${this.$store.getters['user/getToken']}`, '_self');
        },
    }
}
export default Tbar