import { mapGetters } from 'vuex'
import { intNumToStr,isEmptyObject} from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import userDetail from '@/components/common/grid/detail/detail'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    props: ['mainPanel','mainGrid','window'],
    title: '岗位信息-修改',
    height: 260,
    width: 620,
    data(){
        return {
            conurl: 'hr/person/person/updateStation',
            formParams: {
                token: this.$store.getters['user/getToken'],
                id: '',
                stationid:''
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
                {span: 1,name: 'processcode',type: 'TextField',width: 180,label: '变更编号'},
                {span: 1,name: 'station',type: 'TextField',width: 180,label: '当前岗位',rule: [
                    {required: true,message: '请输入当前岗位', trigger: 'blur'},
                ]},
                {span: 1,name: 'oldstation',type: 'TextField',width: 180,label: '原岗位',rule: [
                    {required: true,message: '请输入原岗位', trigger: 'blur'},
                ]},
                {span: 1,name: 'changedtime',type: 'DatePicker',width: 180,label: '变更日期',rule: [
                    {required: true,message: '请输入变更日期', trigger: 'blur'},
                ]},
                {span: 1,name: 'reason',type: 'TextField',width: 180,label: '变更原因',rule: [
                    {required: true,message: '请输入变更原因', trigger: 'blur'},
                ]},
                {span: 1,name: 'remark',type: 'TextArea',width: 180,label: '备注'},
                {span: 1,name: 'personid',type: 'TextHidden',width: 180,readonly:true},
            ]
        },
        doBeforeSave(){
            this.formParams.id = this.record.id,
            this.formParams.stationid = this.record.id
        },
    }
}
export default Detail
