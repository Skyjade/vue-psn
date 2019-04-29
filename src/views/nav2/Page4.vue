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
                      v-model="startDate"
                      align="right"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions">
              </el-date-picker>

              <span class="demonstration">结束日期</span>
              <el-date-picker
                      v-model="endDate"
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

  export default {
      data() {
          return {
              addForm: {
                  wx: 0,
                  zfb: 0,
                  yhk: 0,
                  date: null,
                  total:''
              },
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
                  name: ''
              },
              activeName: 'second'
          };
      },

      created(){

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
        now:function () {
            return Date.now()
        }

    },
    methods: {
         
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

        }

    }
  }

</script>