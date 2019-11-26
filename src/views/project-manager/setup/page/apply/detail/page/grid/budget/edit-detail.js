import { mapGetters } from 'vuex'
import { intNumToStr,isEmptyObject,isNotEmpty} from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import userDetail from '@/components/common/grid/detail/detail'
import validatorField from '@/plugins/validator-field'
import { Authority,AuthorityProps } from '@/plugins/authority'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    mixins: [new Authority({key: 'formButtons',formKey: 'detailData'})],
    props: {
        setUpApplyEditPanel: {
            type: Object,
            default: null,
        },
        moduleid: {
            default(){
                return this.setUpApplyEditPanel.curModuleid
            }
        }
    },
    data(){
        return {
            conurl: 'project/setup/apply/insertBudget',
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: '',
                budgetid: ''
            },
            detailConurl: 'project/setup/apply/getBudget',
            queryParams: {
                processid: this.setUpApplyEditPanel.curRow.process.id,
                token: this.$store.getters['user/getToken']
            },
            defaults: {
                border: false,
                columns: 3,
                width: 330,
                labelWidth: 130,
            },
            formType: 'edit',
            submitBtnLink: `link-setupApply-subbtn-${this._uid}`,
            resetBtnLink: `link-setupApply-restbtn-${this._uid}`,
            idLink: `link-setupApply-id-${this._uid}`,
            totalcostLink: `link-setupApply-totalcost-${this._uid}`
        }
    },
    computed: {
        //grid当前选中row行
        record(){
            return {}
        },
        //grid当前选中row行集
        records(){
            return []
        },
        //获取表单
        formDetail(){
            return {...this.getLinkComponent(this.detailLink).getModels()}
        },
        ...mapGetters({
			userData: 'user/getUserInfo'
        })
    },
    created(){
        //表单渲染结束，执行权限事件
        this.$on(this.events.afterFormRender,this.doAuthority)
    },
    methods: {
        initButtons(){
            this.formButtons.push({text: '保存',authority: ['write'],link: this.submitBtnLink,listeners: {click: this.doSubmit}})
            if(this.formType === 'add'){
                this.formButtons.push({text: '重置',authority: ['write'],listeners: {click: this.resetForm}})
            }
        },
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'laborcost',type: 'TextField',width: 180,label: '人工成本(万)',rule: [
                    {required: true,message: '请输入人工成本', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ]},
                {span: 1,name: 'travelcost',type: 'TextField',width: 180,label: '差旅成本(万)',rule: [
                    {required: true,message: '请输入差旅成本', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ]},
                {span: 1,name: 'businesscost',type: 'TextField',width: 180,label: '商务成本(万)',rule: [
                    {required: true,message: '请输入商务成本', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ]},
                {span: 1,name: 'materialcost',type: 'TextField',width: 180,label: '物质成本(万)',rule: [
                    {required: true,message: '请输入物质成本', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ]},
                {span: 1,name: 'peripheralcost',type: 'TextField',width: 180,label: '外委成本(万)',rule: [
                    {required: true,message: '请输入外委成本', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ]},
                {span: 1,name: 'capitalcost',type: 'TextField',width: 180,label: '资金占用成本(万)',rule: [
                    {required: true,message: '请输入资金占用成本', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ]},
                {span: 1,name: 'othercost',type: 'TextField',width: 180,label: '其他成本(万)',rule: [
                    {required: true,message: '请输入其他成本', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ]},
                {span: 1,name: 'totalcost',type: 'TextField',link: this.totalcostLink,readonly:true,width: 180,label: '总成本(万)',emptyText: '后端计算，无需填写'},
                {span: 1,name: 'id',type: 'TextHidden',link: this.idLink,width: 180},
            ]
        },
        checkPaymentNum(rule, value, callback){
            let checkNumber = validatorField.validate('checkNumber',value)
            if(!checkNumber.result){
                callback(new Error(checkNumber.msg));
            }
			callback();
        },
        doBeforeSave(){
            this.formParams.processid = this.setUpApplyEditPanel.curRow.process.id
            this.formParams.budgetid = this.setUpApplyEditPanel.curRow.budgetid
        },
        doSubmit(){
            if(!this.validate()){
                return
            }
            this.doBeforeSave()
            //...
            console.info(this.conurl,this.formParams,this.formDetail);
            this.getLinkComponent(this.detailLink).getForm().validate((valid, object) => {
                if (valid) {
                    this.$api[this.conurl]({...this.formParams,...this.formDetail}).then(resData=>{
                        //...
                        if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                            this.$message({type: 'success',message: '操作成功!'});
                            this.getLinkComponent(this.setUpApplyEditPanel.detailLink).reloadForm()
                        }
                        this.doResult(resData)
                    })
                    return true;
                } else {
                    console.info('form validate error');
                    return false;
                }
            })
        },
        doResult(resData){
            if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                this.getLinkComponent(this.idLink).setTextValue(resData.data.id)
                this.getLinkComponent(this.totalcostLink).setTextValue(resData.data.totalcost)
            }
        },
        
    }
}
export default Detail
