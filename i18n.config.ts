export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    messages: {
        en: {
            hello: 'Hello',
            me: 'Me',
            blogs: 'Blogs',
            search: 'Search',
            rorycai: 'Rory Cai',
            iam: 'I am',
            fullstack: 'fullstack',
            developer: 'developer',
            technical_stacks: 'technical stacks',
            currently: 'currently',
            graduated_from: 'graduated from',
            hit: 'Harbin Institute of Technology',
            a: 'a',
            a_fullstack_developer: '@:a @:fullstack @:developer',
            search_any_contents: 'Search any contents',
        },
        zh: {
            hello: '你好',
            me: '关于我',
            blogs: '文章',
            search: '搜索',
            rorycai: 'Rory Cai',
            iam: '我是',
            fullstack: '全栈',
            developer: '开发工程师',
            technical_stacks: '技术栈',
            graduated_from: '毕业于',
            hit: '哈尔滨工业大学',
            a: '一名',
            a_fullstack_developer: '@:a@:fullstack@:developer',
            search_any_contents: '搜索文章内容',
        }
    }
}))