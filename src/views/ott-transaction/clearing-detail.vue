<template>
  <div class="app-container" v-loading="loading">
    <el-descriptions
      class="margin-top"
      :column="3"
      border
      title="Transaction Details"
    >
      <el-descriptions-item>
        <template slot="label"
          ><i class="el-icon-tickets"></i> Transaction Amount
        </template>
        ${{ detail.transaction_amount }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Transaction Type
        </template>
        <el-tag>{{ detail.transaction_type }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Clearing Fee for Club
        </template>
        ${{ detail.clearing_amount }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Clearing Fee for Merchant
        </template>
        ${{ detail.merchant_clearing_fee }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Platform Service Fee
        </template>
        ${{ detail.platform_service_fee }}
      </el-descriptions-item>
    </el-descriptions>
    <br />
    <el-descriptions
      class="margin-top"
      :column="3"
      border
      title="Clearing Fee for Club"
    >
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i> Clearing Starting Time
        </template>
        {{ detail.clearing_start_time | parseTime("{y}-{m}-{d} {h}:{i}") }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i> Clearing End Time
        </template>
        {{ detail.clearing_end_time | parseTime("{y}-{m}-{d} {h}:{i}") }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Clearing Receiver ID
        </template>
        {{ detail.clearing_club_receiver_id }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Clearing Receiver Name
        </template>
        {{ detail.clearing_club_receiver_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Clearing Fee
        </template>
        ${{ detail.receivable_amount }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Clearing Result
        </template>
        <el-tag>{{ detail.clearing_status }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <br />
    <el-descriptions
      class="margin-top"
      :column="3"
      border
      title="Clearing Fee for Merchant"
    >
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i> Clearing Starting Time
        </template>
        {{ detail.clearing_start_time | parseTime("{y}-{m}-{d} {h}:{i}") }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i> Clearing End Time
        </template>
        {{ detail.clearing_end_time | parseTime("{y}-{m}-{d} {h}:{i}") }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Clearing Receiver ID
        </template>
        {{ detail.clearing_merchant_receiver_id }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Clearing Receiver Name
        </template>
        {{ detail.clearing_merchant_receiver_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Clearing Fee
        </template>
        ${{ detail.merchant_clearing_fee }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Clearing Result
        </template>
        <el-tag>{{ detail.clearing_status }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <br />
    <el-descriptions
      class="margin-top"
      :column="3"
      border
      title="Clearing Fee for Platform"
    >
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i> Clearing Starting Time
        </template>
        {{ detail.clearing_start_time | parseTime("{y}-{m}-{d} {h}:{i}") }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i> Clearing End Time
        </template>
        {{ detail.clearing_end_time | parseTime("{y}-{m}-{d} {h}:{i}") }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Clearing Receiver ID
        </template>
        {{ detail.clearing_platform_receiver_id }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Clearing Receiver Name
        </template>
        {{ detail.clearing_platform_receiver_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Clearing Fee
        </template>
        ${{ detail.platform_service_fee }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Clearing Result
        </template>
        <el-tag>{{ detail.clearing_status }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <br />
  </div>
</template>

<script>
import { fetchDetail } from "@/api/ott-transaction-clearing";
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