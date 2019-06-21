<template>
    <!--
      // v-on:isToday="clickToday"
      // :markDate=arr // arr=['2018/4/1','2018/4/3'] 标记4月1日和4月3日 简单标记
      //:markDateMore=arr // 多种不同的标记
      // 第一个标记和第二个标记不能同时使用
      // :agoDayHide='1514937600' //某个日期以前的不允许点击  时间戳10位
      // :futureDayHide='1525104000' //某个日期以后的不允许点击  时间戳10位
      // :sundayStart="true" //默认是周一开始 当是true的时候 是周日开始
    -->
    <!--日历插件-->
    <Calendar
            v-on:choseDay="clickDay"
            v-on:changeMonth="changeDate"
            style="float:left;"
    />

</template>
<script>
    import Calendar from 'vue-calendar-component';
    export default {
        data() {
            return {
                value: new Date()
            };
        },
        components: {
            Calendar
        },
        methods:{
            clickDay(data){
               //选中某天
            },
            changeDate(data) {
                //左右点击切换月份
            }
        }
    };

</script>

<style scoped>
</style>