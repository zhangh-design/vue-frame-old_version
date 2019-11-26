/**
 * 新增详情页
 */
import { mapGetters } from 'vuex'
import { CompareObj, apply,applyIn } from '@/utils/tools'
import tjWindow from '@/components/common/window'
import { CONST_DEFAULT_CONFIG } from '@/config'
import { Authority,AuthorityProps } from '@/plugins/authority'
import pageDetail from './page/add-grid'
import validatorField from '@/plugins/validator-field'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    mixins: [new Authority({key: 'formButtons'}),AuthorityProps],
    props: ['mainPanel', 'mainGrid', 'window', 'editPanel'],
    data() {
        return {
            conurl: 'buy/orders/apply/insertApply',
            updateConurl: 'buy/orders/apply/doSaveApply',
            submitConurl: 'buy/orders/apply/doSubmitApply',
            formParams: {
                token: this.$store.getters['user/getToken'],
                deptcode: '',
                oprtid: '',
                processid: '',
                id: '',
                projectid: '',
                advice: '',
            },
            defaults: {
                border: false,
                columns: 4,
                width: 280,
                labelWidth: 80,
                buttonPosition: 'left',
            },
            formButtons: [{
                text: '保存', authority: ['write'],link: `link-tenderApply-savebtn-${this._uid}`, listeners: {
                    click: this.doSave
                    }
                },
                {text: '流程详情',name:'process',style:'float:right',listeners: {click: ()=>{
                    this.$message({type: 'success', message: '当前步骤没有流程!'});
                }}}
            ],
            formType: 'add',
            buttonsLayout: 'top',
            submitBtnLink: `link-buyordersApply-subbtn-${this._uid}`,
            resetBtnLink: `link-buyordersApply-restbtn-${this._uid}`,
            lastFormDetail: {}
        }
    },
    computed: {
        ...mapGetters({
            userData: 'user/getUserInfo'
        })
    },
    created() {
        this.formParams.deptcode = this.userData.dept.code
        this.formParams.oprtid = this.userData.user.id
    },
    methods: {
        initButtons(){
            this.formButtons.push({text: '提交',disabled: true,link: this.submitBtnLink,authority: ['write'],listeners: {click: this.doSubmit}})
        },
        //设置关联项目
        setSelectProjectinfo(row){
            this.formDetail.projectname = row.name
            this.formParams.projectid = row.id
        },
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'projectname',labelRender: (h)=>{
                    return h(new TjUI.form.tools.Button,{
                        props: {
                            text: '项目*',
                            listeners: {
                                click: ()=>{
                                    let detailWin = new tjWindow({panel: this,mainGrid: this.getPanel,title: '关联-项目列表查询',height: 500,width: 1000})
                                    detailWin.add(pageDetail)
                                    detailWin.show()
                                }
                            }
                        }
                    })
                },type: 'TextField',width: 180,emptyText:'请选择关联项目',readonly:true},
                {span: 1,name: 'code',type: 'TextField',width: 180,label: '采购编号',disabled:true},
                {span: 2,name: 'name',type: 'TextField',width: 180,label: '采购名称',rule:[
                    {required: true,message: '请输入采购名称', trigger: 'blur'}
                ]},
                {span: 1,name: 'deptname',type: 'TextField',value:this.userData.dept.name,width: 180,label: '采购部门',disabled:true},
                {span: 1,name: 'sort',label: '物质性质',width: 180,displayField: 'name',valueField: 'code',type: 'ComboBox',options:[
                    {'code':'易耗品','name':'易耗品'},{'code':'固定资产','name':'固定资产'},{'code':'客户','name':'客户'}
                ],rule:[
                    {required: true,message: '请输入物质性质', trigger: 'blur'}
                ]},
                {span: 2,name: 'amount',type: 'TextField',width: 155,labelWidth:'105px',label: '采购预算(元)',rule:[
                    {required: true,message: '请输入采购预算(元)', trigger: 'blur'},
                    {validator: this.checkPaymentNum, trigger: 'blur'}
                ]},
                {span: 2,name: 'info',type: 'TextField',label: '采购要求'},
                {span: 2,name: 'payamount',type: 'TextField',width: 155,labelWidth:'96px',label: '实际金额(元)',disabled:true},
                {span: 1,name: 'financepay',type: 'Radio',width: 180,label: '报销',options: [
                    {label: '财务报销',value: 'false'},
                    {label: '财务打款',value: 'true'}
                ],disabled: true},
                {span: 1,name: 'paytime',type: 'DateTimePicker',width: 180,label: '打款时间',disabled:true},
                {span: 2,name: 'puttime',type: 'DateTimePicker',width: 180,label: '入库时间',disabled:true},
                {span: 1,name: 'payinfo',type: 'TextArea',width: 180,rows: 4,label: '报销信息',disabled:true},
                {span: 1,name: 'payBtn',type: 'Button',label:'付款凭证',text:'付款凭证',disabled:true},
                {span: 1,name: 'invoicetime',type: 'DateTimePicker',disabled:true,fieldStyle:'margin-top:40px;margin-left:-280px;',labelWidth:'96px',width: 162,label: '发票归档时间'},
                {span: 1,name: 'ticketBtn',type: 'Button',fieldStyle:'margin: 80px 0px 0px -560px',label:'发票附件',text: '发票附件',disabled:true},
            ]
        },
        checkPaymentNum(rule, value, callback){
            let checkNumber = validatorField.validate('checkNumber',value)
            if(!checkNumber.result){
                callback(new Error(checkNumber.msg));
            }
			callback();
        },
        doSave() {
            if (!this.validate()) {
                return
            }
            this.doBeforeSave()
            //...
            console.info(this.conurl, this.formParams, this.formDetail);
            this.getLinkComponent(this.detailLink).getForm().validate((valid, object) => {
                if (valid) {
                    this.$api[!this.formParams.id ? this.conurl : this.updateConurl]({...this.formParams, ...this.formDetail}).then(resData => {
                        //...
                        if (resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode) {
                            !!this.mainGrid && this.mainGrid.reloadGrid();
                            !!this.window && this.window.close()
                            this.$message({type: 'success', message: '操作成功!'});
                        }
                        this.doResult(resData)
                        if (resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode) {
                            apply(this.formParams,{...resData.data,dirty: true})
                            if (resData.data.process && resData.data.process.id) {
                                this.formParams.processid = resData.data.process.id;
                                
                                applyIn(this.formDetail,this.formParams)
                                //覆盖值
                                apply(this.lastFormDetail, this.formDetail)
                            }
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
            let compareResult = CompareObj(this.formDetail, this.lastFormDetail, true)
            if (!compareResult) {
                this.$message({message: '警告，修改后请先保存!', duration: 1000, type: 'warning'});
                return false
            }
            return true
        },
        confirmFn(value){
            Object.assign(this.formParams, {advice: value})
            this.$api[this.submitConurl]({...this.formParams, ...this.formDetail}).then(resData => {
                //...
                if (resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode) {
                    !!this.mainGrid && this.mainGrid.reloadGrid();
                    !!this.window && this.window.close()
                    this.getLinkComponent('link-content-panel').getTabContent().removeTab(`buy/orders/apply/detail-add`)
                }
            })
        },
        doSubmit() {
            if (!this.submitValidate()) {
                return
            }
            this.getLinkComponent(this.detailLink).getForm().validate((valid, object) => {
                if (valid) {
                    TjUI.dialog.prompt(this.confirmFn)
                    return true;
                } else {
                    console.info('form validate error');
                    return false;
                }
            })
        },
        doResult(resData) {
            if (resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode && !this.formParams.id) {
                this.getLinkComponent(this.submitBtnLink).setDisabled(false)

                //设置 包grid 按钮启用
                this.editPanel.getPageGrid().getTbar()[0].$children[0].setDisabled(false)
                this.editPanel.getPageGrid().getTbar()[0].$children[1].setDisabled(false)
                //用返回值设置 传入包grid的项目申请单数据row
                this.editPanel.getPageGrid().setCurRow(resData.data)
            }
        }
    }
}
export default Detail
