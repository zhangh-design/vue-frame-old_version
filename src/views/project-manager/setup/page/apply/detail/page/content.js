import tjTabs from '@/components/common/tabs'

export default {
    inject: ['getPanel'],
    // props: ['setUpApplyEditPanel','type','constGrid','budgetPanel','hrGrid','MilestoneGrid','link','row'],
    props: {
        setUpApplyEditPanel: {
			type: Object,
			default: null
        },
        type: {
			type: String,
			default: ''
		},
        constGrid: {
			type: Object,
			default: null
        },
        budgetPanel: {
			type: Object,
			default: null
        },
        hrGrid: {
			type: Object,
			default: null
        },
        MilestoneGrid: {
			type: Object,
			default: null
        },
        link: {
			type: String,
			default: ''
        },
        row: {
			type: Object,
			default: null
        },
        moduleid: {
            type: String,
			default: ''
        }
    },
    components: {
        tjTabs
        // tjTabs: ()=>import('@/components/common/tabs')
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
        open(module){
            // this.$refs['tab-content'].addTab({title: module.title,name: module.name},module.component)
            this.budgetPanel.defaults ={
                setUpApplyEditPanel: this.setUpApplyEditPanel,
                type: this.type
            }
            this.MilestoneGrid.defaults ={
                setUpApplyEditPanel: this.setUpApplyEditPanel,
                link: this.link,
                row: this.row,
            }
            this.hrGrid.defaults = {
                setUpApplyEditPanel: this.setUpApplyEditPanel,
                link: this.link,
                row: this.row,
            }
            //关键，组件必须拥有自己的上下文环境
            let budgetPanelFn = TjUI.extend(js.base.fn,this.budgetPanel)
            let milestoneGridFn = TjUI.extend(js.base.fn,this.MilestoneGrid)
            let hrGridFn = TjUI.extend(js.base.fn,this.hrGrid)

            this.$refs['tab-content'].addTab({title: '里程碑信息',name: `milestone-grid-${this._uid}`},new milestoneGridFn())
            this.$refs['tab-content'].addTab({title: '人力投入',name: `hr-grid-${this._uid}`},new hrGridFn())
            this.$refs['tab-content'].addTab({title: '项目预算',name: `budget-grid-${this._uid}`},new budgetPanelFn())
            
            // this.$refs['tab-content'].addTab({title: '项目额外成本',name: `const-grid-${this._uid}`},this.constGrid)
            
            setTimeout(() => {
                this.$refs['tab-content'].setActiveName( `milestone-grid-${this._uid}`)
            }, 0);
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
                // 'aaaaaaaaaaaaa'
            ]
        )
    }
}