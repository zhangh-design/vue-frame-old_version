import { mapGetters } from 'vuex'
import { intNumToStr,isEmptyObject} from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import validatorField from '@/plugins/validator-field'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    props: ['mainPanel','mainGrid','window'],
    data(){
        return {
            conurl: 'project/setup/apply/insertMilestone',
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: '',
                projectid: '',
            },
            defaults: {
                border: false,
                columns: 2,
                width: 300,
                labelWidth: 130,
                // buttonPosition: 'right',
            },
            formType: 'add',
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
                {span: 1,name: 'stage',type: 'TextField',width: 160,label: '阶段',rule: [
                    {required: true,message: '请输入阶段', trigger: 'blur'},
                ]},
                {span: 1,name: 'planbegin',type: 'DatePicker',width: 160,label: '计划开始时间',rule: [
                    {required: true,message: '请选择计划开始时间', trigger: 'blur'},
                ]},
                {span: 1,name: 'planend',type: 'DatePicker',width: 160,label: '计划结束时间',rule: [
                    {required: true,message: '请选择计划结束时间', trigger: 'blur'},
                ]},
                {span: 1,name: 'paymentrate',type: 'TextField',width: 160,label: '关联回款比例',rule: [
                    {required: true,message: '请输入关联回款比例', trigger: 'blur'},
                ]},
                {span: 1,name: 'paymentnum',type: 'TextField',width: 160,label: '关联回款金额(万)',rule: [
                    {required: true,message: '请输入关联回款金额', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ]},
                {span: 1,name: 'begintime',type: 'DatePicker',width: 160,disabled: true,label: '实际开始时间'},
                {span: 2,name: 'endtime',type: 'DatePicker',width: 160,disabled: true,label: '实际结束时间'},
                {span: 2,name: 'content',type: 'TextField',width: 470,label: '工作内容',rule: [
                    {required: true,message: '请输入工作内容', trigger: 'blur'},
                ]},
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
                this.$message({type: 'warning',message: '请先添加立项申请!'});
                return false
            }
            return true
        },
        doBeforeSave(){
            this.formParams.processid = this.mainGrid.setUpApplyEditPanel.curRow.process.id
            this.formParams.projectid = this.mainGrid.setUpApplyEditPanel.curRow.id
        },
    }
}
export default Detail
