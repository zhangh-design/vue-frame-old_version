/**
 * 项目浏览 模块中的访问路由
 */
const projectQuery = () => import('@/views/project-manager/browser/page/project')
const contractQuery = () => import('@/views/project-manager/browser/page/contract')
const tenderQuery = () => import('@/views/project-manager/browser/page/tender')

export default {
    projectQuery,
    contractQuery,
    tenderQuery
}
