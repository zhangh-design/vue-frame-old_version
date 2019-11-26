/**
 * 编辑详情页
 */
import { mapGetters } from 'vuex'
import { CompareObj } from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import validatorField from '@/plugins/validator-field'
import fileListPanel from './file-list'
import tjWindow from '@/components/common/window'
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
            conurl: 'project/tender/finance/doSubmitFinance',
            rejectConurl: 'project/tender/finance/doRejectFinance',
            saveConurl:'project/tender/finance/doSaveFinance',
            detailConurl: 'project/tender/finance/getfinanceDetail',
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
            formButtons: [{text: '保存',authority: ['write'],listeners: {click: this.doSave}}, {text: '流程详情',name:'process',style:'float:right',listeners: {click: this.doProcessDetail}}],
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
    mounted(){},
    methods: {
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'name',type: 'TextField',width: 200,label: '名称',disabled: true},
                {span: 1,name: 'code',type: 'TextField',link: this.codeLink,width: 200,label: '批次',disabled: true},
                {span: 1,name: 'area',type: 'TextField',width: 200,label: '招标地区',disabled: true},
                {span: 1,name: 'org',type: 'TextField',width: 200,label: '招标机构',disabled: true},
                {span: 1,name: 'proxyorg',type: 'TextField',width: 200,label: '代理机构',disabled: true},
                {span: 1,name: 'buytime',type: 'DatePicker',width: 200,label: '标书购买时间',disabled: true},
                {span: 1,name: 'tendertime',type: 'DatePicker',width: 200,label: '投标时间',disabled: true},
                {span: 1,name: 'charge',type: 'TextField',width: 200,label: '标书费用(万)',disabled: true,emptyText: ''},
                {span: 1,name: 'deposit',type: 'TextField',width: 200,label: '投标保证金(万)',disabled: true,emptyText: ''},
                {span: 1,name: 'cost',type: 'TextField',width: 200,label: '中标服务费(万)',disabled: true,emptyText: ''},
                // {span: 1,name: 'deptcode',value: this.userData.dept.code,type: 'TextField',width: 140,label: '经办部门CODE',disabled: true},
                {span: 1,name: 'deptname',value: this.userData.dept.name,type: 'TextField',width: 200,disabled: true,label: '经办部门名称'},
                // {span: 1,name: 'oprtid',value: this.userData.user.code,type: 'TextField',width: 140,label: '经办人ID',disabled: true},
                {span: 1,name: 'oprtname',value: this.userData.user.name,type: 'TextField',width: 200,disabled: true,label: '经办人名称'},
                {span: 1,name: 'paymentnum',type: 'TextField',width: 200,label: '付款金额(万)',rule: [
                    {required: true,message: '请输入付款金额', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ]},
                {span: 2,name: 'uploadbidsfile',type: 'Button',text: '查看付款凭证',label:'付款凭证',listeners: {
                    click: ()=>{
                        let detailWin = new tjWindow({panel: this,mainGrid: this.getPanel,title: '查看/下载付款凭证',height: 400,width: 500})
                        detailWin.add(fileListPanel)
                        detailWin.show()
                    }
                }},
                {span: 2,name: 'remark',type: 'TextArea',width: 550,label: '备注',disabled: true},
                {span: 1,name: 'paymentfile',type: 'TextHidden',width: 200},
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
                    imgconurl: 'project/tender/finance',
                    dataconurl: 'project/tender/finance/doStep',
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.record.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `tender/finance/detail-edit-${this.record.id}-process`},processPanel)
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
        //同意
        confirmFn(value){
            if(!this.submitValidate()){
                return
            }
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