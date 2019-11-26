import tjWindow from '@/components/common/window'
import fileListPanel from './file-list'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    title: '包详情-修改',
    width: 700,
    height: 320,
    data(){
        return{
            conurl: 'project/tender/apply/updateDetail',
            defaults: {
                border: false,
                columns: 2,
                width: 340,
                labelWidth: 100
            },
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.mainGrid.curRow.process.id
            }
        }
    },
    methods: {
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'code',label: '名字',type: 'TextField',width: 200,emptyText: '编号',rule: [
                    {required: true,message: '请输入编号', trigger: 'blur'}
                ]},
                {span: 1,name: 'packagenum',type: 'TextField',width: 200,label: '包号'},
                {span: 1,name: 'packagename',type: 'TextField',width: 200,label: '包名'},
                {span: 1,name: 'sort',label: '类型',returnType: 'string',displayField: 'name',valueField: 'code',type: 'ComboBox',conurl:'dict/readTenderSort',queryParams: {token: this.$store.getters['user/getToken']},width: 200},
                {span: 1,name: 'plancost',type: 'TextField',width: 200,label: '预计费用'},
                {span: 1,name: 'charge',type: 'TextField',width: 200,label: '标书费用'},
                {span: 1,name: 'deposit',type: 'TextField',width: 200,label: '投标保证金'},
                {span: 1,name: 'cost',type: 'TextField',width: 200,label: '中标服务费'},
                {span: 1,name: 'flag',label: '中标信息',displayField: 'name',valueField: 'code',type: 'ComboBox',conurl:'dict/readTenderFlag',queryParams: {token: this.$store.getters['user/getToken']},width: 200},
                {span: 1,name: 'uploadbidsfile',type: 'Button',text: '查看和上传文件',label:'上传招标文件',listeners: {
                    click: ()=>{
                        let detailWin = new tjWindow({panel: this,mainGrid: this.mainGrid,title: '招标文件-列表',height: 450,width: 700})
                        detailWin.add(fileListPanel)
                        detailWin.show()
                    }
                }},
                {span: 1,name: 'pid',type: 'TextHidden',value: '',width: 200},  //投标id
                {span: 1,name: 'id',type: 'TextHidden',value: '',width: 200},   //包详情id
            ]
        }
    }
}
export default Detail