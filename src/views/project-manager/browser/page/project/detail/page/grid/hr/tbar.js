const Tbar = {
	inject: ['getTopBar'],
	data(){
		return {
			a: '',
			b: '',
			conurl: 'project/browser/project/getHr',
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
			this.a = resData.data[0]
			this.b = resData.data[1]
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
					h('span',{domProps: {innerHTML: `预计工作量（人天）：${this.a}`}}),
					h('span',{style:{'margin-left':'30px'},domProps: {innerHTML: `预计成本（万）：${this.b}`}})
				])
			])
	}
}
export default Tbar