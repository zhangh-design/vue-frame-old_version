/**
 * 工具栏
 */
import { Authority,AuthorityProps } from '@/plugins/authority'
import { apply,isNotEqualeEmpty } from '@/utils/tools' 
import {CONST_DEFAULT_CONFIG} from '@/config'

const Tbar = {
    extends: new TjUI.grid.defineTbar.DefineTbar(),
    mixins: [new Authority({key: 'defaultBtns'}),AuthorityProps],
    props: {
        moduleid: {
            type: String,
            default(){
                return this.getPanel.moduleid
            }
        }
    },
    data(){
        return {
            defaultBtns: [
                {text: '调薪记录: ',name:'add',size: 'mini',grade: ''},
            ]
        }
    }
}
export default Tbar