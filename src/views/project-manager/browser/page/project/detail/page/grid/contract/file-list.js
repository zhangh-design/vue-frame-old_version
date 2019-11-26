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
            conurl: 'project/browser/project/readContractFilePage',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                contractid: this.mainPanel.formDetail.id,  //合同id
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
        console.info('bbbbbbbbbb ',this.mainPanel.formDetail.id);
    }
}
export default FileList