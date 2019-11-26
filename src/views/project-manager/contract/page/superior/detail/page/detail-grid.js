import processDetail from '@/components/process-card'

const EditPanel = {
    extends: new TjUI.panel.Panel(),
    props: ['mainPanel','mainGrid','window',"type","row"],
    data(){
        return {
            layout: 'border',
            editGridLink: `link-editGrid-${this._uid}`
        }
    },
    mounted(){
        console.log(this.row)
        this.initEditPanel()
    },
    methods: {
        initEditPanel(){
            let north = {
                component: new processDetail(),
                props: {
                    imgconurl:'project/contract/superior',
                    dataconurl: 'project/contract/superior/doStep',
                    queryParams: {
                        token: this.$store.getters['user/getToken'],
                        processid: this.row.process.id,
                    }
                },
                slot: 'center'
            }
            this.add(north)
        },
        getPageGrid(){
            return this.getLinkComponent(this.editGridLink)
        }
    }
}
export default EditPanel