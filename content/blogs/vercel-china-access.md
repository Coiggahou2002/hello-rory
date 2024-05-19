# 如何让国内访问 Vercel 站点及其原理解析

## 背景

Vercel 是什么

Vercel 部署应用得到的 *.vercel.app 在国内无法访问

## 想达成的目的

使用国内备案域名访问在 Vercel 部署的站点

## 最简单的方法不可以

例如添加一条 CNAME 记录：mywebsite.com -> myproject.vercel.app

是无法访问的，因为 GFW 的 DNS 污染会在 *.vercel.app 的 DNS 询问回包中乱写 IP 地址

## 可行的方法

1. 添加 CNAME: mywebsite.com -> cname-china.vercel-dns.com
2. 在 Vercel 站点上给 myproject 添加域名 mywebsite.com (用于告诉Vercel，我要将 mywebsite.com CNAME 到 myproject 上)
3. 等待 DNS 刷新后，成功访问

## 方法原理解析

1. 我们访问 mywebsite.com
2. 操作系统发起 DNS 询问，得到 mywebsite.com 是 CNAME 到 cname-china.vercel-dns.com 的，一般这里的回包会顺便把 cname-china.vercel-dns.com 的 IP 地址拿到，在下一个回包送回来 [此处放一个DNS抓包图]
3. 我们抓包拿到 cname-china.vercel-dns.com 的 IP 地址是 1.2.3.4（假设）
4. 后续抓包可以看到本机向 1.2.3.4 发起了 TLSv1.2 握手，Client Hello 握手包里面写了 SNI=mywebsite.com
5. `1.2.3.4` 显然也不可能是 myproject.vercel.app 的所在地址，所以它只能是 vercel 官方的代理服务器，接收到来自我们的 TLS 握手后，看到SNI=mywebsite.com，去它自己维护的映射表里查找，找到发现 mywebsite.com -> myproject.vercel.app，然后代理服务器就可以和我们的应用建立连接，然后将内容传输过来（抓包图放一个，可以看到TLS握手完成后传输了大量Application Data，基本可以断定这些数据就是 HTTP 包）

## Ref

https://www.didispace.com/article/richang/20230917-vercel-china-dns.html