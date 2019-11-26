/**
 * 取得上传简历附件列表 查看、下载
 */
import dateformat from 'dateformat-util'
import { apply } from '@/utils/tools'
import fileListTbar from './file-list-tbars'

const FileList = {
    extends: new TjUI.grid.Grid(),
    props: ['mainPanel','mainGrid'],
    data(){
        return {
            you: 'vvv',
            conurl: 'hr/entry/apply/readUserFilePage',
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: '',  //流程id
                id:''
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
        console.log(this.mainPanel.record)
        apply(this.queryParams,{processid: this.mainPanel.record.process.id,id: this.mainPanel.record.id})
    }
}
export default FileList