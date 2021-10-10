## 远程重写
[rewrite_remote]


# Redirect
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rewrite/QuantumultX/Redirect/Redirect.conf, tag=重定向, update-interval=86400, enabled=true
# TestFlight 解锁区域限制
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/external/QuantumultX/TestFlight/TestFlight.conf, tag=TestFlight 解锁区域限制, update-interval=86400, enabled=true
# AllInOne
#https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rewrite/QuantumultX/AllInOne/AllInOne.conf, tag=AllInOne, update-interval=86400, enabled=false
# AdvertisingLite
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rewrite/QuantumultX/AdvertisingLite/AdvertisingLite.conf, tag=去广告精简版, update-interval=86400, opt-parser=false, enabled=true

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/zhihu_lite.qxrewrite, tag=知乎助手_去广告, update-interval=86400, opt-parser=false, enabled=false
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/zhihu/zhihu_plus.qxrewrite, tag=知乎助手_去广告及体验增强, update-interval=86400, opt-parser=false, enabled=true

https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/startup/startup.qxrewrite, tag=开屏去广告, enabled=true

https://raw.githubusercontent.com/app2smile/rules/master/module/spotify.conf, tag=Spotify(iOS15), update-interval=86400, opt-parser=false, enabled=true

https://raw.githubusercontent.com/gee1k/script/master/QuantumultX/rewrite/Price_Lite.conf, tag=京东淘宝历史价格-Lite, update-interval=86400, opt-parser=false, enabled=true
https://raw.githubusercontent.com/gee1k/script/master/QuantumultX/rewrite/Price.conf, tag=京东淘宝历史价格, update-interval=86400, opt-parser=false, enabled=false

[filter_local]

# 知乎去广告，以下规则请放置在filter_local最顶部
IP-CIDR,118.89.204.198/32,REJECT
IP6-CIDR,2402:4e00:1200:ed00:0:9089:6dac:96b6/128,REJECT
HOST,118.89.204.198,REJECT
# 知乎去广告，以下规则的位置越前方越好
HOST,mqtt.zhihu.com,reject
HOST,sugar.zhihu.com,reject
HOST,appcloud2.in.zhihu.com,REJECT
USER-AGENT,AVOS*,REJECT

[task_local]
;GeoIP查询 - ip.sb
;event-interaction https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/Scripts/geo_location.js, tag=GeoIP 查询, img-url=location.fill.viewfinder.system
;YouTube/Netflix 解锁查询
;event-interaction https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/Scripts/nf_ytb_ui-check.js, tag=YouTube/Netflix 解锁查询, img-url=checkmark.seal.system, enabled=true
;YouTube Premium 查询
;event-interaction https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/Scripts/ytb-ui-check.js, tag=YouTube 解锁查询, img-url=text.magnifyingglass.system, enabled=true
