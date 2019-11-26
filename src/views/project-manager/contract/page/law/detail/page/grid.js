/**
 * 包信息grid
 */
import dateformat from 'dateformat-util'
import { apply } from '@/utils/tools'
import _forIn from 'lodash/forIn'

const Grid = {
    extends: new TjUI.grid.Grid(),
    props: ['row','type'],
    data(){
        return {
            conurl: 'project/contract/law/readTenderDetail',
            processID: 0,
            queryParams: {
                token: this.$store.getters['user/getToken'],
                processid: this.row.process.id
            },
            selMode: 'simple',
            loadFilter: this.doLoadFilter,
            columns: [
                {label:'编号',field:'name'},
                {label:'招标地区',field:'area'},
                {label:'投标时间',field:'tendertime',sort: true},
                {label:'包-编号',field:'d-code'},
                {label:'包号',field:'d-packagenum'},
                {label:'包名',field:'d-packagename'},
                {label:'类型',field:'d-sort'},
                {label:'预计费用(万)',field:'d-plancost'},
                {label:'标书费用(万)',field:'d-charge'},
                {label:'投标保证金(万)',field:'d-deposit'},
                {label:'中标服务费(万)',field:'d-cost'},
                {label:'中标信息',field:'d-flag'},
            ],
        }
    },
    mounted(){},
    methods:{
        doLoadFilter(resData){
            let content = []
            resData.data.content.forEach(item => {
                let row = {...item.view.tender,...{contracttenderid: item.id}}
                let detail = {}
                _forIn(item.view.detail,(value, key)=>{
                    apply(detail,{['d-'+key]: value})
                })
                apply(row,detail)
                content.push(row)
            })
            resData.data.content = content
            return resData
        }
    }
}
export default Grid