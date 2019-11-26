/**
 *员工离职 模块中的访问路由
 */
import { CONST_DEFAULT_CONFIG } from '@/config'

const apply = () => import('@/views/hr-manager/turnofforder/page/apply')
const superior = () => import('@/views/hr-manager/turnofforder/page/superior')
const leader = () => import('@/views/hr-manager/turnofforder/page/leader')
const dispose = () => import('@/views/hr-manager/turnofforder/page/dispose')
const human = () => import('@/views/hr-manager/turnofforder/page/human')
const finance = () => import('@/views/hr-manager/turnofforder/page/finance')
const archive = () => import('@/views/hr-manager/turnofforder/page/archive')

const applyDetail = () => import('@/views/hr-manager/turnofforder/page/apply/detail/edit-detail')
const superiorDetail = () => import('@/views/hr-manager/turnofforder/page/superior/detail')
const leaderDetail = () => import('@/views/hr-manager/turnofforder/page/leader/detail')
const disposeDetail = () => import('@/views/hr-manager/turnofforder/page/dispose/detail')
const humanDetail = () => import('@/views/hr-manager/turnofforder/page/human/detail')
const financeDetail = () => import('@/views/hr-manager/turnofforder/page/finance/detail')
const archiveDetail = () => import('@/views/hr-manager/turnofforder/page/archive/detail')

export default {
    apply,
	superior,
	leader,
	dispose,
	human,
	finance,
	archive,
	[`apply${CONST_DEFAULT_CONFIG.sep}detail`]: applyDetail,
    [`superior${CONST_DEFAULT_CONFIG.sep}detail`]: superiorDetail,
    [`leader${CONST_DEFAULT_CONFIG.sep}detail`]: leaderDetail,
    [`dispose${CONST_DEFAULT_CONFIG.sep}detail`]: disposeDetail,
    [`human${CONST_DEFAULT_CONFIG.sep}detail`]: humanDetail,
    [`finance${CONST_DEFAULT_CONFIG.sep}detail`]: financeDetail,
    [`archive${CONST_DEFAULT_CONFIG.sep}detail`]: archiveDetail,
}
