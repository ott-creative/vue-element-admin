<template>
  <div class="app-container" v-loading="loading">
    <el-descriptions
      class="margin-top"
      :column="3"
      border
      title="Member Basic Information"
    >
      <el-descriptions-item>
        <template slot="label"
          ><i class="el-icon-tickets"></i> Membership Name
        </template>
        {{ detail.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> <i class="el-icon-tickets"></i> DID </template>
        <el-tag>{{ detail.did }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Card #
        </template>
        {{ detail.account }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i> Balance
        </template>
        ${{ detail.balance }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Points
        </template>
        ${{ detail.points }}
      </el-descriptions-item>
    </el-descriptions>
    <br />
    <div v-if="kyc_unlocked">
      <el-descriptions
        class="margin-top"
        :column="3"
        border
        title="KYC Information"
      >
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i> Identity #
          </template>
          {{ detail.kyc_identity_no }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i> Address
          </template>
          {{ detail.kyc_address }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i> Mobile
          </template>
          {{ detail.kyc_mobile }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div v-else>
      <el-button type="danger" @click="handleUnlockKyc">Unlock KYC</el-button>
    </div>

    <el-dialog title="Unlock KYC" :visible.sync="dialogKycUnlockVisible">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="200px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="Please enter KYC key" prop="kyc_key">
          <el-input v-model="temp.kyc_key" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogKycUnlockVisible = false"> Cancel </el-button>
        <el-button type="primary" @click="unlockKyc"> Confirm </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchDetail } from "@/api/ott-membership";
import { parseTime } from "@/utils";
export default {
  data() {
    return {
      loading: true,
      kyc_unlocked: false,
      dialogKycUnlockVisible: false,
      detail: {},
      temp: {},
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
    handleUnlockKyc() {
      this.dialogKycUnlockVisible = true;
    },
    unlockKyc() {
      if (this.temp.kyc_key == "kyckey") {
        this.dialogKycUnlockVisible = false;
        this.kyc_unlocked = true;
      }
    },
  },
};
</script>