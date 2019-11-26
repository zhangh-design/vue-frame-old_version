/**
 * 项目开票菜单 模块中的访问路由
 */
import { CONST_DEFAULT_CONFIG } from '@/config'

const apply = () => import('@/views/project-manager/invoice/page/apply')
const superior = () => import('@/views/project-manager/invoice/page/superior')
const finance = () => import('@/views/project-manager/invoice/page/finance')
const confirm = () => import('@/views/project-manager/invoice/page/confirm')

const applyDetail = () => import('@/views/project-manager/invoice/page/apply/detail')
const superiorDetail = () => import('@/views/project-manager/invoice/page/superior/detail/check-detail')
const financeDetail = () => import('@/views/project-manager/invoice/page/finance/detail/edit-detail')
const confirmDetail = () => import('@/views/project-manager/invoice/page/confirm/detail/check-detail')

export default {
    apply,
    superior,
    finance,
    confirm,
    [`apply${CONST_DEFAULT_CONFIG.sep}detail`]: applyDetail,
    [`superior${CONST_DEFAULT_CONFIG.sep}detail`]: superiorDetail,
    [`finance${CONST_DEFAULT_CONFIG.sep}detail`]: financeDetail,
    [`confirm${CONST_DEFAULT_CONFIG.sep}detail`]: confirmDetail,
}
