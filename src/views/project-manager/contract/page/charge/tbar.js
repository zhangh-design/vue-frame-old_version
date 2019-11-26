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
                {text: '流程详情',name:'process',style:'float:right',listeners: {click: this.readDetail}}
            ],
            userStyle: {
                'background-color': '#fff'
            }
        }
    },
    methods: {
        readDetail(){
            if(!this.record.process){
                this.$message({type: 'success', message: '请先选中数据!'});
                return;
            }
            if(this.record.process.processcode!=null){
                let processPanel = new processDetail
                processPanel.defaults = {
                    imgconurl: 'project/contract/charge',
                    dataconurl: 'project/contract/charge/doStep',
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.record.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `contract/charge/detail-edit-${this.record.id}-process`},processPanel)
            }else{
                this.$message({type: 'success', message: '当前步骤没有流程!'});
            }
        },
    }
}
export default Tbar