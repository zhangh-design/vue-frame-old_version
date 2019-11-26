/**
 * 查看详情页
 */
import { mapGetters } from 'vuex'
import { CompareObj,apply } from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import tjWindow from '@/components/common/window'
import fileListPanel from './file-list'
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
            conurl: 'project/contract/dispose/doSubmitDispose',
            rejectConurl: 'project/contract/dispose/doRejectDispose',
            saveConurl:'project/contract/dispose/doSaveDispose',
            detailConurl: 'project/contract/dispose/getDisposeDetail',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id
            },
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id,
                id: this.row.id,
            },
            defaults: {
                border: false,
                columns: 3,
                width: 340,
                labelWidth: 130,
                buttonPosition: 'left',
            },
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
        //监听form表单渲染事件
        this.$on(this.events.afterFormRender,()=>{
            Object.assign(this.lastFormDetail,this.formDetail)
        })
    },
    methods: {
        readDetail(){
            if(this.record.process.processcode!=null){
                let processPanel = new processDetail
                processPanel.defaults = {
                    imgconurl: 'project/contract/dispose',
                    dataconurl: 'project/contract/dispose/doStep',
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.record.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `contract/dispose/detail-edit-${this.record.id}-process`},processPanel)
            }else{
                this.$message({type: 'success', message: '当前步骤没有流程!'});
            }
        },
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'name',type: 'TextField',width: 200,disabled:true,label: '合同名称'},
                {span: 1,name: 'amount',type: 'TextField',width: 200,disabled:true,label: '合同金额(万)'},

                {span: 1,name: 'signtime',type: 'DatePicker',width: 200,label: '签订日期',rule: [
                    {required: true,message: '请输入签订日期', trigger: 'blur'},
                ]},
                {span: 1,name: 'expiretime',type: 'DatePicker',width: 200,label: '合同到期日期',rule: [
                    {required: true,message: '请输入合同到期日期', trigger: 'blur'},
                ]},
                {span: 1,name: 'stamptime',type: 'DatePicker',width: 200,label: '合同盖章日期',rule: [
                    {required: true,message: '请输入合同盖章日期', trigger: 'blur'},
                ]},
                {span: 1,name: 'printnum',type: 'TextField',width: 200,label: '打印份数',rule:[
                    {required: true,message: '请输入打印份数', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ]},

                {span: 1,name: 'archivetime',type: 'DatePicker',width: 200,disabled:true,label: '归档日期'},

                {span: 1,name: 'customerunit',label: '客户单位',type: 'TextField',width: 200,disabled:true},
                {span: 1,name: 'manager',type: 'TextField',width: 200,label: '合同负责人',disabled:true},
                {span: 1,name: 'deptname',value:this.userData.dept.name,type: 'TextField',width: 200,label: '部门名称',disabled: true},
                {span: 1,name: 'uploadcontractFileBtn',type: 'Button',text: '查看/上传合同附件列表',label:'合同附件',listeners: {
                    click: this.doCheckFileList
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
        doCheckFileList(){
            let detailWin = new tjWindow({panel: this,mainGrid: this.mainGrid,title: '合同附件-列表',height: 300,width: 500})
            detailWin.add(fileListPanel)
            detailWin.show()
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
                            //覆盖值
                            apply(this.lastFormDetail,this.formDetail)
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
        //同意
        confirmFn(value){
            if(!this.submitValidate()){
                return
            }
            this.getLinkComponent(this.detailLink).getForm().validate((valid, object) => {
                if(valid){
                    Object.assign(this.formParams,{advice: value})
                    this.$api[this.conurl]({...this.formParams}).then(resData=>{
                        if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                            !!this.mainGrid && this.mainGrid.reloadGrid();
                            !!this.window && this.window.close()
                            this.getLinkComponent('link-content-panel').getTabContent().removeTab(this.tabName)
                        }
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
                if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                    !!this.mainGrid && this.mainGrid.reloadGrid();
                    !!this.window && this.window.close()
                    this.getLinkComponent('link-content-panel').getTabContent().removeTab(this.tabName)
                }
            })
        },
        doSubmit(){
            this.doBeforeSave()
            TjUI.dialog.process(this.confirmFn,this.cancelFn)
        },
        doResult(resData){
            if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                this.$message({type: 'success',message: '操作成功!'});
            }
        }
    }
}
export default Detail