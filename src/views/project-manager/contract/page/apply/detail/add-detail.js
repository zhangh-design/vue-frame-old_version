/**
 * 新增详情页
 */
import { mapGetters } from 'vuex'
import tjWindow from '@/components/common/window'
import { apply,CompareObj } from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import fileListPanel from './page/file-list'
import validatorField from '@/plugins/validator-field'
import { Authority,AuthorityProps } from '@/plugins/authority'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    mixins: [new Authority({key: 'formButtons'}),AuthorityProps],
    props: ['mainPanel','mainGrid','window','editPanel'],
    data(){
        return {
            conurl: 'project/contract/apply/insertApply',
            updateConurl: 'project/contract/apply/doSaveApply',
            submitConurl: 'project/contract/apply/doSubmitApply',
            formParams: {
                token: this.$store.getters['user/getToken'],
                code: '',
                oprtid: '',
                processid: '',
                id: '',
                advice: '',
            },
            defaults: {
                border: false,
                columns: 3,
                width: 340,
                labelWidth: 130,
                buttonPosition: 'left',
            },
            formButtons: [{text: '保存',authority: ['write'],link: `link-contractApply-savebtn-${this._uid}`,listeners: {
                click: this.doSave
            }},
            {text: '流程详情',name:'process',style:'float:right',listeners: {click: this.readDetail}}
            ],
            formType: 'add',
            processID: null,
            buttonsLayout: 'top',
            submitBtnLink: `link-tenderApply-subbtn-${this._uid}`,
            resetBtnLink: `link-tenderApply-restbtn-${this._uid}`,
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
        readDetail(){
            this.$message({type: 'success', message: '当前步骤没有流程!'});
        },
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'name',type: 'TextField',width: 200,label: '合同名称',rule: [
                    {required: true,message: '请输入名称', trigger: 'blur'},
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
                {span: 1,name: 'deptname',value:this.userData.dept.name,type: 'TextField',width: 200,label: '部门名称',disabled: true},
                {span: 1,name: 'uploadAccessoryFileBtn',type: 'Button',text: '查看和上传文件',disabled:true,link:this.accessoryFileBtnLink,label:'上传合同附件',listeners: {
                    click: ()=>{
                        let detailWin = new tjWindow({panel: this,mainGrid: this.mainGrid,title: '合同附件-列表',height: 450,width: 700})
                        detailWin.add(fileListPanel)
                        detailWin.show()
                    }
                }},
                {span: 1,name: 'deptcode',value:this.userData.dept.code,type: 'TextHidden',width: 200},
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
                    this.$api[!this.formParams.id ? this.conurl : this.updateConurl]({...this.formParams,...this.formDetail}).then(resData=>{
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
                                this.formParams.processid = resData.data.process.id
                                this.processID =  resData.data.process.id
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
                    this.getLinkComponent('link-content-panel').getTabContent().removeTab(`contract/apply/detail-add`)
                }
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
            if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode && !this.formParams.id){
                this.getLinkComponent(this.submitBtnLink).setDisabled(false)
                this.getLinkComponent(this.resetBtnLink).setDisabled()
                //上传合同附件按钮启用
                this.getLinkComponent(this.accessoryFileBtnLink).setDisabled(false)
                //设置 包grid 按钮启用
                this.editPanel.getPageGrid().getTbar()[0].$children[0].setDisabled(false)
                this.editPanel.getPageGrid().getTbar()[0].$children[1].setDisabled(false)
                //用返回值设置 传入包grid的项目申请单数据row
                this.editPanel.getPageGrid().setCurRow(resData.data)
            }
        }
    }
}
export default Detail