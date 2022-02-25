<template>
  <div class="app-container" v-loading="loading">
    <el-row>
      <el-card class="box-card">
        <div style="margin-bottom: 50px">
          <el-col :span="12" class="text-center">
            <div class="summary_title">Settlement Amount</div>
            <div class="summary_content">${{ detail.settlement_amt }}</div>
          </el-col>
          <el-col :span="12" class="text-center">
            <div class="summary_title">Settlement Commission</div>
            <div class="summary_content">
              ${{ detail.settlement_commission }}
            </div>
          </el-col>
        </div>
      </el-card>
    </el-row>
    <br />
    <el-descriptions
      class="margin-top"
      :column="2"
      border
      title="Settlement Detail"
    >
      <el-descriptions-item>
        <template slot="label"
          ><i class="el-icon-tickets"></i> Settlement Statement ID
        </template>
        {{ detail.settlement_id }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i> Billing Period
        </template>
        {{ detail.settlement_start_time | parseTime("{y}-{m}-{d}") }} --
        {{ detail.settlement_end_time | parseTime("{y}-{m}-{d}") }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i> Statement Date
        </template>
        {{ detail.settlement_date }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Settlement Status
        </template>
        <el-tag>{{ detail.settlement_status }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Club Name
        </template>
        {{ detail.merchant_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Settlement Bank
        </template>
        {{ detail.bank_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Swift Code
        </template>
        {{ detail.swift_code }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Branch Number
        </template>
        {{ detail.branch_number }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Branch Full Address
        </template>
        {{ detail.branch_full_address }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Account Holder Name
        </template>
        {{ detail.account_holder_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Account Holder Full Address
        </template>
        {{ detail.account_holder_address }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Bank Account Number
        </template>
        {{ detail.bank_account_number }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Bank Routing Number
        </template>
        {{ detail.routing_number }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Transaction Amount
        </template>
        ${{ detail.transaction_amt }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Refund Amount
        </template>
        ${{ detail.refund_amt }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Clearing Fee
        </template>
        ${{ detail.clearing_fee }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Platform Service Fee
        </template>
        ${{ detail.service_fee }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Current Balance
        </template>
        ${{ detail.current_balance }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Settlement Commission
        </template>
        ${{ detail.settlement_commission }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Settlement Amount
        </template>
        ${{ detail.settlement_amt }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Clearing Fee
        </template>
        ${{ detail.clearing_fee }}
      </el-descriptions-item>
    </el-descriptions>
    <br />
  </div>
</template>

<script>
import { fetchDetail } from "@/api/ott-transaction-settlement";
import { parseTime } from "@/utils";
export default {
  data() {
    return {
      loading: true,

      detail: {},
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      let params = this.$route.params;
      this.loading = true;
      fetchDetail({ settlement_id: params.id }).then((response) => {
        if (response.data) {
          this.loading = false;
          this.detail = response.data.detail;
        }
      });
    },
  },
};
</script>
<style>
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