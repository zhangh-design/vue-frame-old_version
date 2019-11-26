import {mapGetters} from 'vuex'
import {CONST_DEFAULT_CONFIG} from '@/config'
import validatorField from '@/plugins/validator-field'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    props: ['mainPanel', 'mainGrid', 'window'],
    data() {
        return {
            conurl: 'expense/travel/apply/insertApplyDetail',
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
            formType: 'add',
            submitBtnLink: `link-expenseTravelApplyDetail-subbtn-${this._uid}`,
            resetBtnLink: `link-expenseTravelApplyDetail-restbtn-${this._uid}`,
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
                    span: 1, name: 'startaddress', type: 'TextField', width: 180, label: '出发地',
                    rule: [
                        {required: true, message: '请填写出发地', trigger: 'blur'},
                    ]
                },
                {
                    span: 1, name: 'targetaddress', type: 'TextField', width: 180, label: '目的地',
                    rule: [
                        {required: true, message: '请填写目的地', trigger: 'blur'},
                    ]
                },
                {
                    span: 1, name: 'starttime', type: 'DateTimePicker', width: 180, label: '出发时间',
                    rule: [
                        {required: true, message: '请填写出发时间', trigger: 'blur'},
                    ]
                },
                {
                    span: 1, name: 'endtime', type: 'DateTimePicker', width: 180, label: '到达时间',
                    rule: [
                        {required: true, message: '请填写到达时间', trigger: 'blur'},
                    ]
                },
                {
                    span: 1, name: 'sort', width: 180, label: '出差类型',
                    displayField: 'name',
                    valueField: 'code',
                    type: 'ComboBox',
                    conurl: 'dict/readTravelsort',
                    queryParams: {token: this.$store.getters['user/getToken']},
                    rule: [
                        {required: true, message: '请填写出差类型', trigger: 'blur'},
                    ]
                },
                {
                    span: 1, name: 'vehicle', width: 180, label: '交通工具',
                    displayField: 'name',
                    valueField: 'code',
                    type: 'ComboBox',
                    conurl: 'dict/readVehicle',
                    queryParams: {token: this.$store.getters['user/getToken']},
                    rule: [
                        {required: true, message: '请填写交通工具', trigger: 'blur'},
                    ]
                },
                {
                    span: 1, name: 'pay', type: 'TextField', width: 180, label: '票价(元)',
                    rule: [
                        {validator: this.checkPaymentNum, trigger: 'blur'},
                        {required: true, message: '请填写票价(元)', trigger: 'blur'},
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
