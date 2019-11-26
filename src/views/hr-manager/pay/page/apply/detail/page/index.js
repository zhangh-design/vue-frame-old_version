/**
 * tab grid页
 */
import payGrid from './pay-grid'
import addPayGrid from './add-grid'

const TabGrid = {
    extends: new TjUI.panel.Panel(),
    props: {
        hrPayEditPanel: {
            type: Object,
            default: null
        },
        type: {
            type: String,
            default: 'edit'
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
    data() {
        return {
            layout: 'border',
            addPayGridLink: `add-payGrid-${this._uid}`,
            payGridLink: `link-payGrid-${this._uid}`
        }
    },
    mounted() {
        this.initPanel()
    },
    methods: {
        initPanel() {
            let mainPanel = {
                component: payGrid,
                props: {
                    link: this.payGridLink,
                    hrPayEditPanel: this.hrPayEditPanel,
                    type: this.type,
                    row: this.row,
                    editPanel: this,
                    moduleid: this.moduleid,
                },
                slot: 'center'
            }
            let addGrid = {
                component: addPayGrid,
                props: {
                    link: this.addPayGridLink,
                    hrPayEditPanel: this.hrPayEditPanel,
                    type: this.type,
                    row: this.row,
                    editPanel: this,
                    moduleid: this.moduleid,
                },
                style: {
                    height: '80px'
                },
                slot: 'south'
            }
            this.add(mainPanel)
            this.add(addGrid)
        }
    }
}
export default TabGrid
