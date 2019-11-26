import dateformat from 'dateformat-util'
import { apply } from '@/utils/tools'
import fileListTbar from './file-list-tbar'

const FileList = {
    extends: new TjUI.grid.Grid(),
    props: ['mainPanel','mainGrid'],
    data(){
        return {
            you: 'eeeee',
            conurl: this.mainPanel._type==='bidsfile'?'project/tender/dispose/readBidsfilePage':'project/tender/dispose/readTenderFilePage',
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
            isPagination: false,
            tbar: fileListTbar,
        }
    },
    mounted(){
        apply(this.queryParams,{processid: this.mainGrid.row.process.id,id: this.mainPanel.record.id})
    }
}
export default FileList