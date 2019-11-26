/**
 * 报销管理 模块中的访问路由
 */
import { CONST_DEFAULT_CONFIG } from '@/config'

const apply = () => import('@/views/expense-manager/travel/page/apply');
const superior = () => import('@/views/expense-manager/travel/page/superior');
const leader = () => import('@/views/expense-manager/travel/page/leader');
const manager = () => import('@/views/expense-manager/travel/page/manager');
const finance = () => import('@/views/expense-manager/travel/page/finance');
const teller = () => import('@/views/expense-manager/travel/page/teller');

const applyDetail = () => import('@/views/expense-manager/travel/page/apply/detail')
const superiorDetail = () => import('@/views/expense-manager/travel/page/superior/detail');
const leaderDetail = () => import('@/views/expense-manager/travel/page/leader/detail');
const managerDetail = () => import('@/views/expense-manager/travel/page/manager/detail');
const financeDetail = () => import('@/views/expense-manager/travel/page/finance/detail');
const tellerDetail = () => import('@/views/expense-manager/travel/page/teller/detail');

export default {
    apply,
    superior,
    leader,
    manager,
    finance,
    teller,
    [`apply${CONST_DEFAULT_CONFIG.sep}detail`]: applyDetail,
    [`finance${CONST_DEFAULT_CONFIG.sep}detail`]: financeDetail,
    [`superior${CONST_DEFAULT_CONFIG.sep}detail`]: superiorDetail,
    [`leader${CONST_DEFAULT_CONFIG.sep}detail`]: leaderDetail,
    [`manager${CONST_DEFAULT_CONFIG.sep}detail`]: managerDetail,
    [`teller${CONST_DEFAULT_CONFIG.sep}detail`]: tellerDetail,
}
