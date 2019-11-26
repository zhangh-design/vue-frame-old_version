/**
 * 项目预算
 */
// import budgetTbar from './budget/tbar'
// import editDetail from './edit-detail'
import addDetail from './budget/add-detail'
import editDetail from './budget/edit-detail'

const BudgetDetail = {
    extends: new TjUI.panel.Panel(),
    // props: ['type','setUpApplyEditPanel','row'],
    props: {
        type: {
			type: String,
			default: 'edit'
		},
		setUpApplyEditPanel: {
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
            layout: 'fit'
        }
    },
    mounted(){
        this.initPanel()
    },
    methods: {
        initPanel(){
            let detail = {
                component: this.type==='add' ? addDetail : editDetail,
                props: {
                    setUpApplyEditPanel: this.setUpApplyEditPanel
                }
            }
            this.add(detail)
        }
    }
}
export default BudgetDetail
