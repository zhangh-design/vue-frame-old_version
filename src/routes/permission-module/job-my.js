/**
 * 我的任务 -my待我处理 begin我发起的 pass我处理过
 */
const my = () => import('@/views/job/my')
const begin = () => import('@/views/job/begin')
const pass = () => import('@/views/job/pass')

export default {
    my,
    begin,
    pass,
}