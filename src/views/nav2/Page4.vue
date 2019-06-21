<template>
  <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
      <!--新增界面-->
      <el-dialog title="新增状态"  :visible.sync="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">

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
      <!--编辑界面-->

      <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
          <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
            <el-form-item label="日期" prop="createTime" >
              <el-input v-model="editForm.createTime" readonly="readonly"/>
            </el-form-item>

            <el-form-item label="zfb" prop="zfb">
              <el-input-number :min="0" v-model="editForm.zfb"/>
            </el-form-item>

            <el-form-item label="wx" prop="wx">
              <el-input-number  :min="0"  type="text" v-model="editForm.wx" />
            </el-form-item>

            <el-form-item label="yhk" prop="yhk">
              <el-input-number  :min="0" type="text" v-model="editForm.yhk"/>
            </el-form-item>

            <el-form-item label="total">
              <el-input style="width: 120px" type="text" v-model="editTotalPrice" readonly="readonly"/>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="editFormVisible = false">取消</el-button>
            <el-button type="primary" @click="editSubmit" :loading="editLoading">提交</el-button>
          </div>
        </el-dialog>

      <el-tab-pane label="VUE画面调试" name="first">
        </el-tab-pane>

      <el-tab-pane label="数据量测试" name="second">
          <!--工具条-->
          <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
              <span class="demonstration">开始日期</span>
              <el-date-picker
                      v-model="filters.startDate"
                      align="right"
                      type="date"
                      placeholder="选择日期">
              </el-date-picker>

              <span class="demonstration">结束日期</span>
              <el-date-picker
                      v-model="filters.endDate"
                      align="right"
                      type="date"
                      placeholder="选择日期">
              </el-date-picker>

              <el-form-item>
                <el-button type="primary" @click="queryStatistics">查询</el-button>
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
          <el-table-column prop="createTime" label="日期" width="120" sortable>
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
        </el-col>

        <!--分页组件-->
        <pagination ref="pagination" :total="total" @queryData="queryStatistics"/>
      </el-tab-pane>

      <el-tab-pane label="预留1" name="third">
      </el-tab-pane>


    </el-tabs>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import { addStatistics,updStatistics,delStatistics,queryStatisticsList, delStatisticsList} from '../../api/api';
  import  pagination from '../../utils/pagination/pagination'
  export default {
      data() {
          return {
              listLoading:true,
              statistics:[],//后台返回数据
              total:0,
              addForm: {
                  wx: 0,
                  zfb: 0,
                  yhk: 0,
                  createTime: null,
                  total:''
              },
              editForm:{
                  wx: 0,
                  zfb: 0,
                  yhk: 0,
                  date: null,
                  total:''
              },
              sels: [],//列表选中列
              addLoading: false,
              editLoading:false,
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
              activeName: 'second',
              editFormVisible:false,
              editFormRules:{}
          };
      },

    computed: {
            totalPrice:function () {
                var m=this.addForm
                return m.wx+m.zfb+m.yhk
            },
            editTotalPrice:function () {
                var m=this.editForm
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
      components:{
          pagination
      },
      methods: {
        selsChange: function (sels) {
            this.sels = sels;
        },
        // handleCurrentChange(val) {
        //     this.currentPage = val;
        //     this.queryStatistics();
        // },
        // handleSizeChange(val){
        //     //this.pageSize = val;
        //     this.queryStatistics();
        // },
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
        //点击编辑
        handleEdit(index, row){
            this.editFormVisible=true
            this.editForm = Object.assign({}, row);
        },
        //批量删除
        batchRemove (){
            var ids = this.sels.map(item => item.id).toString();
            this.$confirm('确认删除选中记录吗？', '提示', {
                type: 'warning'
            }).then(() => {
                this.listLoading = true;
                //NProgress.start();
                let para = { ids: ids };
                delStatisticsList(para).then((res) => {
                    this.listLoading = false;
                    //NProgress.done();
                    if(res.msgCode==200){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message: '删除失败',
                            type: 'error'
                        });
                    }
                    this.queryStatistics();
                });
            }).catch(() => {

            });
        },
        //点击删除
        handleDel(index,row){
            this.$confirm('确认删除吗?', '提示', {
                type: 'warning'
            }).then(() => {
                delStatistics(row.id).then((res)=>{
                    if(res.msgCode == 200){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        this.queryStatistics();
                    }else{
                        this.$message({
                            type: 'success',
                            message: '删除失败!'
                        })
                    }

                })

            }).catch(() => {

            });

        },
        //添加数据，点击提交
        addSubmit(){
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {})
                        .then(() => {
                            this.addLoading = true;
                            //post请求
                            addStatistics(this.addForm).then((res)=>{
                                if(res.msgCode == 200){
                                    this.addLoading=false
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    this.addLoading =false;
                                    this.$refs['addForm'].resetFields();
                                    this.addFormVisible = false;
                                    this.queryStatistics();
                                }else{
                                    this.$message({
                                        message:'新增失败',
                                        type:'error'
                                    })
                                }

                            })

                    });
                }

            });

        },

        //修改数据，点击提交
        editSubmit () {
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认修改吗？', '提示', {})
                        .then(() => {
                            this.editLoading = true;
                            //post请求
                            updStatistics(this.editForm).then((res)=>{
                                if(res.msgCode == 200){
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                    this.editLoading =false;
                                    this.$refs['editForm'].resetFields();
                                    this.editFormVisible = false;
                                    this.queryStatistics();
                                }else{
                                    this.$message({
                                        message:'修改失败',
                                        type:'error'
                                    })
                                }

                            })

                        });
                }

            });
        },
        queryStatistics(){
            //发送请求获取数据
            var para=this.$refs['pagination'].getPageParam;
            para.startDate= this.filters.startDate,
            para.endDate= this.filters.endDate,
            this.listLoading = true;
            //NProgress.start();
            queryStatisticsList(para).then((res) => {
                this.total = res.total;
                this.statistics = res.data;
                this.listLoading = false;
                //NProgress.done();
            });
        }
    }
  }

</script>