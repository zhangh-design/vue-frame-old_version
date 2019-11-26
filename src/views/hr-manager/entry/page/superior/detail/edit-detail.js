/**
 * 编辑详情页
 */
import { mapGetters } from 'vuex'
import {CompareObj } from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import validatorField from '@/plugins/validator-field'
import { Authority,AuthorityProps } from '@/plugins/authority'
import processDetail from '@/components/process-card'
import fileListPanel from './page/file-list'
import tjWindow from '@/components/common/window'
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
            conurl: 'hr/entry/superior/doSubmitSuperior',
            rejectConurl: 'hr/entry/superior/doRejectSuperior',
            detailConurl: 'hr/entry/superior/getSuperiorDetail',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id
            },
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id,
                id: this.row.id,
                personid:this.row.process.id,
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
        })
    },
    methods: {
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'code',type: 'TextField',width: 200,label: '员工编号',disabled:true},
                {span: 1,name: 'name',type: 'TextField',width: 200,label: '员工姓名',disabled:true},
                {span: 1,name: 'logincode',type: 'TextField',width: 200,label: '登录码',disabled:true},
                {span: 1,name: 'sex',label: '性别',displayField: 'name',valueField: 'code',type: 'ComboBox',conurl:'hr/entry/apply/readSex',queryParams: {token: this.$store.getters['user/getToken']},width: 200,disabled:true},
                {span: 1,name: 'birthday',type: 'DatePicker', width: 200,label: '出生年月',disabled:true},
                {span: 1,name: 'address',type: 'TextField',width: 200,label: '联系地址',disabled:true},
                {span: 1,name: 'idcard',type: 'TextField',width: 200,label: '身份证信息',disabled:true},
                {span: 1,name: 'phone',type: 'TextField',width: 200,label: '电话号码',disabled:true},
                {span: 1,name: 'begintime',type: 'DatePicker',width: 200,label: '入职时间',disabled:true},
                {span: 1,name: 'station',type: 'TextField',width: 200,label: '工作岗位',disabled:true},
                {span: 1,name: 'stationlevel',type: 'TextField',width: 200,label: '岗位等级',disabled:true},
                {span: 1,name: 'deptcode',label: '所在部门',displayField: 'name',valueField: 'code',type: 'ComboBox',conurl:'hr/entry/apply/readDept',queryParams: {token: this.$store.getters['user/getToken']},width: 200,disabled:true},                
                {span: 1,name: 'linkman',type: 'TextField',width: 200,label: '紧急联系人',disabled:true},
                {span: 1,name: 'linkphone',type: 'TextField',width: 200,label: '紧急联系人号码',disabled:true},
                {span: 1,name: 'status',label: '员工状态',displayField: 'name',valueField: 'code',type: 'ComboBox',conurl:'hr/entry/apply/readStatus',queryParams: {token: this.$store.getters['user/getToken']},width: 200,disabled:true},  
                {span: 1,name: 'married',label: '婚姻状况',displayField: 'name',valueField: 'code',type: 'ComboBox',conurl:'hr/person/person/readMarried',queryParams: {token: this.$store.getters['user/getToken']},width: 200,disabled:true}, 
                {span: 1,name: 'school',type: 'TextField',width: 200,label: '学校',disabled:true},
                {span: 1,name: 'profession',type: 'TextField',width: 200,label: '专业',disabled:true},
                {span: 1,name: 'education',type: 'TextField',width: 200,label: '学历',disabled:true},
                {span: 1,name: 'politics',type: 'TextField',width: 200,label: '政治面貌',disabled:true},
                {span: 1,name: 'hkaddress',type: 'TextField',width: 200,label: '户口地址',disabled:true},    
                {span: 1,name: 'bank',type: 'TextField',width: 200,label: '银行',disabled:true},
                {span: 1,name: 'account',type: 'TextField',width: 200,label: '账号',disabled:true},
                {span: 1,name: 'region',type: 'TextField',width: 200,label: '地区',disabled:true},
                {span: 1,name: 'doorcode',type: 'TextField',width: 200,label: '门禁',disabled:true},
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
                    imgconurl: 'hr/entry/superior',
                    dataconurl: 'hr/entry/superior/doStep',
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.record.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `hr/entry/superior/detail-edit-${this.record.id}-process`},processPanel)
            }else{
                this.$message({type: 'success', message: '当前步骤没有流程!'});
            }
        },
        submitValidate(){
            let compareResult = CompareObj(this.formDetail,this.lastFormDetail,true)
            if(!compareResult){
                this.$message({message: '警告，修改后请先保存!',duration:1000,type: 'warning'});
                return false
            }
            return true
        },
        //同意
        confirmFn(value){
            this.getLinkComponent(this.detailLink).getForm().validate((valid, object) => {
                if (valid) {
                    Object.assign(this.formParams,{advice: value})
                    this.$api[this.conurl]({...this.formParams}).then(resData=>{
                        if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                            this.$message({type: 'success',message: '操作成功!'});
                            !!this.mainGrid && this.mainGrid.reloadGrid();
                            !!this.window && this.window.close()
                            this.getLinkComponent('link-content-panel').getTabContent().removeTab(this.tabName)
                        }
                        this.doResult(resData)
                    })
                    return true;
                }else{
                    this.$message({message: '警告，表单内容不完整!',duration:1000,type: 'warning'});
                    console.info('form validate error');
                    return false;
                }
            })
        },
        //不同意
        cancelFn(value){
            Object.assign(this.formParams,{advice: value})
            this.$api[this.rejectConurl]({...this.formParams}).then(resData=>{
                //...
                if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                    this.$message({type: 'success',message: '操作成功!'});
                    !!this.mainGrid && this.mainGrid.reloadGrid();
                    !!this.window && this.window.close()
                    this.getLinkComponent('link-content-panel').getTabContent().removeTab(this.tabName)
                }
                this.doResult(resData)
            })
        },
        doSubmit(){
            if(!this.submitValidate()){
                return
            }
            this.doBeforeSave()
            TjUI.dialog.process(this.confirmFn,this.cancelFn)
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