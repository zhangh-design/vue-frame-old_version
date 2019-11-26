/**
 * Grid数据展示详情页
 */
import { apply } from '@/utils/tools'

const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    width: 440,
    height: 140,
    data(){
        return {
            conurl: 'hr/person/person/ChangeRole',
            defaults: {
                border: false,
                columns: 2,
                width: 300,
                labelWidth: 130
            },
            formParams: {
                token: this.$store.getters['user/getToken'],
                roleid: '',
                rolename:'',
                userid: this.mainGrid.mainGridRow.userid,
            },
        }
    },
    mounted(){},
    methods: {
        initDetailData(){
            console.log(this.mainGrid.mainGridRow.userid)
            this.detailData = [
                {span: 1,name: 'roleselect',label: '请选择角色权限',displayField: 'name',valueField: 'id',type: 'ComboBox',conurl:'hr/person/person/readRoleList',queryParams: {token: this.$store.getters['user/getToken']},width: 160,rule:[
                    {required: true,message: '请输入角色权限名称', trigger: 'blur'},
                ],
                listeners:{
                    change: (values)=>{
                        console.log(values.id)
                        if(values){
                            apply(this.formDetail,{roleid:values.id,rolename:values.name});
                        }else{
                            apply(this.formDetail,{roleid:'',rolename:''});
                        }
                }}},
            ]
        }
    }
}
export default Detail