/**
 * tab grid页
 */
import contentPanel from './content'
// import constGrid from './grid/const-grid'
import budgetPanel from './grid/budget-panel'
import hrGrid from './grid/hr-grid'
import MilestoneGrid from './grid/milestone-grid'

const TabGrid = {
    extends: new TjUI.panel.Panel(),
    // props: ['setUpApplyEditPanel','type','row'],
    props: {
        setUpApplyEditPanel: {
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
            layout: 'fit'
        }
    },
    mounted() {
        this.initPanel()
    },
    methods: {
        initPanel() {
            let mainPanel = {
                component: contentPanel,
                props: {
                    // constGrid,
                    setUpApplyEditPanel: this.setUpApplyEditPanel,
                    type: this.type,
                    budgetPanel,
                    hrGrid,
                    MilestoneGrid,
                    link: `aaaaaaaa -${this._uid}`,
                    row: this.row,
                    moduleid: this.moduleid,
                }
            }
            this.add(mainPanel)
        }
    }
}
export default TabGrid
