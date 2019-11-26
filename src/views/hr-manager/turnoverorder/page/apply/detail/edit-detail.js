/**
 * 编辑详情页
 */
import { mapGetters } from 'vuex'
import { CompareObj,apply,applyIn } from '@/utils/tools'
import { CONST_DEFAULT_CONFIG } from '@/config'
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
            submitConurl: 'hr/turnoverorder/apply/doSubmitApply',
            saveConurl: 'hr/turnoverorder/apply/doSaveApply',
            detailConurl: 'hr/turnoverorder/apply/getApplyDetail',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id
            },
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id,
                pid:this.row.process.id,
                id: this.row.id,
                deptcode:  '',
                oprtid: '',
                advice: '',
            },
            defaults: {
                border: false,
                columns: 3,
                width: 330,
                labelWidth: 80,
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
        })
    },
    methods: {
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'personname',type: 'TextField',width: 220,label: '员工姓名',disabled:true},
                {span: 1,name: 'station',type: 'TextField',width: 220,label: '工作岗位',disabled:true},
                {span: 1,name: 'positivetime',type: 'DatePicker',width: 220,label: '转正时间',rule:[
                    {required: true,message: '请输入转正时间', trigger: 'blur'}
                ]},
                {span: 1,name: 'deptname',type: 'TextField',width: 220,label: '部门名称',disabled:true},
                {span: 1,name: 'begintime',type: 'DatePicker', width: 220,label: '入职时间',disabled:true},
                {span: 1,name: 'phone',type: 'TextField',width: 220,label: '联系电话'},
                {span: 3,name: 'comment',type: 'TextArea',rows:6,label: '主管评语',disabled:true},
                {span: 3,name: 'sort',type: 'TextArea',rows:6,label: '转正报告',rule:[{required: true,message: '请输入转正报告', trigger: 'blur'}]},
                // {span: 1,name: 'remark',type: 'TextArea',width: 300,label: '备注'}
                {span: 1,name: 'personid',type: 'TextHidden',width: 220},
                {span: 1,name: 'deptcode',type: 'TextHidden',width: 220},
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
                    imgconurl: 'hr/turnoverorder/apply',
                    dataconurl: 'hr/turnoverorder/apply/doStep',
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.record.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `hr/turnoverorder/apply/detail-edit-${this.record.id}-process`},processPanel)
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
                        }
                        this.doResult(resData)
                        if(resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                            apply(this.formParams,{...resData.data,dirty: true})
                            if (resData.data.process && resData.data.process.id) {
                                this.formParams.processid = resData.data.process.id;
                                this.formParams.personid = resData.data.process.id;

                                applyIn(this.formDetail,this.formParams)
                                //覆盖值
                                apply(this.lastFormDetail,this.formDetail)
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
            console.info(this.formDetail,this.lastFormDetail);
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