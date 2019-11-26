import { mapGetters } from 'vuex'
import { intNumToStr,isEmptyObject} from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import userDetail from '@/components/common/grid/detail/detail'
import validatorField from '@/plugins/validator-field'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    props: ['mainPanel','mainGrid','window'],
    data(){
        return {
            conurl: 'hr/person/person/insertPay',
            formParams: {
                token: this.$store.getters['user/getToken'],
                pid: '',
                personid: '',
                personname:''
                //projectid: '',
            },
            defaults: {
                border: false,
                columns: 2,
                width: 300,
                labelWidth: 100,
                // buttonPosition: 'right',
            },
            // buttonsLayout: 'top',
            submitBtnLink: `link-setupApply-subbtn-${this._uid}`,
            resetBtnLink: `link-setupApply-restbtn-${this._uid}`,
        }
    },
    computed: {
        ...mapGetters({
			userData: 'user/getUserInfo'
        })
    },
    created(){},
    methods: {
        initButtons(){
            this.formButtons.push({text: '提交',authority: ['write'],link: this.submitBtnLink,listeners: {click: this.doSubmit}})
            if(this.formType === 'add'){
                this.formButtons.push({text: '重置',authority: ['write'],link: this.resetBtnLink,listeners: {click: this.resetForm}})
            }
        },
        initDetailData(){
            this.detailData = [
                // {span: 1,name: 'personid',type: 'TextField',width: 180,label: '员工id',value:this.mainGrid.setUpApplyEditPanel.curRow.id,readonly:true},
                // {span: 1,name: 'personname',type: 'TextField',width: 180,label: '员工姓名',value:this.mainGrid.setUpApplyEditPanel.curRow.name,readonly:true},
                {span: 1,name: 'processcode',type: 'TextField',width: 180,label: '变更编号',rule:[
                    {required: true,message: '请输入变更编号', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}

                ]},
                {span: 1,name: 'pay',type: 'TextField',width: 180,label: '当前标准工资',rule: [
                    {required: true,message: '请输入当前标准工资', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ]},
                {span: 1,name: 'oldpay',type: 'TextField',width: 180,label: '原标准工资',rule: [
                    {required: true,message: '请输入原标准工资', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ]},
                {span: 1,name: 'changedtime',type: 'DatePicker',width: 180,label: '变更日期',rule: [
                    {required: true,message: '请输入变更日期', trigger: 'blur'},
                ]},
                {span: 1,name: 'reason',type: 'TextField',width: 180,label: '变更原因',rule: [
                    {required: true,message: '请输入变更原因', trigger: 'blur'},
                ]},
                {span: 1,name: 'remark',type: 'TextArea',width: 180,label: '备注'},
            ]
        },
        checkPaymentNum(rule, value, callback){
            let checkNumber = validatorField.validate('checkNumber',value)
            if(!checkNumber.result){
                callback(new Error(checkNumber.msg));
            }
			callback();
        },
        validate(){
            if(!(!!this.mainGrid.setUpApplyEditPanel.curRow)){
                this.$message({type: 'warning',message: '请先添加员工信息!'});
                return false
            }
            return true
        },
        doBeforeSave(){
            this.formParams.personid = this.mainGrid.setUpApplyEditPanel.curRow.id
            this.formParams. personname = this.mainGrid.setUpApplyEditPanel.curRow.name
           // this.formParams.processid = this.mainGrid.setUpApplyEditPanel.curRow.process.id
            //this.formParams.pid = this.mainGrid.setUpApplyEditPanel.curRow.id
        },
    }
}
export default Detail
