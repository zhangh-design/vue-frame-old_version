/**
 * 物资合同付款菜单 模块中的访问路由
 */
import { CONST_DEFAULT_CONFIG } from '@/config'

const apply = () => import('@/views/buy-manager/payment/page/apply')
const superior = () => import('@/views/buy-manager/payment/page/superior')
const charge = () => import('@/views/buy-manager/payment/page/charge')
const finance = () => import('@/views/buy-manager/payment/page/finance')
const leader = () => import('@/views/buy-manager/payment/page/leader')
const manager = () => import('@/views/buy-manager/payment/page/manager')
const dispose = () => import('@/views/buy-manager/payment/page/dispose')
const teller = () => import('@/views/buy-manager/payment/page/teller')

const applyDetail = () => import('@/views/buy-manager/payment/page/apply/detail')
const superiorDetail = () => import('@/views/buy-manager/payment/page/superior/detail')
const chargeDetail = () => import('@/views/buy-manager/payment/page/charge/detail')
const financeDetail = () => import('@/views/buy-manager/payment/page/finance/detail')
const leaderDetail = () => import('@/views/buy-manager/payment/page/leader/detail')
const managerDetail = () => import('@/views/buy-manager/payment/page/manager/detail')
const disposeDetail = () => import('@/views/buy-manager/payment/page/dispose/detail')
const tellerDetail = () => import('@/views/buy-manager/payment/page/teller/detail')

export default {
    apply,
    superior,
    charge,
    finance,
    leader,
    manager,
    teller,
    dispose,
    [`apply${CONST_DEFAULT_CONFIG.sep}detail`]: applyDetail,
    [`superior${CONST_DEFAULT_CONFIG.sep}detail`]: superiorDetail,
    [`charge${CONST_DEFAULT_CONFIG.sep}detail`]: chargeDetail,
    [`finance${CONST_DEFAULT_CONFIG.sep}detail`]: financeDetail,
    [`leader${CONST_DEFAULT_CONFIG.sep}detail`]: leaderDetail,
    [`manager${CONST_DEFAULT_CONFIG.sep}detail`]: managerDetail,
    [`dispose${CONST_DEFAULT_CONFIG.sep}detail`]: disposeDetail,
    [`teller${CONST_DEFAULT_CONFIG.sep}detail`]: tellerDetail,
}