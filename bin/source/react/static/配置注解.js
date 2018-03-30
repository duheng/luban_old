module.exports = {
    // host
    host: "0.0.0.0",

    // 服务端口
    port: "3001",

    // 当前项目根目录，默认src
    base: "src",

    // 编译后的产出目录
    build: "dist",

    // 静态资源地址
    static: {
        start: "",
        test: "",
        release: "//static.luban.com/"
    },

    api: {
        start: "",
        test: "",
        release: "//api.luban.com/"
    },

    // 第三方库在这里配置
    vendor: ["react", "react-dom"],

    // source map
    devtool: "source-map",

    // 是否开启 CSS Modules
    css_modules: false,

    // 模版信息
    template: {
        title: "",
        keywords: "",
        description: "",
        viewport: "",
        favicon: "",
        path: "template.html"
    },

    // 页面所在文件夹
    pages: "pages",

    // base64图片限制，默认10k，小于10k的图片用base64内嵌进页面，
    base64_image_limit: 10240 // 10k
}
