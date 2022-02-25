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
        ${{ detail.receivable_amount }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Clearing Fee for Merchant
        </template>
        ${{ detail.clearing_amt }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Platform Service Fee
        </template>
        ${{ detail.service_fee }}
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
        {{ detail.for_phoenix_club.clearing_time }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Clearing Receiver ID
        </template>
        {{ detail.for_phoenix_club.clearing_reciever_id }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Clearing Receiver Name
        </template>
        {{ detail.for_phoenix_club.clearing_reciever_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Clearing Fee
        </template>
        ${{ detail.for_phoenix_club.clearing_fee }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Clearing Result
        </template>
        <el-tag>{{ detail.for_phoenix_club.clearing_result }}</el-tag>
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
        {{ detail.for_other_par.clearing_time }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Clearing Receiver ID
        </template>
        {{ detail.for_other_par.clearing_reciever_id }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Clearing Receiver Name
        </template>
        {{ detail.for_other_par.clearing_reciever_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Clearing Fee
        </template>
        ${{ detail.for_other_par.clearing_fee }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Clearing Result
        </template>
        <el-tag>{{ detail.for_other_par.clearing_result }}</el-tag>
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
        {{ detail.for_platform.clearing_time }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Clearing Receiver ID
        </template>
        {{ detail.for_platform.clearing_reciever_id }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Clearing Receiver Name
        </template>
        {{ detail.for_platform.clearing_reciever_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Clearing Fee
        </template>
        ${{ detail.for_platform.clearing_fee }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Clearing Result
        </template>
        <el-tag>{{ detail.for_platform.clearing_result }}</el-tag>
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

      detail: {
        for_platform: {},
        for_other_par: {},
        for_phoenix_club: {},
      },
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      let params = this.$route.params;
      this.loading = true;
      fetchDetail({ order_sn: params.id }).then((response) => {
        if (response.data) {
          this.loading = false;
          this.detail = response.data;
          console.log("detail:", this.detail);
        }
      });
    },
  },
};
</script>