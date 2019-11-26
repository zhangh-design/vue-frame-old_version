const Tbar = {
	inject: ['getTopBar'],
	data(){
		return {
			a: '',
			b: '',
			conurl: 'project/browser/project/getInvoice',
			queryParams: {
				token: this.$store.getters['user/getToken'],
				id: this.getTopBar.getPanel.browserProjectPanel.curRow.id,
			}
		}
	},
	mounted(){
		//发送ajax请求获取数据
		this.$api[this.conurl](this.queryParams).then(resData=>{
			if(!(!!resData.data)) return
			this.a = resData.data.num
			this.b = resData.data.ratestring
		})
	},
	render(h){
		return h(
			'div',
			{
				style: {
					height: '20px',
				}	
			},
			[
				h('p',[
					h('span',{domProps: {innerHTML: `累计开票额（万）：${this.a}`}}),
					h('span',{style:{'margin-left':'30px'},domProps: {innerHTML: `累计开票比例：${this.b}`}})
				])
			])
	}
}
export default Tbar