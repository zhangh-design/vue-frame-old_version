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
        moduleid: {
			type: String,
			default: ''
		},
        constGrid: {
			type: Object,
			default: null
        },
        ContractGrid: {
            type: Object,
			default: null
        },
        StationGrid: {
            type: Object,
			default: null
        },
        PayGrid: {
            type: Object,
			default: null
        },
        IncentiveGrid: {
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
            you:'czzzzzzzzzzzzz',
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
            console.log(this.type)
            // this.$refs['tab-content'].addTab({title: module.title,name: module.name},module.component)
            this.ContractGrid.defaults ={
                setUpApplyEditPanel: this.setUpApplyEditPanel,
                row: this.row,
                type: this.type,
                moduleid:this.moduleid
            }
            this.StationGrid.defaults ={
                setUpApplyEditPanel: this.setUpApplyEditPanel,
                row: this.row,
                type: this.type,
                moduleid:this.moduleid
            }
            this.PayGrid.defaults ={
                setUpApplyEditPanel: this.setUpApplyEditPanel,
                row: this.row,
                type: this.type,
                moduleid:this.moduleid
            }
            this.IncentiveGrid.defaults ={
                setUpApplyEditPanel: this.setUpApplyEditPanel,
                link: this.link,
                row: this.row,
                moduleid:this.moduleid,
                type: this.type
            }
            console.log(this.moduleid)
            //关键，组件必须拥有自己的上下文环境
            let ContractGridFn = TjUI.extend(js.base.fn,this.ContractGrid)
            let StationGridFn = TjUI.extend(js.base.fn,this.StationGrid)
            let PayGridFn = TjUI.extend(js.base.fn,this.PayGrid)
            let IncentiveGridFn = TjUI.extend(js.base.fn,this.IncentiveGrid)
            this.$refs['tab-content'].addTab({title: '合同信息',name: `contract-grid-${this._uid}`},new ContractGridFn())
            this.$refs['tab-content'].addTab({title: '岗位信息',name: `station-grid-${this._uid}`},new StationGridFn())
            this.$refs['tab-content'].addTab({title: '薪资信息',name: `pay-grid-${this._uid}`},new PayGridFn())
            this.$refs['tab-content'].addTab({title: '奖惩信息',name: `incentive-grid-${this._uid}`},new IncentiveGridFn())
            
            setTimeout(() => {
                this.$refs['tab-content'].setActiveName( `contract-grid-${this._uid}`)
            }, 0);
        }
    },
    render(h){
        return h(
            'div',
            {
                'class': 'main-content person-person',
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