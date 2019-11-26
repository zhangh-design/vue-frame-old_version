const Tbar = {
	inject: ['getTopBar'],
	data(){
		return {
			a: '',
			b: '',
			c: '',
			conurl: 'project/browser/project/getWorkload',
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
			this.b = resData.data.total
			this.c = resData.data.ratestring
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
					h('span',{domProps: {innerHTML: `累计工作量（人天）：${this.a}`}}),
					h('span',{style:{'margin-left':'30px'},domProps: {innerHTML: `预计工作量（人天）：${this.b}`}}),
					h('span',{style:{'margin-left':'30px'},domProps: {innerHTML: `比率：${this.c}`}})
				])
			])
	}
}
export default Tbar