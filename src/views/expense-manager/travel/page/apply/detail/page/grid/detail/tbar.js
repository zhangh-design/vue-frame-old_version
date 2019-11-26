/**
 * 项目预算 tbar工具栏
 */
import detailPanel from './add-detail'
import tjWindow from '@/components/common/window'
import {Authority, AuthorityProps} from '@/plugins/authority'

const Tbar = {
    extends: new TjUI.grid.defineTbar.DefineTbar(),
    mixins: [new Authority({key: 'defaultBtns'}), AuthorityProps],
    props: {
        moduleid: {
            type: String,
            default() {
                return this.getPanel.moduleid
            }
        }
    },
    data() {
        return {
            defaultBtns: [
                {text: '添加', name: 'add',authority: ['write'], listeners: {click: this.doAdd}},
                {text: '删除', name: 'delete', authority: ['write'],listeners: {click: this.doDelete}},
            ],
            userStyle: {
                'background-color': '#fff'
            }
        }
    },
    methods: {
        doAdd() {
            let detailWin = new tjWindow({
                panel: this,
                mainGrid: this.getPanel,
                title: '行程明细信息-添加',
                height: 250,
                width: 720
            })
            detailWin.add(detailPanel)
            detailWin.show()
        },
        doDelete() {
            if (!this.getPanel.getStore().length) {
                this.$message({type: 'warning', duration: 1000, message: '请先添加数据!'});
                return
            }
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let processID = this.getPanel.setUpApplyEditPanel.curRow.process.id
                this.$api['expense/travel/apply/deleteApplyDetail']({
                    processid: processID,
                    id: this.record.id,
                    token: this.$store.getters['user/getToken']
                }).then(resData => {
                    this.getPanel.reloadGrid()
                })
            }).catch(() => {
            });
        },
    }
}
export default Tbar
