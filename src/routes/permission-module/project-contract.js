/**
 * 合同会签菜单 模块中的访问路由
 */
import { CONST_DEFAULT_CONFIG } from '@/config'

const apply = () => import('@/views/project-manager/contract/page/apply')
const superior = () => import('@/views/project-manager/contract/page/superior')
const finance = () => import('@/views/project-manager/contract/page/finance')
const law = () => import('@/views/project-manager/contract/page/law')
const charge = () => import('@/views/project-manager/contract/page/charge')
const manager = () => import('@/views/project-manager/contract/page/manager')
const dispose = () => import('@/views/project-manager/contract/page/dispose')
const archive = () => import('@/views/project-manager/contract/page/archive')

const applyDetail = () => import('@/views/project-manager/contract/page/apply/detail')
const superiorDetail = () => import('@/views/project-manager/contract/page/superior/detail')
const financeDetail = () => import('@/views/project-manager/contract/page/finance/detail')
const lawDetail = () => import('@/views/project-manager/contract/page/law/detail')
const chargeDetail = () => import('@/views/project-manager/contract/page/charge/detail')
const managerDetail = () => import('@/views/project-manager/contract/page/manager/detail')
const disposeDetail = () => import('@/views/project-manager/contract/page/dispose/detail')
const archiveDetail = () => import('@/views/project-manager/contract/page/archive/detail')

export default {
    apply,
    superior,
    finance,
    law,
    charge,
    manager,
    dispose,
    archive,
    [`apply${CONST_DEFAULT_CONFIG.sep}detail`]: applyDetail,
    [`superior${CONST_DEFAULT_CONFIG.sep}detail`]: superiorDetail,
    [`finance${CONST_DEFAULT_CONFIG.sep}detail`]: financeDetail,
    [`law${CONST_DEFAULT_CONFIG.sep}detail`]: lawDetail,
    [`charge${CONST_DEFAULT_CONFIG.sep}detail`]: chargeDetail,
    [`manager${CONST_DEFAULT_CONFIG.sep}detail`]: managerDetail,
    [`dispose${CONST_DEFAULT_CONFIG.sep}detail`]: disposeDetail,
    [`archive${CONST_DEFAULT_CONFIG.sep}detail`]: archiveDetail,
}