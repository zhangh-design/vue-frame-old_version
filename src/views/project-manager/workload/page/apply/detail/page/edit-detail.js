import tjWindow from '@/components/common/window'
//import fileListPanel from './file-list'
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
    width: 910,
    height: 200,
    data(){
        return{
            conurl: 'project/workload/apply/updateDetail',
            detailConurl: 'project/workload/apply/getPageDetail',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.mainGrid.curRow.process.id,
                id: ''
            },
            defaults: {
                border: false,
                columns: 3,
                width: 300,
                labelWidth: 110
            },
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.mainGrid.curRow.process.id,
                id:'',
                workloadid:''
            }
        }
    },
    created() {
        this.formParams.id = this.record.id,
        this.formParams.workloadid = this.mainGrid.curRow.id
        this.queryParams.id = this.record.id
    },
    methods: {
        initDetailData(){
            this.detailData = [
                {span: 3,name: 'taskname',type: 'TextArea',width: 780,label: '工作内容',rule:[{required: true,message: '请输入工作内容', trigger: 'blur'}]},
                {span: 1,name: 'totalload',type: 'TextField',width: 180,label: '工作量(天)',rule:[{required: true,message: '请输入工作量', trigger: 'blur'},{validator: this.checkPaymentNum, trigger: 'blur'}]},
                {span: 1,name: 'loaded',type: 'TextField',label: '本次工作量',width: 180,rule:[{required: true,message: '请输入本次工作量', trigger: 'blur'},{validator: this.checkPaymentNum, trigger: 'blur'}]},
                {span: 1,name: 'overload',type: 'TextField',width: 180,label: '剩余工作量',rule:[{required: true,message: '请输入剩余工作量', trigger: 'blur'},{validator: this.checkPaymentNum, trigger: 'blur'}]},
                //{span: 1,name: 'workloadid',type: 'TextHidden',width: 200,value:this.mainGrid.curRow.id,readonly:true},
                // {span: 1,name: 'id',value:this.record.id,type: 'TextHidden',width: 200},
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