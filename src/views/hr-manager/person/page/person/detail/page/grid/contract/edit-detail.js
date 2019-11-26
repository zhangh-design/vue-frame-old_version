import { mapGetters } from 'vuex'
import tjWindow from '@/components/common/window'
import userDetail from '@/components/common/grid/detail/detail'
import fileListPanel from './file-list'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    props: ['mainPanel','mainGrid','window','moduleid'],
    title: '合同信息-修改',
    height: 220,
    width: 640,
    data(){
        return {
            you:'11111111111111111111',
            conurl: 'hr/person/person/updateContract',
            formParams: {
                token: this.$store.getters['user/getToken'],
                id: '',
                contractid:'',
                personid:'',
                code:''
               // projectid: '',
            },
            defaults: {
                border: false,
                columns: 2,
                width: 300,
                labelWidth: 120,
                // buttonPosition: 'right',
            },
            // buttonsLayout: 'top',
            submitBtnLink: `link-setupApply-subbtn-${this._uid}`,
            resetBtnLink: `link-setupApply-restbtn-${this._uid}`,
        }
    },
    computed: {
        ...mapGetters({
			userData: 'user/getUserInfo'
        })
    },
    created(){
        this.formParams.code = this.record.code
        this.formParams.personid = this.record.personid
    },
    methods: {
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'personname',type: 'TextField',width: 180,label: '员工姓名',readonly:true},
                {span: 1,name: 'name',type: 'TextField',width: 180,label: '合同名称',rule: [
                    {required: true,message: '请输入合同名称', trigger: 'blur'},
                ]},
                {span: 1,name: 'begintime',type: 'DatePicker',width: 180,label: '合同生效时间',rule: [
                    {required: true,message: '请输入合同生效时间', trigger: 'blur'},
                ]},
                {span: 1,name: 'endtime',type: 'DatePicker',width: 180,label: '合同终止时间',rule: [
                    {required: true,message: '请输入合同终止时间', trigger: 'blur'},
                ]},
                {span: 1,name: 'remark',type: 'TextArea',width: 180,label: '备注'},
                {span: 1,name: 'accessoryBtn',type: 'Button',label:'合同附件',text:'查看/下载合同附件',listeners: {
                    click: ()=>{
                        let detailWin = new tjWindow({panel: this,mainGrid: this.getPanel,title: '查看/下载合同附件',height: 400,width: 500})
                        detailWin.add(fileListPanel)
                        detailWin.show()
                    }
                }},
               // {span: 1,name: 'personid',type: 'TextHidden',width: 180,readonly:true},
               // {span: 1,name: 'code',type: 'TextHidden',width: 180,readonly:true},
            ]
        },
        doBeforeSave(){
          //  this.formParams.processid = this.mainGrid.setUpApplyEditPanel.curRow.process.id
          console.log()
            this.formParams.id = this.record.id,
            this.formParams.contractid = this.record.id
        },
    }
}
export default Detail
