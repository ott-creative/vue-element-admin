<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card v-loading="summaryLoading" class="box-card">
        <div style="margin-bottom: 50px">
          <el-col :span="4" class="text-center">
            <div class="summary_title">Total Transaction Amount</div>
            <div class="summary_content">
              ${{ clearing_summary.total_trans_amt }}
            </div>
          </el-col>
          <el-col :span="1" class="text-center">
            <div class="summary_title">&nbsp;</div>
            <div class="summary_content">-</div>
          </el-col>
          <el-col :span="4" class="text-center">
            <div class="summary_title">Total Refund Amount</div>
            <div class="summary_content">
              ${{ clearing_summary.total_refund_amt }}
            </div>
          </el-col>
          <el-col :span="1" class="text-center">
            <div class="summary_title">&nbsp;</div>
            <div class="summary_content">-</div>
          </el-col>
          <el-col :span="4" class="text-center"
            ><div class="summary_title">Total Clearing Fee</div>
            <div class="summary_content">
              ${{ clearing_summary.total_clear_fee }}
            </div></el-col
          >
          <el-col :span="1" class="text-center">
            <div class="summary_title">&nbsp;</div>
            <div class="summary_content">-</div>
          </el-col>
          <el-col :span="4" class="text-center"
            ><div class="summary_title">Total Platform Service Fee</div>
            <div class="summary_content">
              ${{ clearing_summary.total_service_fee }}
            </div></el-col
          >
          <el-col :span="1" class="text-center">
            <div class="summary_title">&nbsp;</div>
            <div class="summary_content">=</div>
          </el-col>
          <el-col :span="4" class="text-center"
            ><div class="summary_title">Total Receivable Amount</div>
            <div class="summary_content">
              ${{ clearing_summary.total_rece_amt }}
            </div></el-col
          >
        </div>
      </el-card>
    </el-row>

    <el-row v-loading="listLoading" :gutter="20" style="margin-top: 50px">
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
          label="Order Sn"
          prop="order_id"
          sortable="custom"
          align="center"
          :class-name="getSortClass('order_id')"
        >
          <template slot-scope="{ row }">
            <span>{{ row.order_sn }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Transaction Amount" align="center">
          <template slot-scope="{ row }">
            <span>${{ row.transaction_amt }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Refund Amount" align="center">
          <template slot-scope="{ row }">
            <span>${{ row.refund_amt }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Transaction Type" align="center">
          <template slot-scope="{ row }">
            {{ row.transaction_type }}
          </template>
        </el-table-column>
        <el-table-column label="Clearing Amount" align="center">
          <template slot-scope="{ row }">
            <span>${{ row.clearing_amt }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Merchant Name" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.sub_merchant_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Platform Service Fee" align="center">
          <template slot-scope="{ row }">
            <span>${{ row.service_fee }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Receivable Amount" align="center">
          <template slot-scope="{ row }">
            <span>${{ row.rece_amt }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Clearing Status" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.clearing_status }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Transaction Time" align="center">
          <template slot-scope="{ row }">
            {{ row.pay_time }}
          </template>
        </el-table-column>
        <el-table-column
          label="Actions"
          align="center"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="handleDetail(row)">
              Detail
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getClearingList"
      />
    </el-row>
  </div>
</template>

<script>
import { fetchSummary, fetchList } from "@/api/ott-transaction-clearing";
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination";

export default {
  name: "OttTransactionClearing",
  components: { Pagination },
  directives: {},
  data() {
    return {
      tableKey: 0,
      summaryLoading: true,
      listLoading: true,
      clearing_summary: {
        transaction_amount: 0,
        refund_amount: 0,
        clearing_amount: 0,
        platform_service_amount: 0,
      },
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        merchant_id: 8880001,
      },
    };
  },

  created() {
    // this.getClearingSummary();
    this.getClearingList();
  },
  methods: {
    // getClearingSummary() {
    //   this.summaryLoading = true;
    //   fetchSummary().then((response) => {
    //     this.summaryLoading = false;
    //     this.clearing_summary = response.data;
    //   });
    // },

    getClearingList() {
      this.listLoading = true;
      this.summaryLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false
        this.summaryLoading = false
        this.list = response.data.data_list
        this.clearing_summary = response.data.account
        this.total = response.total
      })

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
    handleDetail(row) {
      this.$router.push(`/ott/transaction/clearing/detail/${row.order_sn}`);
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
  font-size: small;
}

.summary_content {
  font-weight: bold;
  font-size: large;
}
</style>
