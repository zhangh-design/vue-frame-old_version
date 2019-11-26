/**
 * 编辑详情页
 */
import { mapGetters } from 'vuex'
import {CompareObj ,apply} from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import validatorField from '@/plugins/validator-field'
import { Authority,AuthorityProps } from '@/plugins/authority'
import fileListPanel from './page/file-lists'
import tjWindow from '@/components/common/window'
import processDetail from '@/components/process-card'

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
            you:'22222222222',
            submitConurl: 'hr/entry/apply/doSubmitApply',
            saveConurl: 'hr/entry/apply/doSaveApply',
            detailConurl: 'hr/entry/apply/getApplyDetail',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id
            },
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id,
                id: this.row.id,
                personid:this.row.process.id,
                payid:this.row.payid,
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
                {text: '保存',authority: ['write'],listeners: {click: this.doSave}},
                {text: '流程详情', style:'float:right',listeners: {click: this.doProcessDetail}}
            ],
            deptLink:`link-hrentry-deptcode-${this._uid}`,
            lastFormDetail: {}
        }
    },
    computed: {
        ...mapGetters({
			userData: 'user/getUserInfo'
        })
    },
    created(){
        this.$on(this.events.afterFormRender,()=>{
            Object.assign(this.lastFormDetail,this.formDetail)
            if(this.record){
                console.log(this.record)
                this.formParams.payid = this.record.payid
                this.formParams.id = this.record.id
            }
        })
    },
    methods: {
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'code',type: 'TextField',width: 200,label: '员工编号',disabled:true},
                {span: 1,name: 'name',type: 'TextField',width: 200,label: '员工姓名',rule:[{required: true,message: '请输入员工姓名', trigger: 'blur'}]},
                {span: 1,name: 'sex',label: '性别',displayField: 'name',valueField: 'code',type: 'ComboBox',conurl:'hr/entry/apply/readSex',queryParams: {token: this.$store.getters['user/getToken']},width: 200,rule: [
                    {required: true,message: '请输入性别', trigger: 'blur'},
                ]},
                {span: 1,name: 'logincode',type: 'TextField',width: 200,label: '登录码',rule: [
                    {required: true,message: '请输入登录码', trigger: 'blur'},
                  ]},
                {span: 1,name: 'birthday',type: 'DatePicker', width: 200,label: '出生年月',rule:[{required: true,message: '请输入出生年月', trigger: 'blur'}]},
                {span: 1,name: 'address',type: 'TextField',width: 200,label: '联系地址'},
                {span: 1,name: 'idcard',type: 'TextField',width: 200,label: '身份证信息'},
                {span: 1,name: 'phone',type: 'TextField',width: 200,label: '电话号码',rule:[{required: true,message: '请输入电话号码', trigger: 'blur'}, {validator: this.checkPaymentNum, trigger: 'blur'}]},
                {span: 1,name: 'begintime',type: 'DatePicker',width: 200,label: '入职时间',rule:[{required: true,message: '请输入入职时间', trigger: 'blur'}]},
                {span: 1,name: 'station',type: 'TextField',width: 200,label: '工作岗位',rule:[{required: true,message: '请输入工作岗位', trigger: 'blur'}]},
                {span: 1,name: 'stationlevel',type: 'TextField',width: 200,label: '岗位等级',rule:[{required: true,message: '请输入岗位等级', trigger: 'blur'}]},
                {span: 1,name: 'deptcode',label: '所在部门',displayField: 'name',valueField: 'code',type: 'ComboBox',conurl:'hr/entry/apply/readDept',queryParams: {token: this.$store.getters['user/getToken']},width: 200,rule: [
                    {required: true,message: '请输入所在部门', trigger: 'blur'},],listeners:{
                         change: (val)=>{
                        console.log(val.name)
                        this.getLinkComponent(this.deptLink).setTextValue(val.name)
                    }
                }},                
                {span: 1,name: 'linkman',type: 'TextField',width: 200,label: '紧急联系人'},
                {span: 1,name: 'linkphone',type: 'TextField',width: 200,label: '紧急联系人号码'},
                {span: 1,name: 'status',label: '员工状态',displayField: 'name',valueField: 'code',type: 'ComboBox',conurl:'hr/entry/apply/readStatus',queryParams: {token: this.$store.getters['user/getToken']},width: 200,rule: [
                    {required: true,message: '请输入员工状态', trigger: 'blur'},
                ]},  
                {span: 1,name: 'married',label: '婚姻状况',displayField: 'name',valueField: 'code',type: 'ComboBox',conurl:'hr/person/person/readMarried',queryParams: {token: this.$store.getters['user/getToken']},width: 200,rule:[
                    {required: true,message: '请输入婚姻状况', trigger: 'blur'},
                ]}, 
                {span: 1,name: 'school',type: 'TextField',width: 200,label: '学校'},
                {span: 1,name: 'profession',type: 'TextField',width: 200,label: '专业',},
                {span: 1,name: 'education',type: 'TextField',width: 200,label: '学历'},
                {span: 1,name: 'politics',type: 'TextField',width: 200,label: '政治面貌'},
                {span: 1,name: 'hkaddress',type: 'TextField',width: 200,label: '户口地址'},    
                {span: 1,name: 'bank',type: 'TextField',width: 200,label: '银行'},
                {span: 1,name: 'account',type: 'TextField',width: 200,label: '账号'},
                {span: 1,name: 'region',type: 'TextField',width: 200,label: '地区'},
                {span: 1,name: 'doorcode',type: 'TextField',width: 200,label: '门禁'},    
                {span: 2,name: 'uploadbidsfile',type: 'Button',text: '查看/下载简历附件',label:'简历附件',listeners: {
                    click: ()=>{
                        let detailWin = new tjWindow({panel: this,mainGrid: this.getPanel,title: '查看/下载简历附件',height: 400,width: 500})
                        detailWin.add(fileListPanel)
                        detailWin.show()
                    }
                }},               
                {span: 1,name: 'deptname',type: 'TextHidden',width: 0,link:this.deptLink},
            ]
        },
        checkPaymentNum(rule, value, callback){
            let checkNumber = validatorField.validate('checkNumber',value)
            if(!checkNumber.result){
                callback(new Error(checkNumber.msg));
            }
			callback();
        },
        doProcessDetail(){
            if(this.record.process.processcode!=null){
                let processPanel = new processDetail
                processPanel.defaults = {
                    imgconurl: 'hr/entry/apply',
                    dataconurl: 'hr/entry/apply/doStep',
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.record.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `hr/entry/apply/detail-edit-${this.record.id}-process`},processPanel)
            }else{
                this.$message({type: 'success', message: '当前步骤没有流程!'});
            }
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
                                this.formParams.personid = resData.data.process.id;
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
                    this.getLinkComponent('link-content-panel').getTabContent().removeTab(this.tabName)
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
            if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                this.$message({type: 'success',message: '操作成功!'});
                Object.assign(this.lastFormDetail,this.formDetail)
            }
        }
    }
}
export default Detail