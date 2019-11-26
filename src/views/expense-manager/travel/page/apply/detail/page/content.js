import tjTabs from '@/components/common/tabs'

export default {
    inject: ['getPanel'],
    props: {
        setUpApplyEditPanel: {
            type: Object,
            default: null
        },
        type: {
            type: String,
            default: ''
        },
        DetailGrid: {
            type: Object,
            default: null
        },
        SubsidyGrid: {
            type: Object,
            default: null
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
    },
    provide: function () {
        return {
            getPanel: this
        }
    },
    data() {
        return {
            isHome: false,
        }
    },
    mounted() {
        setTimeout(() => {
            this.open()
        }, 0);
    },
    methods: {
        getTabContent() {
            return this.$refs['tab-content']
        },
        open(module) {
            this.DetailGrid.defaults = {
                setUpApplyEditPanel: this.setUpApplyEditPanel,
                row: this.row,
                type: this.type,
                moduleid:this.moduleid
            }
            this.SubsidyGrid.defaults = {
                setUpApplyEditPanel: this.setUpApplyEditPanel,
                row: this.row,
                type: this.type,
                moduleid:this.moduleid
            }
            //关键，组件必须拥有自己的上下文环境
            let DetailGridFn = TjUI.extend(js.base.fn, this.DetailGrid)
            let SubsidyGridFn = TjUI.extend(js.base.fn, this.SubsidyGrid)

            this.$refs['tab-content'].addTab({title: '行程明细', name: `detail-grid-${this._uid}`}, new DetailGridFn())
            this.$refs['tab-content'].addTab({title: '出差补贴', name: `subsidy-grid-${this._uid}`}, new SubsidyGridFn())
            
            setTimeout(() => {
                this.$refs['tab-content'].setActiveName(`detail-grid-${this._uid}`)
            }, 0);
        }
    },
    render(h) {
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
                            type: "card",
                            isHome: this.isHome,
                            closable: this.isHome
                        },
                        ref: "tab-content"
                    }
                )
                // 'aaaaaaaaaaaaa'
            ]
        )
    }
}
