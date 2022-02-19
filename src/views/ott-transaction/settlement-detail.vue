<template>
  <div class="app-container" v-loading="loading">
    <el-row>
      <el-card class="box-card">
        <div style="margin-bottom: 50px">
          <el-col :span="12" class="text-center">
            <div class="summary_title">Settlement Amount</div>
            <div class="summary_content">$1234</div>
          </el-col>
          <el-col :span="12" class="text-center">
            <div class="summary_title">Settlement Commission</div>
            <div class="summary_content">$2345</div>
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
        {{ detail.id }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i> Billing Period
        </template>
        {{ detail.starting_date | parseTime("{y}-{m}-{d}") }} --
        {{ detail.ending_date | parseTime("{y}-{m}-{d}") }}
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
        <el-tag>{{ detail.order_status }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Club Name
        </template>
        {{ detail.club_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Settlement Bank
        </template>
        {{ detail.club_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Swift Code
        </template>
        {{ detail.club_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Branch Number
        </template>
        {{ detail.club_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Branch Full Address
        </template>
        {{ detail.club_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Account Holder Name
        </template>
        {{ detail.club_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Account Holder Full Address
        </template>
        {{ detail.club_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Bank Account Number
        </template>
        {{ detail.club_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Bank Routing Number
        </template>
        {{ detail.club_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Transaction Amount
        </template>
        ${{ detail.settlement_amount }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Refund Amount
        </template>
        $0
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Clearing Fee
        </template>
        $0
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Platform Service Fee
        </template>
        $0
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Current Balance
        </template>
        ${{ detail.account_balance }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Settlement Commission
        </template>
        $0
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Settlement Amount
        </template>
        $0
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Clearing Fee
        </template>
        $0
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
      fetchDetail({ id: params.id }).then((response) => {
        if (response.data) {
          this.loading = false;
          this.detail = response.data;
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