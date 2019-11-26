/**
 * 取得上传开票附件列表 查看、下载
 */
import { apply } from '@/utils/tools'
import fileListTbar from './file-list-tbar'

const FileList = {
    extends: new TjUI.grid.Grid(),
    props: ['mainPanel','mainGrid'],
    data(){
        return {
            conurl: 'buy/payment/superior/readTellerFilePage',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: '',  //流程id
            },
            selMode: 'simple',
            columns: [
                {label: '名称',field: 'name'}
            ],
            page_size: 1000,
            isPagination: false,
            tbar: fileListTbar,
        }
    },
    mounted(){
        apply(this.queryParams,{processid: this.mainPanel.record.process.id})
    }
}
export default FileList