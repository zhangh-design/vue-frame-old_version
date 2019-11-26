import validatorField from '@/plugins/validator-field'
import { Authority,AuthorityProps } from '@/plugins/authority'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    mixins: [new Authority({key: 'formButtons',formKey: 'detailData'}),AuthorityProps],
    props: {
        moduleid: {
            type: String,
            default(){
                return this.mainGrid.curModuleId
            }
        }
    },
    title: '详情-修改',
    width: 720,
    height: 270,
    data(){
        return{
            conurl: 'buy/orders/apply/updateDetail',
            detailConurl: 'buy/orders/apply/getPackDetail',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.mainGrid.curRow.process.id,
                id: ''
            },
            defaults: {
                border: false,
                columns: 2,
                width: 340,
                labelWidth: 120
            },
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.mainGrid.curRow.process.id,
                pid:this.mainGrid.curRow.id,
                id: '',
            },
            fileType: 'bids'
        }
    },
    created(){
        this.queryParams.id = this.mainGrid.getSelectedRow().id
        this.formParams.pid = this.mainGrid.getSelectedRow().pid
        this.formParams.id = this.mainGrid.getSelectedRow().id
    },
    methods: {
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'name',type: 'TextField',width: 200,value:this.mainGrid.curRow.name,label: '名称',disabled:true},
                {span: 1,name: 'sort',type: 'TextField',width: 200,value:this.mainGrid.curRow.sort,label: '型号',disabled:true},
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