/**
 * 人资管理菜单 模块中的访问路由
 */
import { CONST_DEFAULT_CONFIG } from '@/config'

const person = () => import('@/views/hr-manager/person/page/person')
const authority = () => import('@/views/hr-manager/person/page/authority')
const personDetail = () => import('@/views/hr-manager/person/page/person/detail/edit-detail')
export default {
    person,
    authority,
    [`person${CONST_DEFAULT_CONFIG.sep}detail`]: personDetail,
}