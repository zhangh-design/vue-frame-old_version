import { mapGetters } from 'vuex'
import { intNumToStr,isEmptyObject} from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import userDetail from '@/components/common/grid/detail/detail'
import validatorField from '@/plugins/validator-field'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    props: ['mainPanel','mainGrid','window'],
    title: '薪资信息-修改',
    height: 260,
    width: 640,
    data(){
        return {
            conurl: 'hr/person/person/updatePay',
            formParams: {
                token: this.$store.getters['user/getToken'],
                id: '',
                payid:''
               // projectid: '',
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
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'personname',type: 'TextField',width: 180,label: '员工姓名',readonly:true},
                {span: 1,name: 'processcode',type: 'TextField',width: 180,label: '变更编号'},
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
                {span: 1,name: 'personid',type: 'TextHidden',width: 180,readonly:true},
            ]
        },
        checkPaymentNum(rule, value, callback){
            let checkNumber = validatorField.validate('checkNumber',value)
            if(!checkNumber.result){
                callback(new Error(checkNumber.msg));
            }
        callback();
        },
        doBeforeSave(){
            this.formParams.id = this.record.id,
            this.formParams.payid = this.record.id
        },
    }
}
export default Detail
