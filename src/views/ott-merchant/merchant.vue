<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="Name"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.merchant_type"
        placeholder="Merchant Type"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in merchantTypeList"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-select
        v-model="listQuery.sort"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in sortOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        Search
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        Add
      </el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        disabled="disabled"
        icon="el-icon-download"
        @click="handleDownload"
      >
        Export
      </el-button>
    </div>

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
        label="Merchant ID"
        prop="id"
        sortable="custom"
        align="center"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Merchant Name" align="center">
        <template slot-scope="{ row }">
          {{ row.name }}
        </template>
      </el-table-column>
      <el-table-column label="Merchant Type" align="center">
        <template slot-scope="{ row }">
          <el-tag>
            {{ row.merchant_type }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="Business License Name"
        align="center"
        width="180px"
      >
        <template slot-scope="{ row }">
          <span>{{ row.business_license_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Business License #" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.business_license_no }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column label="Legal Person DID" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.legal_person_did }}</span>
        </template>
      </el-table-column>-->
      <el-table-column label="Merchant Status" align="center">
        <template slot-scope="{ row }">
          <el-tag :type="row.status | statusFilter">
            <span>{{ row.status }}</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="QR" align="center">
        <template slot-scope="{ row }">
          <div class="qr-wrapper" v-on:click="handleQrClick(row)">
            <QrCode :width="30" :height="30" :content="row.qr_pay" />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Actions"
        align="center"
        width="250px"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="handleView(row)">
            Detail
          </el-button>

          <el-button type="warning" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog
      :visible.sync="qrDialogVisible"
      title="Merchant Payment QrCode"
      :model="currentQrData"
      width="300px"
      :key="new Date().getTime()"
    >
      <div class="el-dialog-div">
        <QrCode :width="250" :height="250" :content="currentQrData" />
      </div>
    </el-dialog>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="200px"
        style="width: 450px; margin-left: 50px"
      >
        <div class="form-info-first">Merchant Basic Information</div>
        <el-divider direction="horizontal" content-position="center" />
        <el-form-item label="Merchant Name" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="Salesman">
          <el-select
            v-model="temp.salesman"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in salesmanList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Merchant Type" prop="merchant_type">
          <el-select
            v-model="temp.merchant_type"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in merchantTypeList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Legal Person DID" prop="legal_person_did">
          <el-input v-model="temp.legal_person_did" />
        </el-form-item>
        <el-form-item label="Address" prop="address">
          <el-input v-model="temp.address" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="temp.email" />
        </el-form-item>
        <el-form-item
          label="Business License Type"
          prop="business_license_type"
        >
          <el-select
            v-model="temp.business_license_type"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in businessLicenseTypeList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Business License #" prop="business_license_no">
          <el-input v-model="temp.business_license_no" />
        </el-form-item>
        <el-form-item
          label="Business License Name"
          prop="business_license_name"
        >
          <el-input v-model="temp.business_license_name" />
        </el-form-item>
        <el-form-item
          label="Business License Exp. Date"
          prop="business_license_expired"
        >
          <el-date-picker
            v-model="temp.business_license_expired"
            type="datetime"
            placeholder="Please pick a date"
          />
        </el-form-item>

        <div class="form-info">Merchant Bank Account Setting</div>
        <el-divider direction="horizontal" content-position="center" />
        <el-form-item label="Bank Name">
          <el-select
            v-model="temp.account_bank_name"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in bankNameList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Branch Number" prop="account_branch_no">
          <el-input v-model="temp.account_branch_no" />
        </el-form-item>
        <el-form-item label="Branch Full Address" prop="account_branch_address">
          <el-input v-model="temp.account_branch_address" />
        </el-form-item>
        <el-form-item label="Bank Account Number" prop="account_bank_no">
          <el-input v-model="temp.account_bank_no" />
        </el-form-item>
        <el-form-item label="Routing Number" prop="account_routing_no">
          <el-input v-model="temp.account_routing_no" />
        </el-form-item>
        <el-form-item label="Swift Code" prop="account_swift_code">
          <el-input v-model="temp.account_swift_code" />
        </el-form-item>
        <el-form-item
          label="Account Holder Name"
          prop="account_bank_holder_name"
        >
          <el-input v-model="temp.account_bank_holder_name" />
        </el-form-item>
        <el-form-item
          label="Account Holder Address"
          prop="account_bank_holder_address"
        >
          <el-input v-model="temp.account_bank_holder_address" />
        </el-form-item>

        <div class="form-info">Service Fee Setting</div>
        <el-divider direction="horizontal" content-position="center" />
        <el-form-item
          label="Platform Service Fee"
          prop="platform_service_fee_percentage"
        >
          <el-input readonly placeholder="2%" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> Cancel </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  createMerchant,
  updateMerchant,
} from "@/api/ott-merchant-merchant";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import QrCode from "@/components/QrCode";

const demoCreateForms = [
  {
    name: "Starbucks",
    salesman: "Ellen",
    status: "Valid",
    merchant_type: "Corporation",
    legal_person_did: "did:key:C5f7eb1a59Df87b22066f6e012f1d4569eA9fb69",
    address: "5140 Yonge St, Toronto, ON",
    email: "customercare@starbucks.com",
    business_license_type: "Corporation",
    business_license_no: "829374829",
    business_license_name: "Starbucks Corporation",
    business_license_expired: Date.parse("01 Jan 2030 00:00:00 GMT"),

    // Account
    account_bank_name: "TD Canada Trust",
    account_branch_no: "22322",
    account_branch_address: "55 King St W, Toronto, ON M5K 1A2, Canada",
    account_bank_no: "8173829",
    account_routing_no: "000832918",
    account_swift_code: "TDOMCATTTOR",
    account_bank_holder_name: "Starbucks Corporation",
    account_bank_holder_address: "5140 Yonge St, Toronto, ON",

    // platform service setting:
    platform_service_fee_percentage: "2%",
  },
  {
    name: "OneZo Tapioca",
    status: "Valid",
    salesman: "Alex",
    merchant_type: "Corporation",
    legal_person_did: "did:key:0926eD4419750B582e2c6428e59d92bbf117915B",
    address: "297 College St, Toronto, ON M5T 1S2",
    email: "info@onezointernational.com",
    business_license_type: "Corporation",
    business_license_no: "824391847",
    business_license_name: "OneZo Tapioca Corporation",
    business_license_expired: Date.parse("01 Jan 2035 00:00:00 GMT"),

    // Account
    account_bank_name: "RBC Royal Bank",
    account_branch_no: "00002",
    account_branch_address:
      "200 Bay St. Main Floor, Toronto, ON M5J 2J5, Canada",
    account_bank_no: "2930248",
    account_routing_no: "001284829",
    account_swift_code: "TDOMCATTTOR",
    account_bank_holder_name: "ROYCCAT2",
    account_bank_holder_address: "297 College St, Toronto, ON M5T 1S2",

    // platform service setting:
    platform_service_fee_percentage: "2%",
  },
  {
    name: "Ralph Lauren Corporation",
    salesman: "Tommy",
    status: "Valid",
    merchant_type: "Corporation",
    legal_person_did: "did:key:C5f7eb1a59Df87b22066f6e012f1d4569eA9fb69",
    address: "3311 Simcoe 89 Unit G01, Cookstown, ON L0L 1L0, Canada",
    email: "CustomerAssistance@RalphLauren.com",
    business_license_type: "Corporation",
    business_license_no: "6240129347",
    business_license_name: "Ralph Lauren Corporation",
    business_license_expired: Date.parse("01 Jan 2035 00:00:00 GMT"),

    // Account
    account_bank_name: "TD Canada Trust",
    account_branch_no: "16402",
    account_branch_address: "443 Queen St W, Toronto, ON M5V 2B1, Canada",
    account_bank_no: "9873573",
    account_routing_no: "000412262",
    account_swift_code: "TDOMCATTTOR",
    account_bank_holder_name: "Ralph Lauren Corporation",
    account_bank_holder_address:
      "3311 Simcoe 89 Unit G01, Cookstown, ON L0L 1L0, Canada",

    // platform service setting:
    platform_service_fee_percentage: "2%",
  },
];

export default {
  name: "OttMerchant",
  components: { Pagination, QrCode },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        Valid: "success",
        Invalid: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined,
        merchant_type: undefined,
        sort: "+id",
      },
      sortOptions: [
        { label: "ID Ascending", key: "+id" },
        { label: "ID Descending", key: "-id" },
      ],
      statusOptions: ["No", "Yes"],
      salesmanList: ["Ellen", "Tommy", "Alex"],
      merchantTypeList: [
        "Individual",
        "Corporate",
        "Construction Owner",
        "Private Sector",
      ],
      businessLicenseTypeList: [
        "Sole Proprietorship ",
        "General Partnership",
        "Corporation",
      ],
      bankNameList: ["TD Canada Trust", "RBC Royal Bank"],
      currentQrData: "",
      temp: {
        id: undefined,
        name: "",
        status: "Valid",
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
      dialogFormVisible: false,
      qrDialogVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit Merchant",
        create: "Create New Merchant",
      },
      dialogPvVisible: false,
      rules: {
        name: [
          {
            required: true,
            message: "merchant name is required",
            trigger: "blur",
          },
        ],
      },
      downloadLoading: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.data.items;
        this.total = response.data.total;
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "Operation Success",
        type: "success",
      });
      row.status = status;
    },
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+id";
      } else {
        this.listQuery.sort = "-id";
      }
      this.handleFilter();
    },
    resetTemp() {
      let randomIdx = Math.floor(Math.random() * demoCreateForms.length);
      this.temp = demoCreateForms[randomIdx];
    },
    handleQrClick(row) {
      console.log("click on qr", row);
      this.currentQrData = `${row.qr_pay}`;
      this.qrDialogVisible = true;
    },
    handleView(row) {
      this.$router.push(`/ott/merchant/detail/${row.id}`);
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024; // mock a id
          this.temp.author = "vue-element-admin";
          createMerchant(this.temp).then(() => {
            this.list.unshift(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "Created Successfully",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          tempData.timestamp = +new Date(tempData.timestamp); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateMerchant(tempData).then(() => {
            const index = this.list.findIndex((v) => v.id === this.temp.id);
            this.list.splice(index, 1, this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "Update Successfully",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    handleDelete(row, index) {
      this.$notify({
        title: "Success",
        message: "Delete Successfully",
        type: "success",
        duration: 2000,
      });
      this.list.splice(index, 1);
    },

    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = ["timestamp", "title", "type", "importance", "status"];
        const filterVal = [
          "timestamp",
          "title",
          "type",
          "importance",
          "status",
        ];
        const data = this.formatJson(filterVal);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list",
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal) {
      return this.list.map((v) =>
        filterVal.map((j) => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    getSortClass: function (key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}` ? "ascending" : "descending";
    },
  },
};
</script>

<style scoped>
.form-info-first {
  font-size: large;
}
.form-info {
  margin-top: 40px;
  font-size: large;
}
.el-dialog-div {
  height: 300px;
  overflow: auto;
  margin: 0 auto;
  text-align: center;
}

.qr-wrapper {
  display: inline-block;
  position: relative;
}

.qr-wrapper img {
  margin: 0 auto;
}
</style>
