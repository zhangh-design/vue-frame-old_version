/**
 * 公共全局过滤器
 */
import dateformat from 'dateformat-util'
 
export default {
	install: (Vue, options={})=>{
		//时间戳转到年月日
		Vue.filter('dateFormatyMd', function (value) {
			if (!value) return ''
			return dateformat.format(new Date(value), 'yyyy-MM-dd')
		})
	}
}