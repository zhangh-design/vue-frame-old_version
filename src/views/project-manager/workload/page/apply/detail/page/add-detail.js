/**
 * 包信息详情-添加
 */
import { intNumToStr } from '@/utils/tools'
import validatorField from '@/plugins/validator-field'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    data(){
        return {
            conurl: 'project/workload/apply/addDetail',
            defaults: {
                border: false,
                columns: 3,
                width: 300,
                labelWidth: 110
            },
            selectRow: {...this.mainGrid.curRow},
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.mainGrid.curRow.process.id,
                workloadid:this.mainGrid.curRow.id
            }
        }
    },
    methods: {
        initDetailData(){
            console.log(this.mainGrid.curRow);
            this.detailData = [
                {span: 3,name: 'taskname',type: 'TextArea',width: 780,label: '工作内容',rule:[{required: true,message: '请输入工作内容', trigger: 'blur'}]},
                {span: 1,name: 'totalload',type: 'TextField',width: 180,label: '工作量（天）',rule:[{required: true,message: '请输入工作量', trigger: 'blur'},{validator: this.checkPaymentNum, trigger: 'blur'}]},
                {span: 1,name: 'loaded',type: 'TextField',label: '本次工作量',width: 180,rule:[{required: true,message: '请输入本次工作', trigger: 'blur'},{validator: this.checkPaymentNum, trigger: 'blur'}]},
                {span: 1,name: 'overload',type: 'TextField',width: 180,label: '剩余工作量',rule:[{required: true,message: '请输入剩余工作量', trigger: 'blur'},{validator: this.checkPaymentNum, trigger: 'blur'}]},
                //{span: 1,name: 'workloadid',value:this.mainGrid.curRow.id,type: 'TextHidden',width: 200},
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