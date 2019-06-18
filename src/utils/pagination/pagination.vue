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
        name: "pagination",
        props :{
            pageSize: {
                type: Number,
                required: true
            },
            total: {
                type: Number,
                required: true
            },
            currentPage: {
                type: Number,
                required: true
            }
        },
        methods :{
            handleCurrentChange(val) {
                this.currentPage = val;
                this.$emit('pagechanged')
                //this.queryStatistics();
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