/**
 * 包信息grid
 */
import dateformat from 'dateformat-util'
//import detailTbar from './tbar'
//import editDetail from './edit-detail'
import { apply } from '@/utils/tools'
import _forIn from 'lodash/forIn'

const Grid = {
    extends: new TjUI.grid.Grid(),
    props: ['row','type','moduleid'],
    data(){
        return {
            you: 'cccccccc1111',
            curRow: null,
            conurl: 'project/workload/confirm/readWorkloadDetail',
            processID: 0,
            contractID: 0,   //合同id
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: ''
            },
            selMode: 'simple',
         //   tbar: detailTbar,
        //    detailPanel: editDetail,
          //  loadFilter: this.doLoadFilter,
            columns: [
                {label:'报工ID',field:'workloadid',hide:true},
                {label:'工作内容',field:'taskname'},
                {label:'工作量（天）',field:'totalload'},
                {label:'本次工作量（天）',field:'loaded'},
                {label:'剩余工作量（天）',field:'overload'}
            ],
        }
    },
    mounted(){
        this.initProcessID()
        console.info('aaa',this.curRow)
    },
    methods:{
        initProcessID(){
            if(!!this.row){
                !(!!this.curRow) && (this.curRow = this.row)
                this.queryParams.processid = this.curRow.process.id
                this.processID = this.curRow.process.id
                this.contractID = this.curRow.id
            }
        },
        setProcessID(row){
            this.queryParams.processid = row.process.id
            this.processID = row.process.id
        },
        setConractID(row){
            this.contractID = row.id 
        },
        getCurRow(){
            return this.curRow
        },
        setCurRow(row){
            this.setProcessID(row)
            this.setConractID(row)
            this.curRow = row
        },
        reloadGrid(){
            this.getLinkComponent(this.tableLink).setQueryParams(this.queryParams)
			this.getLinkComponent(this.tableLink).loadStore()
        }
    }
}
export default Grid