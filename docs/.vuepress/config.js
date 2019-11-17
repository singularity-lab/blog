module.exports = {
  "title": "SWUFE 奇点工作室学习博客交换站",
  "description": "一个人走得快，一群人走得远，希望我们可以在柳湖旁一起建造一片GEEK之林！",
  "dest": "public",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    "valineConfig": {
      appId: 'ltr1E9k9586OCn0HHCN3xQIb-gzGzoHsz',// your appId
      appKey: '1mwU6uPWFb01IUmeI7fIKHTM', // your appKey
    },
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "TimeLine",
        "link": "/timeLine/",
        "icon": "reco-date"
      },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [
          {
            "text": "经济信息工程学院",
            "link": "https://it.swufe.edu.cn",
            "icon": "reco-npm"
          },
          {
            "text": "GitHub",
            "link": "https://github.com/",
            "icon": "reco-github"
          },
        ]
      }
    ],
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "Category"
      },
      "tag": {
        "location": 3,
        "text": "Tag"
      }
    },
    "logo": "/head.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "sidebar": "auto",
    "lastUpdated": "Last Updated",
    "author": "SWUFE 奇点工作室",
    "startYear": "2018"
  },
  "markdown": {
    "lineNumbers": true
  },
}