---
navigation: false
---
# Git 常用命令


## 基础的
```sh
git add ${files}
git checkout ${branchName}
git checkout -b ${newBranch}  # 从当前分支创建一个分支并签出
```

## 查看类

```sh
git status # 查看状态
git log ${branch} # 查看分支提交历史
git show ${commitHash} # 查看指定 commit 的具体改动
```

## 关于更改缓冲区

可能你在 A 分支改了一堆代码，但属于未完成状态，此时临时要切到 B 分支去做其他工作，可以将代码暂存

```sh
git stash  # 暂存 unstaged 更改 
git stash pop # 吐出最近一次的暂存更改 
git stash drop # 丢掉 stash
git stash list  # 查看暂存栈
```

当然，也可以选择全部丢弃
```sh
git restore .  # 清除 unstaged 文件
```



## 关于转移改动
```sh
git merge ${branch}  # 把 branch 合并到当前所在分支来
git cherry-pick ${commitHash} # 把 commitHash 提交 pick 到当前分支上
```

## 关于最近一次 commit

如果提交了但没推到远程，想撤回来，可以用软重置，改动会吐出来
```sh
git reset --soft HEAD~1
git reset --soft HEAD~n # 可以一次性软重置多个 commit
```

如果提交了但没推到远程，想改一下 commit message，可以用 amend
```sh
git commit --amend
```

## 和远程同步
```sh
git fetch --all
git pull # 相当于 fetch + merge
git pull --rebase
git commit -m ${message}
git push
```

## 硬重置

强行重置本地的分支
```sh
git reset --hard HEAD~n
git reset --hard origin/master
```

:::danger 强行重置远端的 (危险警告)
```sh
git reset --hard xxx
git push -f
```
:::


## tag 相关
```sh
git tag v1.0.0    # 在当前头打 tag
git push --tags   # 推送 tag
```

## alias

:::info
分享下我的常用 alias
:::

```sh
alias ggr="git log --oneline --decorate --graph --all"
alias gco="git checkout"
alias glog="git log"
alias gst="git status"

alias gs="git stash"
alias gsp="git stash pop"

alias gdropall="git restore ." # discard all changes in unstaged

alias gb="git branch"  # 查看当前 branch

alias gcp="git cherry-pick"

alias gfa="git fetch --all"
```