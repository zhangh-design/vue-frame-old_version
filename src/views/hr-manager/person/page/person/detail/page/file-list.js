/**
 * 取得上传简历附件列表 查看、下载
 */
import { apply } from '@/utils/tools'
import fileListTbar from './file-list-tbar'

const FileList = {
    extends: new TjUI.grid.Grid(),
    props: ['mainPanel','mainGrid'],
    data(){
        return {
            conurl: 'hr/person/person/readAccessoryPage',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                id: '',  //流程id
            },
            selMode: 'simple',
            columns: [
                {label: '名称',field: 'name'}
            ],
            page_size: 1000,
           // isPagination: false,
            tbar: fileListTbar,
        }
    },
    mounted(){
        console.log(this.mainPanel.formParams)
        apply(this.queryParams,{id: this.mainPanel.formParams.id})
    }
}
export default FileList