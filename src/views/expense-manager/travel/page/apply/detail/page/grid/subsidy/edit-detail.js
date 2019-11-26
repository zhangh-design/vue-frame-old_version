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
    title: '出差补贴信息-修改',
    height: 280,
    width: 700,
    data() {
        return {
            conurl: 'expense/travel/apply/doSaveApplySubsidy',
            detailConurl: 'expense/travel/apply/getSubsidyDetail',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: '',
                id: ''
            },
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: '',
                id: '',
                pid: ''
            },
            defaults: {
                border: false,
                columns: 2,
                width: 320,
                labelWidth: 130,
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
        }
    }
}
export default Detail
