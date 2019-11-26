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
            conurl: 'project/setup/apply/insertHr',
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: '',
                projectid: '',
            },
            defaults: {
                border: false,
                columns: 2,
                width: 340,
                labelWidth: 145,
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
                {span: 1,name: 'user',type: 'TextField',width: 180,label: '人员名称'},
                {span: 1,name: 'station',type: 'TextField',width: 180,label: '岗位',rule: [
                    {required: true,message: '请输入岗位', trigger: 'blur'},
                ]},
                {span: 1,name: 'num',type: 'TextField',width: 180,label: '数量',rule: [
                    {required: true,message: '请输入数量', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ]},
                {span: 1,name: 'dept',type: 'TextField',width: 180,label: '所在部门',rule: [
                    {required: true,message: '请输入所在部门', trigger: 'blur'},
                ]},
                {span: 1,name: 'begintime',type: 'DatePicker',width: 180,label: '计划入场时间',rule: [
                    {required: true,message: '请选择计划入场时间', trigger: 'blur'},
                ]},
                {span: 1,name: 'endtime',type: 'DatePicker',width: 180,label: '计划退场时间',rule: [
                    {required: true,message: '请选择计划退场时间', trigger: 'blur'},
                ]},
                {span: 1,name: 'content',type: 'TextField',width: 180,label: '工作内容',rule: [
                    {required: true,message: '请输入工作内容', trigger: 'blur'},
                ]},
                {span: 1,name: 'workload',type: 'TextField',width: 180,label: '预计工作量(人天）',rule: [
                    {required: true,message: '请输入预计工作量', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ]},
                {span: 1,name: 'consts',type: 'TextField',width: 180,label: '预计成本(万)',rule: [
                    {required: true,message: '请输入预计成本', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
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
