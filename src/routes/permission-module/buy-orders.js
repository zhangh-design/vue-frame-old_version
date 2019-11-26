/**
 * 采购申请单 模块中的访问路由
 */
import { CONST_DEFAULT_CONFIG } from '@/config'

const apply = () => import('@/views/buy-manager/orders/page/apply')
const superior = () => import('@/views/buy-manager/orders/page/superior')
const charge = () => import('@/views/buy-manager/orders/page/charge')
const finance = () => import('@/views/buy-manager/orders/page/finance')
const manager = () => import('@/views/buy-manager/orders/page/manager')
const dispose = () => import('@/views/buy-manager/orders/page/dispose')
const teller = () => import('@/views/buy-manager/orders/page/teller')
const archive = () => import('@/views/buy-manager/orders/page/archive')
const confirm = () => import('@/views/buy-manager/orders/page/confirm')

const applyDetail = () => import('@/views/buy-manager/orders/page/apply/detail')
const superiorDetail = () => import('@/views/buy-manager/orders/page/superior/detail')
const chargeDetail = () => import('@/views/buy-manager/orders/page/charge/detail')
const financeDetail = () => import('@/views/buy-manager/orders/page/finance/detail')
const managerDetail = () => import('@/views/buy-manager/orders/page/manager/detail')
const disposeDetail = () => import('@/views/buy-manager/orders/page/dispose/detail')
const tellerDetail = () => import('@/views/buy-manager/orders/page/teller/detail')
const archiveDetail = () => import('@/views/buy-manager/orders/page/archive/detail')
const confirmDetail = () => import('@/views/buy-manager/orders/page/confirm/detail')

export default {
	apply,
	superior,
	charge,
	finance,
	manager,
	dispose,
	teller,
	archive,
	confirm,

	[`apply${CONST_DEFAULT_CONFIG.sep}detail`]: applyDetail,
    [`superior${CONST_DEFAULT_CONFIG.sep}detail`]: superiorDetail,
    [`charge${CONST_DEFAULT_CONFIG.sep}detail`]: chargeDetail,
    [`finance${CONST_DEFAULT_CONFIG.sep}detail`]: financeDetail,
    [`archive${CONST_DEFAULT_CONFIG.sep}detail`]: archiveDetail,
    [`manager${CONST_DEFAULT_CONFIG.sep}detail`]: managerDetail,
    [`dispose${CONST_DEFAULT_CONFIG.sep}detail`]: disposeDetail,
	[`teller${CONST_DEFAULT_CONFIG.sep}detail`]: tellerDetail,
	[`confirm${CONST_DEFAULT_CONFIG.sep}detail`]: confirmDetail,

}