/**
 * 物质合同会签菜单 模块中的访问路由
 */
import { CONST_DEFAULT_CONFIG } from '@/config'

const apply = () => import('@/views/buy-manager/contract/page/apply')
const charge = () => import('@/views/buy-manager/contract/page/charge')
const finance = () => import('@/views/buy-manager/contract/page/finance');
const low = () => import('@/views/buy-manager/contract/page/low');
const leader = () => import('@/views/buy-manager/contract/page/leader');
const manager = () => import('@/views/buy-manager/contract/page/manager');
const dispose = () => import('@/views/buy-manager/contract/page/dispose');
const archive = () => import('@/views/buy-manager/contract/page/archive')

const applyDetail = () => import('@/views/buy-manager/contract/page/apply/detail')
const chargeDetail = () => import('@/views/buy-manager/contract/page/charge/detail')
const financeDetail = () => import('@/views/buy-manager/contract/page/finance/detail')
const lowDetail = () => import('@/views/buy-manager/contract/page/low/detail')
const leaderDetail = () => import('@/views/buy-manager/contract/page/leader/detail')
const managerDetail = () => import('@/views/buy-manager/contract/page/manager/detail')
const disposeDetail = () => import('@/views/buy-manager/contract/page/dispose/detail')
const archiveDetail = () => import('@/views/buy-manager/contract/page/archive/detail')

export default {
    apply,
    charge,
    finance,
    low,
    leader,
    manager,
    dispose,
    archive,
    [`apply${CONST_DEFAULT_CONFIG.sep}detail`]: applyDetail,
    [`charge${CONST_DEFAULT_CONFIG.sep}detail`]: chargeDetail,
    [`finance${CONST_DEFAULT_CONFIG.sep}detail`]: financeDetail,
    [`low${CONST_DEFAULT_CONFIG.sep}detail`]: lowDetail,
    [`leader${CONST_DEFAULT_CONFIG.sep}detail`]: leaderDetail,
    [`manager${CONST_DEFAULT_CONFIG.sep}detail`]: managerDetail,
    [`dispose${CONST_DEFAULT_CONFIG.sep}detail`]: disposeDetail,
    [`archive${CONST_DEFAULT_CONFIG.sep}detail`]: archiveDetail,
}
