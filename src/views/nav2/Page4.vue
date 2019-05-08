<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="固定管理" name="first">
        固定管理 wx-zfb-yhk
        //todo python调用接口 查询实时,短信收到实时通知？？
        <br>//todo
      </el-tab-pane>

      <el-tab-pane label="统计" name="second">
          <!--工具条-->
          <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
              <span class="demonstration">开始日期</span>
              <el-date-picker
                      v-model="filters.startDate"
                      align="right"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions">
              </el-date-picker>

              <span class="demonstration">结束日期</span>
              <el-date-picker
                      v-model="filters.endDate"
                      align="right"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions">
              </el-date-picker>

              <el-form-item>
                <el-button type="primary" v-on:click="get">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addFormVisible=true">添加当前月数据</el-button>
              </el-form-item>
            </el-form>
          </el-col>


        <!--列表页面-->
        <!--列表-->
        <el-table :data="statistics" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column type="index" width="60">
          </el-table-column>
          <el-table-column prop="date" label="日期" width="120" sortable>
          </el-table-column>
          <el-table-column prop="zfb" label="zfb" width="100" sortable>
          </el-table-column>
          <el-table-column prop="wx" label="wx" width="100" sortable>
          </el-table-column>
          <el-table-column prop="yhk" label="yhk" width="120" sortable>
          </el-table-column>
          <el-table-column prop="total" label="总和" min-width="180" sortable>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template scope="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
          <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
          <el-pagination layout="prev, pager, next"
                         @current-change="handleCurrentChange" :page-size="20" :total="total"
                         style="float:right;">
          </el-pagination>
        </el-col>
      </el-tab-pane>

      <el-tab-pane label="角色管理" name="third">
        角色管理
      </el-tab-pane>


      <!--新增界面-->
      <el-dialog title="新增状态" v-model="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item label="日期" prop="date">
            <el-date-picker v-model="addForm.date"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"/>
          </el-form-item>

          <el-form-item label="zfb" prop="zfb">
            <el-input-number :min="0" v-model="addForm.zfb"/>
          </el-form-item>

          <el-form-item label="wx" prop="wx">
            <el-input-number  :min="0"  type="text" v-model="addForm.wx" />
          </el-form-item>

          <el-form-item label="yhk" prop="yhk">
            <el-input-number  :min="0" type="text" v-model="addForm.yhk"/>
          </el-form-item>

          <el-form-item label="total">
            <el-input style="width: 120px" type="text" v-model="totalPrice" readonly="readonly"/>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>

      </el-dialog>
    </el-tabs>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import { addStatistics,updStatistics,delStatistics,queryStatisticsList} from '../../api/api';

  export default {
      data() {
          return {
              statistics:[],//后台返回数据
              total:0,
              addForm: {
                  wx: 0,
                  zfb: 0,
                  yhk: 0,
                  date: null,
                  total:''
              },
              sels: [],//列表选中列
              addLoading: false,
              addFormRules: {
                 date: [
                     //TODO 时间参数校验失败
                     // { required: true, message: '请输入日期', trigger: 'blur' }
                  ]
              },
              addFormVisible:false,
              startDate:'',
              endDate:'',
              filters: {
                  startDate: '',
                  endDate: ''
              },
              activeName: 'second'
          };
      },

    computed: {
            totalPrice:function () {
                var m=this.addForm
                return m.wx+m.zfb+m.yhk
            },
            // 使用对象展开运算符将 getters 混入 computed 对象中
            ...mapGetters([
                'getCount'
                // ...
            ]),
    },
      mounted() {
          this.queryStatistics();
      },
    methods: {
        selsChange: function (sels) {
            this.sels = sels;
        },
        handleCurrentChange(val) {
            this.page = val;
            this.queryStatistics();
        },
    ...mapActions([
      'increment', // 映射 this.increment() 为 this.$store.dispatch('increment')
      'decrement'
    ]),
      //...mapActions({
      //  add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
      //})
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleEdit(){

        },
        handleDel(){

        },
        addSubmit(){
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {})
                        .then(() => {
                            this.addLoading = true;
                            this.$refs['addForm'].resetFields();
                            this.addLoading =false;
                            //post请求 TODO

                            this.$message({
                                type: 'success',
                                message: '添加成功!'
                            })
                            this.addFormVisible = false;
                            //this.getUsers();
                    });
                }

            });

        },
        queryStatistics(){
            //发送请求获取数据
            let para = {
                page: this.page,
                startDate: this.filters.startDate,
                endDate: this.filters.endDate
            };
            this.listLoading = true;
            //NProgress.start();
            queryStatisticsList(para).then((res) => {
                this.total = res.data.total;
                this.statistics = res.data.assestStatistics;
                this.listLoading = false;
                //NProgress.done();
            });
        }
    }
  }

</script>