@echo off
set commit_msg=%1
if "%commit_msg%"=="" set commit_msg=update

hugo --gc --minify
git add .
git commit -m "%commit_msg%"
git push origin main
scp -r -i C:\Users\Xingh\.ssh\hk_id_rsa public/* root@38.22.90.139:/opt/1panel/apps/openresty/openresty/www/sites/plus.wxauto.org/index