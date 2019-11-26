/**
 * 开票统计
 */
import InvoiceTbar from './tbar'

const Invoice = TjUI.extend(js.base.fn,{
	extends: new TjUI.grid.Grid(),
	props: {
		browserProjectPanel: {
			type: Object,
			default: null
		}
	},
    data() {
		return {
			you:'a1',
			conurl: 'project/browser/project/readInvoicePage',
			queryParams: {
				token: this.$store.getters['user/getToken'],
				id: this.browserProjectPanel.curRow.id
			},
			selMode: 'simple',
			tbar: InvoiceTbar,
			columns: [
				{label:'时间',field:'begintime'},
				{label:'金额(万)',field:'num'},
				{label:'比例',field:'ratestring'},
			],
		}
	}
})
export default Invoice