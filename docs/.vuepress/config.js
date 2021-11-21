module.exports = {
    title: "奇点工作室",
    description:
        "一个人走得快，一群人走得远，希望我们可以在柳湖旁一起建造一片GEEK之林！",
    dest: "public",
    head: [
        [
            "link",
            {
                rel: "icon",
                href: "/favicon.ico",
            },
        ],
        [
            "meta",
            {
                name: "viewport",
                content: "width=device-width,initial-scale=1,user-scalable=no",
            },
        ],
    ],
    theme: "reco",
    themeConfig: {
        nav: [
            {
                text: "Home",
                link: "/",
                icon: "reco-home",
            },
            {
                text: "TimeLine",
                link: "/timeLine/",
                icon: "reco-date",
            },
            {
                text: "RSS",
                link: "https://singularitylab.netlify.app/rss.xml",
                icon: "reco-rss",
            },
            {
                text: "About",
                link: "/about/",
                icon: "reco-faq",
            },
            {
                text: "Contact",
                icon: "reco-message",
                items: [
                    {
                        text: "经济信息工程学院",
                        link: "https://it.swufe.edu.cn",
                        icon: "reco-blog",
                    },
                    {
                        text: "GitHub",
                        link: "https://github.com/singularity-lab/blog",
                        icon: "reco-github",
                    },
                ],
            },
        ],
        type: "blog",
        blogConfig: {
            category: {
                location: 2,
                text: "Category",
            },
            tag: {
                location: 3,
                text: "Tag",
            },
        },
        logo: "/logo.png",
        search: true,
        searchMaxSuggestions: 10,
        sidebar: "auto",
        lastUpdated: "Last Updated",
        authorAvatar: "/logo.png",
        author: "SWUFE 奇点工作室",
        bgImage: "/banner.jpg",
        heroImage: "/banner.jpg",
        heroText: null,
        startYear: "2018",
        noFoundPageByTencent: false,
        valineConfig: {
            appId: "ltr1E9k9586OCn0HHCN3xQIb-gzGzoHsz", //
            appKey: "1mwU6uPWFb01IUmeI7fIKHTM", // your appKey
            meta: ["nick"],
        },
    },
    markdown: {
        lineNumbers: true,
    },
    plugins: [
        [
            "vuepress-plugin-mathjax",
            {
                target: "svg",
                macros: {
                    "*": "\\times",
                },
            },
        ],
        [
            "@vuepress-reco/vuepress-plugin-rss",
            {
                site_url: "https://singularitylab.netlify.app",
                copyright: "${$themeConfig.author}",
            },
        ],
    ],
};
