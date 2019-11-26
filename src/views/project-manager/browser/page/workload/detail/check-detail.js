/**
 * 编辑详情页
 */
import { mapGetters } from 'vuex'
import tjWindow from '@/components/common/window'
import { intNumToStr,isEmptyObject,CompareObj } from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import detail from '@/components/common/grid/detail/detail'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    data(){
        return {
            conurl: 'project/workload/confirm/doSubmitConfirm',
            //saveConurl: 'workload/superior/doSaveSuperior',
            rejectConurl: 'project/workload/confirm/doRejectConfirm',
            processID: null,
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid: '',
                deptcode:  '',
                oprtid: '',
                workerid:'',
                projectid:'',
                id: '',
                advice: '',
            },
            defaults: {
                border: false,
                columns: 2,
                width: 500,
                labelWidth: 100,
                buttonPosition: 'left'
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
        this.processID = this.record.process.id
        this.formParams.processid = this.record.process.id
        this.formParams.id = this.record.id
        this.formParams.deptcode = this.userData.dept.code
        this.formParams.oprtid = intNumToStr(this.userData.user.id)
        this.formParams.deptcode = this.record.deptcode
        this.formParams.workerid = this.record.workerid
        this.formParams.projectid = this.record.projectid
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
            console.log(this.record);
            this.detailData = [
                {span: 1,name: 'deptname',type: 'TextField',width: 350,label: '部门名称',disabled: true},
                {span: 1,name: 'workername',type: 'TextField',width: 350,label: '人员名称',disabled: true},
                {span: 1,name: 'worktime',type: 'DatePicker',width: 350,label: '工作时间',disabled: true},
                {span: 1,name: 'workload',type: 'TextField',width: 350,label: '工作量（天）',disabled: true},
                {span: 1,name: 'projectname',type: 'TextField',width: 350,label: '关联项目',disabled: true},
                {span: 1,name: 'projectBtn',type: 'Button',style: 'margin-left:-130px;',text:'选取关联项目',disabled:true},
                {span: 1,name: 'rate',type: 'TextField',width: 350,value:"1",label: '工作量系数',disabled: true},
            ]
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
                        distinguishCancelAndClose: true,
                        confirmButtonText: '不同意',
                        cancelButtonText: '同意',
                        inputPattern: /\S/,
                        inputErrorMessage: '输入不能为空！',
                        customClass: 'user-process-customcls'
                    }).then(({ value }) => {
                        //不同意
                        Object.assign(this.formParams,{advice: value})
                        this.$api[this.rejectConurl]({...this.formParams,...this.formDetail}).then(resData=>{
                            //...
                            if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                                this.mainGrid.reloadGrid();
                                !!this.window && this.window.close()
                                this.getLinkComponent('link-content-panel').getTabContent().removeTab(`workload/confirm/detail-edit-${this.formParams.id}`)
                            }
                            this.doResult(resData)
                        })
                        
                    }).catch((action) => {
                        //同意
                        if(action==='close') return;
                        Object.assign(this.formParams,{advice: document.querySelector(`.user-process-customcls .el-input__inner`).value})
                        this.$api[this.conurl]({...this.formParams,...this.formDetail}).then(resData=>{
                            //...
                            if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                                this.mainGrid.reloadGrid();
                                !!this.window && this.window.close()
                                this.getLinkComponent('link-content-panel').getTabContent().removeTab(`workload/confirm/detail-edit-${this.formParams.id}`)
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
                Object.assign(this.lastFormDetail,this.formDetail)
                this.$message({type: 'success',message: '操作成功!'});
            }
        }
    }
}
export default Detail
