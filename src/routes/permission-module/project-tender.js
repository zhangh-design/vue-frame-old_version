/**
 * 项目投标菜单 模块中的访问路由
 */
import { CONST_DEFAULT_CONFIG } from '@/config'

const apply = () => import('@/views/project-manager/tender/page/apply')
const superior = () => import('@/views/project-manager/tender/page/superior')
const finance = () => import('@/views/project-manager/tender/page/finance')
const dispose = () => import('@/views/project-manager/tender/page/dispose')
const search = () => import('@/views/project-manager/tender/page/search')

const applyDetail = () => import('@/views/project-manager/tender/page/apply/detail')
const superiorDetail = () => import('@/views/project-manager/tender/page/superior/detail')
const financeDetail = () => import('@/views/project-manager/tender/page/finance/detail')
const disposeDetail = () => import('@/views/project-manager/tender/page/dispose/detail')

export default {
    apply,
    superior,
    finance,
    dispose,
    search,
    [`apply${CONST_DEFAULT_CONFIG.sep}detail`]: applyDetail,
    [`superior${CONST_DEFAULT_CONFIG.sep}detail`]: superiorDetail,
    [`finance${CONST_DEFAULT_CONFIG.sep}detail`]: financeDetail,
    [`dispose${CONST_DEFAULT_CONFIG.sep}detail`]: disposeDetail,
}