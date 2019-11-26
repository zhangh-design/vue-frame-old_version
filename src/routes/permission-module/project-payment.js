/**
 * 项目回款 模块中的访问路由
 */
import { CONST_DEFAULT_CONFIG } from '@/config'

const apply = () => import('@/views/project-manager/payment/page/apply')
const dispose = () => import('@/views/project-manager/payment/page/dispose')
const finance = () => import('@/views/project-manager/payment/page/finance')

const applyDetail = () => import('@/views/project-manager/payment/page/apply/detail')
const disposeDetail = () => import('@/views/project-manager/payment/page/dispose/detail')
const financeDetail = () => import('@/views/project-manager/payment/page/finance/detail')

export default {
    apply,
    dispose,
    finance,
    [`apply${CONST_DEFAULT_CONFIG.sep}detail`]: applyDetail,
    [`dispose${CONST_DEFAULT_CONFIG.sep}detail`]: disposeDetail,
    [`finance${CONST_DEFAULT_CONFIG.sep}detail`]: financeDetail,
}
