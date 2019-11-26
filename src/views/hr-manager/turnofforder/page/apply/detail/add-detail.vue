<template>
	<div style="height:100%;overflow: hidden;">
		<el-row style="height:33px;background-color: #F3F3F3;" class="item-btn-cls">
			<el-button type="primary" size="small" @click="onSave">保存</el-button>
			<el-button type="primary" ref='submit-btn-ref' size="small" @click="onSubmit" :disabled="submitDisabled">提交</el-button>
			<el-button type="primary" size="small" style="float:right;">流程详情</el-button>
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
						<el-form-item label="联系电话" prop="phone" label-width="80px">
							<el-input v-model="form.phone" class="base-input-cls" placeholder="联系电话"></el-input>
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
					<span style="margin-left:10px;color: #606266;"><span style="color:red;">*</span>离职原因</span>
				</el-row>
				<el-row>
					<el-form-item prop="reason" label-width="10px">
						<el-input type="textarea" rows=4 v-model="form.reason" placeholder="离职原因" maxlength=100></el-input>
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
										<el-input disabled v-model="form.workshiftname" class="base-input-cls" placeholder="交接人"></el-input>
									</el-form-item>
									<el-form-item label="工作截止时间" prop="workshifttime" label-width="120px">
										<el-date-picker disabled value-format="yyyy-MM-dd" v-model="form.workshifttime" class="base-input-cls" placeholder="工作截止时间"></el-date-picker>
									</el-form-item>
								</div>
							</td>
							<td style="width:16px;padding: 0px 10px 0px 10px">
								<span>交接情况</span>
							</td>
							<td style="width: 100%;">
								<el-input type="textarea" disabled rows=4 v-model="form.workinfo" placeholder="交接情况" maxlength=100></el-input>
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
										<el-radio-group disabled v-model="form.finance">
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
										<el-date-picker disabled value-format="yyyy-MM-dd" v-model="form.consttime" class="base-input-cls" placeholder="工作截止时间"></el-date-picker>
									</el-form-item>
								</div>
							</td>
							<td style="width:16px;padding: 0px 10px 0px 10px">
								<span>情况说明</span>
							</td>
							<td style="width: 100%;">
								<el-input type="textarea" disabled rows=4 v-model="form.financeinfo" placeholder="情况说明" maxlength=100></el-input>
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

export default {
	name: 'turnofforder-apply-add-detail',
	props: ['mainPanel','mainGrid','window','type','moduleid'],
	data(){
		return {
			formHeight: 0,
			ref: 'turnofforder-form',
			submitDisabled: true,
			lastFormDetail: {},
			conurl: 'hr/turnofforder/apply/insertApply',
			saveConurl: 'hr/turnofforder/apply/saveApply',
			submitConurl: 'hr/turnofforder/apply/submitApply',
			queryParams: {
				token: this.$store.getters['user/getToken'],
				id: '',
				processid: '',
				dirty: true,
			},
			form: {
				personname: '',
				phone: '',
				deptname: '',
				begintime: '',
				station: '',
				reason: '',
				/* workshift: '',
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
				proveinfo: '', */
			},
			rules: {
				phone: [
					{ required: true, message: '请输入联系电话', trigger: 'blur' }
				],
				reason: [
					{ required: true, message: '请输入离职原因', trigger: 'blur' }
				]
			}
		}
	},
	computed: {
        ...mapGetters({
            userData: 'user/getUserInfo'
        })
	},
	created(){
		this.form.personname = this.userData.user.name
		this.form.deptname = this.userData.dept.name
	},
	mounted(){
		this.formHeight = this.$el.offsetHeight-33
	},
	methods: {
		onSave(){
			this.$refs[this.ref].validate((valid) => {
				if (valid) {
					this.$api[!this.queryParams.id ? this.conurl : this.saveConurl]({...this.form,...this.queryParams}).then(resData => {
						if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
							this.mainGrid.reloadGrid();
							this.$message({type: 'success', message: '操作成功!'});
							this.submitDisabled = false
							applyIn(this.form,resData.data)
							apply(this.lastFormDetail,this.form)
						}
						if(!isNotEmpty(this.queryParams.id)){
							applyIn(this.queryParams,{id: resData.data.id,processid: resData.data.process.id})
						}
					})
				} else {
					console.log('error submit!!');
					return false;
				}
			})
		},
		submitValidate(){
			console.info(this.form,this.lastFormDetail);
			let compareResult = CompareObj(this.form,this.lastFormDetail,true)
            if(!compareResult){
                this.$message({message: '警告，修改后请先保存!',duration:1000,type: 'warning'});
                return false
            }
            return true
		},
		confirmFn( value ){ 
            this.$api[this.submitConurl]({advice: value,...this.queryParams}).then(resData=>{
                //...
                if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                    this.$message({type: 'success',message: '操作成功!'});
                    this.mainGrid.reloadGrid();
                    this.getLinkComponent('link-content-panel').getTabContent().removeTab(`turnofforder/apply/detail-add`)
                }
            })
		},
		onSubmit(){
			if(!this.submitValidate()){
                return
			}
			this.$refs[this.ref].validate((valid) => {
                if (valid) {
                    TjUI.dialog.prompt(this.confirmFn)
                    return true;
                } else {
                    console.info('form validate error');
                    return false;
                }
            })
		}
	}
}
</script>
<style>
	.turnofforder-apply-form-cls{
		background-color: #D7D7D7;
		
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
