import tjWindow from '@/components/common/window'
import pageDetail from './page/add-grid'
import { Authority,AuthorityProps } from '@/plugins/authority'

const Tbar = {
    extends: new TjUI.grid.defineTbar.DefineTbar(),
    mixins: [new Authority({key: 'defaultBtns'}),AuthorityProps],
    props: {
        moduleid: {
            type: String,
            default(){
                return this.getPanel.moduleid
            }
        }
    },
    data(){
        return {
            defaultBtns: [
                {text: '添加',name:'add',authority: ['write'],disabled:this.getPanel.type==='edit'?false:true,listeners: {click: this.doAdd}},
                {text: '删除',name:'delete',authority: ['write'],disabled:this.getPanel.type==='edit'?false:true,listeners: {click: this.doDelete}},
            ],
            userStyle: {
                'background-color': '#fff'
            }
        }
    },
    methods: {
        doAdd(){
            let detailWin = new tjWindow({panel: this,mainGrid: this.getPanel,title: '详情-添加',height: 500,width: 1000})
            detailWin.add(pageDetail)
            detailWin.show()
        },
        doDelete(){
            if(!this.getPanel.getStore().length){
                this.$message({type: 'warning',duration:1500,message: '警告，请先添加数据!'});
                return
            }
            let processID = this.getPanel.curRow.process.id
            let detailID = this.getPanel.currentRow['contracttenderid']
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api['project/contract/apply/deleteTender']({processid:processID,id: detailID,token: this.$store.getters['user/getToken']}).then(resData=>{
                    this.$message({type: 'success',duration:1000,message: '操作成功!'});
                    this.getPanel.reloadGrid()
                })
            }).catch(() => {});
        },
    }
}
export default Tbar