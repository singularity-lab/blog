# SWUFE 奇点工作室学习博客交换站

为切实提高工作室成员的学习积极性、涉猎宽度及思考的深度，从本学期开始，奇点工作室倡议每位成员 **每周至少完成一篇** 博客的写作及分享。涉及计算机基础理论、数学学习、数据分析、网站开发、网页设计、金融科技等等方面的学习经历和收获，也有相互之间的交流与讨论。当然，我们非常欢迎工作室之外的朋友们对我们的思考和学习笔记提出指正意见，也希望更多志同道合的朋友可以参与到我们这一次的尝试与努力中来，我们愿意相信，**一个人走得快，一群人走得远**，希望我们可以在柳湖旁一起建造一片 GEEK 之林！

博客地址：[SWUFE 奇点工作室学习博客交换站](https://singularitylab.netlify.app/)

## 内容及形式

每一篇博客可以是分享自己的项目，也可以是某个知识点的总结回顾，也可以是学习笔记，也可以是一周之内遇到的细碎问题合集或是重构笔记等等。

或许这是一个可供参考的例子：[Javascript Fetch API to send data](https://medium.com/@whole9681/8c2b1dedaba)

**感谢我院优秀学姐学长对奇点工作室的大力支持！**

## 格式规范

1. 每篇博文中都有一个 `header` 部分，其中包含：名字或昵称、类别（设计部，开发部，数据分析部）、日期、标签（如：Django，网络协议，机器学习算法，数据分析实践，Python 等等）

    ```markdown
    ---
    layout: post
    title: JavaScript 异步
    date: 2019-05-05
    author: Hivol
    categories: 
    	- 开发部
    tags:
    	- 前端 
    	- JavaScript
    ---
    ```

2. 文章命名： `{日期yyyy-mm-dd}-{文章标题}` ，如： `2019-03-04-在Console中添加字符画`，文章放在`docs/views/[部门data/design/dev]`目录下

3. 图片等静态资源请放置于： `docs/views/imgs/[年月]/[周数]/[名字/昵称]` ，如： `imgs/1903/04/Hivol/`

    ```bash
    imgs
    └── 1903
       ├── 03
       │   ├── Hivol
       │   ├── YanYijun
       │   ├── iyiniyin
       │   ├── lxy
       │   └── th
       └── 04
           ├── Hivol
            ├── Mialia
           ├── iyin
           ├── lxy
           ├── shuangmulin
           ├── thang
           └── walkerwy
    ```

4. Markdown 文件中引用图片时，请使用相对路径。一般为如： `../imgs/1903/04/Hivol/hello.png`

5. Markdown 文件中也请注意可读性与美观性，建议在标题前后、段落前后和图片前后均空一行，建议使用 [Prettier](https://prettier.io/)

    ```bash
    yarn add prettier --dev --exact

    yarn prettier --write docs/views/dev/2019-05-05-图表征学习算法_node2vec.md
    ```

6. 使用 UTF-8 编码

7. Pull Request 三要素：Theme, Summary and Details。Pull Request Summary 的格式为： `{年月周}-{文章标题}-{姓名/昵称}` ，如：190304-Django 项目上线部署全流程-LKX

8. **文末请注明参考文章及链接**

## 怎样上传新文章？

Step 1. Fork 本项目得到 `nickname/singularity-lab-blog` （此处的“nickname”即是各位自己的用户名）

Step 2. Clone 你的仓库到你自己的电脑

Step 3. 在本地仓库中编写你的文章，写完后 commit（ ⚠️ 注意：文章在 `docs/views/[dev/data/design]` 文件夹下，图片在 `imgs` 文件夹下）

Step 5. 获取本项目最新内容，与本项目进行同步：

-   确认本地仓库中已设置好 upstream 为本项目地址（ `git remote -v` 查看），正常情况下与下图一致（"Hivol"应该是自己 GitHub 的用户名），如果没有请使用 `git remote add upstream https://github.com/singularity-lab/blog.git` 添加。

![readme-img1](docs/views/imgs/git_remote.png)

-   使用 `git status` 检查本地是否有未提交的修改，如果有，请先 commit 你的提交，并 push 到 上文提到的 `nickname/singularity-lab-blog`

-   执行命令 `git fetch upstream` 获取本项目的最新更新内容

-   执行命令 `git checkout master` 切换到 master 分支（或你的默认分支下，如 gh-pages）

-   执行命令 `git merge upstream/master` ，把本项目的最新内容合并到你的本地仓库的 master 分支（或你的默认分支下，如 gh-pages）中

-   执行命令 `git push` 把合并后的内容 push 到你的远程仓库 `nickname/Blog-Share`

Step 5. Push all commits to `nickname/singularitylab-blog`

Step 6. 提交一个 pull request，等待 review

Step 7. 关注自己的邮箱，若有收到修改要求请及时修改

Step 8. 合并完成

## 本地运行调试

**npm**

```bash
# install
npm install

# run
npm run dev

# build
npm run build
```

（由于安装 vue-router 时会产生 bug，暂时未使用 yarn，详见 [vuepress/issues/2656](https://github.com/vuejs/vuepress/issues/2656)）

## 转载须知

1. 转载请联系（Email: Singularitylab@163.com）
2. 转载请注明奇点工作室和个人署名
