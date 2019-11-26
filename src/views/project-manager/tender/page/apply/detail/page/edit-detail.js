import tjWindow from '@/components/common/window'
import fileListPanel from './file-list'
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
    height: 310,
    data(){
        return{
            conurl: 'project/tender/apply/updateDetail',
            detailConurl: 'project/tender/apply/getTenderPageDetail',
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
                pid: '',
                id: '',
                bidsfile: '',
            },
            fileType: 'bids'
        }
    },
    created(){
        this.queryParams.id = this.mainGrid.getSelectedRow().id

        this.formParams.pid = this.mainGrid.getSelectedRow().pid
        this.formParams.id = this.mainGrid.getSelectedRow().id
        this.formParams.bidsfile = this.mainGrid.getSelectedRow().bidsfile
    },
    methods: {
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'code',label: '名字',type: 'TextField',width: 200,emptyText: '编号',rule: [
                    {required: true,message: '请输入编号', trigger: 'blur'}
                ]},
                {span: 1,name: 'packagenum',type: 'TextField',width: 200,label: '包号',rule: [
                    {required: true,message: '请输入包号', trigger: 'blur'}
                ]},
                {span: 1,name: 'packagename',type: 'TextField',width: 200,label: '包名',rule: [
                    {required: true,message: '请输入包名', trigger: 'blur'}
                ]},
                {span: 1,name: 'sort',label: '类型',returnType: 'string',displayField: 'name',valueField: 'code',type: 'ComboBox',conurl:'dict/readTenderSort',queryParams: {token: this.$store.getters['user/getToken']},width: 200,rule: [
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
                {span: 1,name: 'uploadbidsfile',type: 'Button',text: '查看和上传文件',label:'上传招标文件',listeners: {
                    click: ()=>{
                        this.fileType = 'bids'
                        let detailWin = new tjWindow({panel: this,mainGrid: this.mainGrid,title: '招标文件-列表',height: 450,width: 700})
                        detailWin.add(fileListPanel)
                        detailWin.show()
                    }
                }},
                {span: 1,name: 'uploadTenderfile',type: 'Button',text: '查看投标文件',label:'查看投标文件',listeners: {
                    click: ()=>{
                        this.fileType = 'tender'
                        let detailWin = new tjWindow({panel: this,mainGrid: this.mainGrid,title: '投标文件-列表',height: 450,width: 700})
                        detailWin.add(fileListPanel)
                        detailWin.show()
                    }
                }},
                // {span: 1,name: 'pid',type: 'TextField',value: '',width: 100},  //投标id
                // {span: 1,name: 'id',type: 'TextField',value: '',width: 100},   //包详情id
                // {span: 1,name: 'bidsfile',type: 'TextField',width: 100}        //招标文件服务器文件夹名称
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