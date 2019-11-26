/**
 * 项目预算 tbar工具栏
 */
import detailPanel from './add-detail'
import tjWindow from '@/components/common/window'
import { Authority,AuthorityProps } from '@/plugins/authority'

const Tbar = {
    extends: new TjUI.grid.defineTbar.DefineTbar(),
    mixins: [new Authority({key: 'defaultBtns'}),AuthorityProps],
    props: {
        moduleid: {
            type: String,
            default(){
                return this.getPanel.setUpApplyEditPanel.curModuleid
            }
        }
    },
    data(){
        return {
            defaultBtns: [
                {text: '添加',authority: ['write'],name:'add',listeners: {click: this.doAdd}},
                {text: '删除',authority: ['write'],name:'delete',listeners: {click: this.doDelete}},
            ],
            userStyle: {
                'background-color': '#fff'
            }
        }
    },
    methods: {
        doAdd(){
            let detailWin = new tjWindow({panel: this,mainGrid: this.getPanel,title: '里历程碑信息-添加',height: 300,width: 640})
            detailWin.add(detailPanel)
            detailWin.show()
        },
        doDelete(){
            if(!this.getPanel.getStore().length){
                this.$message({type: 'warning',duration:1000,message: '请先添加数据!'});
                return
            }
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let processID = this.getPanel.setUpApplyEditPanel.curRow.process.id
                this.$api['project/setup/apply/deleteMilestone']({processid: processID,id: this.record.id,token: this.$store.getters['user/getToken']}).then(resData=>{
                    this.getPanel.reloadGrid()
                })
            }).catch(() => {});
        },
    }
}
export default Tbar
