/**
 * 项目报工
 */
import { CONST_DEFAULT_CONFIG } from '@/config'

const apply = () => import('@/views/project-manager/workload/page/apply')
const superior = () => import('@/views/project-manager/workload/page/superior')
const confirm = () => import('@/views/project-manager/workload/page/confirm')

const applyDetail = () => import('@/views/project-manager/workload/page/apply/detail')
const superiorDetail = () => import('@/views/project-manager/workload/page/superior/detail')
const confirmDetail = () => import('@/views/project-manager/workload/page/confirm/detail')

export default {
    apply,
    superior,
    confirm,
    [`apply${CONST_DEFAULT_CONFIG.sep}detail`]: applyDetail,
    [`superior${CONST_DEFAULT_CONFIG.sep}detail`]: superiorDetail,
    [`confirm${CONST_DEFAULT_CONFIG.sep}detail`]: confirmDetail,
}