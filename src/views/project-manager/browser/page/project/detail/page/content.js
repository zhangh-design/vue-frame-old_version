import tjTabs from '@/components/common/tabs'

import contractPanel from './grid/contract'
import constPanel from './grid/const'
import hrPanel from './grid/hr'
import invoicePanel from './grid/invoice'
import milestonePanel from './grid/milestone'
import paymentPanel from './grid/payment'
import workloadPanel from './grid/workload'

export default {
    inject: ['getPanel'],
    props: {
        mainPanel: {
			type: Object,
			default: null
		},
		mainGrid: {
			type: Object,
			default: null
        },
        browserProjectPanel: {
            type: Object,
			default: null
        },
		row: {
			type: Object,
			default: null
		}
    },
    components: {
        tjTabs
    },
    provide: function () {
        return {
            getPanel: this
        }
    },
    data(){
        return {
            isHome: false,
        }
    },
    mounted(){
        setTimeout(() => {
            this.open()
        }, 0);
    },
    methods: {
        getTabContent(){
            return this.$refs['tab-content']
        },
        open(){
            contractPanel.defaults = {
                browserProjectPanel: this.browserProjectPanel
            }

            let contractPanelFn = TjUI.extend(js.base.fn,contractPanel)

            this.$refs['tab-content'].addTab({title: '合同',name: `contract-grid-${this._uid}`},new contractPanelFn())
            
            this.$refs['tab-content'].addTab({title: '里程碑',name: `milestone-grid-${this._uid}`},new milestonePanel({defaults: {browserProjectPanel: this.browserProjectPanel}}))
            this.$refs['tab-content'].addTab({title: '人力计划',name: `hr-grid-${this._uid}`},new hrPanel({defaults: {browserProjectPanel: this.browserProjectPanel}}))
            
            this.$refs['tab-content'].addTab({title: '成本',name: `const-grid-${this._uid}`},new constPanel({defaults: {browserProjectPanel: this.browserProjectPanel}}))
            this.$refs['tab-content'].addTab({title: '开票统计',name: `invoice-grid-${this._uid}`},new invoicePanel({defaults: {browserProjectPanel: this.browserProjectPanel}}))
            this.$refs['tab-content'].addTab({title: '回款统计',name: `payment-grid-${this._uid}`},new paymentPanel({defaults: {browserProjectPanel: this.browserProjectPanel}}))

            this.$refs['tab-content'].addTab({title: '工作量统计',name: `workload-grid-${this._uid}`},new workloadPanel({defaults: {browserProjectPanel: this.browserProjectPanel}}))
            
        }
    },
    render(h){
        return h(
            'div',
            {
                'class': 'main-content setup-apply',
                style: {
                    padding: '10px',
                    'box-sizing': 'border-box'
                },

            },
            [
                h(
                    'tj-tabs',
                    {
                        props: {
                            type:"card",
                            isHome: this.isHome,
                            closable: this.isHome
                        },
                        ref:"tab-content"   
                    }
                )
            ]
        )
    }
}