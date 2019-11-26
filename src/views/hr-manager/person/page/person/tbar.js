/**
 * 工具栏
 */
import detailPanel from './detail'
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
                {text: '添加',name:'add',authority: ['write'],listeners: {click: this.doAdd}},
                {text: '删除',name:'delete',condition: [0],authority: ['write'],listeners: {click: this.doDelete}},
                {text: '启用',name:'archive',condition: [0,2],authority: ['write'],listeners: {click: this.doEnable}},
                {text: '作废',name:'discard',condition: [1],authority: ['write'],listeners: {click: this.doDiscard}},
                {text: '同步人员',name:'sanme',authority: ['write'],listeners: {click: this.doSame}},
            ],
            userStyle: {
                'background-color': '#fff'
            }
        }
    },
    methods: {
        doSame(){
            if(!this.getPanel.getStore().length){
                this.$message({type: 'warning',duration:1000,message: '请先添加数据!'});
                return
            }
            this.$api['hr/person/person/sanmePerson']({id: this.record.id,token: this.$store.getters['user/getToken']}).then(resData=>{
                if(resData.code == '200'){
                    this.$message({type: 'success', message: '同步成功!'});
                }
                this.getPanel.reloadGrid()
            })
        },
        doAdd(){
            detailPanel.defaults = {
                mainPanel: this,
                mainGrid: this.getPanel,
                window: null,
                type: 'add',
                row: null,
                moduleid: this.moduleid
            }
            this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '添加',name: `hr/person/person/detail-add`},detailPanel)
        },
        doDelete(){
            if(!this.getPanel.getStore().length){
                this.$message({type: 'warning',duration:1000,message: '请先添加数据!'});
                return
            }
            if(this.record.flag !== 0){
                this.$message({type: 'warning',duration:1000,message: '员工状态无法删除!'});
                return
            }
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api['hr/person/person/deletePerson']({id: this.record.id,token: this.$store.getters['user/getToken']}).then(resData=>{
                    this.getPanel.reloadGrid()
                })
            }).catch(() => {});
        },
        doEnable(){
            if(!this.getPanel.getStore().length){
                this.$message({type: 'warning',duration:1000,message: '请先添加数据!'});
                return
            }
            this.$api['hr/person/person/setEnable']({id: this.record.id,token: this.$store.getters['user/getToken']}).then(resData=>{
                this.getPanel.reloadGrid()
            })
        },
        doDiscard(){
            if(!this.getPanel.getStore().length){
                this.$message({type: 'warning',duration:1000,message: '请先添加数据!'});
                return
            }
            this.$api['hr/person/person/setDiscard']({id: this.record.id,token: this.$store.getters['user/getToken']}).then(resData=>{
                this.getPanel.reloadGrid()
            })
        }
    }
}
export default Tbar
