import { mapGetters } from 'vuex'
import { intNumToStr,isEmptyObject} from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import userDetail from '@/components/common/grid/detail/detail'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    props: ['mainPanel','mainGrid','window','moduleid'],
    title: '薪资信息-修改',
    height: 260,
    width: 620,
    data(){
        return {
            conurl: 'hr/person/person/updateIncentive',
            formParams: {
                token: this.$store.getters['user/getToken'],
                id: '',
                payid:''
               // projectid: '',
            },
            defaults: {
                border: false,
                columns: 2,
                width: 300,
                labelWidth: 100,
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
    created(){},
    methods: {
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'personname',type: 'TextField',width: 180,label: '员工姓名',readonly:true},
                {span: 1,name: 'sort',label: '类别',displayField: 'name',valueField: 'code',type: 'ComboBox',conurl:'hr/person/person/readType',queryParams: {token: this.$store.getters['user/getToken']},width: 180,rule: [
                    {required: true,message: '请输入类别', trigger: 'blur'},
                ]},
                {span: 1,name: 'name',type: 'TextField',width: 180,label: '名称',rule: [
                    {required: true,message: '请输入名称', trigger: 'blur'},
                ]},
                {span: 1,name: 'content',type: 'TextField',width: 180,label: '内容',rule: [
                    {required: true,message: '请输入内容', trigger: 'blur'},
                ]},
                {span: 1,name: 'begintime',type: 'DatePicker',width: 180,label: '发生时间',rule: [
                    {required: true,message: '请输入发生时间', trigger: 'blur'},
                ]},
                {span: 1,name: 'org',type: 'TextField',width: 180,label: '发布单位',rule: [
                    {required: true,message: '请输入发布单位', trigger: 'blur'},
                ]},
                {span: 1,name: 'remark',type: 'TextArea',width: 180,label: '备注'},
                {span: 1,name: 'personid',type: 'TextHidden',width: 180,readonly:true},
            ]
        },
        doBeforeSave(){
          //  this.formParams.processid = this.mainGrid.setUpApplyEditPanel.curRow.process.id
          console.log()
            this.formParams.id = this.record.id,
            this.formParams.incentiveid = this.record.id
        },
    }
}
export default Detail
