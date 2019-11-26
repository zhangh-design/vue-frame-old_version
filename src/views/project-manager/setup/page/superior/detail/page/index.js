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
    props: ['setUpApplyEditPanel','type'],
    data(){
        return {
            layout: 'fit'
        }
    },
    mounted(){
        this.initPanel()
    },
    methods: {
        initPanel(){
            let mainPanel = {
                component: contentPanel,
                props: {
                    // constGrid,
                    setUpApplyEditPanel: this.setUpApplyEditPanel,
                    type: this.type,
                    budgetPanel,
                    hrGrid,
                    MilestoneGrid,
                }
            }
            this.add(mainPanel)
        }
    }
}
export default TabGrid