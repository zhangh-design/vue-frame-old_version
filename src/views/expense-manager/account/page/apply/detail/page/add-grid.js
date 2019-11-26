/**
 * 包信息详情-添加
 */
import { intNumToStr } from '@/utils/tools'
import validatorField from '@/plugins/validator-field'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    data(){
        return {
            conurl: 'expense/account/apply/addDetail',
            defaults: {
                border: false,
                columns: 2,
                width: 340,
                labelWidth: 100
            },
            selectRow: {...this.mainGrid.curRow},
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.mainGrid.curRow.process.id
            }
        }
    },
    methods: {
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'sort',type: 'TextField',width: 200,label: '用途',rule:[{required: true,message: '请输入用途', trigger: 'blur'}]},
                {span: 1,name: 'begintime',type: 'DateTimePicker',width: 200,label: '发生时间',rule:[{required: true,message: '请输入发生时间', trigger: 'blur'}]},
                {span: 1,name: 'pay',type: 'TextField',width: 200,label: '金额(元)',rule:[{required: true,message: '请输入金额', trigger: 'blur'},{validator: this.checkPaymentNum, trigger: 'blur'}]},
                {span: 1,name: 'num',type: 'TextField',width: 200,label: '发票张数',rule:[{required: true,message: '请输入发票张数', trigger: 'blur'},{validator: this.checkPaymentNum, trigger: 'blur'}]},
                {span: 1,name: 'remark',type: 'TextField',width: 200,label: '说明'},
                {span: 1,name: 'pid',type: 'TextHidden',value: intNumToStr(this.selectRow.id),width: 200}
            ]
        },
        checkPaymentNum(rule, value, callback){
            let checkNumber = validatorField.validate('checkNumber',value)
            if(!checkNumber.result){
                callback(new Error(checkNumber.msg));
            }
			callback();
        },
    }
}
export default Detail