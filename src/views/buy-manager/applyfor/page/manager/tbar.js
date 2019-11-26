/**
 * 工具栏
 */
import detailPanel from './detail'
import processDetail from '@/components/process-card'

const Tbar = {
    extends: new TjUI.grid.defineTbar.DefineTbar(),
    data(){
        return {
            defaultBtns: [
                {text: '流程详情', name: 'process', style: 'float:right', listeners: {click: this.doProcessDetail}}
            ],
            userStyle: {
                'background-color': '#fff'
            }
        }
    },
    methods: {
        doProcessDetail() {
            if (!this.getPanel.getStore().length) {
                this.$message({type: 'warning', duration: 1000, message: '请先添加数据!'});
                return
            }
            if (this.record.process.processcode != null) {
                let processPanel = new processDetail
                processPanel.defaults = {
                    imgconurl: 'buy/applyfor/manager',
                    dataconurl: `buy/applyfor/manager/doStep`,
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.record.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({
                    title: '流程记录',
                    name: `buy/applyfor/manager/detail-edit-${this.record.id}-process`
                }, processPanel)
            } else {
                this.$message({type: 'success', message: '当前步骤没有流程!'});
            }
        },
    }
}
export default Tbar
