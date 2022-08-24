<template>
  <el-container>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.pageNo"
      :page-sizes="pagination.pageSizeArray"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
    />
  </el-container>
</template>

<script>
export default {
  methods: {
    // #region 分页函数
    refreshCurrentPage() {
      this.getPagedRegistApplication(
        this.pagination.pageSize,
        this.pagination.pageNo
      );
    },
    /**
     * 获取分页数据
     * @param {int} pageSize 页面大小
     * @param {int} pageNo 页面数
     */
    getPagedRegistApplication(pageSize, pageNo) {
      getPagedRegistApplication(pageSize, pageNo).then((jsonResult) => {
        console.log(jsonResult.data);
        this.pagination.total = jsonResult.data.total;
        this.tableData = jsonResult.data.pageData;

        this.tableData.forEach((value) => {
          let map = {
            "-1": "待审批",
            0: "不通过",
            1: "通过",
          };
          value.permission = map[value.permission];
        });
      });
    },

    /**
     * 更改页面大小时绑定到data:pageSize，并拉去更新后的页面
     * @param {int} pageSize 更新后的页面大小
     */
    handleSizeChange(pageSize) {
      this.pagination.pageSize = pageSize;
      this.getPagedRegistApplication(
        this.pagination.pageSize,
        this.pagination.pageNo
      );
    },

    /**
     * 更改页面大小时绑定到data:pageNo，并拉去更新后的页面
     * @param {int} pageNo 更新后的页面数
     */
    handleCurrentChange(pageNo) {
      this.pagination.pageNo = pageNo;
      this.getPagedRegistApplication(
        this.pagination.pageSize,
        this.pagination.pageNo
      );
    },

    // #endregion
  },

  /**
   * 页面加载自动刷新（初始页面：1，初始页面大小：10）
   */
  created() {
    this.getPagedRegistApplication(
      this.pagination.pageSize,
      this.pagination.pageNo
    );
  },
  data() {
    return {
      pagination: {
        /**
         * 总数
         */
        total: 0,
        /**
         * 当前页数
         */
        pageNo: 1,
        /**
         * 当前页面大小
         */
        pageSize: 10,
        /**
         * 页面可选的大小数组
         */
        pageSizeArray: [10, 20, 30, 40],
      },
    };
  },
};
</script>
