/**
 * 项目预算
 */
// import budgetTbar from './budget/tbar'
// import editDetail from './edit-detail'
import editDetail from './budget/edit-detail'

const BudgetDetail = {
    extends: new TjUI.panel.Panel(),
    props: ['type','setUpApplyEditPanel'],
    data(){
        return {
            layout: 'fit'
        }
    },
    mounted(){
        console.info('type: ',this.type);
        this.initPanel()
    },
    methods: {
        initPanel(){
            let detail = {
                component: editDetail,
                props: {
                    setUpApplyEditPanel: this.setUpApplyEditPanel
                }
            }
            this.add(detail)
        }
    }
}
export default BudgetDetail
