/**
 * 编辑详情页
 */
import { mapGetters } from 'vuex'
import tjWindow from '@/components/common/window'
import fileListPanel from './page/file-list'
import { CompareObj } from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
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
            conurl: 'project/contract/apply/doSubmitApply',
            saveConurl: 'project/contract/apply/doSaveApply',
            detailConurl: 'project/contract/apply/getApplyDetail',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id
            },
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id,
                id: this.row.id,
                deptcode:  '',
                oprtid: '',
                advice: '',
            },
            defaults: {
                border: false,
                columns: 3,
                width: 340,
                labelWidth: 130,
                buttonPosition: 'left',
            },
            processID: this.row.process.id,
            buttonsLayout: 'top',
            formButtons: [{text: '保存',authority: ['write'],listeners: {click: this.doSave}},
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
        this.formParams.deptcode = this.userData.dept.code
        this.formParams.oprtid = this.userData.user.id
        //监听form表单渲染事件
        this.$on(this.events.afterFormRender,()=>{
            Object.assign(this.lastFormDetail,this.formDetail)
        })
    },
    methods: {
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'code',type: 'TextField',width: 200,label: '合同编号',disabled: true},
                {span: 1,name: 'name',type: 'TextField',width: 200,label: '合同名称',rule: [
                    {required: true,message: '请输入合同名称', trigger: 'blur'},
                ]},
                {span: 1,name: 'amount',type: 'TextField',width: 200,label: '合同金额(万)',rule:[
                    {required: true,message: '请输入合同金额', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ]},
                {span: 1,name: 'signtime',type: 'DatePicker',width: 200,disabled:true,label: '签订日期'},
                {span: 1,name: 'expiretime',type: 'DatePicker',width: 200,disabled:true,label: '合同到期日期'},
                {span: 1,name: 'stamptime',type: 'DatePicker',width: 200,disabled:true,label: '合同盖章日期'},
                {span: 1,name: 'printnum',type: 'TextField',width: 200,disabled:true,label: '打印份数'},
                {span: 1,name: 'archivetime',type: 'DatePicker',width: 200,disabled:true,label: '归档日期'},
				
                {span: 1,name: 'customerunit',label: '客户单位',type: 'ComboBoxInput',conurl:'project/contract/apply/readCustomers',queryParams: {token: this.$store.getters['user/getToken']},
                loadFilter: (resData)=>{
                    return resData.map(data => ({name:data,id:data}))
                },width: 200,rule: [
                    {required: true,message: '请输入客户单位', trigger: 'blur'},
                ]},
                {span: 1,name: 'manager',type: 'TextField',width: 200,label: '合同负责人',rule: [
                    {required: true,message: '请输入合同负责人', trigger: 'blur'},
                ]},
                {span: 1,name: 'deptname',type: 'TextField',width: 200,label: '部门名称',disabled: true},
                {span: 1,name: 'accessory',type: 'Button',text: '查看和上传文件',label:'上传合同附件',link:`link-uploadbtn-${this._uid}`,listeners: {
                    click: ()=>{
                        let detailWin = new tjWindow({panel: this,mainGrid: this.mainGrid,title: '招标文件-列表',height: 450,width: 700})
                        detailWin.add(fileListPanel)
                        detailWin.show()
                    }
                }},
                {span: 1,name: 'deptcode',type: 'TextHidden',width: 200},
            ]
        },
        readDetail(){
            if(this.record.process.processcode!=null){
                let processPanel = new processDetail
                processPanel.defaults = {
                    imgconurl: 'project/contract/apply',
                    dataconurl: 'project/contract/apply/doStep',
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.record.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `contract/apply/detail-edit-${this.record.id}-process`},processPanel)
            }else{
                this.$message({type: 'success', message: '当前步骤没有流程!'});
            }
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
            console.info(this.saveConurl,this.formParams,this.formDetail,this.lastFormDetail);
            this.getLinkComponent(this.detailLink).getForm().validate((valid, object) => {
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
            //...
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
                Object.assign(this.lastFormDetail,this.formDetail)
                this.$message({type: 'success',message: '操作成功!'});
            }
        }
    }
}
export default Detail