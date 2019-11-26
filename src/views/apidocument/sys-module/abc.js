import tabPanel from '@/components/common/sys-module/base-tab-panel'

export default {
	extends: new TjUI.panel.Panel,
	mixins: [tabPanel],	//必须是混入或继承 tabPanel组件否则无法触发reloadTabModule()方法
	// props: ['htmlaaa'],
	data(){
		return {
			layout: 'fit',
			html: this.userHtml,
		}
	},
	methods: {
		reloadTabModule(r){
			console.info('eeeeeeeee ',r);
		}
	}
}