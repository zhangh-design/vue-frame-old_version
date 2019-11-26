/**
 * 编辑详情页
 */
import { mapGetters } from 'vuex'
import tjWindow from '@/components/common/window'
import { CompareObj } from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import pageDetail from './page/add-grid'
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
            conurl: 'project/workload/apply/doSubmitApply',
            saveConurl: 'project/workload/apply/doSaveApply',
            detailConurl: 'project/workload/apply/getApplyDetail',
            processID: this.row.process.id,
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id
            },
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id,
                id: this.row.id,
                deptcode:  '',
                workerid:'',
                oprtid: '',
                advice: '',
            },
            defaults: {
                border: false,
                columns: 2,
                width: 500,
                labelWidth: 120,
                buttonPosition: 'left',
            },
            buttonsLayout: 'top',
            projectinfoLink: `link-workloadApply-projectinfo-${this._uid}`,
            projectidLink: `link-workloadApply-projectid-${this._uid}`,
            formButtons: [
                {text: '保存',authority: ['write'],listeners: {click: this.doSave}},
                {text: '流程详情', style:'float:right',listeners: {click: this.doProcessDetail}}
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
        this.formParams.workerid = this.userData.user.id
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
                {span: 1,name: 'deptname',type: 'TextField',width: 350,label: '部门名称',disabled: true,rule: [
                    {required: true,message: '请输入部门名称', trigger: 'blur'},
                ]},
                {span: 1,name: 'workername',type: 'TextField',width: 350,label: '人员名称',disabled: true,rule: [
                    {required: true,message: '请输入人员名称', trigger: 'blur'},
                ]},
                {span: 1,name: 'worktime',type: 'DatePicker',width: 350,label: '工作时间',rule: [
                    {required: true,message: '请输入工作时间', trigger: 'blur'},
                ]},
                {span: 1,name: 'workload',type: 'TextField',width: 350,label: '工作量（天）',rule: [
                    {required: true,message: '请输入工作量', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ]},
                // {span: 1,name: 'deptcode',type: 'TextHidden',width: 350},
                {span: 1,name: 'projectname',link: this.projectinfoLink,type: 'TextField',width: 350,label: '关联项目',readonly: true,emptyText:'请先选取关联项目',rule:[{required: true,message: '请输入关联项目', trigger: 'blur'}]},
                {span: 1,name: 'projectBtn',authority: true,type: 'Button',style: 'margin-left:-130px;',text:'选取关联项目',listeners: {
                    click: ()=>{
                        let detailWin = new tjWindow({panel: this,mainGrid: this.getPanel,title: '关联-项目列表查询',height: 500,width: 1000})
                        detailWin.add(pageDetail)
                        detailWin.show()
                    }
                }},
                {span: 1,name: 'rate',type: 'TextField',width: 350,value:'1',label: '工作量系数',disabled:true},
                {span: 1,name: 'projectid',link: this.projectidLink,type: 'TextHidden',width: 350,readonly:true},
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
                    imgconurl: 'project/workload/apply',
                    dataconurl: 'project/workload/apply/doStep',
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.record.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `workload/apply/detail-edit-${this.record.id}-process`},processPanel)
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
        confirmFn(value){
            Object.assign(this.formParams,{advice: value})
            this.$api[this.conurl]({...this.formParams,...this.formDetail}).then(resData=>{
                //...
                if(resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                    this.$message({type: 'success',message: '操作成功!'});
                    !!this.mainGrid && this.mainGrid.reloadGrid();
                    !!this.window && this.window.close()
                    this.getLinkComponent('link-content-panel').getTabContent().removeTab(this.tabName)
                }
            })
        },
        doSubmit() {
            if (!this.submitValidate()) {
                return
            }
            this.doBeforeSave()
            //...
            this.getLinkComponent(this.detailLink).getForm().validate((valid, object) => {
                if (valid) {
                    TjUI.dialog.prompt(this.confirmFn)
                    return true;
                } else {
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