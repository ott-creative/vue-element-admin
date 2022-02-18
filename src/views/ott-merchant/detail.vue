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
        {{ detail.name }}
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
          <i class="el-icon-tickets"></i> Email
        </template>
        {{ detail.email }}
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
        {{ detail.business_license_no }}
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
        {{ detail.business_license_expired }}
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
        {{ detail.account_bank_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Branch Number
        </template>
        {{ detail.account_branch_no }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i> Branch Full Address
        </template>
        {{ detail.account_branch_address }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Bank Account Number
        </template>
        {{ detail.account_bank_no }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Routing Number
        </template>
        {{ detail.account_routing_no }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Swift Code
        </template>
        {{ detail.account_swift_code }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Account Holder Name
        </template>
        {{ detail.account_bank_holder_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i> Account Holder Address
        </template>
        {{ detail.account_bank_holder_address }}
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

      detail: {
        name: "",
        salesman: "",
        merchant_type: "",
        legal_person_did: "",
        address: "",
        email: "",
        business_license_type: "",
        business_license_no: "",
        business_license_name: "",
        business_license_expired: "",

        // Account
        account_bank_name: "",
        account_branch_no: "",
        account_branch_address: "",
        account_bank_no: "",
        account_routing_no: "",
        account_swift_code: "",
        account_bank_holder_name: "",
        account_bank_holder_address: "",

        // platform service setting:
        platform_service_fee_percentage: "2%",
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