/**
 * 编辑详情页
 */
import { mapGetters } from 'vuex'
import tjWindow from '@/components/common/window'
import { CompareObj } from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import pageDetail from './page/add-grids'
import validatorField from '@/plugins/validator-field'
import { Authority,AuthorityProps } from '@/plugins/authority'
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
            conurl: 'expense/account/apply/doSubmitApply',
            saveConurl: 'expense/account/apply/doSaveApply',
            detailConurl: 'expense/account/apply/getApplyDetail',
            processID: this.row.process.id,
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id
            },
            formParams: {
                token: this.$store.getters['user/getToken'],
                deptcode:  this.row.deptcode,
                oprtid: '',
                processid: this.row.process.id,
                id: this.row.id,
                userid: this.row.userid,
                advice: '',
            },
            defaults: {
                border: false,
                columns: 2,
                width: 500,
                labelWidth: 120,
                buttonPosition: 'left',
            },
            projectinfoLink: `link-expenseaccountApply-projectinfo-${this._uid}`,
            projectidLink: `link-expenseaccountApply-projectid-${this._uid}`,
            buttonsLayout: 'top',
            formButtons: [
                {text: '保存',authority: ['write'],listeners: {click: this.doSave}},
                {text: '流程详情',name:'process',style:'float:right',listeners: {click: this.readDetail}}
            ],
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
        //监听form表单渲染事件
        this.$on(this.events.afterFormRender,()=>{
            Object.assign(this.lastFormDetail,this.formDetail)
        })
    },
    methods: {
        //设置关联项目
        setSelectProjectinfo(row){
            this.getLinkComponent(this.projectinfoLink).setTextValue(row.name)
            this.getLinkComponent(this.projectidLink).setTextValue(row.id)
        },
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'username',type: 'TextField',value:this.userData.user.name,width: 350,label: '员工姓名',readonly:true,rule:[{required: true,message: '请输入员工姓名', trigger: 'blur'}]},
                {span: 1,name: 'begintime',type: 'DateTimePicker',width: 350,label: '发生时间',rule:[{required: true,message: '请输入发生时间', trigger: 'blur'}]},
                {span: 1,name: 'pay',type: 'TextField',width: 350,label: '报销费用（元）',rule:[
                    {validator: this.checkPaymentNum, trigger: 'blur'},
                    {required: true,message: '请输入报销费用', trigger: 'blur'},
                ]},
                {span: 1,name: 'sort',label: '费用类别',displayField: 'name',valueField: 'code',type: 'ComboBox',conurl:'expense/account/apply/accountsort',queryParams: {token: this.$store.getters['user/getToken']},width: 350,rule:[{required: true,message: '请输入费用类别', trigger: 'blur'}]},
                {span: 1,name: 'projectname',link: this.projectinfoLink,type: 'TextField',width: 350,label: '项目名称',readonly:true,rule:[{required: true,message: '请输入项目名称', trigger: 'blur'}]},
                {span: 1,name: 'projectBtn',authority:true,type: 'Button',style: 'margin-left:-130px;',text:'选取关联项目',listeners: {
                    click: ()=>{
                        let detailWin = new tjWindow({panel: this,mainGrid: this.getPanel,title: '关联-项目列表查询',height: 500,width: 1000})
                        detailWin.add(pageDetail)
                        detailWin.show()
                    }
                }},
                {span: 2,name: 'deptname',value:this.userData.dept.name,type: 'TextField',width: 350,label: '部门名称',readonly: true,rule:[{required: true,message: '请输入部门名称', trigger: 'blur'}]},
                {span: 1,name: 'remark',type: 'TextArea',width: 350,label: '说明'},
                {span: 1,name: 'projectid',link: this.projectidLink,type: 'TextHidden',width: 350,readonly:true},
            ]
        },
        checkPaymentNum(rule, value, callback) {
            let checkNumber = validatorField.validate('checkNumber', value)
            if (!checkNumber.result) {
                callback(new Error(checkNumber.msg));
            }
            callback();
        },
        readDetail(){
            if(this.record.process.processcode!=null){
                let processPanel = new processDetail
                processPanel.defaults = {
                    imgconurl: 'expense/account/apply',
                    dataconurl: 'expense/account/apply/doStep',
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.record.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `account/apply/detail-edit-${this.record.id}-process`},processPanel)
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
            this.getLinkComponent(this.detailLink).getForm().validate((valid) => {
                if (valid) {
                    this.$api[this.saveConurl]({...this.formParams,...this.formDetail}).then(resData=>{
                        //...
                        if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                            !!this.mainGrid && this.mainGrid.reloadGrid();
                            !!this.window && this.window.close()
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
        doSubmit(){
            if(!this.submitValidate()){
                return
            }
            this.doBeforeSave()
            //...
            this.getLinkComponent(this.detailLink).getForm().validate((valid) => {
                if (valid) {
                    TjUI.dialog.prompt(this.confirmFn)
                    return true;
                }else{
                    console.info('form validate error')
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
            this.$api[this.conurl]({...this.formParams,...this.formDetail}).then(resData=>{
                //...
                if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                    this.$message({type: 'success',message: '操作成功!'});
                    !!this.mainGrid && this.mainGrid.reloadGrid();
                    !!this.window && this.window.close()
                    this.getLinkComponent('link-content-panel').getTabContent().removeTab(this.tabName)
                }
            })
        },
        doResult(resData){
            if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                Object.assign(this.lastFormDetail,this.formDetail)
                this.$message({type: 'success',message: '操作成功!'});
            }
        }
    }
}
export default Detail