/**
 * 新增详情页
 */
import { mapGetters } from 'vuex'
import { CompareObj,apply,isNotEqualeEmpty } from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import validatorField from '@/plugins/validator-field'
import { Authority,AuthorityProps } from '@/plugins/authority'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    props: ['mainPanel','mainGrid','editPanel','row'],
    mixins: [new Authority({key: 'formButtons',formKey: 'detailData'}),AuthorityProps],
    data(){
        return {
            //conurl: 'hr/entry/apply/insertApply',
            saveConurl: 'hr/entry/apply/updateDetail',
            //submitConurl: 'hr/entry/apply/doSubmitApply',
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid:  '',
                personid:'',
                personname:'',
                id: '',
                advice: '',
            },
            defaults: {
                border: false,
                columns: 3,
                width: 350,
                labelWidth: 120,
                buttonPosition: 'left',
            },
            formButtons: [
                {text: '薪资信息: ',name:'add',size: 'mini',grade: ''},
                {text: '保存',authority: ['write'],size: 'mini',link: `link-paymentApply-savebtn-${this._uid}`, listeners: {click: this.doSave}},
            ],
            //formType: 'add',
            processID: null,
            buttonsLayout: 'top',
            deptLink:`link-hrentry-deptcode-${this._uid}`,
            submitBtnLink: `link-entryApply-subbtn-${this._uid}`,
            saveBtnLink: `link-entryApply-savebtn-${this._uid}`,
            resetBtnLink: `link-entryApply-restbtn-${this._uid}`,
            userFileBtnLink: `link-uploadbtn-${this._uid}`,
            personLink:`link-entryApply-person-${this._uid}`,
            personnameLink:`link-entryApply-personname-${this._uid}`,
            lastFormDetail: {}
        }
    },
    computed: {
        ...mapGetters({
			userData: 'user/getUserInfo'
        })
    },
    methods: {
        initButtons(){
        },
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'socialbase',type: 'TextField', width: 200,label: '社保基数(元)',rule:[{required: true,message: '请输入社保基数(元)', trigger: 'blur'}],disabled:false},
                {span: 1,name: 'basepay',type: 'TextField',width: 200,label: '基本工资(元)',rule:[{required: true,message: '请输入基本工资(元)', trigger: 'blur'}, {validator: this.checkPaymentNum, trigger: 'blur'}],disabled:false},
                {span: 1,name: 'meritpay',type: 'TextField',width: 200,label: '绩效工资(元)',rule:[{required: true,message: '请输入绩效工资(元)', trigger: 'blur'}, {validator: this.checkPaymentNum, trigger: 'blur'}],disabled:false},
                {span: 1,name: 'commsub',type: 'TextField',width: 200,label: '通讯补贴(元)',rule:[{required: true,message: '请输入通讯补贴(元)', trigger: 'blur'}, {validator: this.checkPaymentNum, trigger: 'blur'}],disabled:false},
                {span: 1,name: 'trafficsub',type: 'TextField',width: 200,label: '交通补贴(元)',rule:[{required: true,message: '请输入交通补贴(元)', trigger: 'blur'}],disabled:false},
                {span: 1,name: 'homesub',type: 'TextField',width: 200,label: '住房补贴(元)',rule:[{required: true,message: '请输入住房补贴(元)', trigger: 'blur'}],disabled:false},
                {span: 1,name: 'otherpay',type: 'TextField',width: 200,label: '其他补贴(元)',rule:[{required: true,message: '请输入其他补贴(元)', trigger: 'blur'}],disabled:false},
                {span: 1,name: 'homepay',type: 'TextField',width: 200,label: '公积金调整(元)',rule:[{required: true,message: '请输入公积金调整(元)', trigger: 'blur'}],disabled:false},
                {span: 1,name: 'socialpay',type: 'TextField',width: 200,label: '社保调整(元)',rule:[{required: true,message: '请输入社保调整(元)', trigger: 'blur'}],disabled:false},
                {span: 1,name: 'nohome',label: '不交住房公积金',displayField: 'name',valueField: 'code',type: 'ComboBox',options:[{'code':'true','name':'是'},{'code':'false','name':'否'}],width: 200,rule: [
                    {required: true,message: '请选择', trigger: 'blur'},
                ],disabled:false},  
                {span: 1,name: 'nosocial',label: '不交社保',displayField: 'name',valueField: 'code',type: 'ComboBox',options:[{'code':'true','name':'是'},{'code':'false','name':'否'}],width: 200,rule: [
                    {required: true,message: '请选择', trigger: 'blur'},
                ],disabled:false},    
                {span: 1,name: 'changedtime',type: 'DatePicker',width: 200,label: '变更日期',rule:[{required: true,message: '请输入变更日期', trigger: 'blur'}],disabled:false},
                {span: 1,name: 'reason',type: 'TextField',width: 200,label: '变更原因',disabled:false},
                {span: 1,name: 'remark',type: 'TextField',width: 200,label: '备注',disabled:false}
            ]
        },
        checkPaymentNum(rule, value, callback){
            let checkNumber = validatorField.validate('checkNumber',value)
            if(!checkNumber.result){
                callback(new Error(checkNumber.msg));
            }
			callback();
        },
        validate(){
            if(!isNotEqualeEmpty(this.editPanel.getDetailGrid().formParams.id)){
                this.$message({type: 'warning',message: '请先添加人员信息!'});
                return false
            }
            return true
        },
        doBeforeSave(){
            this.formParams.processid=  this.editPanel.getDetailGrid().formParams.process.id
            this.formParams.personid= this.editPanel.getDetailGrid().formParams.id
            this.formParams.personname= this.editPanel.getDetailGrid().formParams.name
            this.formParams.id= this.editPanel.getDetailGrid().formParams.payid
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
                    this.$api[this.saveConurl]({...this.formParams,...this.formDetail}).then(resData=>{
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
                                this.formParams.personid = resData.data.id;
                                this.formParams.personname = resData.data.name;
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
        doResult(resData){
            if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode && !this.formParams.id){
                this.$message({type: 'success',message: '操作成功!'});
                Object.assign(this.lastFormDetail,this.formDetail)
            }
        }
    }
}
export default Detail