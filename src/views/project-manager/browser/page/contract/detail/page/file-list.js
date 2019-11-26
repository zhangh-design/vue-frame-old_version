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
            conurl: 'project/browser/contract/readContractAccessorPage',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                id: '',  //流程id
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
        apply(this.queryParams,{id: this.mainPanel.record.id})
    }
}
export default FileList
