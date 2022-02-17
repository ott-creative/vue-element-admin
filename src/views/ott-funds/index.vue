<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card class="box-card" v-loading="summaryLoading">
        <div style="margin-bottom: 50px">
          <el-col :span="8" class="text-center">
            <div class="summary_title">Current Balance</div>
            <div class="summary_content">${{ fund_summary.balance }}</div>
          </el-col>
          <el-col :span="8" class="text-center">
            <div class="summary_title">Total Receipts</div>
            <div class="summary_content">${{ fund_summary.receipts }}</div>
          </el-col>
          <el-col :span="8" class="text-center"
            ><div class="summary_title">Total Disbursements</div>
            <div class="summary_content">
              ${{ fund_summary.disbursements }}
            </div></el-col
          >
        </div>
      </el-card>
    </el-row>

    <el-row :gutter="20" style="margin-top: 50px" v-loading="listLoading">
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%"
        @sort-change="sortChange"
      >
        <el-table-column
          label="Order ID"
          prop="order_id"
          sortable="custom"
          align="center"
          :class-name="getSortClass('order_id')"
        >
          <template slot-scope="{ row }">
            <span>{{ row.order_id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Business Type" align="center">
          <template slot-scope="{ row }">
            {{ row.business_type }}
          </template>
        </el-table-column>
        <el-table-column label="Amount" align="center">
          <template slot-scope="{ row }">
            <span>${{ row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Balance Snapshot" align="center">
          <template slot-scope="{ row }">
            <span>${{ row.balance }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Creation Time" align="center">
          <template slot-scope="{ row }">
            {{ row.time | parseTime("{y}-{m}-{d}") }}
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getFundList"
      />
    </el-row>
  </div>
</template>

<script>
import { fetchSummary, fetchList } from "@/api/ott-funds";
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination";

export default {
  name: "OttFunds",
  components: { Pagination },
  directives: {},
  data() {
    return {
      tableKey: 0,
      summaryLoading: true,
      listLoading: true,
      fund_summary: {
        balance: 0,
        receipts: 0,
        disbursements: 0,
      },
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
      },
    };
  },

  created() {
    this.getFundSummary();
    this.getFundList();
  },
  methods: {
    getFundSummary() {
      this.summaryLoading = true;
      fetchSummary().then((response) => {
        this.summaryLoading = false;
        this.fund_summary = response.data;
      });
    },

    getFundList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.data.items;
        this.total = response.data.total;
      });
    },

    getSortClass: function (key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}` ? "ascending" : "descending";
    },

    handleFilter() {
      this.listQuery.page = 1;
      this.getFundList();
    },

    sortChange(data) {
      const { prop, order } = data;
      if (prop === "order_id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+order_id";
      } else {
        this.listQuery.sort = "-order_id";
      }
      this.handleFilter();
    },
  },
};
</script>

<style scoped>
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
.component-item {
  min-height: 100px;
}
.summary_title {
  font-weight: bold;
  margin-bottom: 10px;
}

.summary_content {
  font-weight: bold;
  font-size: large;
}
</style>
