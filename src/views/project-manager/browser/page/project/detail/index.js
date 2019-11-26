/**
 * 项目浏览 项目查询 详情页面
 */
import checkDetail from './check-detail'
import contentPanel from './page/content'

const DetailPanel = {
	extends: new TjUI.panel.Panel(),
	props: {
		mainPanel: {
			type: Object,
			default: null
		},
		mainGrid: {
			type: Object,
			default: null
		},
		row: {
			type: Object,
			default: null
		}
	},
	data(){
		return {
			layout: 'border',
			//需要定义本地row
			curRow: this.row,
		}
	},
	mounted(){
		this.initPanel()
	},
	methods: {
		initPanel(){
			let north = {
				component: checkDetail,
				props: {
					mainPanel: this.mainPanel,
					mainGrid: this.mainGrid,
					row: this.curRow
				},
				style: {
					height: '115px'
				},
				slot: 'north'
			}
			let center = {
				component: contentPanel,
				props: {
					mainPanel: this.mainPanel,
					mainGrid: this.mainGrid,
					browserProjectPanel: this,
					row: this.curRow,
				},
				slot: 'center'
			}
			this.add([north,center])
		}
	}
}
export default DetailPanel