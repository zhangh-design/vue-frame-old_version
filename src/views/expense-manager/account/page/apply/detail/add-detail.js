/**
 * 新增详情页
 */
import { mapGetters } from 'vuex'
import tjWindow from '@/components/common/window'
import { CompareObj,apply } from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import pageDetail from './page/add-grids'
import validatorField from '@/plugins/validator-field'
import { Authority,AuthorityProps } from '@/plugins/authority'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    mixins: [new Authority({key: 'formButtons'}),AuthorityProps],
    props: ['mainPanel','mainGrid','window','editPanel'],
    data(){
        return {
            conurl: 'expense/account/apply/insertApply',
            saveConurl: 'expense/account/apply/doSaveApply',
            submitConurl: 'expense/account/apply/doSubmitApply',
            formParams: {
                token: this.$store.getters['user/getToken'],
                deptcode:'',
                userid:'',
                processid: '',
                id: '',
                advice: '',
            },
            defaults: {
                border: false,
                columns: 2,
                width: 500,
                labelWidth: 120,
                buttonPosition: 'left',
            },
            formButtons: [
                {text: '保存', authority: ['write'],link: `link-accountApply-savebtn-${this._uid}`, listeners: {click: this.doSave}},
                {text: '流程详情',name:'process',style:'float:right',listeners: {click: ()=>{
                    this.$message({type: 'success', message: '当前步骤没有流程!'});
                }}}
            ],
            formType: 'add',
            processID: null,
            buttonsLayout: 'top',
            projectinfoLink: `link-expenseaccountApply-projectinfo-${this._uid}`,
            projectidLink: `link-expenseaccountApply-projectid-${this._uid}`,
            submitBtnLink: `link-accountApply-subbtn-${this._uid}`,
            saveBtnLink: `link-accountApply-savebtn-${this._uid}`,
            resetBtnLink: `link-accountApply-restbtn-${this._uid}`,
            lastFormDetail: {}
        }
    },
    computed: {
        ...mapGetters({
			userData: 'user/getUserInfo'
        })
    },
    created(){
        this.formParams.userid = this.userData.user.id
        this.formParams.deptcode = this.userData.dept.code
    },
    methods: {
        //设置关联项目
        setSelectProjectinfo(row){
            this.getLinkComponent(this.projectinfoLink).setTextValue(row.name)
            this.getLinkComponent(this.projectidLink).setTextValue(row.id)
        },
        initButtons(){
            this.formButtons.push({text: '提交',disabled: true,link: this.submitBtnLink,authority: ['write'],listeners: {click: this.doSubmit}})
            if(this.formType === 'add'){
                this.formButtons.push({text: '重置',link: this.resetBtnLink,authority: ['write'],listeners: {click: this.resetForm}})
            }
        },
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'username',type: 'TextField',value:this.userData.user.name,width: 350,label: '员工姓名',readonly:true,rule:[{required: true,message: '请输入员工姓名', trigger: 'blur'}]},
                {span: 1,name: 'begintime',type: 'DateTimePicker',width: 350,label: '发生时间',rule:[{required: true,message: '请输入发生时间', trigger: 'blur'}]},
                {span: 1,name: 'pay',type: 'TextField',width: 350,label: '报销费用（元）',rule:[{validator: this.checkPaymentNum, trigger: 'blur'},{required: true,message: '请输入报销费用', trigger: 'blur'}]},
                {span: 1,name: 'sort',label: '费用类别',displayField: 'name',valueField: 'code',type: 'ComboBox',conurl:'expense/account/apply/accountsort',queryParams: {token: this.$store.getters['user/getToken']},width: 350,rule:[{required: true,message: '请输入费用类别', trigger: 'blur'}]},
                {span: 1,name: 'projectname',link: this.projectinfoLink,type: 'TextField',width: 350,label: '项目名称',readonly:true,rule:[{required: true,message: '请输入项目名称', trigger: 'blur'}]},
                {span: 1,name: 'projectBtn',type: 'Button',style: 'margin-left:-130px;',text:'选取关联项目',listeners: {
                    click: ()=>{
                        let detailWin = new tjWindow({panel: this,mainGrid: this.getPanel,title: '关联-项目列表查询',height: 500,width: 1000})
                        detailWin.add(pageDetail)
                        detailWin.show()
                    }
                }},
                {span: 2,name: 'deptname',value:this.userData.dept.name,type: 'TextField',width: 350,label: '部门名称',readonly: true,rule:[{required: true,message: '请输入部门名称', trigger: 'blur'}]},
                {span: 1,name: 'remark',type: 'TextArea',width: 350,label: '说明'},
                {span: 1,name: 'projectid',link: this.projectidLink,type: 'TextHidden',width: 350},
            ]
        },
        checkPaymentNum(rule, value, callback) {
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
            this.getLinkComponent(this.detailLink).getForm().validate((valid) => {
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
                    })
                    return true;
                } else {
                    console.info('form validate error');
                    return false;
                }
            })
        },
        submitValidate(){
            let compareResult = CompareObj(this.formDetail, this.lastFormDetail, true)
            if (!compareResult) {
                this.$message({message: '警告，修改后请先保存!', duration: 1000, type: 'warning'});
                return false
            }
            return true
        },
        confirmFn(value){
            Object.assign(this.formParams, {advice: value})
            this.$api[this.submitConurl]({...this.formParams, ...this.formDetail}).then(resData => {
                //...
                if (resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode) {
                    this.mainGrid.reloadGrid();
                    !!this.window && this.window.close()
                    this.getLinkComponent('link-content-panel').getTabContent().removeTab(`expense/account/apply/detail-add`)
    }
            })
        },
        doSubmit() {
            if (!this.submitValidate()) {
                return
            }
            this.doBeforeSave()
            //...
            this.getLinkComponent(this.detailLink).getForm().validate((valid) => {
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
            if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode && !this.formParams.id){
                this.getLinkComponent(this.submitBtnLink).setDisabled(false)
                this.getLinkComponent(this.resetBtnLink).setDisabled()
                //设置 包grid 按钮启用
                this.editPanel.getPageGrid().getTbar()[0].$children[0].setDisabled(false)
                this.editPanel.getPageGrid().getTbar()[0].$children[1].setDisabled(false)
                //用返回值设置 传入包grid的项目申请单数据row
                this.editPanel.getPageGrid().setCurRow(resData.data)
                //设置流程id
                apply(this.formParams,{...resData.data,dirty: true})
                if (resData.data.process && resData.data.process.id) {
                    this.formParams.processid = resData.data.process.id;
                }
            }
        }
    }
}
export default Detail