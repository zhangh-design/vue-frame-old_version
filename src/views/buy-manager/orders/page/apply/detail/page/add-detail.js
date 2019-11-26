/**
 * 包信息详情-添加
 */
import validatorField from '@/plugins/validator-field'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    data(){
        return {
            conurl: 'buy/orders/apply/addDetail',
            defaults: {
                border: false,
                columns: 2,
                width: 350,
                labelWidth: 120
            },
            selectRow: {...this.mainGrid.curRow},
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.mainGrid.curRow.process.id,
                pid:this.mainGrid.curRow.id
            }
        }
    },
    created() {
        this.formParams.pid=this.selectRow.id
    },
    methods: {
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'name',type: 'TextField',width: 200,value:this.mainGrid.curRow.name,label: '名称',disabled:true},
                {span: 1,name: 'sort',type: 'TextField',width: 200,label: '型号'},
                {span: 1,name: 'num',type: 'TextField',label: '数量',width: 200,rule: [
                    {required: true,message: '请输入数量', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ]},
                {span: 1,name: 'amount',type: 'TextField',width: 200,label: '预算单价(元)',rule: [
                    {required: true,message: '请输入预算单价(元)', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ]},
                {span: 1,name: 'payamount',type: 'TextField',width: 200,label: '实际单价(元)',disabled:true},
                {span: 1,name: 'amounttotal',type: 'TextField',width: 200,label: '预算综合(元)',disabled:true},
                {span: 1,name: 'payamounttotal',type: 'TextField',width: 200,label: '实际总额(元)',disabled:true},
                
                {span: 1,name: 'remark',label: '要求',type: 'TextField',width: 200}
               // {span: 1,name: 'pid',type: 'TextHidden',value: intNumToStr(this.selectRow.id),width: 200},
            ]
        },
        checkPaymentNum(rule, value, callback){
            let checkNumber = validatorField.validate('checkNumber',value)
            if(!checkNumber.result){
                callback(new Error(checkNumber.msg));
            }
			callback();
        }
    }
}
export default Detail