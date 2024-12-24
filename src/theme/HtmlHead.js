import React from 'react';
import Head from '@docusaurus/Head';

function HtmlHead() {
    return (
    <Head>
        <meta name="custom-meta-tag" content="your-custom-content" />
        <meta name="description" content="This is a custom description meta tag" />
        <script>
            var _hmt = _hmt || [];
            (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?80e0024486e81e274aae9711ba175b01";
                var s = document.getElementsByTagName("script")[0]; 
                s.parentNode.insertBefore(hm, s);
            })();
        </script>
        {/* 可以添加更多的标签 */}
    </Head>
    );
}

export default HtmlHead;
