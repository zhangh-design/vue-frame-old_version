/**
 * 编辑详情页
 */
import { mapGetters } from 'vuex'
import {CONST_DEFAULT_CONFIG} from '@/config'
import fileListPanel from './file-list'
import tjWindow from '@/components/common/window'
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
            conurl: 'project/tender/superior/doSubmitSuperior',
            rejectConurl: 'project/tender/superior/doRejectSuperior',
            detailConurl: 'project/tender/superior/getSuperiorDetail',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id
            },
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id,
            },
            formButtons: [
                {text: '流程详情',name:'process',style:'float:right',listeners: {click: this.doProcessDetail}}
                ],
            defaults: {
                border: false,
                columns: 3,
                width: 340,
                labelWidth: 130,
                buttonPosition: 'left',
            },
            buttonsLayout: 'top',
            lastFormDetail: {}
        }
    },
    computed: {
        ...mapGetters({
			userData: 'user/getUserInfo'
        })
    },
    methods: {
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'name',type: 'TextField',width: 200,label: '名称',disabled: true},
                {span: 1,name: 'code',type: 'TextField',link: this.codeLink,width: 200,label: '批次',disabled: true},
                {span: 1,name: 'area',type: 'TextField',width: 200,label: '招标地区',disabled: true},
                {span: 1,name: 'org',type: 'TextField',width: 200,label: '招标机构',disabled: true},
                {span: 1,name: 'proxyorg',type: 'TextField',width: 200,label: '代理机构',disabled: true},
                {span: 1,name: 'buytime',type: 'DatePicker',width: 200,label: '标书购买时间',disabled: true},
                {span: 1,name: 'tendertime',type: 'DatePicker',width: 200,label: '投标时间',disabled: true},
                {span: 1,name: 'charge',type: 'TextField',width: 200,label: '标书费用(万)',disabled: true,emptyText: ''},
                {span: 1,name: 'deposit',type: 'TextField',width: 200,label: '投标保证金(万)',disabled: true,emptyText: ''},
                {span: 1,name: 'cost',type: 'TextField',width: 200,label: '中标服务费(万)',disabled: true,emptyText: ''},
                // {span: 1,name: 'deptcode',value: this.userData.dept.code,type: 'TextField',width: 140,label: '经办部门CODE',disabled: true},
                {span: 1,name: 'deptname',value: this.userData.dept.name,type: 'TextField',width: 200,disabled: true,label: '经办部门名称'},
                // {span: 1,name: 'oprtid',value: this.userData.user.code,type: 'TextField',width: 140,label: '经办人ID',disabled: true},
                {span: 1,name: 'oprtname',value: this.userData.user.name,type: 'TextField',width: 200,disabled: true,label: '经办人名称'},
                {span: 1,name: 'paymentnum',type: 'TextField',width: 200,label: '付款金额(万)',disabled: true,emptyText: ''},
                // {span: 2,name: 'paymentfile',type: 'TextField',width: 200,label: '付款凭证',disabled: true,emptyText: ''},
                {span: 2,name: 'uploadbidsfile',type: 'Button',text: '查看付款凭证',label:'付款凭证',listeners: {
                    click: ()=>{
                        let detailWin = new tjWindow({panel: this,mainGrid: this.getPanel,title: '查看/下载付款凭证',height: 400,width: 500})
                        detailWin.add(fileListPanel)
                        detailWin.show()
                    }
                }},
                {span: 3,name: 'remark',type: 'TextArea',width: 540,label: '备注',disabled: true},
            ]
        },
        doProcessDetail(){
            if(this.record.process.processcode!=null){
                let processPanel = new processDetail
                processPanel.defaults = {
                    imgconurl: 'project/tender/superior',
                    dataconurl: 'project/tender/superior/doStep',
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.record.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `tender/superior/detail-edit-${this.record.id}-process`},processPanel)
            }else{
                this.$message({type: 'success', message: '当前步骤没有流程!'});
            }
        },
        //同意
        confirmFn(value){
            Object.assign(this.formParams,{advice: value})
            this.$api[this.conurl]({...this.formParams}).then(resData=>{
                this.doResult(resData)
            })
        },
        //不同意
        cancelFn(value){
            Object.assign(this.formParams,{advice: value})
            this.$api[this.rejectConurl]({...this.formParams}).then(resData=>{
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