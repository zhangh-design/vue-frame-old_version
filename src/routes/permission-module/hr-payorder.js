/**
 * 薪资调整菜单 模块中的访问路由
 */
import { CONST_DEFAULT_CONFIG } from '@/config'

const apply = () => import('@/views/hr-manager/pay/page/apply')
const superior = () => import('@/views/hr-manager/pay/page/superior')
const leader = () => import('@/views/hr-manager/pay/page/leader')
const human = () => import('@/views/hr-manager/pay/page/human')

const applyDetail = () => import('@/views/hr-manager/pay/page/apply/detail')
const superiorDetail = () => import('@/views/hr-manager/pay/page/superior/detail')
const leaderDetail = () => import('@/views/hr-manager/pay/page/leader/detail')
const humanDetail = () => import('@/views/hr-manager/pay/page/human/detail')

export default {
    apply,
    superior,
    leader,
    human,

    [`apply${CONST_DEFAULT_CONFIG.sep}detail`]: applyDetail,
    [`superior${CONST_DEFAULT_CONFIG.sep}detail`]: superiorDetail,
    [`leader${CONST_DEFAULT_CONFIG.sep}detail`]: leaderDetail,
    [`human${CONST_DEFAULT_CONFIG.sep}detail`]: humanDetail,
}