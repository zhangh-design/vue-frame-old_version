/**
 * 编辑详情页
 */
import { mapGetters } from 'vuex'
import tjWindow from '@/components/common/window'
import { intNumToStr,isEmptyObject,CompareObj } from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import pageDetail from './add-grid'
import detail from '@/components/common/grid/detail/detail'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    data(){
        return {
            you: 'bbbbbbbbbb',
            conurl: 'project/workload/apply/doSubmitApply',
            saveConurl: 'project/workload/apply/doSaveApply',
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
                columns: 2,
                width: 500,
                labelWidth: 100,
                buttonPosition: 'left',
                projectinfoLink: `link-workloadApply-projectinfo-${this._uid}`,
                projectidLink: `link-workloadApply-projectid-${this._uid}`
            },
            buttonsLayout: 'top',
            formButtons: [{text: '保存',listeners: {click: this.doSave}}],
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
                    buttons: this.isShowBtns ? [...this.formButtons,{text: '提交',listeners: {click: this.doSubmit}}] : [],
                }
            }
            this.add(panel)
        },
        //设置关联项目
        setSelectProjectinfo(row){
            this.getLinkComponent(this.projectinfoLink).setTextValue(row.name)
            this.getLinkComponent(this.projectidLink).setTextValue(intNumToStr(row.id))
        },
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'deptname',type: 'TextField',width: 350,label: '部门名称',readonly: true},
                {span: 1,name: 'workername',type: 'TextField',width: 350,label: '人员名称',readonly: true},
                {span: 1,name: 'worktime',type: 'DateTimePicker',width: 350,label: '工作时间'},
                {span: 1,name: 'workload',type: 'TextField',width: 350,label: '工作量（天）'},
                {span: 1,name: 'projectname',link: this.projectinfoLink,type: 'TextField',width: 350,label: '关联项目',readonly: true,emptyText:'请先选取关联项目'},
                {span: 1,name: 'projectBtn',type: 'Button',style: 'margin-left:-130px;',text:'选取关联项目',listeners: {
                    click: ()=>{
                        let detailWin = new tjWindow({panel: this,mainGrid: this.getPanel,title: '关联-项目列表查询',height: 500,width: 1000})
                        detailWin.add(pageDetail)
                        detailWin.show()
                    }
                }},
                {span: 1,name: 'workerid',type: 'TextHidden',width: 350,readonly: true},
                {span: 1,name: 'deptcode',value:this.userData,type: 'TextHidden',width: 350,readonly: true},
                {span: 1,name: 'projectid',link: this.projectidLink,type: 'TextHidden',width: 350,readonly:true},
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