/**
 * 物质合同会签菜单 模块中的访问路由
 */
import { CONST_DEFAULT_CONFIG } from '@/config'

const apply = () => import('@/views/buy-manager/applyfor/page/apply')
const superior = () => import('@/views/buy-manager/applyfor/page/superior')
const charge = () => import('@/views/buy-manager/applyfor/page/charge')
const finance = () => import('@/views/buy-manager/applyfor/page/finance');
const leader = () => import('@/views/buy-manager/applyfor/page/leader');
const manager = () => import('@/views/buy-manager/applyfor/page/manager');

const applyDetail = () => import('@/views/buy-manager/applyfor/page/apply/detail')
const superiorDetail = () => import('@/views/buy-manager/applyfor/page/superior/detail')
const chargeDetail = () => import('@/views/buy-manager/applyfor/page/charge/detail')
const financeDetail = () => import('@/views/buy-manager/applyfor/page/finance/detail')
const leaderDetail = () => import('@/views/buy-manager/applyfor/page/leader/detail')
const managerDetail = () => import('@/views/buy-manager/applyfor/page/manager/detail')

export default {
    apply,
    charge,
    finance,
    superior,
    leader,
    manager,
    [`apply${CONST_DEFAULT_CONFIG.sep}detail`]: applyDetail,
    [`superior${CONST_DEFAULT_CONFIG.sep}detail`]: superiorDetail,
    [`charge${CONST_DEFAULT_CONFIG.sep}detail`]: chargeDetail,
    [`finance${CONST_DEFAULT_CONFIG.sep}detail`]: financeDetail,
    [`leader${CONST_DEFAULT_CONFIG.sep}detail`]: leaderDetail,
    [`manager${CONST_DEFAULT_CONFIG.sep}detail`]: managerDetail,
}
