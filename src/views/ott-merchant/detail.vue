<template>
  <div class="app-container" v-loading="loading">
    <el-descriptions
      class="margin-top"
      :column="3"
      border
      title="Merchant Information"
    >
      <el-descriptions-item>
        <template slot="label"
          ><i class="el-icon-tickets"></i> Merchant Name
        </template>
        {{ detail.merchant_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Salesman Name
        </template>
        {{ detail.salesman }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Merchant Type
        </template>
        <el-tag>{{ detail.merchant_type }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Legal Person DID
        </template>
        {{ detail.legal_person_did }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          Address
        </template>
        {{ detail.address }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Business License Type
        </template>
        <el-tag>{{ detail.business_license_type }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Business License #
        </template>
        {{ detail.business_license }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Business License Name
        </template>
        {{ detail.business_license_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i> Business License Exp. Date
        </template>
        {{ detail.business_license_exp_date }}
      </el-descriptions-item>
    </el-descriptions>
    <br />
    <el-descriptions
      class="margin-top"
      :column="3"
      border
      title="Bank Information"
    >
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Bank Name
        </template>
        {{ detail.bank_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Branch Number
        </template>
        {{ detail.branch_number }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i> Branch Full Address
        </template>
        {{ detail.branch_full_address }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Bank Account Number
        </template>
        {{ detail.bank_account_number }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Routing Number
        </template>
        {{ detail.routing_number }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Swift Code
        </template>
        {{ detail.swift_code }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Account Holder Name
        </template>
        {{ detail.account_holder_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i> Account Holder Address
        </template>
        {{ detail.account_holder_address }}
      </el-descriptions-item>
    </el-descriptions>
    <br />
  </div>
</template>

<script>
import { fetchDetail } from "@/api/ott-merchant-merchant";
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
      fetchDetail({ merchant_id: params.id }).then((response) => {
        if (response.data) {
          this.loading = false;
          this.detail = response.data;
        }
      });
    },
  },
};
</script>