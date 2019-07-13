# scf-crawler

实践腾讯云 scf 的爬虫+提醒工具

### 技术栈

nodejs + typescript + 腾讯云 scf

### How to run

- 安装好 nodejs，[安装指引](http://nodejs.cn/download/)

* 安装好 typescript，[安装指引](https://www.tslang.cn/#download-links)

- 安装好 scf cli, [安装指引](https://cloud.tencent.com/document/product/583/33449)，然后根据上述文档进行 scf 的入门以及 cli 的配置即可，这里不详细展开

* `git clone git@github.com:Juliiii/scf-crawler.git`

- `npm i`

* 参考 src 的 config_extra_demo.ts 文件编写 config_extra.ts 文件，因为该程序涉及的 redis db 的 host 和 port，邮件的授权码均为私人信息，不便放在 github，需要运行此程序的同学，需要自行配置 redis 和邮件服务

- 开发: `npm run dev`

* 发布: `npm run build`
