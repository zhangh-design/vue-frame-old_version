import { mapGetters } from 'vuex'
import { intNumToStr,isEmptyObject,isNotEmpty} from '@/utils/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'
import userDetail from '@/components/common/grid/detail/detail'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    props: ['setUpApplyEditPanel'],
    data(){
        return {
            detailConurl: 'project/setup/superior/getBudget',
            queryParams: {
                processid: this.setUpApplyEditPanel.curRow.process.id,
                token: this.$store.getters['user/getToken']
            },
            defaults: {
                border: false,
                columns: 2,
                width: 400,
                labelWidth: 120,
            },
            submitBtnLink: `link-setupApply-subbtn-${this._uid}`,
            resetBtnLink: `link-setupApply-restbtn-${this._uid}`,
            idLink: `link-setupApply-id-${this._uid}`,
            totalcostLink: `link-setupApply-totalcost-${this._uid}`
        }
    },
    computed: {
        //grid当前选中row行
        record(){
            return {}
        },
        //grid当前选中row行集
        records(){
            return []
        },
        //获取表单
        formDetail(){
            return {...this.getLinkComponent(this.detailLink).getModels()}
        },
        ...mapGetters({
			userData: 'user/getUserInfo'
        })
    },
    methods: {
        initPanel(){
            let panel = {
                component: userDetail,
                props: {
                    link: this.detailLink,
                    ...this.$data,
                    buttons: [],
                }
            }
            this.add(panel)
        },
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'laborcost',type: 'TextField',width: 200,label: '人工成本(万)',disabled: true},
                {span: 1,name: 'travelcost',type: 'TextField',width: 200,disabled: true,label: '差旅成本(万)'},
                {span: 1,name: 'businesscost',type: 'TextField',width: 200,disabled: true,label: '商务成本(万)'},
                {span: 1,name: 'materialcost',type: 'TextField',width: 200,disabled: true,label: '物质成本(万)'},
                {span: 1,name: 'peripheralcost',type: 'TextField',width: 200,disabled: true,label: '外委成本(万)'},
                {span: 1,name: 'capitalcost',type: 'TextField',width: 200,disabled: true,label: '资金占用成本(万)'},
                {span: 1,name: 'othercost',type: 'TextField',width: 200,disabled: true,label: '其他成本(万)'},
                {span: 1,name: 'totalcost',type: 'TextField',disabled: true,link: this.totalcostLink,width: 200,label: '总成本(万)',emptyText: '后端计算，无需填写'},
            ]
        },
    }
}
export default Detail
