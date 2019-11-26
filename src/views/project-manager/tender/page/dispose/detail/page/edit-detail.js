import tjWindow from '@/components/common/window'
import fileListPanel from './file-list'
import { Authority,AuthorityProps } from '@/plugins/authority'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    mixins: [new Authority({key: 'formButtons',formKey: 'detailData'}),AuthorityProps],
    props: {
        moduleid: {
            type: String,
            default(){
                return this.mainGrid.moduleid
            }
        }
    },
    title: '详情-修改',
    width: 700,
    height: 350,
    data(){
        return{
            conurl: 'project/tender/dispose/updateDetail',
            detailConurl: 'project/tender/dispose/getTenderPageDetail',
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
                processid: this.mainGrid.curRow.process.id
            }
        }
    },
    created(){
        this.queryParams.id = this.mainGrid.getSelectedRow().id
    },
    methods: {
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'code',label: '编号',type: 'TextField',width: 200,emptyText: '编号',disabled: true},
                {span: 1,name: 'packagenum',type: 'TextField',width: 200,label: '包号',disabled: true},
                {span: 1,name: 'packagename',type: 'TextField',width: 200,label: '包名',disabled: true},
                {span: 1,name: 'sort',label: '类型',disabled: true,displayField: 'name',valueField: 'code',type: 'ComboBox',conurl:'dict/readTenderSort',queryParams: {token: this.$store.getters['user/getToken']},width: 200,readonly: true},
                {span: 1,name: 'plancost',type: 'TextField',width: 200,label: '预计费用(万)',disabled: true},
                {span: 1,name: 'charge',type: 'TextField',width: 200,label: '标书费用(万)',disabled: true},
                {span: 1,name: 'deposit',type: 'TextField',width: 200,label: '投标保证金(万)',disabled: true},
                {span: 1,name: 'cost',type: 'TextField',width: 200,label: '中标服务费(万)',disabled: true},
                {span: 1,name: 'flag',label: '中标信息',displayField: 'name',valueField: 'code',type: 'ComboBox',conurl:'dict/readTenderFlag',queryParams: {token: this.$store.getters['user/getToken']},width: 200,rule: [
                    {required: true,message: '请输入名称', trigger: 'blur'}
                ]},
                {span: 1,name: 'checkBidsfile',type: 'Button',label: '招标文件',text:'查看招标文件',listeners: {
                    click: ()=>{
                        this._type = 'bidsfile'
                        let detailWin = new tjWindow({panel: this,mainGrid: this.mainGrid,title: '招标文件-列表',height: 450,width: 700})
                        detailWin.add(fileListPanel)
                        detailWin.show()
                    }
                }},
                {span: 1,name: 'checkTenderfile',type: 'Button',label: '投标文件',text:'查看和上传文件',listeners: {
                    click: ()=>{
                        this._type = 'tenderfile'
                        let detailWin = new tjWindow({panel: this,mainGrid: this.mainGrid,title: '招标文件-列表',height: 450,width: 700})
                        detailWin.add(fileListPanel)
                        detailWin.show()
                    }
                }},
                {span:1 ,name:'id',type:'TextHidden',width: 200},
                {span:1 ,name:'pid',type:'TextHidden',width: 200},
            ]
        }
    }
}
export default Detail