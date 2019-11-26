/**
 * 编辑详情页
 */
import { mapGetters } from 'vuex'
import { intNumToStr,isEmptyObject,CompareObj } from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import detail from '@/components/common/grid/detail/detail'
import fileListPanel from './file-list'
import tjWindow from '@/components/common/window'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    data(){
        return {
            conurl: 'project/tender/superior/doSubmitSuperior',
            rejectConurl: 'project/tender/superior/doRejectSuperior',
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: '',
            },
            defaults: {
                border: false,
                columns: 3,
                width: 340,
                labelWidth: 130,
                buttonPosition: 'left',
            },
            buttonsLayout: 'top',
           // formButtons: [{text: '保存',listeners: {click: this.doSave}}],
            lastFormDetail: {}
        }
    },
    computed: {
        ...mapGetters({
			userData: 'user/getUserInfo'
        })
    },
    created(){
        //this.formParams.processid = this.record.process.id
    },
    mounted(){
        setTimeout(() => {
            Object.assign(this.lastFormDetail,this.formDetail)
        }, 0);
    },
    methods: {
        initPanel(){
            let panel = {
                component: detail,
                props: {
                    link: this.detailLink,
                    ...this.$data,
                    buttons: [],
                }
            }
            this.add(panel)
        },
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
        doSubmit(){
            if(!this.validate()){
                return
            }
            this.doBeforeSave()
            //...
            console.info(this.conurl,this.formParams,this.formDetail);
            this.getLinkComponent(this.detailLink).getForm().validate((valid, object) => {
                if (valid) {
                    this.$prompt('请输入意见', '提示', {
                        distinguishCancelAndClose: true,
                        confirmButtonText: '不同意',
                        cancelButtonText: '同意',
                        inputPattern: /\S/,
                        inputErrorMessage: '输入不能为空！',
                        customClass: 'user-process-customcls'
                    }).then(({ value }) => {
                        //不同意
                        Object.assign(this.formParams,{advice: value})
                        this.$api[this.rejectConurl]({...this.formParams}).then(resData=>{
                            //...
                            if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                                this.mainGrid.reloadGrid();
                                !!this.window && this.window.close()
                                this.getLinkComponent('link-content-panel').getTabContent().removeTab(`tender/superior/detail-edit-${this.record.id}`)
                            }
                            this.doResult(resData)
                        })
                    }).catch((action) => {
                        //同意
                        if(action==='close') return;
                        Object.assign(this.formParams,{advice: document.querySelector(`.user-process-customcls .el-input__inner`).value})
                        this.$api[this.conurl]({...this.formParams}).then(resData=>{
                            //...
                            if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                                this.mainGrid.reloadGrid();
                                !!this.window && this.window.close()
                                this.getLinkComponent('link-content-panel').getTabContent().removeTab(`tender/superior/detail-edit-${this.record.id}`)
                            }
                            this.doResult(resData)
                        })
                    });
                    return true;
                } else {
                    console.info('form validate error');
                    return false;
                }
            })
        },
        doResult(resData){
            if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                this.$message({type: 'success',message: '操作成功!'});
            }
        }
    }
}
export default Detail
