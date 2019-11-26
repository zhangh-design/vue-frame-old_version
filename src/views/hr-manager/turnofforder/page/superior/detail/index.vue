<template>
	<div style="height:100%;overflow: hidden;">
		<el-row style="height:33px;background-color: #F3F3F3;" class="item-btn-cls">
			<el-button type="primary" ref='submit-btn-ref' size="small" @click="onSubmit">提交</el-button>
			<el-button type="primary" size="small" style="float:right;" @click="readDetail">流程详情</el-button>
		</el-row>
		<div :style="{height: formHeight+'px',overflow: 'auto'}">
			<el-form :ref="ref" :model="form" class="turnofforder-apply-form-cls">
				<el-row style="padding-top:5px;">
					<el-col :span="1" style="width: 290px">
						<el-form-item label="员工名称" label-width="80px">
							<el-input v-model="form.personname" disabled class="base-input-cls" placeholder="员工名称"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="1" style="width: 290px">
						<el-form-item label="联系电话" prop="phone" label-width="80px">
							<el-input v-model="form.phone" class="base-input-cls" disabled placeholder="联系电话"></el-input>
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
						<el-input type="textarea" rows=4 v-model="form.reason" disabled placeholder="离职原因" maxlength=100></el-input>
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
import processDetail from '@/components/process-card'

export default {
	name: 'turnofforder-superior-check-detail',
	props: ['mainPanel','mainGrid','window','type','row','tabName','moduleid'],
	data(){
		return {
			formHeight: 0,
			ref: 'turnofforder-form',
			conurl: 'hr/turnofforder/superior/submitSuperior',
			rejectConurl: 'hr/turnofforder/superior/rejectSuperior',
			detailConurl: 'hr/turnofforder/superior/getDetail',
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
			process: {}
		}
	},
	computed: {
        ...mapGetters({
            userData: 'user/getUserInfo'
        })
	},
	mounted(){
		this.formHeight = this.$el.offsetHeight-33
		setTimeout(() => {
			this.$api[this.detailConurl](this.detailParams).then(resData=>{
				applyIn(this.form,resData.data)
				this.form.workshift = resData.data.workshift !==null ? resData.data.workshift+'' : resData.data.workshift;
				this.form.deviceshift = resData.data.deviceshift !==null ? resData.data.deviceshift+'' : resData.data.deviceshift;
				this.form.finance = resData.data.finance !==null ? resData.data.finance+'' : resData.data.finance;
				this.form.prove = resData.data.prove !==null ? resData.data.prove+'' : resData.data.prove;
				this.process = resData.data.process
			})
		}, 0);
	},
	methods: {
		readDetail(){
			if(this.process.processcode!=null){
                let processPanel = new processDetail
                processPanel.defaults = {
                    imgconurl: 'hr/turnofforder/superior',
                    dataconurl: 'hr/turnofforder/superior/doStep',
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.process.id,
                    }
                }
                this.getLinkComponent(`link-content-panel`).getTabContent().addTab({title: '流程记录',name: `turnofforder/superior/detail-edit-${this.row.id}-process`},processPanel)
            }else{
                this.$message({type: 'success', message: '当前步骤没有流程!'});
            }
		},
		//同意
        confirmFn(value){
            this.$api[this.conurl]({advice: value,...this.queryParams}).then(resData=>{
                this.doResult(resData)
            })
        },
        //不同意
        cancelFn(value){
            this.$api[this.rejectConurl]({advice: value,...this.queryParams}).then(resData=>{
                this.doResult(resData)
            })
        },
        onSubmit(){
            TjUI.dialog.process(this.confirmFn,this.cancelFn)
		},
		doResult(resData){
            if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                this.$message({type: 'success',message: '操作成功!'});
                !!this.mainGrid && this.mainGrid.reloadGrid();
                this.getLinkComponent('link-content-panel').getTabContent().removeTab(this.tabName)
            }
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
