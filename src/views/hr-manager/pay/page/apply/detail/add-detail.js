/**
 * 新增详情页
 */
import { CompareObj,apply } from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import validatorField from '@/plugins/validator-field'
import tjWindow from '@/components/common/window'
import pageDetail from './person/add-grid'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    props: ['mainPanel','mainGrid','window','editPanel'],
    data(){
        return {
            conurl: 'hr/payorder/apply/insertApply',
            saveConurl: 'hr/payorder/apply/doSaveApply',
            submitConurl: 'hr/payorder/apply/doSubmitApply',
            processID: null,
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: '',
                id: '',
                payid: '',
                personid: '',
                personcode: '',
                personname: '',
                deptname: '',
                deptcode: '',
                advice: '',
            },
            defaults: {
                border: false,
                columns: 3,
                width: 300,
                labelWidth: 80,
                buttonPosition: 'left',
            },
            formButtons: [
                {text: '保存', authority: ['write'],link: `link-payApply-savebtn-${this._uid}`, listeners: {click: this.doSave}},
                {text: '流程详情',name:'process',style:'float:right',listeners: {click: ()=>{
                    this.$message({type: 'success', message: '当前步骤没有流程!'});
                }}}
            ],
            formType: 'add',
            buttonsLayout: 'top',
            userLink:`link-hrpay-user-${this._uid}`,
            submitBtnLink: `link-hrpay-subbtn-${this._uid}`,
            resetBtnLink: `link-hrpay-restbtn-${this._uid}`,
            lastFormDetail: {}
        }
    },
    methods: {
        initButtons(){
            this.formButtons.push({text: '提交',disabled: true,link: this.submitBtnLink,authority: ['write'],listeners: {click: this.doSubmit}})
            if(this.formType === 'add'){
                this.formButtons.push({text: '重置',link: this.resetBtnLink,authority: ['write'],listeners: {click: this.resetForm}})
            }
        },
        //设置关联用户
        setSelectProjectinfo(row){
            this.formParams.personid = row.id
            this.formParams.personcode = row.code
            this.formParams.personname = row.name
            this.formParams.deptcode = row.deptcode
            this.formParams.deptname = row.deptname
            this.formDetail.personname = row.name
            //刷新 ‘调薪记录’
            let payGridLink = this.getLinkComponent(this.editPanel.editGridLink).payGridLink
            this.getLinkComponent(payGridLink).setQueryParams({personid: row.id,token: this.$store.getters['user/getToken']})
            this.getLinkComponent(payGridLink).reloadGrid()
        },
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'personname',type: 'TextField',width: 200,label: '员工姓名',readonly: true,emptyText:'请先选取关联项目',rule:[{required: true,message: '请选择员工姓名', trigger: 'blur'}]},
                {span: 1,name: 'personBtn',type: 'Button',style: 'margin-left:-80px;',text:'选取员工姓名',listeners: {
                    click: ()=>{
                        let detailWin = new tjWindow({panel: this,mainGrid: this.getPanel,title: '关联-员工列表查询',height: 500,width: 1000})
                        detailWin.add(pageDetail)
                        detailWin.show()
                    }
                }},
                /* {span: 1,name: 'paytime',type: 'DatePicker',width: 200,label: '调整日期',rule:[
                    {required: true,message: '请输入调整日期', trigger: 'blur'}
                ]}, */
                {span: 1,name: 'changedtime',type: 'DatePicker',width: 200,label: '变更日期',rule:[
                    {required: true,message: '请输入变更日期', trigger: 'blur'}
                ]},
                {span: 3,name: 'reason',type: 'TextArea',rows: 3,label: '变更原因',rule:[
                    {required: true,message: '请输入变更原因', trigger: 'blur'}
                ]},
                {span: 3,name: 'remark',type: 'TextArea',rows: 3,label: '备注'},
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
                            //刷新 ‘调薪记录-调整后’
                            let payGridLink = this.getLinkComponent(this.editPanel.editGridLink).payGridLink
                            if(this.getLinkComponent(payGridLink).getStore().length){
                                let addPayGridLink = this.getLinkComponent(this.editPanel.editGridLink).addPayGridLink
                                this.getLinkComponent(addPayGridLink).setQueryParams({processid: resData.data.process.id,token: this.$store.getters['user/getToken']})
                                this.getLinkComponent(addPayGridLink).reloadGrid('hr/payorder/apply/readPay')
                            }
                        }
                        this.doResult(resData)
                        if(resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                            apply(this.formParams,{...resData.data,dirty: true})
                            if (resData.data.process && resData.data.process.id) {
                                this.formParams.processid = resData.data.process.id;
                                this.formParams.pid = resData.data.process.id;
                                this.processID = resData.data.process.id;
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
            this.$api[this.submitConurl](this.formParams).then(resData=>{
                //...
                if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                    this.mainGrid.reloadGrid();
                    !!this.window && this.window.close()
                    this.getLinkComponent('link-content-panel').getTabContent().removeTab(`hr/pay/apply/detail-add`)
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
            if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode && !this.formParams.id){
                this.getLinkComponent(this.submitBtnLink).setDisabled(false)
                this.getLinkComponent(this.resetBtnLink).setDisabled()
            }
        }
    }
}
export default Detail