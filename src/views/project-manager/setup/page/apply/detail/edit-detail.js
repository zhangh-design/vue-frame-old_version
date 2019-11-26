/**
 * 编辑详情页
 */
import {mapGetters} from 'vuex'
import { CompareObj, apply } from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import pageDetail from './contract/contract-grid'
import tjWindow from '@/components/common/window'
import { Authority,AuthorityProps } from '@/plugins/authority'
import validatorField from '@/plugins/validator-field'
import processDetail from '@/components/process-card'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    mixins: [new Authority({key: 'formButtons',formKey: 'detailData'}),AuthorityProps],
    props: {
        row: {
            type: Object,
            default: null
        },
        tabName: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            conurl: 'project/setup/apply/doSubmitApply',
            saveConurl: 'project/setup/apply/doUpdateApply',
            detailConurl: 'project/setup/apply/getApplyDetail',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id
            },
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id,
                id: this.row.id,
            },
            defaults: {
                border: false,
                columns: 3,
                width: 350,
                labelWidth: 145,
                buttonPosition: 'left',
            },
            buttonsLayout: 'top',
            formButtons: [
                {text: '保存', authority: ['write'],listeners: {click: this.doSave}},
                {text: '流程详情', style:'float:right',listeners: {click: this.doProcessDetail}},
            ],
            lastFormDetail: {},
            contractinfoLink: `link-setupApply-projectinfo-${this._uid}`,
            contractidLink: `link-setupApply-projectid-${this._uid}`
        }
    },
    computed: {
        ...mapGetters({
            userData: 'user/getUserInfo'
        })
    },
    created() {
        //监听form表单渲染事件
        this.$on(this.events.afterFormRender,()=>{
            Object.assign(this.lastFormDetail,this.formDetail)
        })
    },
    methods: {
        //设置关联项目
        setSelectContractinfo(row) {
            this.getLinkComponent(this.contractinfoLink).setTextValue(row.name)
            this.getLinkComponent(this.contractidLink).setTextValue(row.id)
        },
        initDetailData() {
            this.detailData = [
                {span: 1, name: 'code', type: 'TextField', width: 200, disabled: true, label: '项目编号'},
                {span: 1, name: 'name', type: 'TextField', width: 200, label: '项目名称', rule: [
                    {required: true, message: '请输入名称', trigger: 'blur'},
                ]},
                {span: 1, name: 'deptname', type: 'TextField', width: 200, disabled: true, label: '承建部门名称'},
                {span: 1,name: 'sort',label: '类型',displayField: 'name',valueField: 'code',type: 'ComboBox',conurl: 'dict/readProjectsort',queryParams: {token: this.$store.getters['user/getToken']},width: 200,rule: [
                    {required: true, message: '请选择类型', trigger: 'blur'},
                ]},
                {span: 1, name: 'begintime', type: 'DatePicker', width: 200, label: '开始时间', rule: [
                    {required: true, message: '请选择开始时间', trigger: 'blur'},
                ]},
                {span: 1, name: 'endtime', type: 'DatePicker', width: 200, label: '结束时间', rule: [
                    {required: true, message: '请选择结束时间', trigger: 'blur'},
                ]},
                {span: 1, name: 'managername', type: 'TextField', width: 200, disabled: true, label: '项目经理'},
                {span: 1, name: 'amount', type: 'TextField', width: 200, label: '合同金额(万)', rule: [
                    {required: true, message: '请输入合同金额', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ]},
                {span: 1, name: 'cost', type: 'TextField', width: 200, disabled: true, label: '预计总成本（万）'},
                {span: 1, name: 'profit', type: 'TextField', width: 200, disabled: true, label: '预计毛利润（万）'},
                // {span: 1, name: 'profitrate', type: 'TextField', width: 200, disabled: true, label: '预计毛利润率'},
                {span: 1, name: 'profitratestring', type: 'TextField', width: 200, disabled: true, label: '预计毛利润率%'},
                {span: 1, name: 'bonus', type: 'TextField', width: 200, disabled: true, label: '预计奖金(万)'},
                {span: 1, name: 'bonusrate', type: 'TextField', width: 200, label: '奖金系数', rule: [
                    {required: true, message: '请输入奖金系数', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ]},
                {span: 1,name: 'contractname',link: this.contractinfoLink,type: 'TextField',width: 200,label: '关联合同',readonly: true,emptyText: '请先选取关联合同'},
                {
                    span: 1,
                    name: 'contractBtn',
                    type: 'Button',
                    style: 'margin-left:-130px;',
                    text: '选取关联合同',
                    authority: true,
                    listeners: {
                        click: () => {
                            let detailWin = new tjWindow({
                                panel: this,
                                mainGrid: this.getPanel,
                                title: '关联-合同列表查询',
                                height: 500,
                                width: 1000
                            })
                            detailWin.add(pageDetail)
                            detailWin.show()
                        }
                    }
                },
                {span: 1, name: 'contractid', link: this.contractidLink, type: 'TextHidden', width: 200},
                {span: 1, name: 'id', type: 'TextHidden', width: 200},
                {span: 1, name: 'budgetid', type: 'TextHidden', width: 200},
            ]
        },
        checkPaymentNum(rule, value, callback) {
            let checkNumber = validatorField.validate('checkNumber', value)
            if (!checkNumber.result) {
                callback(new Error(checkNumber.msg));
            }
            callback();
        },
        doProcessDetail(){
            if(this.record.process.processcode!=null){
                let processPanel = new processDetail
                processPanel.defaults = {
                    imgconurl: 'project/setup/apply',
                    dataconurl: 'project/setup/apply/doStep',
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.record.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `setup/apply/detail-edit-${this.record.id}-process`},processPanel)
            }else{
                this.$message({type: 'success', message: '当前步骤没有流程!'});
            }
        },
        doSave() {
            if (!this.validate()) {
                return
            }
            this.doBeforeSave()
            //...
            console.info(this.saveConurl, this.formParams, this.formDetail, this.lastFormDetail);
            this.getLinkComponent(this.detailLink).getForm().validate((valid, object) => {
                if (valid) {
                    this.formDetail.dirty = true
                    this.$api[this.saveConurl]({...this.formParams, ...this.formDetail}).then(resData => {
                        //...
                        if (resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode) {
                            !!this.mainGrid && this.mainGrid.reloadGrid();
                            !!this.window && this.window.close()
                            this.$message({type: 'success', message: '操作成功!'});
                        }
                        this.doResult(resData)
                        if (resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode) {
                            this.formParams = {...this.formParams, ...resData.data};
                            if (resData.data.process && resData.data.process.id) {
                                this.formParams.processid = resData.data.process.id;
                            }
                            apply(this.formDetail, this.formParams);
                            apply(this.lastFormDetail, this.formDetail);
                        }
                    })
                    return true;
                } else {
                    console.info('form validate error');
                    return false;
                }
            })
        },
        submitValidate(){
            let compareResult = CompareObj(this.formDetail,this.lastFormDetail,true)
            if(!compareResult){
                this.$message({message: '警告，修改后请先保存!',duration:1000,type: 'warning'});
                return false
            }
            return true
        },
        confirmFn(value){
            Object.assign(this.formParams,{advice: value})
            this.$api[this.conurl]({...this.formParams,...this.formDetail}).then(resData=>{
                //...
                if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                    this.$message({type: 'success',message: '操作成功!'});
                    !!this.mainGrid && this.mainGrid.reloadGrid();
                    !!this.window && this.window.close()
                    this.getLinkComponent('link-content-panel').getTabContent().removeTab(this.tabName)
                }
            })
        },
        doSubmit() {
            if (!this.submitValidate()) {
                return
            }
            this.doBeforeSave()
            //...
            this.getLinkComponent(this.detailLink).getForm().validate((valid, object) => {
                if (valid) {
                    TjUI.dialog.prompt(this.confirmFn)
                    return true;
                }else{
                    console.info('form validate error')
                    return false;
                }
            })
        },
        doResult(resData) {
            if (resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode) {
                Object.assign(this.lastFormDetail, this.formDetail)
            }
        }
    }
}
export default Detail
