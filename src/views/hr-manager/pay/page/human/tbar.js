/**
 * 工具栏
 */
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
                {text: '流程详情',name:'process',style:'float:right',listeners: {click: this.doProcessDetail}}
            ],
            userStyle: {
                'background-color': '#fff'
            }
        }
    },
    methods: {
        doProcessDetail(){
            if(!this.getPanel.getStore().length){
                this.$message({type: 'warning',duration:1000,message: '请先添加数据!'});
                return
            }
            if(this.record.process.processcode!=null){
                let processPanel = new processDetail
                processPanel.defaults = {
                    imgconurl: 'hr/payorder/human',
                    dataconurl: 'hr/payorder/human/doStep',
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.record.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `hr/pay/human/detail-edit-${this.record.id}-process`},processPanel)
            }else{
                this.$message({type: 'success', message: '当前步骤没有流程!'});
            }
        }
    }
}
export default Tbar