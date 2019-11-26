/**
 * 工具栏
 */
import tjWindow from '@/components/common/window'
import pageDetail from './select'
import { Authority,AuthorityProps } from '@/plugins/authority'

const Tbar = {
    extends: new TjUI.grid.defineTbar.DefineTbar(),
    mixins: [new Authority({key: 'defaultBtns'}),AuthorityProps],
    data(){
        return {
            defaultBtns: [
                {text: '选择角色权限',name:'select',authority: ['write'],listeners: {click: this.doSelect}},
                {text: '删除',name:'delete',condition: [0],authority: ['write'],listeners: {click: this.doDelete}},
            ],
            
            userStyle: {
                'background-color': '#fff'
            }
        }
    },
    methods: {
        doSelect(){
            console.log(this.getPanel)
            let detailWin = new tjWindow({
                panel: this,
                mainGrid: this.getPanel,
                title: '角色权限分配',
                height: 140,
                width: 340
            })
            detailWin.add(pageDetail)
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
                this.$api['hr/person/person/deleteRole']({roleid: this.record.roleid,userid:this.record.userid,token: this.$store.getters['user/getToken']}).then(resData=>{
                    this.getPanel.reloadGrid()
                })
            }).catch(() => {});
        },
    }
}
export default Tbar
