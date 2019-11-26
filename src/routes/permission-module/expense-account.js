/**
 * 费用报销菜单 模块中的访问路由
 */
import { CONST_DEFAULT_CONFIG } from '@/config'

const apply = () => import('@/views/expense-manager/account/page/apply')
const superior = () => import('@/views/expense-manager/account/page/superior')
const finance = () => import('@/views/expense-manager/account/page/finance')
const leader = () => import('@/views/expense-manager/account/page/leader')
const manager = () => import('@/views/expense-manager/account/page/manager')
const teller = () => import('@/views/expense-manager/account/page/teller')

const applyDetail = () => import('@/views/expense-manager/account/page/apply/detail')
const superiorDetail = () => import('@/views/expense-manager/account/page/superior/detail')
const financeDetail = () => import('@/views/expense-manager/account/page/finance/detail')
const leaderDetail = () => import('@/views/expense-manager/account/page/leader/detail')
const managerDetail = () => import('@/views/expense-manager/account/page/manager/detail')
const tellerDetail = () => import('@/views/expense-manager/account/page/teller/detail')

export default {
    apply,
    superior,
    finance,
    leader,
    manager,
    teller,
    [`apply${CONST_DEFAULT_CONFIG.sep}detail`]: applyDetail,
    [`finance${CONST_DEFAULT_CONFIG.sep}detail`]: financeDetail,
    [`superior${CONST_DEFAULT_CONFIG.sep}detail`]: superiorDetail,
    [`leader${CONST_DEFAULT_CONFIG.sep}detail`]: leaderDetail,
    [`manager${CONST_DEFAULT_CONFIG.sep}detail`]: managerDetail,
    [`teller${CONST_DEFAULT_CONFIG.sep}detail`]: tellerDetail,
}