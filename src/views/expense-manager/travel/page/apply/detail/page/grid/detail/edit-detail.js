import {mapGetters} from 'vuex'
import {CONST_DEFAULT_CONFIG} from '@/config'
import validatorField from '@/plugins/validator-field'
import {Authority, AuthorityProps} from '@/plugins/authority'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    mixins: [new Authority({key: 'formButtons', formKey: 'detailData'}), AuthorityProps],
    props: {
        mainPanel: {
            type: Object,
            default() {
                return null
            }
        },
        mainGrid: {
            type: Object,
            default() {
                return null
            }
        },
        window: {
            type: Object,
            default() {
                return null
            }
        },
        moduleid: {
            type: String,
            default() {
                return this.mainGrid.setUpApplyEditPanel.curModuleid
            }
        }
    },
    title: '里历程碑信息-修改',
    height: 250,
    width: 660,
    data() {
        return {
            conurl: 'expense/travel/apply/doSaveApplyDetail',
            detailConurl: 'expense/travel/apply/getTravelDetail',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: '',
                id: ''
            },
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: '',
                pid: '',
                id: ''
            },
            defaults: {
                border: false,
                columns: 2,
                width: 320,
                labelWidth: 130,
            },
            submitBtnLink: `link-expenseTravelApplySubsidy-subbtn-${this._uid}`,
            resetBtnLink: `link-expenseTravelApplySubsidy-restbtn-${this._uid}`,
        }
    },
    computed: {
        ...mapGetters({
            userData: 'user/getUserInfo'
        })
    },
    created() {
        this.formParams.id = this.mainGrid.getSelectedRow().id;
        this.formParams.pid = this.mainGrid.setUpApplyEditPanel.curRow.id;
        this.formParams.processid = this.mainGrid.setUpApplyEditPanel.curRow.process.id;

        this.queryParams.processid = this.mainGrid.setUpApplyEditPanel.curRow.process.id;
        this.queryParams.id = this.mainGrid.getSelectedRow().id;
    },
    methods: {
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
        }
    }
}
export default Detail
