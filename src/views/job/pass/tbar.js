/**
 * 工具栏
 */
import processDetail from '@/components/process-card'
import words from 'lodash/words'
import { CONST_DEFAULT_CONFIG } from '@/config'
import { isNotEmpty } from '@/utils/tools'

const Tbar = {
    extends: new TjUI.grid.defineTbar.DefineTbar(),
    data(){
        return {
            defaultBtns: [
                {text: '流程详情',name:'process',listeners: {click: this.doProcessDetail}}
            ],
            userStyle: {
                'background-color': '#fff'
            },
            workflowConurl: 'job/begin/getWorkFlow',
        }
    },
    methods: {
        doProcessDetail(){
            if(!this.getPanel.getStore().length){
                this.$message({type: 'warning',duration:1000,message: '请先添加数据!'});
                return
            }
            if(this.record.processcode!=null){
                this.$api[this.workflowConurl]({token: this.$store.getters['user/getToken'],processkey: this.record.processkey,taskkey: this.record.taskkey}).then(resData => {
                    let dataConurl = words(resData['data'][2])[0]+CONST_DEFAULT_CONFIG.sep+ words(resData['data'][2])[1].toLowerCase()+CONST_DEFAULT_CONFIG.sep+resData['data'][1]+CONST_DEFAULT_CONFIG.sep+'doStep'
                    let imgConurl = words(resData['data'][2])[0]+CONST_DEFAULT_CONFIG.sep+ words(resData['data'][2])[1].toLowerCase()+CONST_DEFAULT_CONFIG.sep+resData['data'][1]
                    if(!isNotEmpty(dataConurl) || !isNotEmpty(imgConurl) ) return
                    let processPanel = new processDetail
                    processPanel.defaults = {
                        imgconurl: imgConurl,
                        dataconurl: dataConurl,
                        queryParams: {
                            token: this.$store.getters['user/getToken'],
                            processid: this.record.id,
                        }
                    }
                    this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `${this.record.processkey}/${this.record.taskkey}/detail-edit-${this.record.id}-process`},processPanel)
                })
            }else{
                this.$message({type: 'success', message: '当前步骤没有流程!'});
            }
        }
    }
}
export default Tbar
