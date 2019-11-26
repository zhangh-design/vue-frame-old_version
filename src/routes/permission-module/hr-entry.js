/**
 * 人员入职菜单 模块中的访问路由
 */
import { CONST_DEFAULT_CONFIG } from '@/config'

const apply = () => import('@/views/hr-manager/entry/page/apply')
const superior = () => import('@/views/hr-manager/entry/page/superior')

const applyDetail = () => import('@/views/hr-manager/entry/page/apply/detail')
const superiorDetail = () => import('@/views/hr-manager/entry/page/superior/detail')

export default {
    apply,
    superior,
    [`apply${CONST_DEFAULT_CONFIG.sep}detail`]: applyDetail,
    [`superior${CONST_DEFAULT_CONFIG.sep}detail`]: superiorDetail,
}