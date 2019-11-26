/**
 * 包信息详情-添加
 */
import { intNumToStr } from '@/utils/tools'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    data(){
        return {
            conurl: '',
            defaults: {
                border: false,
                columns: 2,
                width: 340,
                labelWidth: 100
            },
         //   selectRow: {...this.mainGrid.curRow},
            formParams: {
                token: this.$store.getters['user/getToken'],
           //     processid: this.mainGrid.curRow.process.id
            }
        }
    },
    methods: {
        initDetailData(){
            
        }
    }
}
export default Detail