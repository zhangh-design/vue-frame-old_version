/**
 * 包信息详情-添加
 */
import { intNumToStr } from '@/utils/tools'
import validatorField from '@/plugins/validator-field'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    data(){
        return {
            conurl: 'project/tender/apply/addDetail',
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
                pid:''
            }
        }
    },
    created() {
        this.formParams.pid=intNumToStr(this.selectRow.id)
    },
    methods: {
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'code',label: '编号',type: 'TextField',width: 200,emptyText: '编号',rule: [
                    {required: true,message: '请输入编号', trigger: 'blur'}
                ]},
                {span: 1,name: 'packagenum',type: 'TextField',width: 200,label: '包号',rule: [
                    {required: true,message: '请输入包号', trigger: 'blur'}
                ]},
                {span: 1,name: 'packagename',type: 'TextField',width: 200,label: '包名',rule: [
                    {required: true,message: '请输入包名', trigger: 'blur'}
                ]},
                {span: 1,name: 'sort',label: '类型',displayField: 'name',valueField: 'code',type: 'ComboBox',conurl:'dict/readTenderSort',queryParams: {token: this.$store.getters['user/getToken']},width: 200,rule: [
                    {required: true,message: '请输入类型', trigger: 'blur'}
                ]},
                {span: 1,name: 'plancost',type: 'TextField',width: 200,label: '预计费用(万)',rule: [
                    {required: true,message: '请输入预计费用', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ]},
                {span: 1,name: 'charge',type: 'TextField',width: 200,label: '标书费用(万)',rule: [
                    {required: true,message: '请输入标书费用', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ]},
                {span: 1,name: 'deposit',type: 'TextField',width: 200,label: '投标保证金(万)',rule: [
                    {required: true,message: '请输入投标保证金', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ]},
                {span: 1,name: 'cost',type: 'TextField',width: 200,label: '中标服务费(万)',rule: [
                    {required: true,message: '请输入中标服务费', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ]},
                {span: 1,name: 'flag',label: '中标信息',type: 'TextField',disabled:true,width: 200,emptyText: ''},
                {span: 1,name: 'uploadbidsfile',type: 'Button',text: '查看和上传文件',label:'上传招标文件',disabled:true},
                {span: 1,name: 'uploadTenderfile',type: 'Button',text: '查看投标文件',label:'查看投标文件',disabled:true},
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