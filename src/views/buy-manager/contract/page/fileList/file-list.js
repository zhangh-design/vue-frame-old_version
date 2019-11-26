/**
 * 查看合同附件 查看列表和上传、删除、下载
 */
import dateformat from 'dateformat-util'
import {apply} from '@/utils/tools'
import fileListTbar from './file-list-tbar'

const FileList = {
    extends: new TjUI.grid.Grid(),
    props: ['mainPanel', 'mainGrid'],
    data() {
        return {
            conurl: 'project/browser/contract/readContractAccessorPage',
            beforeUrl: "",
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: '',  //流程id
            },
            selMode: 'simple',
            columns: [
                {label: '名称', field: 'name'}
            ],
            page_size: 1000,
            tbar: fileListTbar,
            isPagination: false
        }
    },
    created() {
        const url = this.mainPanel.conurl;
        this.beforeUrl = url.substring(0, url.lastIndexOf("/") + 1);
        this.queryParams.processid = this.mainPanel.record.process.id;
        this.conurl = `${this.beforeUrl}readContractAccessorPage`;
    },
    mounted() {
        apply(this.queryParams, {id: this.mainPanel.record.id})
    }
}
export default FileList
