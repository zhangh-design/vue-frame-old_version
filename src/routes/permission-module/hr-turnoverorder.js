/**
 * 转正菜单 模块中的访问路由
 */
import { CONST_DEFAULT_CONFIG } from '@/config'

const apply = () => import('@/views/hr-manager/turnoverorder/page/apply')
const superior = () => import('@/views/hr-manager/turnoverorder/page/superior')
const leader = () => import('@/views/hr-manager/turnoverorder/page/leader')

const applyDetail = () => import('@/views/hr-manager/turnoverorder/page/apply/detail/edit-detail')
const superiorDetail = () => import('@/views/hr-manager/turnoverorder/page/superior/detail')
const leaderDetail = () => import('@/views/hr-manager/turnoverorder/page/leader/detail')

export default {
    apply,
    superior,
    leader,

    [`apply${CONST_DEFAULT_CONFIG.sep}detail`]: applyDetail,
    [`superior${CONST_DEFAULT_CONFIG.sep}detail`]: superiorDetail,
    [`leader${CONST_DEFAULT_CONFIG.sep}detail`]: leaderDetail,
}