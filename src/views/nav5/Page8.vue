<template>
	<div>
		page8..
<!--		<iframe :src="src" id="mobsf" scrolling="yes"
				frameborder="0" style="position:absolute;top:80px;left: 180px;"/>-->
	</div>
</template>

<script>
    import vm from '../../event';
    export default {
        data () {
            return {
                src:"https://www.baidu.com"
            }
        },
        mounted(){
			vm.$on('updateChannelInfo', (data) => {
				alert(data)
			    console.log(data);
			});
            /**
             * iframe-宽高自适应显示
             */
            function changeMobsfIframe(){
                const mobsf = document.getElementById('mobsf');
                const deviceWidth = document.body.clientWidth;
                const deviceHeight = document.body.clientHeight;
                mobsf.style.width = (Number(deviceWidth)-120) + 'px'; //数字是页面布局宽度差值
                mobsf.style.height = (Number(deviceHeight)-80) + 'px'; //数字是页面布局高度差
            }

            changeMobsfIframe()

            window.onresize = function(){
                changeMobsfIframe()
            }
        },
    }
</script>