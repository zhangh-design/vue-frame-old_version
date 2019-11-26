/**
 * 新增详情页
 */
import { mapGetters } from 'vuex'
import tjWindow from '@/components/common/window'
import { CompareObj,apply } from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import validatorField from '@/plugins/validator-field'
import { Authority,AuthorityProps } from '@/plugins/authority'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    mixins: [new Authority({key: 'formButtons'}),AuthorityProps],
    props: ['mainPanel','mainGrid','window','editPanel'],
    data(){
        return {
            conurl: 'project/payment/apply/insertApply',
            saveConurl: 'project/payment/apply/doSaveApply',
            submitConurl: 'project/payment/apply/doSubmitApply',
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: '',
                id: '',
                advice: '',
            },
            defaults: {
                border: false,
                columns: 2,
                width: 500,
                labelWidth: 120,
                buttonPosition: 'left',
            },
            formButtons: [
                {text: '保存', authority: ['write'],link: `link-paymentApply-savebtn-${this._uid}`, listeners: {click: this.doSave}},
                {text: '流程详情',name:'process',style:'float:right',listeners: {click: ()=>{
                    this.$message({type: 'success', message: '当前步骤没有流程!'});
                }}}
            ],
            formType: 'add',
            isReloadGrid: true,
            processID: null,
            buttonsLayout: 'top',
            submitBtnLink: `link-paymentApply-subbtn-${this._uid}`,
            saveBtnLink: `link-paymentApply-savebtn-${this._uid}`,
            resetBtnLink: `link-paymentApply-restbtn-${this._uid}`,
            accessoryFileBtnLink: `link-uploadbtn-${this._uid}`,
            lastFormDetail: {}
        }
    },
    computed: {
        ...mapGetters({
			userData: 'user/getUserInfo'
        })
    },
    created(){
        this.formParams.oprtid = this.userData.user.id
    },
    methods: {
        initButtons(){
            this.formButtons.push({text: '提交',disabled: true,link: this.submitBtnLink,authority: ['write'],listeners: {click: this.doSubmit}})
            if(this.formType === 'add'){
                this.formButtons.push({text: '重置',link: this.resetBtnLink,authority: ['write'],listeners: {click: this.resetForm}})
            }
        },
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'organization',type: 'TextField',width: 350,label: '回款单位',rule:[{required: true,message: '请输入回款单位', trigger: 'blur'}]},
                {span: 1,name: 'amount',type: 'TextField',width: 350,label: '回款金额(万)',rule:[{required: true,message: '请输入回款金额', trigger: 'blur'},{validator: this.checkPaymentNum, trigger: 'blur'}]},
                // {span: 1,name: 'enddatetime',value: '2018-09-21 19:22:10',type: 'DateTimePicker',width: 170,label: '截止时间'},
                {span: 1,name: 'leadtime',type: 'DateTimePicker', width: 350,label: '回款时间',rule:[{required: true,message: '请输入回款时间', trigger: 'blur'}]},
                {span: 1,name: 'info',type: 'TextField',width: 350,label: '摘要'},
                {span: 1,name: 'projectname',type: 'TextField',width: 350,label: '项目名称',disabled:true},
                {span: 1,name: 'projectBtn',type: 'Button',style: 'margin-left:-130px;',text:'选取关联项目',disabled:true},
            ]
        },
        checkPaymentNum(rule, value, callback){
            let checkNumber = validatorField.validate('checkNumber',value)
            if(!checkNumber.result){
                callback(new Error(checkNumber.msg));
            }
			callback();
        },
        doSave(){
            if(!this.validate()){
                return
            }
            this.doBeforeSave()
            //...
            console.info(this.conurl,this.formParams,this.formDetail);
            this.getLinkComponent(this.detailLink).getForm().validate((valid, object) => {
                if (valid) {
                    this.$api[!this.formParams.id ? this.conurl : this.saveConurl]({...this.formParams,...this.formDetail}).then(resData=>{
                        //...
                        if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                            this.mainGrid.reloadGrid();
                            !!this.window && this.window.close()
                            this.$message({type: 'success',message: '操作成功!'});
                            //覆盖值
                            apply(this.lastFormDetail,this.formDetail)
                        }
                        this.doResult(resData)
                        if(resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                            apply(this.formParams,{...resData.data,dirty: true})
                            if (resData.data.process && resData.data.process.id) {
                                this.formParams.processid = resData.data.process.id;
                            }
                        }
                    })
                    return true;
                } else {
                    console.info('form validate error');
                    return false;
                }
            })
        },
        submitValidate(){
            let compareResult = CompareObj(this.formDetail,this.lastFormDetail,true)
            if(!compareResult){
                this.$message({message: '警告，修改后请先保存!',duration:1000,type: 'warning'});
                return false
            }
            return true
        },
        confirmFn(value){
            Object.assign(this.formParams,{advice: value})
            this.$api[this.submitConurl]({...this.formParams,...this.formDetail}).then(resData=>{
                //...
                if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                    this.mainGrid.reloadGrid();
                    !!this.window && this.window.close()
                    this.getLinkComponent('link-content-panel').getTabContent().removeTab(`payment/apply/detail-add`)
                }
            })
        },
        doSubmit(){
            if(!this.submitValidate()){
                return
            }
            this.doBeforeSave()
            this.getLinkComponent(this.detailLink).getForm().validate((valid, object) => {
                if (valid) {
                    TjUI.dialog.prompt(this.confirmFn)
                    return true;
                }else{
                    console.info('form validate error');
                    return false;
                }
            })
        },
        doResult(resData){
            if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode && !this.formParams.id){
                this.getLinkComponent(this.submitBtnLink).setDisabled(false)
                this.getLinkComponent(this.resetBtnLink).setDisabled()
            }
        }
    }
}
export default Detail