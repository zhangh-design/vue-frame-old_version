import { mapGetters } from 'vuex'
import { intNumToStr,isEmptyObject} from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import userDetail from '@/components/common/grid/detail/detail'
import validatorField from '@/plugins/validator-field'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    props: ['mainPanel','mainGrid','window'],
    data(){
        return {
            conurl: 'hr/person/person/insertContract',
            formParams: {
                token: this.$store.getters['user/getToken'],
                pid: '',
                personid: '',
                personname:''
            },
            defaults: {
                border: false,
                columns: 2,
                width: 300,
                labelWidth: 120,
                // buttonPosition: 'right',
            },
            // buttonsLayout: 'top',
            formType: 'add',
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
        
    },
    methods: {
        initButtons(){
            this.formButtons.push({text: '提交',authority: ['write'],link: this.submitBtnLink,listeners: {click: this.doSubmit}})
            if(this.formType === 'add'){
                this.formButtons.push({text: '重置',authority: ['write'],link: this.resetBtnLink,listeners: {click: this.resetForm}})
            }
        },
        initDetailData(){
            this.detailData = [
               // {span: 1,name: 'personid',type: 'TextField',width: 180,label: '员工id',value:this.mainGrid.setUpApplyEditPanel.curRow.id,readonly:true},
                // {span: 1,name: 'personname',type: 'TextField',width: 180,label: '员工姓名',value:this.mainGrid.setUpApplyEditPanel.curRow.name,readonly:true},
                {span: 1,name: 'code',type: 'TextField',width: 180,label: '合同编号',rule: [
                    {required: true,message: '请输入合同编号', trigger: 'blur'},
                ]},
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
                {span: 1,name: 'accessoryBtn',type: 'Button',label:'合同附件',text:'查看/下载合同附件',disabled:true},
            ]
        },
        checkPaymentNum(rule, value, callback){
            let checkNumber = validatorField.validate('checkNumber',value)
            if(!checkNumber.result){
                callback(new Error(checkNumber.msg));
            }
			callback();
        },
        validate(){
            if(!(!!this.mainGrid.setUpApplyEditPanel.curRow)){
                this.$message({type: 'warning',message: '请先添加员工信息!'});
                return false
            }
            return true
        },
        doBeforeSave(){
            this.formParams.personid = this.mainGrid.setUpApplyEditPanel.curRow.id
            this.formParams. personname = this.mainGrid.setUpApplyEditPanel.curRow.name
           // this.formParams.processid = this.mainGrid.setUpApplyEditPanel.curRow.process.id
            //this.formParams.pid = this.mainGrid.setUpApplyEditPanel.curRow.id
        },
    }
}
export default Detail
