<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.merchant_name"
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
        disabled
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
        icon="el-icon-download"
        disabled="disabled"
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
        prop="merchant_id"
        sortable="custom"
        align="center"
        width="80"
        :class-name="getSortClass('merchant_id')"
      >
        <template slot-scope="{ row }">
          <span>{{ row.sub_merchant_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Merchant Name" align="center">
        <template slot-scope="{ row }">
          {{ row.sub_merchant_name }}
        </template>
      </el-table-column>
      <el-table-column label="Merchant Type" align="center">
        <template slot-scope="{ row }">
          {{ row.sub_merchant_type }}
        </template>
      </el-table-column>
      <el-table-column label="Clearing Rule" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.clearing_rule }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Clearing Value" align="center">
        <template slot-scope="{ row }">
          <span>{{ row | filterClearingValue }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Minimum Settlement Amount" align="center">
        <template slot-scope="{ row }">
          <span>${{ row.min_set_amount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Settlement Period" align="center">
        <template slot-scope="{ row }">
          {{ row.set_period }}
        </template>
      </el-table-column>
      <el-table-column
        label="Actions"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">
            Delete
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="250px"
        style="width: 450px; margin-left: 50px"
      >
        <div class="form-info-first">Merchant Clearing Setting</div>
        <el-divider direction="horizontal" content-position="center" />
        <el-form-item label="Merchant Name">
          <el-select
            :disabled="dialogStatus == 'create' ? false : true"
            v-model="temp.merchant_info"
            class="filter-item"
            :placeholder="
              dialogStatus == 'create'
                ? 'Please select'
                : temp.merchant_info.merchant_name
            "
            value-key="merchant_id"
          >
            <el-option
              v-for="item in merchantList"
              :key="item.merchant_id"
              :label="item.merchant_name"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Clearing Rule" prop="clearing_rule">
          <el-select
            v-model="temp.clearing_rule"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in clearingRules"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Clearing Setting Value" prop="clearing_value">
          <el-input v-model="temp.clearing_value" />
        </el-form-item>

        <div class="form-info">Settlement Setting</div>
        <el-divider direction="horizontal" content-position="center" />
        <el-form-item label="Minimum Settlement Amount">
          <el-select
            v-model="temp.minimum_settlement_amount"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in settlementAmountList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Settlement Period">
          <el-select
            v-model="temp.settlement_period"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in settlementPeriod"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
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
import { fetchList as fetchMerchantList } from "@/api/ott-merchant-merchant";
import {
  fetchList,
  createMerchantSetting,
  updateMerchantSetting,
  deleteMerchantSetting,
} from "@/api/ott-merchant-setting";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

const MAIN_MERCHANT_ID = "8880001";

export default {
  name: "OttMerchantSettingList",
  components: { Pagination },
  directives: { waves },
  filters: {
    filterClearingValue(row) {
      return row.clearing_rule == "Fixed Amount"
        ? `\$${row.clearing_fee}`
        : `${row.clearing_percentage * 100}%`;
    },
  },
  data() {
    return {
      tableKey: 0,
      merchantTypeList: [
        "Individual",
        "Corporate",
        "Construction Owner",
        "Private Sector",
      ],
      merchantList: null,
      clearingRules: ["Fixed Amount", "Fixed Percentage"],
      settlementAmountList: [100, 200, 500, 1000],
      settlementPeriod: [1, 3, 5],
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        merchant_id: "8880001",
        merchant_type: undefined,
        sort: "8880001",
      },
      sortOptions: [
        { label: "8880001", key: "+id" },
        { label: "8880002", key: "-id" },
      ],
      statusOptions: ["No", "Yes"],
      temp: {
        main_merchant_id: MAIN_MERCHANT_ID,
        merchant_info: {},
        clearing_rule: "Fixed Amount",
        clearing_value: 10,
        minimum_settlement_amount: 100,
        settlement_period: 0,
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create",
      },
      rules: {},
      downloadLoading: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;

      Promise.all([fetchList(this.listQuery), fetchMerchantList()]).then(
        (results) => {
          this.listLoading = false;
          this.list = results[0].data;
          this.total = results[0].data.length;

          // filter out merchant which already in list
          let settingKeyMap = {};
          for (var i = 0; i < this.list.length; i++) {
            settingKeyMap[this.list[i].sub_merchant_id] = 1;
          }
          console.log(
            "settingKeyMap",
            settingKeyMap,
            results[1].data,
            results[0].data
          );
          this.merchantList = results[1].data.filter(
            (item) =>
              item.merchant_id != MAIN_MERCHANT_ID &&
              settingKeyMap[item.merchant_id] != 1
          );
        }
      );
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
      if (prop === "merchant_id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+merchant_id";
      } else {
        this.listQuery.sort = "-merchant_id";
      }
      this.handleFilter();
    },
    resetTemp() {
      this.temp = {
        main_merchant_id: MAIN_MERCHANT_ID,
        merchant_info: {},
        clearing_rule: "Fixed Amount",
        clearing_value: 10,
        minimum_settlement_amount: 100,
        settlement_period: 1,
      };
    },
    handleView(row) {},
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
          console.log("create merchant setting:", this.temp);
          createMerchantSetting(this.temp).then(() => {
            this.getList();
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
      //this.temp = Object.assign({}, row); // copy Object
      // convert row data into temp
      this.temp = {
        main_merchant_id: MAIN_MERCHANT_ID,
        merchant_info: {
          merchant_id: row.sub_merchant_id,
          merchant_name: row.sub_merchant_name,
          merchant_type: row.sub_merchant_type,
        },
        clearing_rule: row.clearing_rule,
        clearing_value:
          row.clearing_rule == "Fixed Amount"
            ? row.clearing_fee
            : row.clearing_percentage,
        minimum_settlement_amount: row.min_set_amount,
        settlement_period: row.set_period.substring(2),
      };
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
          console.log("update temp:", tempData);
          updateMerchantSetting(tempData).then(() => {
            this.getList();
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
    handleDelete(row) {
      // Pop up confirm
      this.$confirm("Sure to delete this setting?", "Confirm", {
        distinguishCancelAndClose: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
      })
        .then(() => {
          console.log("confirm delete");
          deleteMerchantSetting({
            main_merchant_id: MAIN_MERCHANT_ID,
            sub_merchant_id: row.sub_merchant_id,
          }).then(() => {
            this.getList();
            this.$notify({
              title: "Success",
              message: "Delete Successfully",
              type: "success",
              duration: 2000,
            });
          });
        })
        .catch((action) => {
          console.log("action:", action);
          // do nothing
        });
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
</style>
