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
                return this.getPanel.mainGrid.moduleid
            }
        }
    },
    data(){
        return {
            defaultBtns: this.getPanel.mainPanel._type==='bidsfile'?[{text: '下载',name:'down',listeners: {click: this.doDown}}]:[
                {text: '上传',name:'upload',margin:'0px 10px 0px 0px',authority: ['write'],type: 'FileBox',
                action: `${ajaxBaseURL}/project/tender/dispose/detail/${this.getPanel.mainGrid.row.process.id}/${this.getPanel.mainPanel.record.id}/tender`,
                data:{
                    token: this.$store.getters['user/getToken'],
                },
                listeners: {
                    'on-success': this.onSuccess
                }},
                {text: '下载',name:'down',listeners: {click: this.doDown}},
                {text: '删除',authority: ['write'],name:'delete',link:'',listeners: {click: this.doDelete}},
            ],
            userStyle: {
                'background-color': '#fff'
            }
        }
    },
    mounted(){},
    methods: {
        onSuccess(){
            this.getPanel.reloadGrid()
        },
        doDown(){
            if(!this.getPanel.getStore().length){
                this.$message({type: 'warning',duration:1000,message: '请先上传文件!'});
                return
            }
            let fileName = this.getPanel.getSelectedRow()['name']
            let processID = this.getPanel.mainGrid.row.process.id
            let detailID = this.getPanel.mainPanel.record.id
            var a = document.createElement("a");
            a.setAttribute("style","display:none;");
            if(this.getPanel.mainPanel._type==='bidsfile'){
                a.href = `${ajaxBaseURL}/project/tender/dispose/detail/${processID}/${detailID}/bids?name=${fileName}&token=${this.$store.getters['user/getToken']}`;
            }else{
                a.href = `${ajaxBaseURL}/project/tender/dispose/detail/${processID}/${detailID}/tender?name=${fileName}&token=${this.$store.getters['user/getToken']}`;
            }
            a.download = "download";
            a.click();
        },
        doDelete(){
            if(!this.getPanel.getStore().length){
                this.$message({type: 'warning',duration:1000,message: '请先上传文件!'});
                return
            }
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let fileName = this.getPanel.getSelectedRow()['name']
                let processID = this.getPanel.mainGrid.row.process.id
                let detailID = this.getPanel.mainPanel.record.id
                this.$api['project/tender/dispose/deleteTenderFile']({processid:processID,id: detailID,name: fileName,token: this.$store.getters['user/getToken']}).then(resData=>{
                    this.$message({type: 'success',duration:1000,message: '操作成功!'});
                    this.getPanel.reloadGrid()
                })
            }).catch(() => {});
        }
    }
}
export default Tbar