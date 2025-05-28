hugo --gc --minify
git add .
git commit -m "update"
git push origin main
scp -r -i C:\Users\Xingh\.ssh\hk_id_rsa public/* root@38.22.90.139:/opt/1panel/apps/openresty/openresty/www/sites/plus.wxauto.org/index