/**
 * 工具栏
 */
import { Authority,AuthorityProps } from '@/plugins/authority'
import { apply,isNotEqualeEmpty } from '@/utils/tools' 
import {CONST_DEFAULT_CONFIG} from '@/config'

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
                {text: '调薪记录: ',name:'add',size: 'mini',grade: ''},
                {text: '保存',name:'add',size: 'mini',authority: ['write'],listeners: {click: this.doSave}},
            ]
        }
    },
    methods: {
        doSave(){
            let payOderDetail = this.getLinkComponent(this.getPanel.hrPayEditPanel.northLink)
            if( payOderDetail.processID === null ){
                this.$message({message: '警告，请先添加薪资调整!',duration: 1500,type: 'warning'});
                return
            }
            let addGridFormParams = this.getLinkComponent(this.getPanel.editPanel.addPayGridLink).gridRow
            console.info(addGridFormParams);
            if(!isNotEqualeEmpty(addGridFormParams.socialbase) || !isNotEqualeEmpty(addGridFormParams.basepay) || !isNotEqualeEmpty(addGridFormParams.meritpay)){
                this.$message({message: '警告，社保基数/基本工资/绩效工资 不能为空!',duration: 1500,type: 'warning'});
                return
            }
            apply(addGridFormParams,{
                token: this.$store.getters['user/getToken'],
                person_id: payOderDetail.processID,
                id: payOderDetail.formParams.payid,
                pid: payOderDetail.formParams.id,
                personid: payOderDetail.formParams.personid,
                personname: payOderDetail.formParams.personname,
            })
            this.$api['hr/payorder/apply/savePay'](addGridFormParams).then(resData=>{
                if(resData.code == CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                    this.$message({type: 'success',message: '操作成功!'});
                }
            })
        }
    }
}
export default Tbar