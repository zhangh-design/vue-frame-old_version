<template>
	<div style="height:100%;overflow: hidden;">
		<el-row style="height:33px;background-color: #F3F3F3;" class="item-btn-cls">
			<el-button type="primary" size="small" @click="onSave" :disabled="saveDisabled">保存</el-button>
			<el-button type="primary" ref='submit-btn-ref' size="small" @click="onSubmit" :disabled="submitDisabled">提交</el-button>
			<el-button type="primary" size="small" style="float:right;" @click="readDetail">流程详情</el-button>
		</el-row>
		<div :style="{height: formHeight+'px',overflow: 'auto'}">
			<el-form :ref="ref" :model="form" :rules="rules" class="turnofforder-apply-form-cls">
				<el-row style="padding-top:5px;">
					<el-col :span="1" style="width: 290px">
						<el-form-item label="员工名称" label-width="80px">
							<el-input v-model="form.personname" disabled class="base-input-cls" placeholder="员工名称"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="1" style="width: 290px">
						<el-form-item label="联系电话" label-width="80px">
							<el-input v-model="form.phone" disabled class="base-input-cls" placeholder="联系电话"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="1" style="width: 290px">
						<el-form-item label="部门名称" label-width="80px">
							<el-input v-model="form.deptname" disabled class="base-input-cls" placeholder="部门名称"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="1" style="width: 290px">
						<el-form-item label="入职时间" label-width="80px">
							<el-input v-model="form.begintime" disabled class="base-input-cls" placeholder="入职时间"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="1" style="width: 290px">
						<el-form-item label="工作岗位" label-width="80px">
							<el-input v-model="form.station" disabled class="base-input-cls" placeholder="工作岗位"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<span style="margin-left:10px;">离职原因</span>
				</el-row>
				<el-row>
					<el-form-item prop="reason" label-width="10px">
						<el-input type="textarea" disabled rows=4 v-model="form.reason" placeholder="离职原因" maxlength=100></el-input>
					</el-form-item>
				</el-row>
				<el-row style="padding-left:10px;margin-top:20px;margin-bottom:20px;background-color: #F3F3F3">
					<table>
						<tr>
							<td>
								<span>工作交接</span>
							</td>
							<td>
								<div style="width:140px">
									<el-form-item prop="workshift" style="margin-bottom: 0px;">
										<el-radio-group disabled v-model="form.workshift">
											<el-radio label="true">通过</el-radio>
											<br/>
											<el-radio label="false">未通过</el-radio>
										</el-radio-group>
									</el-form-item>
								</div>
							</td>
							<td class="gzjj-td-cls">
								<div style="width:360px">
									<el-form-item label="交接人" prop="workshiftname" label-width="120px">
										<el-input v-model="form.workshiftname" disabled class="base-input-cls" placeholder="交接人"></el-input>
									</el-form-item>
									<el-form-item label="工作截止时间" prop="workshifttime" label-width="120px">
										<el-date-picker value-format="yyyy-MM-dd" disabled v-model="form.workshifttime" class="base-input-cls" placeholder="工作截止时间"></el-date-picker>
									</el-form-item>
								</div>
							</td>
							<td style="width:16px;padding: 0px 10px 0px 10px">
								<span>交接情况</span>
							</td>
							<td style="width: 100%;">
								<el-input type="textarea" rows=4 v-model="form.workinfo" disabled placeholder="交接情况" maxlength=100></el-input>
							</td>
						</tr>
					</table>
				</el-row>
				<el-row style="padding-left:10px;margin-bottom:20px;background-color: #F3F3F3">
					<table>
						<tr>
							<td>
								<span>综合部</span>
							</td>
							<td>
								<div style="width:140px">
									<el-form-item prop="deviceshift" style="margin-bottom: 0px;">
										<el-radio-group disabled v-model="form.deviceshift">
											<el-radio label="true">通过</el-radio>
											<br/>
											<el-radio label="false">未通过</el-radio>
										</el-radio-group>
									</el-form-item>
								</div>
							</td>
							<td class="gzjj-td-cls">
								<div style="width:360px">
									<el-form-item label="处理时间" label-width="120px">
										<el-date-picker disabled value-format="yyyy-MM-dd" v-model="form.devicetime" class="base-input-cls" placeholder="工作截止时间"></el-date-picker>
									</el-form-item>
								</div>
							</td>
							<td style="width:16px;padding: 0px 10px 0px 10px">
								<span>情况说明</span>
							</td>
							<td style="width: 100%;">
								<el-input type="textarea" disabled rows=4 v-model="form.deviceinfo" placeholder="情况说明" maxlength=100></el-input>
							</td>
						</tr>
					</table>
				</el-row>
				<el-row style="padding-left:10px;margin-bottom:20px;background-color: #F3F3F3">
					<table>
						<tr>
							<td>
								<span>财务部</span>
							</td>
							<td>
								<div style="width:140px">
									<el-form-item prop="finance" style="margin-bottom: 0px;">
										<el-radio-group :disabled="financeDisabled" v-model="form.finance">
											<el-radio label="true">通过</el-radio>
											<br/>
											<el-radio label="false">未通过</el-radio>
										</el-radio-group>
									</el-form-item>
								</div>
							</td>
							<td class="gzjj-td-cls">
								<div style="width:360px">
									<el-form-item label="处理时间" prop="consttime" label-width="120px">
										<el-date-picker value-format="yyyy-MM-dd" :disabled="consttimeDisabled" v-model="form.consttime" class="base-input-cls" placeholder="工作截止时间"></el-date-picker>
									</el-form-item>
								</div>
							</td>
							<td style="width:16px;padding: 0px 10px 0px 10px">
								<span>情况说明</span>
							</td>
							<td style="width: 100%;">
								<el-form-item prop="financeinfo" style="margin-bottom: 0px;">
									<el-input type="textarea" rows=4 v-model="form.financeinfo" :disabled="financeinfoDisabled" placeholder="情况说明" maxlength=100></el-input>
								</el-form-item>
							</td>
						</tr>
					</table>
				</el-row>
				<el-row style="padding-left:10px;background-color: #F3F3F3">
					<table>
						<tr>
							<td>
								<span>人事部</span>
							</td>
							<td>
								<div style="width:140px">
									<el-form-item prop="prove" style="margin-bottom: 0px;">
										<el-radio-group disabled v-model="form.prove">
											<el-radio label="true">离职证明 已开</el-radio>
											<br/>
											<el-radio label="false">离职证明 未开</el-radio>
										</el-radio-group>
									</el-form-item>
								</div>
							</td>
							<td class="gzjj-td-cls">
								<div style="width:360px">
									<el-form-item label="处理时间" label-width="120px">
										<el-date-picker disabled value-format="yyyy-MM-dd" v-model="form.provetime" class="base-input-cls" placeholder="工作截止时间"></el-date-picker>
									</el-form-item>
								</div>
							</td>
							<td style="width:16px;padding: 0px 10px 0px 10px">
								<span>情况说明</span>
							</td>
							<td style="width: 100%;">
								<el-input type="textarea" disabled rows=4 v-model="form.proveinfo" placeholder="情况说明" maxlength=100></el-input>
							</td>
						</tr>
					</table>
				</el-row>
		</el-form>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
import {CONST_DEFAULT_CONFIG} from '@/config'
import { CompareObj,apply,applyIn,isNotEmpty } from '@/utils/tools'
import processDetail from '@/components/process-card'

export default {
	name: 'turnofforder-finance-edit-detail',
	props: ['mainPanel','mainGrid','window','type','row','tabName','moduleid'],
	data(){
		return {
			formHeight: 0,
			ref: 'turnofforder-form',
			saveDisabled: false,
			submitDisabled: false,
			financeDisabled: false,
			consttimeDisabled: false,
			financeinfoDisabled: false,
			lastFormDetail: {},
			saveConurl: 'hr/turnofforder/finance/saveFinance',
			submitConurl: 'hr/turnofforder/finance/submitFinance',
			rejectConurl: 'hr/turnofforder/finance/rejectFinance',
			authorityConurl: 'user/getModuleAccess',
			authorityParams: {moduleid: this.moduleid,token: this.$store.getters['user/getToken']},
			detailConurl: 'hr/turnofforder/finance/getDetail',
			detailParams: {processid: this.row.process.id,token: this.$store.getters['user/getToken']},
			queryParams: {
				token: this.$store.getters['user/getToken'],
				id: this.row.id,
				processid: this.row.process.id,
				dirty: true,
			},
			form: {
				personname: '',
				phone: '',
				deptname: '',
				begintime: '',
				station: '',
				reason: '',
				workshift: '',
				workshiftname: '',
				workshifttime: '',
				workinfo: '',
				deviceshift: '',
				deviceinfo: '',
				devicetime: '',
				finance: '',
				consttime: '',
				financeinfo: '',
				prove: '',
				provetime: '',
				proveinfo: '',
			},
			rules: {
				finance: [
					{ required: true, message: '请选择财务状况', trigger: 'blur' }
				],
				consttime: [
					{ required: true, message: '请输入结算时间', trigger: 'blur' }
				],
				financeinfo: [
					{ required: true, message: '请输入财务状况说明', trigger: 'blur' }
				],
			}
		}
	},
	computed: {
        ...mapGetters({
            userData: 'user/getUserInfo'
        })
	},
	mounted(){
		setTimeout(() => {
			this.$api[this.detailConurl](this.detailParams).then(resData=>{
				applyIn(this.form,resData.data)
				this.form.workshift = resData.data.workshift !==null ? resData.data.workshift+'' : resData.data.workshift;
				this.form.deviceshift = resData.data.deviceshift !==null ? resData.data.deviceshift+'' : resData.data.deviceshift;
				this.form.finance = resData.data.finance !==null ? resData.data.finance+'' : resData.data.finance;
				this.form.prove = resData.data.prove !==null ? resData.data.prove+'' : resData.data.prove;
				apply(this.lastFormDetail,this.form)
				this.process = resData.data.process
			})
			this.$api[this.authorityConurl](this.authorityParams).then(resData=>{
				this.submitDisabled = (resData.data === 1 || resData.data === 0) ? true : false;
				this.saveDisabled = (resData.data === 1 || resData.data === 0) ? true : false;
				this.financeDisabled = (resData.data === 1 || resData.data === 0) ? true : false;
				this.consttimeDisabled = (resData.data === 1 || resData.data === 0) ? true : false;
				this.financeinfoDisabled = (resData.data === 1 || resData.data === 0) ? true : false;
			})
		}, 0);
		this.formHeight = this.$el.offsetHeight-33
	},
	methods: {
		readDetail(){
			if(this.process.processcode!=null){
                let processPanel = new processDetail
                processPanel.defaults = {
                    imgconurl: 'hr/turnofforder/finance',
                    dataconurl: 'hr/turnofforder/finance/doStep',
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `turnofforder/finance/detail-edit-${this.row.id}-process`},processPanel)
            }else{
                this.$message({type: 'success', message: '当前步骤没有流程!'});
            }
		},
		onSave(){
			this.$refs[this.ref].validate((valid) => {
				if (valid) {
					this.$api[this.saveConurl]({...this.form,...this.queryParams}).then(resData => {
						if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
							this.mainGrid.reloadGrid();
							this.$message({type: 'success', message: '操作成功!'});
							this.submitDisabled = false
							resData.data.workshift = resData.data.workshift+''
							resData.data.deviceshift = resData.data.deviceshift+''
							resData.data.finance = resData.data.finance+''
							resData.data.prove = resData.data.prove+''
							applyIn(this.form,resData.data)
							apply(this.lastFormDetail,this.form)
						}
					})
				} else {
					console.log('error submit!!');
					return false;
				}
			})
		},
		submitValidate(){
            let compareResult = CompareObj(this.form,this.lastFormDetail,true)
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
            this.$refs[this.ref].validate((valid, object) => {
                if (valid) {
                    this.$api[this.submitConurl]({advice: value,...this.queryParams}).then(resData=>{
                        if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                            this.$message({type: 'success',message: '操作成功!'});
                            !!this.mainGrid && this.mainGrid.reloadGrid();
                            this.getLinkComponent('link-content-panel').getTabContent().removeTab(this.tabName)
                        }
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
            this.$api[this.rejectConurl]({advice: value,...this.queryParams}).then(resData=>{
                //...
                if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                    this.$message({type: 'success',message: '操作成功!'});
                    !!this.mainGrid && this.mainGrid.reloadGrid();
                    this.getLinkComponent('link-content-panel').getTabContent().removeTab(this.tabName)
                }
            })
        },
        onSubmit(){
            TjUI.dialog.process(this.confirmFn,this.cancelFn)
        }
	}
}
</script>
<style>
	.turnofforder-apply-form-cls{
		background-color: #D7D7D7
	}
	.turnofforder-apply-form-cls .el-radio-group{
		line-height: 45px !important;
		margin-left: 20px;
	}
	.gzjj-td-cls .el-form-item{
		height: 46px !important;
		/* margin-bottom: 0px; */
	}
	.turnofforder-apply-form-cls .el-checkbox-group{
		line-height: 40px;
		margin-left: 20px;
	}
</style>

<style lang="less" scoped>
	.base-input-cls{
		width: 200px;
	}
</style>
