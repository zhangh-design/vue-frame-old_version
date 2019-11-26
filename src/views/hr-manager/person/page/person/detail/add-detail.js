/**
 * 新增详情页
 */
import { mapGetters } from 'vuex'
import { intNumToStr, apply} from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import validatorField from '@/plugins/validator-field'
import fileListPanel from './page/file-list'
import tjWindow from '@/components/common/window'
import { Authority,AuthorityProps } from '@/plugins/authority'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    props: ['mainPanel','mainGrid','window','editPanel'],
    mixins: [new Authority({key: 'formButtons'}),AuthorityProps],
    data(){
        return {
            you: 'nnnnnnnnnnnn',
            conurl: 'hr/person/person/insertPerson',
            saveConurl: 'hr/person/person/doUpdatePerson',
            formParams: {
                code:'',
                token: this.$store.getters['user/getToken'],
                personid:'',
                userid:''
            },
            defaults: {
                border: false,
                columns: 3,
                width: 350,
                labelWidth: 120,
                buttonPosition: 'left',
            },
            formButtons: [
                {text: '保存', authority: ['write'],link: `link-paymentApply-savebtn-${this._uid}`, listeners: {click: this.doSave}},
            ],
            lastFormDetail:{},
            formType: 'add',
            buttonsLayout: 'top',
            userFileBtnLink:`link-hrperson-userFile-${this._uid}`,
            deptLink:`link-hrperson-deptcode-${this._uid}`,
            codelink:`link-hrperson-personcode-${this._uid}`
        }
    },
    computed: {
        ...mapGetters({
			userData: 'user/getUserInfo'
        })
    },
    mounted(){

    },
    methods: {
        initButtons(){
            if(this.formType === 'add'){
                this.formButtons.push({text: '重置',link: this.resetBtnLink,authority: ['write'],listeners: {click: this.resetForm}})
            }
        },
        //设置关联项目
        setSelectContractinfo(row){
            this.getLinkComponent(this.contractinfoLink).setTextValue(row.name)
            this.getLinkComponent(this.contractidLink).setTextValue(intNumToStr(row.id))
        },
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'code',type: 'TextField',link:this.codelink,width: 200,label: '员工编号',disabled:true},
                {span: 1,name: 'name',type: 'TextField',width: 200,label: '员工姓名',rule: [
                    {required: true,message: '请输入员工姓名', trigger: 'blur'},
                ]},
                {span: 1,name: 'logincode',type: 'TextField',width: 200,label: '登录码',rule: [
                    {required: true,message: '请输入登录码', trigger: 'blur'},
                ]},
                {span: 1,name: 'sex',label: '性别',displayField: 'name',valueField: 'code',type: 'ComboBox',conurl:'hr/person/person/readSex',queryParams: {token: this.$store.getters['user/getToken']},width: 200,rule: [
                    {required: true,message: '请输入性别', trigger: 'blur'},
                ]}, 
                {span: 1,name: 'birthday',type: 'DatePicker',width: 200,label: '出生年月',rule:[
                    {required: true,message: '请输入出生年月', trigger: 'blur'},
                ]},
                {span: 1,name: 'address',type: 'TextField',width: 200,label: '联系地址'},
                {span: 1,name: 'idcard',type: 'TextField',width: 200,label: '身份证信息'},
                {span: 1,name: 'phone',type: 'TextField',width: 200,label: '电话号码',rule: [
                    {required: true,message: '请输入电话号码', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ]},
                {span: 1,name: 'begintime',type: 'DatePicker',width: 200,label: '入职时间',rule: [
                    {required: true,message: '请输入入职时间', trigger: 'blur'},
                ]},
                {span: 1,name: 'station',type: 'TextField',width: 200,label: '工作岗位',rule: [
                    {required: true,message: '请输入工作岗位', trigger: 'blur'},
                ]},
                {span: 1,name: 'stationlevel',type: 'TextField',width: 200,label: '岗位等级',rule: [
                    {required: true,message: '请输入岗位等级', trigger: 'blur'},
                ]},
                {span: 1,name: 'deptcode',label: '所在部门',displayField: 'name',valueField: 'code',type: 'ComboBox',conurl:'hr/person/person/readDept',queryParams: {token: this.$store.getters['user/getToken']},width: 200,rule: [
                    {required: true,message: '请输入所在部门', trigger: 'blur'},],listeners:{
                         change: (val)=>{
                        this.getLinkComponent(this.deptLink).setTextValue(val.name)
                    }
                }}, 
                {span: 1,name: 'linkman',type: 'TextField',width: 200,label: '紧急联系人'},
                {span: 1,name: 'linkphone',type: 'TextField',width: 200,label: '紧急联系人号码'},
                {span: 1,name: 'status',label: '员工状态',displayField: 'name',valueField: 'code',type: 'ComboBox',conurl:'hr/person/person/readStatus',queryParams: {token: this.$store.getters['user/getToken']},width: 200,rule: [
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
                {span: 1,name: 'accessoryBtn',type: 'Button',label:'简历附件',text:'查看/下载简历附件',listeners: {
                    click: ()=>{
                        let detailWin = new tjWindow({panel: this,mainGrid: this.getPanel,title: '查看/下载简历附件',height: 400,width: 500})
                        detailWin.add(fileListPanel)
                        detailWin.show()
                    }
                },disabled:true,link:this.userFileBtnLink},       
                {span: 1,name: 'deptname',type: 'TextHidden',width: 0,link:this.deptLink},
            ]
        },
        checkPaymentNum(rule, value, callback) {
            let checkNumber = validatorField.validate('checkNumber', value)
            if (!checkNumber.result) {
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
                    this.$api[!this.formParams.code ? this.conurl : this.saveConurl]({...this.formParams,...this.formDetail}).then(resData=>{
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
                            console.log(resData.data)
                            apply(this.formParams,{...resData.data,dirty: true,personid:resData.data.id,userid:resData.data.userid})
                        }
                        if(this.formParams.code!=''){
                            this.getLinkComponent(this.codelink).setDisabled()

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
                this.getLinkComponent(this.codelink).setTextValue(resData.data.code)
                console.log(resData)
                this.editPanel.setCurRow(resData.data)
                this.getLinkComponent(this.userFileBtnLink).setDisabled(false)
            }
        }
    }
}
export default Detail
