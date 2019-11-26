/**
 * 开票统计
 */
import payMentTbar from './tbar'

const PayMent = TjUI.extend(js.base.fn,{
	extends: new TjUI.grid.Grid(),
	props: {
		browserProjectPanel: {
			type: Object,
			default: null
		}
	},
    data() {
		return {
			conurl: 'project/browser/project/readPaymentPage',
			queryParams: {
				token: this.$store.getters['user/getToken'],
				id: this.browserProjectPanel.curRow.id
			},
			selMode: 'simple',
			tbar: payMentTbar,
			columns: [
				{label:'时间',field:'begintime'},
				{label:'金额(万)',field:'num'},
				{label:'比例',field:'ratestring'},
			],
		}
	}
})
export default PayMent