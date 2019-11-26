/**
 * 编辑详情页
 */
import { mapGetters } from 'vuex'
import { CompareObj } from '@/utils/tools'
import tjWindow from '@/components/common/window'
import {CONST_DEFAULT_CONFIG} from '@/config'
import payDetail from './page/file-list'
import ticketDetail from './page/file-lists'
import { Authority,AuthorityProps } from '@/plugins/authority'
import processDetail from '@/components/process-card'
import pageDetail from './page/add-grid'
import validatorField from '@/plugins/validator-field'

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
            conurl: 'buy/orders/archive/doSubmitArchive',
            saveConurl: 'buy/orders/archive/doSaveArchive',
            detailConurl: 'buy/orders/archive/getArchiveDetail',
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
                columns: 4,
                width: 280,
                labelWidth: 80,
                buttonPosition: 'left',
            },
            buttonsLayout: 'top',
            formButtons: [
                {text: '保存',authority: ['write'],listeners: {click: this.doSave}},
                {text: '流程详情',name:'process',style:'float:right',listeners: {click: this.doProcessDetail}}
            ],
            projectinfoLink: `link-buyorderApply-projectinfo-${this._uid}`,
            projectidLink: `link-buyorderApply-projectid-${this._uid}`,
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
    mounted(){},
    methods: {
        //设置关联项目
        setSelectProjectinfo(row){
            this.getLinkComponent(this.projectinfoLink).setTextValue(row.name)
            this.getLinkComponent(this.projectidLink).setTextValue(row.id)
        },
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'projectname',labelRender: (h)=>{
                    return h(new TjUI.form.tools.Button,{
                        props: {
                            disabled:true,
                            text: '项目*',
                            listeners: {
                                click: ()=>{
                                    let detailWin = new tjWindow({panel: this,mainGrid: this.getPanel,title: '关联-项目列表查询',height: 500,width: 1000})
                                    detailWin.add(pageDetail)
                                    detailWin.show()
                                }
                            }
                        }
                    })
                },type: 'TextField',width: 180,emptyText:'请选择关联项目',disabled:true},
                {span: 1,name: 'code',type: 'TextField',width: 180,label: '采购编号',disabled:true},
                {span: 2,name: 'name',type: 'TextField',width: 180,label: '采购名称',rule:[
                    {required: true,message: '请输入采购名称', trigger: 'blur'}
                ],disabled:true},
                {span: 1,name: 'deptname',type: 'TextField',width: 180,label: '采购部门',disabled:true},
                {span: 1,name: 'sort',label: '物质性质',width: 180,displayField: 'name',valueField: 'code',type: 'ComboBox',options:[
                    {'code':'易耗品','name':'易耗品'},{'code':'固定资产','name':'固定资产'},{'code':'客户','name':'客户'}
                ],disabled:true},
                {span: 2,name: 'amount',type: 'TextField',width: 155,labelWidth:'105px',label: '采购预算(元)',rule:[
                    {required: true,message: '请输入采购预算(元)', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ],disabled:true},
                {span: 2,name: 'info',type: 'TextField', label: '采购要求',disabled:true},
                {span: 2,name: 'payamount',type: 'TextField',width: 155,labelWidth:'96px',label: '实际金额(元)',disabled:true},
                {span: 1,name: 'financepay',type: 'Radio',width: 180,label: '报销',options: [
                    {label: '财务报销',value: 'false'},
                    {label: '财务打款',value: 'true'}
                ],disabled: true},
                {span: 1,name: 'paytime',type: 'DateTimePicker',width: 180,label: '打款时间',disabled:true},
                {span: 2,name: 'puttime',type: 'DateTimePicker',width: 180,label: '入库时间',rule:[
                    {required: true,message: '请输入入库时间', trigger: 'blur'}
                ]},
                {span: 1,name: 'payinfo',type: 'TextArea',width: 180,rows: 4,label: '报销信息',disabled:true},
                {span: 1,name: 'payBtn',type: 'Button',label:'付款凭证',text:'付款凭证',listeners: {
                    click: ()=>{
                        let detailWin = new tjWindow({panel: this,mainGrid: this.getPanel,title: '查看/下载付款附件',height: 400,width: 500})
                        detailWin.add(payDetail)
                        detailWin.show()
                    }
                }},
                {span: 1,name: 'invoicetime',type: 'DateTimePicker',disabled:true,fieldStyle:'margin-top:40px;margin-left:-280px;',labelWidth:'96px',width: 162,label: '发票归档时间'},
                {span: 1,name: 'ticketBtn',type: 'Button',fieldStyle:'margin: 80px 0px 0px -560px',label:'发票附件',text: '发票附件',listeners: {
                    click: ()=>{
                        let detailWin = new tjWindow({panel: this,mainGrid: this.getPanel,title: '查看/下载发票附件',height: 400,width: 500})
                        detailWin.add(ticketDetail)
                        detailWin.show()
                    }
                }},
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
                    console.info('form validate error')
                    return false;
                }
            })
        },
        doProcessDetail(){
            if(this.record.process.processcode!=null){
                let processPanel = new processDetail
                processPanel.defaults = {
                    imgconurl: 'buy/orders/archive',
                    dataconurl: 'buy/orders/archive/doStep',
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.record.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `buy/orders/archive/detail-edit-${this.record.id}-process`},processPanel)
            }else{
                this.$message({type: 'success', message: '当前步骤没有流程!'});
            }
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