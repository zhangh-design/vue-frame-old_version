import { mapGetters } from 'vuex'
import { intNumToStr,isEmptyObject} from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import userDetail from '@/components/common/grid/detail/detail'
import { Authority,AuthorityProps } from '@/plugins/authority'
import detail from '@/components/common/grid/detail/detail'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    mixins: [new Authority({key: 'formButtons',formKey: 'detailData'}),AuthorityProps],
    // props: ['mainPanel','mainGrid','window'],
    props: {
        mainPanel: {
            type: Object,
            default(){
                return null
            }
        },
        mainGrid: {
            type: Object,
            default(){
                return null
            }
        },
        window: {
            type: Object,
            default(){
                return null
            }
        },
        moduleid: {
            type: String,
            default(){
                return this.mainGrid.setUpApplyEditPanel.curModuleid
            }
        }
    },
    title: '里程碑信息-修改',
    height: 310,
    width: 640,
    data(){
        return {
            conurl: 'project/setup/apply/updateMilestone',
            detailConurl: 'project/setup/apply/getApplyMilestoneDetail',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.mainGrid.setUpApplyEditPanel.curRow.process.id,
                id: ''
            },
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: '',
                projectid: '',
            },
            defaults: {
                border: false,
                columns: 2,
                width: 300,
                labelWidth: 130,
            },
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
        this.queryParams.id = this.mainGrid.getSelectedRow().id
    },
    methods: {
        initButtons(){
            this.formButtons.push({text: '提交',link: this.submitBtnLink,authority: ['write'],listeners: {click: this.doSubmit}})
            if(this.formType === 'add'){
                this.formButtons.push({text: '重置',link: this.resetBtnLink,authority: ['write'],listeners: {click: this.resetForm}})
            }
        },
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'stage',type: 'TextField',width: 160,label: '阶段',rule: [
                    {required: true,message: '请输入阶段', trigger: 'blur'},
                ]},
                {span: 1,name: 'planbegin',type: 'DatePicker',width: 160,label: '计划开始时间',rule: [
                    {required: true,message: '请选择计划开始时间', trigger: 'blur'},
                ]},
                {span: 1,name: 'planend',type: 'DatePicker',width: 160,label: '计划结束时间',rule: [
                    {required: true,message: '请选择计划结束时间', trigger: 'blur'},
                ]},
                {span: 1,name: 'paymentrate',type: 'TextField',width: 160,label: '关联回款比例',rule: [
                    {required: true,message: '请输入关联回款比例', trigger: 'blur'},
                ]},
                {span: 1,name: 'paymentnum',type: 'TextField',width: 160,label: '关联回款金额(万)',rule: [
                    {required: true,message: '请输入关联回款金额', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ]},
                {span: 1,name: 'begintime',type: 'DatePicker',width: 160,disabled: true,label: '实际开始时间'},
                {span: 2,name: 'endtime',type: 'DatePicker',width: 160,disabled: true,label: '实际结束时间'},
                {span: 2,name: 'content',type: 'TextField',width: 470,label: '工作内容',rule: [
                    {required: true,message: '请输入工作内容', trigger: 'blur'},
                ]},
                {span: 1,name: 'id',type: 'TextHidden',width: 160},
            ]
        },
        doBeforeSave(){
            this.formParams.processid = this.mainGrid.setUpApplyEditPanel.curRow.process.id
            this.formParams.projectid = this.mainGrid.setUpApplyEditPanel.curRow.id
        },
    }
}
export default Detail
