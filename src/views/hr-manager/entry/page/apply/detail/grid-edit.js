/**
 * 编辑详情页
 */
import { mapGetters } from 'vuex'
import {CONST_DEFAULT_CONFIG} from '@/config'
import {apply } from '@/utils/tools'
import validatorField from '@/plugins/validator-field'
import { Authority,AuthorityProps } from '@/plugins/authority'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    mixins: [new Authority({key: 'formButtons',formKey: 'detailData'}),AuthorityProps],
    props: {
        row: {
            type: Object,
            default: null
        },
        tabName: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
            you:'bbb',
            saveConurl: 'hr/entry/apply/updateDetail',
            detailConurl: 'hr/entry/apply/getDetail',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id,
                //id:this.row.id
            },
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id,
                id: this.row.payid,
                personid:this.row.id,
                personname:this.row.name,
                pid:this.row.id,
                deptcode:  '',
                oprtid: '',
                advice: '',
            },
            defaults: {
                border: false,
                columns: 3,
                width: 350,
                labelWidth: 120,
                buttonPosition: 'left',
            },
            buttonsLayout: 'top',
            formButtons: [
                {text: '薪资信息: ',name:'edit',size: 'mini',grade: ''},
                {text: '保存',authority: ['write'],size: 'mini',listeners: {click: this.doSave}},
            ],
            deptLink:`link-hrentry-deptcode-${this._uid}`,
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
    mounted() {
        console.log(this.record)

    },
    created(){
        this.$on(this.events.afterFormRender,()=>{
            Object.assign(this.lastFormDetail,this.formDetail)
            if(this.record){
                console.log(this.record)
                this.formParams.personname = this.record.personname
                this.formParams.id = this.record.id
                this.formParams.personid = this.record.personid
                this.formParams.pid = this.record.pid
            }
        })
    },
    methods: {
        initButtons(){

        },
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'socialbase',type: 'TextField', width: 200,label: '社保基数(元)',rule:[
                    {required: true,message: '请输入社保基数(元)', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}]},
                {span: 1,name: 'basepay',type: 'TextField',width: 200,label: '基本工资(元)',rule:[
                    {required: true,message: '请输入基本工资(元)', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}]},
                {span: 1,name: 'meritpay',type: 'TextField',width: 200,label: '绩效工资(元)',rule:[
                    {required: true,message: '请输入绩效工资(元)', trigger: 'blur'}, 
                    {validator: this.checkPaymentNum, trigger: 'blur'}]},
                {span: 1,name: 'commsub',type: 'TextField',width: 200,label: '通讯补贴(元)',rule:[
                    {required: true,message: '请输入通讯补贴(元)', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}]},
                {span: 1,name: 'trafficsub',type: 'TextField',width: 200,label: '交通补贴(元)',rule:[
                    {required: true,message: '请输入交通补贴(元)', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}]},
                {span: 1,name: 'homesub',type: 'TextField',width: 200,label: '住房补贴(元)',rule:[
                    {required: true,message: '请输入住房补贴(元)', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}]},
                {span: 1,name: 'otherpay',type: 'TextField',width: 200,label: '其他补贴(元)',rule:[
                    {required: true,message: '请输入其他补贴(元)', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}]},
                {span: 1,name: 'homepay',type: 'TextField',width: 200,label: '公积金调整(元)',rule:[
                    {required: true,message: '请输入公积金调整(元)', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}]},
                {span: 1,name: 'socialpay',type: 'TextField',width: 200,label: '社保调整(元)',rule:[
                    {required: true,message: '请输入社保调整(元)', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}]},
                {span: 1,name: 'nohome',label: '不交住房公积金',displayField: 'name',valueField: 'code',type: 'ComboBox',options:[
                    {code:true+'','name':'是'},{code:false+'','name':'否'}],width: 200,rule: [
                    {required: true,message: '请选择', trigger: 'blur'},
                ]},  
                {span: 1,name: 'nosocial',label: '不交社保',displayField: 'name',valueField: 'code',type: 'ComboBox',options:[{code:true+'','name':'是'},{code:false+'','name':'否'}],width: 200,rule: [
                    {required: true,message: '请选择', trigger: 'blur'},
                ]}, 
                {span: 1,name: 'changedtime',type: 'DatePicker',width: 200,label: '变更日期',rule:[{required: true,message: '请输入变更日期', trigger: 'blur'}]},
                {span: 1,name: 'reason',type: 'TextField',width: 200,label: '变更原因'},
                {span: 1,name: 'remark',type: 'TextField',width: 200,label: '备注'}
            ]
        },
        checkPaymentNum(rule,value, callback){
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
            if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                this.$message({type: 'success',message: '操作成功!'});
                Object.assign(this.lastFormDetail,this.formDetail)
            }
        }
    }
}
export default Detail