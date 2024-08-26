---
navigation: false
time: 2023-10-08
---
# Git

## 📚 基础知识

### 概念

- 分支只是指向 snapshot 节点的指针
- snapshot 节点组成一幅有向无环图
- HEAD 指针指向当前工作区状态对应的 snapshot 节点

### 三个区域

工作区(Working Directory)

暂存区(Staging Area)

### 文件的三种状态

#### Modified
自上一次提交后，git 知道的文件，产生了修改后，就会进入这个状态（如果是 git 不知道的文件，即使它产生了修改，也不会进入 Modified 状态，例如新的文件或者 `.gitignore` 所包含的文件。

#### Staged

使用 git add 添加过的文件（或文件里的部分改动），就会进入 Staged 状态。

#### 查看文件状态

使用 `git status` 可以查看当前仓库的状态，会显示修改了哪些文件、暂存了哪些文件

```
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   components/blog/TocNav.vue
        modified:   content/blogs/git.md
        modified:   content/blogs/importtype-import.md
        modified:   nuxt.config.ts

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        components/content/ProseH4.vue
        content/blogs/package-json.md
        content/blogs/react-native-pitfalls.md
        content/blogs/use-githook-to-improve-publish-process.md
        content/zh/blogs/

no changes added to commit (use "git add" and/or "git commit -a")
```

如果使用 `git status -s` 就会以更短的模式展示
- M 表示处于 Modified 状态的文件
- A 表示该文件所有改动已经进入暂存区
- AM 表示该文件有部分改动进入了暂存区，有部分改动未进入暂存区
- `??` 表示属于 git 未知的文件（也就是未被 git 追踪）

```shell
 M components/blog/TocNav.vue
 M content/blogs/git.md
 M content/blogs/importtype-import.md
 A nuxt.config.ts
AM components/content/ProseH4.vue
?? content/blogs/package-json.md
?? content/blogs/react-native-pitfalls.md
?? content/blogs/use-githook-to-improve-publish-process.md
?? content/zh/blogs/
```

## 📄 命令

### 基础的
```sh
git add ${files}
git checkout ${branchName}
git checkout -b ${newBranch}  # 从当前分支创建一个分支并签出
```

### 查看类

```sh
git status # 查看状态
git status -s # 以文件列表方式查看状态
git log ${branch} # 查看分支提交历史
git show ${commitHash} # 查看指定 commit 的具体改动


git diff --name-only # 列出当前处于 Modified 状态的所有文件名
git diff --staged --name-only # 列出当前处于缓冲区的所有文件的文件名，通常用于提交前格式化等作用
git diff --staged --name-only | xargs prettier --write # 将缓存区中所有文件用 prettier 格式化
```

### 关于更改缓冲区

可能你在 A 分支改了一堆代码，但属于未完成状态，此时临时要切到 B 分支去做其他工作，可以将代码暂存

```sh
git stash  # 暂存 unstaged 更改 
git stash apply
git stash pop # 吐出最近一次的暂存更改 
git stash drop # 丢掉 stash
git stash list  # 查看暂存栈
```

当然，也可以选择全部丢弃
```sh
git restore ${filename}  # 清除 unstaged 文件
git restore --staged ${filename} # 从暂存区清除指定文件
```



### 关于转移改动
```sh
git merge ${branch}  # 把 branch 合并到当前所在分支来
git cherry-pick ${commitHash} # 把 commitHash 提交 pick 到当前分支上
```

### 关于最近一次 commit

如果提交了但没推到远程，想撤回来，可以用软重置，改动会吐出来
```sh
git reset --soft HEAD~1
git reset --soft HEAD~n # 可以一次性软重置多个 commit
```

如果提交了但没推到远程，想改一下 commit message，可以用 amend
```sh
git commit --amend
```

### 和远程同步
```sh
git fetch --all
git pull # 相当于 fetch + merge
git pull --rebase
git commit -m ${message}
git push
```

### 硬重置

强行重置本地的分支
```sh
git reset --hard HEAD~n
git reset --hard origin/master
```

强行重置远端的 (危险警告)
```sh
git reset --hard xxx
git push -f
```


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
alias gplr="git pull --rebase"
```