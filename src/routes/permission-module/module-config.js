/**
 * 模块配置菜单 模块中的访问路由
 */
const moduleManager = () => import("@/views/apidocument/column")
const moduleSetting = () => import("@/views/apidocument/table")

export default {
    moduleManager,
    moduleSetting
}


