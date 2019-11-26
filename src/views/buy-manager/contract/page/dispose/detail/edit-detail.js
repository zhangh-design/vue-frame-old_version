/**
 * 编辑详情页
 */
import tjWindow from '@/components/common/window'
import { CompareObj, apply} from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import fileListPanel from '../../fileList/file-list'
import {Authority, AuthorityProps} from '@/plugins/authority'
import processDetail from '@/components/process-card'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
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
    mixins: [new Authority({key: 'formButtons', formKey: 'detailData'}), AuthorityProps],
    data() {
        return {
            conurl: 'buy/contract/dispose/doSubmitDispose',
            saveConurl: 'buy/contract/dispose/doSaveDispose',
            rejectConurl: 'buy/contract/dispose/doRejectDispose',
            detailConurl: 'buy/contract/dispose/getDetail',
            processID: this.row.process.id,
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id
            },
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id,
                id: this.row.id,
                advice: '',
            },
            defaults: {
                border: false,
                columns: 2,
                width: 500,
                labelWidth: 130,
                buttonPosition: 'left',
            },
            buttonsLayout: 'top',
            formButtons: [{text: '保存', authority: ['write'], listeners: {click: this.doSave}}, {
                text: '流程详情', name: 'process', style: 'float:right', listeners: {
                    click: this.doProcessDetail
                }
            }],
            lastFormDetail: {}
        }
    },
    created() {
        this.$on(this.events.afterFormRender, () => {
            Object.assign(this.lastFormDetail, this.formDetail)
        })
    },
    methods: {
        doProcessDetail(){
            if(this.record.process.processcode!=null){
                let processPanel = new processDetail
                processPanel.defaults = {
                    imgconurl: 'buy/contract/dispose',
                    dataconurl: `buy/contract/dispose/doStep`,
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.record.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `buy/contract/dispose/detail-edit-${this.record.id}-process`},processPanel)
            }else{
                this.$message({type: 'success', message: '当前步骤没有流程!'});
            }
        },
        initDetailData() {
            this.detailData = [
                //{span: 1, name: 'projectid', type: 'TextField', width: 350, label: '项目ID', disabled: true},
                {span: 1, name: 'projectname', type: 'TextField', width: 350, label: '项目名称', disabled: true},
                {span: 1, name: 'applyid', type: 'TextField', width: 350, label: '关联申请单', disabled: true},
                {span: 1, name: 'code', type: 'TextField', width: 350, label: '合同编号', disabled: true},
                {span: 1, name: 'name', type: 'TextField', width: 350, label: '合同名称', disabled: true},
                {span: 1, name: 'sort', type: 'TextField', width: 350, label: '合同类型', disabled: true},
                {span: 1, name: 'amount', type: 'TextField', width: 350, label: '合同金额(万)', disabled: true},
                {span: 1, name: 'org', type: 'TextField', width: 350, label: '客户单位', disabled: true},
                //{span: 1, name: 'deptcode', type: 'TextField', width: 350, label: '承建部门编号', disabled: true},
                {span: 1, name: 'deptname', type: 'TextField', width: 350, label: '承建部门名称', disabled: true},
                {span: 1, name: 'signtime', type: 'DateTimePicker', width: 350, label: '合同签订时间', rule: [
                    {required: true, message: '请输入合同签订时间', trigger: 'blur'},
                ]},
                {span: 1, name: 'expiretime', type: 'DateTimePicker', width: 350, label: '合同到期日期', rule: [
                    {required: true, message: '请输入合同到期日期', trigger: 'blur'},
                ]},
                {span: 1, name: 'stamptime', type: 'DateTimePicker', width: 350, label: '合同盖章日期', rule: [
                    {required: true, message: '请输入合同盖章日期', trigger: 'blur'},
                ]},
                {span: 1, name: 'printnum', type: 'TextField', width: 350, label: '合同份数', rule: [
                    {required: true, message: '请输入合同份数', trigger: 'blur'},
                ]},
                {span: 1,name: 'accessory',type: 'Button',text: '查看和上传合同附件',label: '查看合同附件',
                    listeners: {
                        click: () => {
                            let detailWin = new tjWindow({
                                panel: this,
                                mainGrid: this.mainGrid,
                                title: '合同附件-列表',
                                height: 450,
                                width: 700
                            })
                            detailWin.add(fileListPanel)
                            detailWin.show()
                        }
                    }
                }
            ]
        },
        doSave() {
            if (!this.validate()) {
                return
            }
            this.doBeforeSave()
            this.getLinkComponent(this.detailLink).getForm().validate((valid, object) => {
                if (valid) {
                    this.$api[this.saveConurl]({...this.formParams, ...this.formDetail}).then(resData => {
                        //...
                        if (resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode) {
                            this.$message({type: 'success', message: '操作成功!'});
                            !!this.mainGrid && this.mainGrid.reloadGrid();
                            !!this.window && this.window.close()
                        }
                        if (resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode) {
                            this.formParams = {...this.formParams, ...resData.data,dirty: true};
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
        //同意
        confirmFn(value){
            if(!this.submitValidate()){
                return
            }
            this.getLinkComponent(this.detailLink).getForm().validate((valid, object) => {
                if (valid) {
                    Object.assign(this.formParams,{advice: value})
                    this.$api[this.conurl](this.formParams).then(resData=>{
                        this.doResult(resData)
                    })
                    return true;
                }else{
                    this.$message({message: '警告，表单内容不完整!',duration:1000,type: 'warning'});
                    console.info('form validate error');
                    return false;
                }
            })
        },
        //不同意
        cancelFn(value){
            Object.assign(this.formParams,{advice: value})
            this.$api[this.rejectConurl](this.formParams).then(resData=>{
                this.doResult(resData)
            })
        },
        doSubmit(){
            if(!this.validate()){
                return
            }
            this.doBeforeSave()
            TjUI.dialog.process(this.confirmFn,this.cancelFn)
        },
        doResult(resData) {
            if (resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode) {
                this.$message({type: 'success', message: '操作成功!'});
                !!this.mainGrid && this.mainGrid.reloadGrid();
                this.getLinkComponent('link-content-panel').getTabContent().removeTab(this.tabName)
            }
        }
    }
}
export default Detail
