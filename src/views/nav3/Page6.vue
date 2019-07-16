<template>
	<div class="custom-tree-container">
	
		<div class="block">
			<el-tree
					:data="data5"
					accordion
					node-key="id"
					:expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
			<el-popover
					placement="right"
					width="400"
					trigger="click">
			  <el-table :data="gridData" width="100%">
				<el-table-column property="date" label="名称"></el-table-column>
				<el-table-column property="name" label="地址"></el-table-column>
			  </el-table>
			  <i slot="reference" class="el-icon-setting"/>
			</el-popover>
        </span>
      </span>
			</el-tree>
		</div>
	</div>
</template>


<script>
    let id = 1000;

    export default {
        data() {

            const data = [{
                id: 1,
                label: '变电站 1',
                children: [{
                    id: 4,
                    label: '间隔 1-1',
                    children: [{
                        id: 9,
                        label: '设备 1-1-1'
                    }, {
                        id: 10,
                        label: '设备 1-1-2'
                    }]
                }]
            }, {
                id: 2,
                label: '变电站 2',
                children: [{
                    id: 5,
                    label: '设备 2-1'
                }, {
                    id: 6,
                    label: '设备 2-2'
                }]
            }, {
                id: 3,
                label: '变电站 3',
                children: [{
                    id: 7,
                    label: '电压等级 220kv',
                    children: [{
                        id: 4,
                        label: '间隔 1-1',
                        children: [{
                            id: 9,
                            label: '设备 1-1-1'
                        }, {
                            id: 10,
                            label: '设备 1-1-2'
                        }]
                    }]
                }, {
                    id: 8,
                    label: '电压等级 40kv',
                    children: [{
                        id: 4,
                        label: '间隔 1-1',
                        children: [{
                            id: 9,
                            label: '设备 1-1-1'
                        }, {
                            id: 10,
                            label: '设备 1-1-2'
                        }]
                    }]
                }]
            }];
            return {
                data4: JSON.parse(JSON.stringify(data)),
                data5: JSON.parse(JSON.stringify(data))
            }
        },

        methods: {

        }
    };
</script>

<style>
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
</style>