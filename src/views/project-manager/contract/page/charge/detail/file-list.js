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
            you: 'ddddddddddd',
            conurl: 'project/contract/charge/readBidsfilePage',
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