import {mapGetters} from 'vuex'
import {CONST_DEFAULT_CONFIG} from '@/config'
import validatorField from '@/plugins/validator-field'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    props: ['mainPanel', 'mainGrid', 'window'],
    data() {
        return {
            conurl: 'expense/travel/apply/insertApplySubsidy',
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: '',
                pid: '',
            },
            defaults: {
                border: false,
                columns: 2,
                width: 340,
                labelWidth: 135,
            },
            submitBtnLink: `link-setupApply-subbtn-${this._uid}`,
            resetBtnLink: `link-setupApply-restbtn-${this._uid}`,
        }
    },
    computed: {
        ...mapGetters({
            userData: 'user/getUserInfo'
        })
    },
    created() {
        if(!!this.mainGrid.row){
            this.formParams.pid = this.mainGrid.row.id;
            this.formParams.processid = this.mainGrid.row.process.id;
        }
    },
    methods: {
        initButtons(){
            this.formButtons.push({text: '提交',link: this.submitBtnLink,authority: ['write'],listeners: {click: this.doSubmit}})
            if(this.formType === 'add'){
                this.formButtons.push({text: '重置',link: this.resetBtnLink,authority: ['write'],listeners: {click: this.resetForm}})
            }
        },
        initDetailData() {
            this.detailData = [
                {
                    span: 1, name: 'address', type: 'TextField', width: 180, label: '出差地',
                    rule: [
                        {required: true, message: '请填写出差地', trigger: 'blur'},
                    ]
                },
                {
                    span: 1, name: 'howday', type: 'TextField', width: 180, label: '出差天数', rule: [
                        {validator: this.checkPaymentNum, trigger: 'blur'},
                        {required: true, message: '请填写出差天数', trigger: 'blur'},
                    ]
                },
                {
                    span: 1, name: 'expense', type: 'TextField', width: 180, label: '出差补助(元)', rule: [
                        {validator: this.checkPaymentNum, trigger: 'blur'},
                    ]
                },
                {
                    span: 1, name: 'roomexpense', type: 'TextField', width: 180, label: '住宿费(元)', rule: [
                        {validator: this.checkPaymentNum, trigger: 'blur'},
                    ]
                },
                {
                    span: 1, name: 'roomnum', type: 'TextField', width: 180, label: '住宿费张数', rule: [
                        {validator: this.checkPaymentNum, trigger: 'blur'},
                    ]
                },
                {
                    span: 1, name: 'vehicleexpense', type: 'TextField', width: 180, label: '室内交通费(元)', rule: [
                        {validator: this.checkPaymentNum, trigger: 'blur'},
                    ]
                },
                {
                    span: 1, name: 'vehiclenum', type: 'TextField', width: 180, label: '室内交通费张数', rule: [
                        {validator: this.checkPaymentNum, trigger: 'blur'},
                    ]
                },
                {
                    span: 1, name: 'otherexpense', type: 'TextField', width: 180, label: '其他费用(元)', rule: [
                        {validator: this.checkPaymentNum, trigger: 'blur'},
                    ]
                },
                {
                    span: 1, name: 'othernum', type: 'TextField', width: 180, label: '其他费用张数', rule: [
                        {validator: this.checkPaymentNum, trigger: 'blur'},
                    ]
                },
                {span: 1, name: 'remark', type: 'TextField', width: 180, label: '备注'},
            ]
        },
        checkPaymentNum(rule, value, callback) {
            let checkNumber = validatorField.validate('checkNumber', value)
            if (!checkNumber.result) {
                callback(new Error(checkNumber.msg));
            }
            callback();
        },
        validate() {
            if (!(!!this.mainGrid.setUpApplyEditPanel.curRow)) {
                this.$message({type: 'warning', message: '请先添加报销申请!'});
                return false
            }
            return true
        },
        doBeforeSave() {
            this.formParams.processid = this.mainGrid.setUpApplyEditPanel.curRow.process.id
            this.formParams.pid = this.mainGrid.setUpApplyEditPanel.curRow.id
        },
    }
}
export default Detail
