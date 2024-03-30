export default function (context) {
    // 获取用户代理
    const userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    // const redirectedLanguage = context.app.$cookies.get('i18n_redirected');
    const redirectedLanguage = context.app.i18n.loadedLanguages[0]
    if (isMobile && !context.route.path.includes('mobile')) {
        context.redirect(`${(redirectedLanguage === 'en' || !redirectedLanguage) ? '' : '/'+ redirectedLanguage }/mobile`);
    }
    if (!isMobile && context.route.path.includes('mobile')) {
        console.log(1212)
        context.redirect(`${(redirectedLanguage === 'en' || !redirectedLanguage) ? '/' : '/'+ redirectedLanguage }`);
    }

}
