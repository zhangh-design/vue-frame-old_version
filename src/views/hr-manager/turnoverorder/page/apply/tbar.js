/**
 * 工具栏
 */
import detailPanel from './detail'
import { Authority,AuthorityProps } from '@/plugins/authority'
import processDetail from '@/components/process-card'

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
                {text: '删除',name:'delete',authority: ['write'],listeners: {click: this.doDelete}},
                {text: '流程详情',name:'process',style:'float:right',listeners: {click: this.doProcessDetail}}
            ],
            userStyle: {
                'background-color': '#fff'
            }
        }
    },
    methods: {
        doAdd(){
            detailPanel.defaults = {
                mainPanel: this,
                mainGrid: this.getPanel,
                window: null,
                type: 'add',
            }
            this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '添加',name: `hr/turnoverorder/apply/detail-add`},detailPanel)
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
                this.$api['hr/turnoverorder/apply/deleteApply']({processid: this.record.process.id,token: this.$store.getters['user/getToken']}).then(resData=>{
                    this.getPanel.reloadGrid()
                })
            }).catch(() => {});
        },
        doProcessDetail(){
            if(!this.getPanel.getStore().length){
                this.$message({type: 'warning',duration:1000,message: '请先添加数据!'});
                return
            }
            if(this.record.process.processcode!=null){
                let processPanel = new processDetail
                processPanel.defaults = {
                    imgconurl: 'hr/turnoverorder/apply',
                    dataconurl: 'hr/turnoverorder/apply/doStep',
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.record.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `hr/turnoverorder/apply/detail-edit-${this.record.id}-process`},processPanel)
            }else{
                this.$message({type: 'success', message: '当前步骤没有流程!'});
            }
        }
    }
}
export default Tbar