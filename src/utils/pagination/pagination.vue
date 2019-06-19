<!--分页组件，可复用-->
<template>
    <el-pagination
            :current-page.sync="currentPage"
            :page-size="pageSize"
            :page-sizes="[2, 5, 10, 50, 200]"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            style="float:right;"
    />
</template>

<script>
    export default {
        props: ['total'],
        data () {
            return {
                currentPage:1,
                pageSize:10
            };
        },
        methods :{
            handleCurrentChange(val) {
                this.currentPage = val;
                // this.queryStatistics();
            },
            handleSizeChange(val){
                this.pageSize = val;
                //this.queryStatistics();
            }
        }
    }
</script>

<style scoped>

</style>