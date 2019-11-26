/**
 * 项目投标菜单 模块中的访问路由
 */
import { CONST_DEFAULT_CONFIG } from '@/config'

const apply = () => import('@/views/project-manager/setup/page/apply')
const superior = () => import('@/views/project-manager/setup/page/superior')
const finance = () => import('@/views/project-manager/setup/page/finance')
const search = () => import('@/views/project-manager/setup/page/search')
const charge = () => import('@/views/project-manager/setup/page/charge')
const leader = () => import('@/views/project-manager/setup/page/leader')

const applyDetail = () => import('@/views/project-manager/setup/page/apply/detail')
const superiorDetail = () => import('@/views/project-manager/setup/page/superior/detail')
const financeDetail = () => import('@/views/project-manager/setup/page/finance/detail')
const chargeDetail = () => import('@/views/project-manager/setup/page/charge/detail')
const leaderDetail = () => import('@/views/project-manager/setup/page/leader/detail')

export default {
    apply,
    charge,
    superior,
    finance,
    search,
    leader,
    [`apply${CONST_DEFAULT_CONFIG.sep}detail`]: applyDetail,
    [`superior${CONST_DEFAULT_CONFIG.sep}detail`]: superiorDetail,
    [`finance${CONST_DEFAULT_CONFIG.sep}detail`]: financeDetail,
    [`charge${CONST_DEFAULT_CONFIG.sep}detail`]: chargeDetail,
    [`leader${CONST_DEFAULT_CONFIG.sep}detail`]: leaderDetail,
}
