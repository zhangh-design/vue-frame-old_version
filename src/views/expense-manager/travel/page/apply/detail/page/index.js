/**
 * tab grid页
 */
import contentPanel from './content'
import DetailGrid from './grid/detail-grid'
import SubsidyGrid from './grid/subsidy-grid'

const TabGrid = {
    extends: new TjUI.panel.Panel(),
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
        moduleid:{
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
                    setUpApplyEditPanel: this.setUpApplyEditPanel,
                    type: this.type,
                    DetailGrid,
                    SubsidyGrid,
                    row: this.row,
                    moduleid:this.moduleid
                }
            }
            this.add(mainPanel)
        }
    }
}
export default TabGrid
