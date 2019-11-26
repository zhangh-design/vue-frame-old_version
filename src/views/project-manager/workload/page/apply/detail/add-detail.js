/**
 * 新增详情页
 */
import { mapGetters } from 'vuex'
import { intNumToStr,isEmptyObject,CompareObj,apply } from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import tjWindow from '@/components/common/window'
import pageDetail from './page/add-grid'
import userDetail from '@/components/common/grid/detail/detail'
import validatorField from '@/plugins/validator-field'
import { Authority,AuthorityProps } from '@/plugins/authority'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    mixins: [new Authority({key: 'formButtons'}),AuthorityProps],
    props: ['mainPanel','mainGrid','window','editPanel'],
    data(){
        return {
            conurl: 'project/workload/apply/insertApply',
            saveConurl: 'project/workload/apply/doSaveApply',
            submitConurl: 'project/workload/apply/doSubmitApply',
            formParams: {
                token: this.$store.getters['user/getToken'],
                code: '',
                oprtid: '',
                processid: '',
                id: '',
                advice: '',
                workerid:'',
                deptcode:'',
            },
            defaults: {
                border: false,
                columns: 2,
                width: 500,
                labelWidth: 120,
                buttonPosition: 'left',
            },
            formButtons: [
                {text: '保存', authority: ['write'],link: `link-workloadApply-savebtn-${this._uid}`, listeners: {click: this.doSave}},
                {text: '流程详情',name:'process',style:'float:right',listeners: {click: ()=>{
                    this.$message({type: 'success', message: '当前步骤没有流程!'});
                }}}
            ],
            formType: 'add',
            lastFormDetail: {},
            processID: null,
            buttonsLayout: 'top',
            saveBtnLink: `link-workloadApply-savebtn-${this._uid}`,
            submitBtnLink: `link-workloadApply-subbtn-${this._uid}`,
            resetBtnLink: `link-workloadApply-restbtn-${this._uid}`,
            projectinfoLink: `link-workloadApply-projectinfo-${this._uid}`,
            projectidLink: `link-workloadApply-projectid-${this._uid}`
        }
    },
    computed: {
        ...mapGetters({
			userData: 'user/getUserInfo'
        })
    },
    created(){
        this.formParams.oprtid = this.userData.user.id
        this.formParams.workerid = this.userData.user.id
        this.formParams.deptcode = this.userData.dept.code
    },
    methods: {
        initButtons(){
            this.formButtons.push({text: '提交',disabled: true,link: this.submitBtnLink,authority: ['write'],listeners: {click: this.doSubmit}})
            if(this.formType === 'add'){
                this.formButtons.push({text: '重置',link: this.resetBtnLink,authority: ['write'],listeners: {click: this.resetForm}})
            }
        },
        //设置关联项目
        setSelectProjectinfo(row){
            this.getLinkComponent(this.projectinfoLink).setTextValue(row.name)
            this.getLinkComponent(this.projectidLink).setTextValue(intNumToStr(row.id))
        },
        initDetailData(){
            console.log(this.userData)
            this.detailData = [
                {span: 1,name: 'deptname',value:this.userData.dept.name,type: 'TextField',width: 350,label: '部门名称',disabled: true,rule: [
                    {required: true,message: '请输入部门名称', trigger: 'blur'},
                ]},
                {span: 1,name: 'workername',value:this.userData.user.name,type: 'TextField',width: 350,label: '人员名称',disabled: true,rule: [
                    {required: true,message: '请输入人员名称', trigger: 'blur'},
                ]},
                {span: 1,name: 'worktime',type: 'DatePicker',width: 350,label: '工作时间',rule: [
                   {required: true,message: '请输入工作时间', trigger: 'blur'},
                ]},
                {span: 1,name: 'workload',type: 'TextField',width: 350,label: '工作量（天）',rule: [
                    {required: true,message: '请输入工作量', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ]},
                {span: 1,name: 'projectname',link: this.projectinfoLink,type: 'TextField',width: 350,label: '关联项目',readonly: true,emptyText:'请先选取关联项目',rule:[{required: true,message: '请选择关联项目', trigger: 'blur'}]},
                {span: 1,name: 'projectBtn',type: 'Button',style: 'margin-left:-130px;',text:'选取关联项目',listeners: {
                    click: ()=>{
                        let detailWin = new tjWindow({panel: this,mainGrid: this.getPanel,title: '关联-项目列表查询',height: 500,width: 1000})
                        detailWin.add(pageDetail)
                        detailWin.show()
                    }
                }},
                {span: 1,name: 'rate',type: 'TextField',width: 350,label: '工作量系数',disabled:true},
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
                             //覆盖值
                             apply(this.lastFormDetail,this.formDetail)
                        }
                        this.doResult(resData)
                        if(resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                            apply(this.formParams,{...resData.data,dirty: true})
                            if (resData.data.process && resData.data.process.id) {
                                this.formParams.processid = resData.data.process.id;
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
                    this.$message({type: 'success',message: '操作成功!'});
                    this.mainGrid.reloadGrid();
                    !!this.window && this.window.close()
                    this.getLinkComponent('link-content-panel').getTabContent().removeTab(`workload/apply/detail-add`)
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
                this.getLinkComponent(this.submitBtnLink).setDisabled(false)
                this.getLinkComponent(this.resetBtnLink).setDisabled()
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