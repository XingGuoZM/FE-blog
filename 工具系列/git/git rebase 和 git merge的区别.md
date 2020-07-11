### git rebase 和 git merge的异同  

异：  
* git rebase 切断分叉，接入到当前分支中  
* git merge 将最新提交简单合并到当前分支，之前的提交仍然存在于之前的分支当中  
想到一个场景，话说正式员工（master分支）和外包员工（develop分支）共同做一个项目，项目完成时需要合并，git merge 即 简单的将外包所完成的项目进行合并，git rebase 即 将外包一起转化为正式员工

同：  
* 合并分支