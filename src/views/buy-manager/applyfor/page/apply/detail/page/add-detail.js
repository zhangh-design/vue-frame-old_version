/**
 * 包信息详情-添加
 */
import validatorField from '@/plugins/validator-field'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    data() {
        return {
            conurl: 'buy/applyfor/apply/addItem',
            defaults: {
                border: false,
                columns: 2,
                width: 300,
                labelWidth: 80
            },
            selectRow: {...this.mainGrid.curRow},
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.mainGrid.curRow.process.id
            }
        }
    },
    methods: {
        initDetailData() {
            this.detailData = [
                {span: 1, name: 'name', type: 'TextField', width: 200, label: '物质名称',rule: [
                    {required: true, message: '请填写物质名称', trigger: 'blur'},
                ]},
                {span: 1, name: 'sort', type: 'TextField', width: 200, label: '物资型号',rule: [
                    {required: true, message: '请填写物资型号', trigger: 'blur'},
                ]},
                {span: 1, name: 'num', type: 'TextField', width: 200, label: '物质数量',rule: [
                    {required: true, message: '请填写物质数量', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'},
                ]},
                {span: 1, name: 'unionprice', type: 'TextField', width: 200, label: '单价',rule: [
                    {required: true, message: '请填写单价', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'},
                ]},
                {span: 1, name: 'price', type: 'TextField', width: 200, label: '金额(元)',rule: [
                    {required: true, message: '请填写金额', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'},
                ]},
                {span: 1, name: 'remark', type: 'TextField', width: 200, label: '说明',rule: [
                    {required: true, message: '请填写说明', trigger: 'blur'},
                ]},
                {span: 1,name: 'pid',type: 'TextHidden',width: 200,value: this.selectRow.id},
            ]
        },
        checkPaymentNum(rule, value, callback) {
            let checkNumber = validatorField.validate('checkNumber', value)
            if (!checkNumber.result) {
                callback(new Error(checkNumber.msg));
            }
            callback();
        },
    }
}
export default Detail
