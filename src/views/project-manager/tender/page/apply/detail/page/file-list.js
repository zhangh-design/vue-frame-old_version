/**
 * 上传招标文件 查看列表和上传、删除、下载
 */
import dateformat from 'dateformat-util'
import { apply } from '@/utils/tools'
import fileListTbar from './file-list-tbar'
import fileListTenderTbar from './file-list-tender-tbar'

const FileList = {
    extends: new TjUI.grid.Grid(),
    props: ['mainPanel','mainGrid'],
    data(){
        return {
            you: 'ddddddddddd',
            conurl: this.mainPanel.fileType==='bids'?'project/tender/apply/readBidsfilePage':'project/tender/apply/readTenderfilePage',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: '',  //流程id
                id: ''          //包详情id
            },
            selMode: 'simple',
            columns: [
                {label: '名称',field: 'name'}
            ],
            page_size: 1000,
            tbar: this.mainPanel.fileType==='bids'?fileListTbar : fileListTenderTbar,
            isPagination: false
        }
    },
    mounted(){
        apply(this.queryParams,{processid: this.mainGrid.curRow.process.id,id: this.mainPanel.record.id})
    }
}
export default FileList