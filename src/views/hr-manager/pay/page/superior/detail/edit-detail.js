/**
 * 编辑详情页
 */
import { CONST_DEFAULT_CONFIG } from '@/config'
import { Authority,AuthorityProps } from '@/plugins/authority'
import processDetail from '@/components/process-card'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    mixins: [new Authority({key: 'formButtons'}),AuthorityProps],
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
    data(){
        return {
            conurl: 'hr/payorder/superior/doSubmitSuperior',
            rejectConurl: 'hr/payorder/superior/doRejectSuperior',
            detailConurl: 'hr/payorder/superior/getSuperiorDetail',
            processID: this.row.process.id,
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id,
            },
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id,
                id: this.row.id,
                advice: '',
            },
            defaults: {
                border: false,
                columns: 3,
                width: 300,
                labelWidth: 80,
                buttonPosition: 'left',
            },
            buttonsLayout: 'top',
            formButtons: [
                {text: '流程详情', style:'float:right',listeners: {click: this.doProcessDetail}}
            ],
        }
    },
    methods: {
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'personname',type: 'TextField',width: 200,label: '员工姓名',disabled: true,emptyText:'请先选取关联项目',rule:[{required: true,message: '请选择员工姓名', trigger: 'blur'}]},
                {span: 1,name: 'personBtn',type: 'Button',style: 'margin-left:-80px;',text:'选取员工姓名',disabled: true},
                {span: 1,name: 'changedtime',type: 'DatePicker',width: 200,label: '变更日期',disabled: true},
                {span: 3,name: 'reason',type: 'TextArea',rows: 3,label: '变更原因',disabled: true},
                {span: 3,name: 'remark',type: 'TextArea',rows: 3,label: '备注',disabled: true},
            ]
        },
        doProcessDetail(){
            if(this.record.process.processcode!=null){
                let processPanel = new processDetail
                processPanel.defaults = {
                    imgconurl: 'hr/payorder/superior',
                    dataconurl: 'hr/payorder/superior/doStep',
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.record.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `hr/pay/superior/detail-edit-${this.record.id}-process`},processPanel)
            }else{
                this.$message({type: 'success', message: '当前步骤没有流程!'});
            }
        },
        //同意
        confirmFn(value){
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
            TjUI.dialog.process(this.confirmFn,this.cancelFn)
        },
        doResult(resData){
            if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                this.$message({type: 'success',message: '操作成功!'});
                !!this.mainGrid && this.mainGrid.reloadGrid();
                !!this.window && this.window.close()
                this.getLinkComponent('link-content-panel').getTabContent().removeTab(this.tabName)
            }
        }
    }
}
export default Detail