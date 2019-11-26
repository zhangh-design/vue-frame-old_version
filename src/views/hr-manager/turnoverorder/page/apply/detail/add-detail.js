/**
 * 新增详情页
 */
import { mapGetters } from 'vuex'
import { CompareObj,apply,applyIn } from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import validatorField from '@/plugins/validator-field'
import { Authority,AuthorityProps } from '@/plugins/authority'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    mixins: [new Authority({key: 'formButtons'}),AuthorityProps],
    props: ['mainPanel','mainGrid','window','editPanel'],
    data(){
        return {
            conurl: 'hr/turnoverorder/apply/insertApply',
            saveConurl: 'hr/turnoverorder/apply/doSaveApply',
            submitConurl: 'hr/turnoverorder/apply/doSubmitApply',
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: '',
                pid:'',
                id: '',
                advice: '',
            },
            defaults: {
                border: false,
                columns: 3,
                width: 330,
                labelWidth: 80,
                buttonPosition: 'left',
            },
            formButtons: [
                {text: '保存', authority: ['write'],link: `link-turnoverApply-savebtn-${this._uid}`, listeners: {click: this.doSave}},
                {text: '流程详情',name:'process',style:'float:right',listeners: {click: ()=>{
                    this.$message({type: 'success', message: '当前步骤没有流程!'});
                }}}
            ],
            formType: 'add',
            isReloadGrid: true,
            processID: null,
            buttonsLayout: 'top',
            deptLink:`link-hrentry-deptcode-${this._uid}`,
            submitBtnLink: `link-turnoverApply-subbtn-${this._uid}`,
            saveBtnLink: `link-turnoverApply-savebtn-${this._uid}`,
            resetBtnLink: `link-turnoverApply-restbtn-${this._uid}`,
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
                {span: 1,name: 'personname',type: 'TextField',value:this.userData.user.name,width: 220,label: '员工姓名',disabled:true},
                {span: 1,name: 'station',type: 'TextField',width: 220,label: '工作岗位',disabled:true},
                {span: 1,name: 'positivetime',type: 'DatePicker',width: 220,label: '转正时间',rule:[
                    {required: true,message: '请输入转正时间', trigger: 'blur'}
                ]},
                {span: 1,name: 'deptname',type: 'TextField',value:this.userData.dept.name,width: 220,label: '部门名称',disabled:true},
                {span: 1,name: 'begintime',type: 'DatePicker', width: 220,label: '入职时间',disabled:true},
                {span: 1,name: 'phone',type: 'TextField',width: 220,label: '联系电话'},
                {span: 3,name: 'comment',type: 'TextArea',rows:6,label: '主管评语',disabled:true},
                {span: 3,name: 'sort',type: 'TextArea',rows:6,label: '转正报告',rule:[{required: true,message: '请输入转正报告', trigger: 'blur'}]},
                // {span: 3,name: 'remark',type: 'TextArea',rows:3,label: '备注'},
                {span: 1,name: 'deptcode',type: 'TextHidden',value:this.userData.user.code,width: 220},
                {span: 1,name: 'personid',type: 'TextHidden',value:this.userData.dept.code,width: 220},
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
                        }
                        this.doResult(resData)
                        if(resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                            apply(this.formParams,{...resData.data,dirty: true})
                            if (resData.data.process && resData.data.process.id) {
                                this.formParams.processid = resData.data.process.id;
                                this.formParams.pid = resData.data.process.id;
                            }
                            applyIn(this.formDetail,this.formParams)
                            //覆盖值
                            apply(this.lastFormDetail,this.formDetail)
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
                    this.getLinkComponent('link-content-panel').getTabContent().removeTab(`hr/turnoverorder/apply/detail-add`)
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