/**
 * 上传招标文件 查看列表和上传、删除、下载
 */
import dateformat from 'dateformat-util'
import { apply } from '@/utils/tools'
import fileListTbar from './file-list-tbar'

const FileList = {
    extends: new TjUI.grid.Grid(),
    props: ['mainPanel','mainGrid'],
    data(){
        return {
            conurl: 'project/contract/apply/readContractFilePage',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: '',  //流程id
              //  id: ''          //包详情id
            },
            selMode: 'simple',
            columns: [
                {label: '名称',field: 'name'}
            ],
            page_size: 1000,
            tbar: fileListTbar,
            isPagination: false
        }
    },
    mounted(){
        apply(this.queryParams,{processid: this.mainPanel.processID})
    }
}
export default FileList