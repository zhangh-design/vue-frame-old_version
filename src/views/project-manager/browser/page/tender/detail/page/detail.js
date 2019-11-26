/**
 * 包信息详情-添加
 */
import detail from '@/components/common/grid/detail/detail'
import tjWindow from '@/components/common/window'
import fileListPanel from './file-list'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    title: '详情',
    width: 720,
    height: 280,
    data(){
        return {
            conurl: '',
            defaults: {
                border: false,
                columns: 2,
                width: 340,
                labelWidth: 120
            },
            fileType: 'bids'
        }
    },
    mounted(){},
    methods: {
        initPanel(){
            let panel = {
                component: detail,
                props: {
                    link: this.detailLink,
                    ...this.$data,
                    // buttons: this.isShowBtns ? [...this.formButtons,{text: '提交',listeners: {click: this.doSubmit}},{text: '重置',listeners: {click: this.resetForm}}] : [],
                    buttons: []
                }
            }
            this.add(panel)
        },
        initDetailData(){
            console.info(this.mainGrid.curRow,this.record);
            this.detailData = [
                {span: 1,name: 'code',label: '名字',type: 'TextField',disabled: true,width: 200,emptyText: '编号'},
                {span: 1,name: 'packagenum',type: 'TextField',width: 200,disabled: true,label: '包号'},
                {span: 1,name: 'packagename',type: 'TextField',width: 200,disabled: true,label: '包名'},
                
                // {span: 1,name: 'sort',type: 'TextField',width: 200,readonly: true,label: '类型'},
                {span: 1,name: 'sort',label: '类型',returnType: 'string',disabled: true,displayField: 'name',valueField: 'code',type: 'ComboBox',conurl:'dict/readTenderSort',queryParams: {token: this.$store.getters['user/getToken']},width: 200},
                {span: 1,name: 'plancost',type: 'TextField',width: 200,disabled: true,label: '预计费用(万)'},
                {span: 1,name: 'charge',type: 'TextField',width: 200,disabled: true,label: '标书费用(万)'},
                {span: 1,name: 'deposit',type: 'TextField',width: 200,disabled: true,label: '投标保证金(万)'},
                {span: 1,name: 'cost',type: 'TextField',width: 200,disabled: true,label: '中标服务费(万)'},
                {span: 1,name: 'flag',label: '中标信息',disabled: true,displayField: 'name',valueField: 'code',type: 'ComboBox',conurl:'dict/readTenderFlag',queryParams: {token: this.$store.getters['user/getToken']},width: 200},
                {span: 1,name: 'checkBidsfile',type: 'Button',label: '招标文件',text:'查看招标文件',listeners: {
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
                {span: 1,name: 'pid',type: 'TextHidden',width: 200,readonly: true},
                // {span: 1,name: 'bidsfile',type: 'TextField',width: 200,label: '招标文件'},
                // {span: 1,name: 'tenderfile',type: 'TextField',width: 200,label: '投标文件'},
            ]
        }
    }
}
export default Detail