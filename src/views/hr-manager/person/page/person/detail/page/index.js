/**
 * tab grid页
 */
import contentPanel from './content'
import IncentiveGrid from './grid/incentive-grid'
import StationGrid from './grid/station-grid'
import ContractGrid from './grid/contract-grid'
import PayGrid from './grid/pay-grid'

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
            default: ''
        },
        moduleid: {
            type: String,
            default: ''
        },
        row: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            you:'233333333',
            layout: 'fit'
        }
    },
    mounted() {
        this.initPanel()
    },
    methods: {
        initPanel() {
            console.log(this.moduleid)
            let mainPanel = {
                component: contentPanel,
                props: {
                    setUpApplyEditPanel: this.setUpApplyEditPanel,
                    type: this.type,
                    ContractGrid,
                    StationGrid,
                    PayGrid,
                    IncentiveGrid,
                    link: `aaaaaaaa -${this._uid}`,
                    row: this.row,
                    moduleid:this.moduleid
                }
            }
            this.add(mainPanel)
        }
    }
}
export default TabGrid
