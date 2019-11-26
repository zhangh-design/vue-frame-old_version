/**
 * 编辑详情页
 */
import { mapGetters } from 'vuex'
import tjWindow from '@/components/common/window'
import fileListPanel from './page/file-list'
import { intNumToStr,isEmptyObject,CompareObj } from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import detail from '@/components/common/grid/detail/detail'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    data(){
        return {
            conurl: 'project/contract/apply/doSubmitApply',
            saveConurl: 'project/contract/apply/doSaveApply',
            processID: null,
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: '',
                deptcode:  '',
                oprtid: '',
                id: '',
                advice: '',
            },
            defaults: {
                border: false,
                columns: 3,
                width: 340,
                labelWidth: 100,
                buttonPosition: 'left',
            },
            buttonsLayout: 'top',
            formButtons: [],
            lastFormDetail: {}
        }
    },
    computed: {
        ...mapGetters({
			userData: 'user/getUserInfo'
        })
    },
    created(){
        // this.processID = this.record.process.id
        // this.formParams.processid = this.record.process.id
        // this.formParams.id = this.record.id
        // this.formParams.deptcode = this.userData.dept.code
        // this.formParams.oprtid = intNumToStr(this.userData.user.id)
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
                    buttons:  [],
                }
            }
            this.add(panel)
        },
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'code',type: 'TextField',width: 200,label: '合同编号',readonly: true},
                {span: 1,name: 'name',type: 'TextField',width: 200,label: '合同名称',readonly: true},
                {span: 1,name: 'amount',type: 'TextField',width: 200,label: '合同金额(万)',readonly: true},
                {span: 1,name: 'signtime',type: 'TextField',width: 200,label: '签订日期',readonly: true},
                {span: 1,name: 'expiretime',type: 'TextField',width: 200,label: '合同到期日期',readonly: true},
                {span: 1,name: 'stamptime',type: 'TextField',width: 200,label: '合同盖章日期',readonly: true},
                {span: 1,name: 'printnum',type: 'TextField',width: 200,label: '打印份数',readonly: true},
                {span: 1,name: 'archivetime',type: 'TextField',width: 200,label: '归档日期',readonly: true},

                {span: 1,name: 'customerunit',type: 'TextField',width: 200,label: '客户单位',readonly: true},
                {span: 1,name: 'manager',type: 'TextField',width: 200,label: '合同负责人',readonly: true},
                {span: 1,name: 'deptname',type: 'TextField',width: 200,label: '部门名称',readonly: true},
                {span: 1,name: 'accessory',type: 'Button',text: '查看文件',label:'查看合同附件',link:`link-uploadbtn-${this._uid}`,listeners: {
                    click: ()=>{
                        let detailWin = new tjWindow({panel: this,mainGrid: this.mainGrid,title: '招标文件-列表',height: 450,width: 700})
                        detailWin.add(fileListPanel)
                        detailWin.show()
                    }
                }},
                {span: 1,name: 'deptcode',type: 'TextHidden',width: 200},
            ]
        },
        doSave(){
            if(!this.validate()){
                return
            }
            this.doBeforeSave()
            //...
            console.info(this.saveConurl,this.formParams,this.formDetail,this.lastFormDetail);
            this.getLinkComponent(this.detailLink).getForm().validate((valid, object) => {
                if (valid) {
                    this.$api[this.saveConurl]({...this.formParams,...this.formDetail}).then(resData=>{
                        //...
                        if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                            this.mainGrid.reloadGrid();
                            !!this.window && this.window.close()
                        }
                        this.doResult(resData)
                    })
                    return true;
                } else {
                    console.info('form validate error');
                    return false;
                }
            })
        },
        doSubmit(){
            if(!this.validate()){
                return
            }
            this.doBeforeSave()
            //...
            console.info(this.conurl,this.formParams,this.formDetail);
            let compareResult = CompareObj(this.formDetail,this.lastFormDetail,true)
            if(!compareResult){
                this.$message({message: '警告，修改后请先保存!',duration:1000,type: 'warning'});
                return
            }
            this.getLinkComponent(this.detailLink).getForm().validate((valid, object) => {
                if (valid) {
                    this.$prompt('请输入意见', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        inputPattern: /\S/,
                        inputErrorMessage: '输入不能为空！'
                    }).then(({ value }) => {
                        Object.assign(this.formParams,{advice: value})
                        this.$api[this.conurl]({...this.formParams,...this.formDetail}).then(resData=>{
                            //...
                            if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                                this.mainGrid.reloadGrid();
                                !!this.window && this.window.close()
                                this.getLinkComponent('link-content-panel').getTabContent().removeTab(`contract/apply/detail-edit-${this.formParams.id}`)
                            }
                            this.doResult(resData)
                        })
                    }).catch(() => {});
                    return true;
                } else {
                    console.info('form validate error');
                    return false;
                }
            })
        },
        doResult(resData){
            if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                Object.assign(this.lastFormDetail,this.formDetail)
                this.$message({type: 'success',message: '操作成功!'});
            }
        }
    }
}
export default Detail
