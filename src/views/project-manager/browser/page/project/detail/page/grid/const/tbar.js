const Tbar = {
	inject: ['getTopBar'],
	data(){
		return {
			a: '',
			b: '',
			c: '',
			conurl: 'project/browser/project/getConst',
			queryParams: {
				token: this.$store.getters['user/getToken'],
				id: this.getTopBar.getPanel.browserProjectPanel.curRow.id,
			},
		}
	},
	mounted(){
		//发送ajax请求获取数据
		this.$api[this.conurl](this.queryParams).then(resData=>{
			if(!(!!resData.data)) return
			console.info('aaa ',resData);
			this.a = resData.data.profit
			this.b = resData.data.profitratestring
			this.c = resData.data.bonus
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
					h('span',{domProps: {innerHTML: `动态毛利润(万)：${this.a}`}}),
					h('span',{style:{'margin-left':'30px'},domProps: {innerHTML: `动态毛利润率：${this.b}`}}),
					h('span',{style:{'margin-left':'30px'},domProps: {innerHTML: `动态奖金池(万)：${this.c}`}}),
				])
			])
	}
}
export default Tbar