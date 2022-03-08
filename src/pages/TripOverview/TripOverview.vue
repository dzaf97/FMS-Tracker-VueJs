<template>
  <div class="row">
    <div class="col-lg-3" style="margin-bottom: 20px">
      <el-date-picker
        v-model="datePicker"
        type="daterange"
        start-placeholder="Start"
        end-placeholder="End"
      >
      </el-date-picker>
    </div>
    <div class="col-lg-12">
      <div class="row">
        <div class="col-md-4 d-flex">
          <!-- <div class="premium" style="font-size: 30px">
            Available in Release 3
          </div> -->
          <card class="card-chart card-chart-pie">
            <h5 slot="header" class="card-category"></h5>

            <div class="row">
              <div class="col-10 ml-auto mr-auto">
                <div class="chart-area">
                  <pie-chart
                    :chart-data="pieChart1.chartData"
                    :extra-options="pieChart1.extraOptions"
                    v-if="pieChart1.isLoading"
                    :height="180"
                  >
                  </pie-chart>
                </div>
              </div>
            </div>
          </card>
        </div>
        <div class="col-md-4 d-flex">
          <!-- <div class="premium" style="font-size: 30px">
            Available in Release 3
          </div> -->
          <card class="card-chart card-chart-pie">
            <h5 slot="header" class="card-category"></h5>

            <div class="row">
              <div class="col-10 ml-auto mr-auto">
                <div class="chart-area">
                  <pie-chart
                    v-if="pieChart2.isLoading"
                    :chart-data="pieChart2.chartData"
                    :extra-options="pieChart2.extraOptions"
                    :height="180"
                  >
                  </pie-chart>
                </div>
              </div>
            </div>
          </card>
        </div>
        <div class="col-md-4 d-flex">
          <card class="card-chart card-chart-pie" style="padding: 20px 70px">
            <h4>Top 5 Returning Unladen</h4>
            <ol style="padding-left: 15px">
              <li :key="top.id" v-for="top in tops">{{ top }}</li>
            </ol>
          </card>
        </div>
      </div>
    </div>

    <div class="col-lg-12">
      <!-- <div class="premium" style="font-size: 30px">Available in Release 3</div> -->
      <card>
        <div
          class="
            col-lg-12
            d-flex
            justify-content-center justify-content-sm-between
            flex-wrap
          "
        >
          <div class="col-lg-4">
            <!-- <p>Customer:</p> -->
            <el-select
              class="select-primary"
              placeholder="Customer"
              v-model="setting.selectCustomer"
            >
              <el-option
                v-for="customer in setting.customers"
                class="select-primary"
                :value="customer.value"
                :label="customer.label"
                :key="customer.label"
              >
              </el-option>
            </el-select>
            <el-select
              class="select-primary"
              placeholder="Haul Type"
              v-model="setting.selectHaul"
              style="margin-top: 10px; margin-left: 20px"
            >
              <el-option
                v-for="haul in setting.haulTypes"
                class="select-primary"
                :value="haul.value"
                :label="haul.label"
                :key="haul.label"
              >
              </el-option>
            </el-select>
          </div>
          <div style="margin: 20px 20px"></div>
          <base-input>
            <el-input
              type="text"
              clearable
              prefix-icon="el-icon-search"
              placeholder="Search"
              v-model="searchQuery"
            >
            </el-input>
          </base-input>
        </div>
        <div class="col-lg-12" style="margin-top: 20px">
          <h2 slot="header" class="card-title" style="font-weight: 600">
            Trip Log
          </h2>
        </div>
        <el-table
          :header-cell-style="{
            background: 'transparent',
            border: 'transparent',
            'font-size': '14px',
            'font-weight': '400',
            'padding-bottom': '0%',
            'padding-right': '10px',
            color: 'white',
          }"
          :cell-style="{
            border: 'transparent',
            'font-size': '14px',
            'padding-right': '20px',
          }"
          :data="tableData"
          :height="350"
          :max-height="350"
        >
          <el-table-column
            min-width="110"
            sortable
            label="Date"
            property="date"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Pilot Status"
            property="pilotStatus"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Haul Type"
            property="haulType"
          ></el-table-column>
          <el-table-column
            min-width="180"
            sortable
            label="Load Status"
            property="loadStatus"
          ></el-table-column>
          <el-table-column
            min-width="210"
            sortable
            label="ETA"
            property="eta"
          ></el-table-column>
          <el-table-column
            min-width="210"
            sortable
            label="Actual Arrival"
            property="actualArrival"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            align="right"
            header-align="right"
            label="Route"
            property="route"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            align="right"
            header-align="right"
            label="Group"
            property="group"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            align="right"
            header-align="right"
            label="Destination"
            property="destination"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            align="right"
            header-align="right"
            label="Pilot's Name"
            property="pilotsName"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            align="right"
            header-align="right"
            label="Contact No"
            property="contactNo"
          ></el-table-column>
        </el-table>
      </card>
    </div>
  </div>
</template>
<script>
import { Table, TableColumn, DatePicker, Select, Option } from "element-ui";
import * as tripOverviewConfig from "./tripOverview.js";
import PieChart from "src/components/Charts/PieChart";
import moment from "moment";

export default {
  components: {
    PieChart,
    [DatePicker.name]: DatePicker,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Select.name]: Select,
    [Option.name]: Option,
  },

  data() {
    return {
      searchQuery: "",
      datePicker: "",

      setting: {
        selectCustomer: "All",
        customers: [
          {
            value: "All",
            label: "All",
          },
        ],
        selectHaul: "All",
        haulTypes: [
          {
            value: "All",
            label: "All",
          },
        ],
      },

      tops: ["Route 1", "Route 2"],

      // TABLE
      tableData: [],
      store: [],

      // CHART
      pieChart1: {
        chartData: {
          labels: ["Completed", "En Route"],
          datasets: [
            {
              label: "",
              pointRadius: 0,
              pointHoverRadius: 0,
              backgroundColor: ["#15cf79", "#9b9b9b"],
              borderWidth: 0,
              data: [60, 40],
            },
          ],
        },
        extraOptions: tripOverviewConfig.tripStatus,
        isLoading: true,
      },
      pieChart2: {
        chartData: {
          labels: ["Unladen", "Laden"],
          datasets: [
            {
              pointRadius: 0,
              pointHoverRadius: 0,
              backgroundColor: ["#9b9b9b", "#15cf79"],
              borderWidth: 0,
              data: [60, 20],
            },
          ],
        },
        extraOptions: tripOverviewConfig.ladenUnladen,
        isLoading: true,
      },
    };
  },
  methods: {
    async getCustomer() {
      let res = await this.$http.get(`:6769/api/v1/management/company`);

      if (res.error) return;

      let data = res.message;
      for (let i = 0; i < data.length; i++) {
        let customer = {
          value: data[i].CompanyID,
          label: data[i].CompanyName,
        };

        this.setting.customers.push(customer);
      }
    },
    async getTripOverview(start, end) {
      this.pieChart1.isLoading = false;
      this.pieChart2.isLoading = false;

      let endpoint = "";

      if (start != null) {
        endpoint = `:6769/api/v1/trip/overview?start=${start}&end=${end}`;
      } else {
        endpoint = `:6769/api/v1/trip/overview`;
      }

      let res = await this.$http.get(endpoint);
      if (res.error) return;

      let data = res.message;
      console.log(data);
      // TRIP STATUS PIE CHART
      let tripStatus = [];
      tripStatus.push(data.Completed);
      tripStatus.push(data.EnRoute);
      this.pieChart1.chartData.datasets[0].data = tripStatus;

      // LADEN VS UNLADEN PIE CHART
      let ladenUnladen = [];
      ladenUnladen.push(data.Unladen);
      ladenUnladen.push(data.Laden);
      this.pieChart2.chartData.datasets[0].data = ladenUnladen;

      // TOP 5 RETURNING UNLADEN
      this.tops = data.ReturningUnladen;

      this.pieChart1.isLoading = true;
      this.pieChart2.isLoading = true;
    },
    async getHaulType() {
      var res = await this.$http.get(`:6769/api/v1/setting/haul/type`);
      if (res.error) return;

      let data = res.message;

      for (let i = 0; i < data.length; i++) {
        let haulType = {
          value: data[i].HaulTypeID,
          label: data[i].HaulTypeName,
        };

        this.setting.haulTypes.push(haulType);
      }
    },
    async getTripLog(start, end, companyID) {
      let endpoint = "";

      if (companyID == "All" && start == "") {
        endpoint = `:6769/api/v1/trip/log`;
      }

      if (companyID == "All" && start != "") {
        endpoint = `:6769/api/v1/trip/log?start=${start}&end=${end}`;
      }

      if (companyID != "All" && start == "") {
        endpoint = `:6769/api/v1/trip/log?company-id=${companyID}`;
      }

      if (companyID != "All" && start != "") {
        endpoint = `:6769/api/v1/trip/log?start=${start}&end=${end}&company-id=${companyID}`;
      }

      this.tableData = [];
      this.store = [];
      let res = await this.$http.get(endpoint);
      if (res.error) return;

      let data = res.message;

      for (let i = 0; i < data.length; i++) {
        let trip = {
          id: data[i].TripID,
          date: data[i].Date,
          pilotStatus: data[i].PilotStatus,
          haulType: data[i].HaulType,
          loadStatus: data[i].LoadStatus,
          eta: data[i].ETA,
          actualArrival: data[i].ActualArrival,
          route: data[i].Route,
          group: data[i].Group,
          destination: data[i].Destination,
          pilotsName: data[i].PilotName,
          contactNo: data[i].ContactNo,
        };

        this.tableData.push(trip);
        this.store.push(trip);
      }

      if (this.setting.selectHaul != "All") {
        let haulTypeName = this.setting.haulTypes.filter(
          (item) => item.value == this.setting.selectHaul
        )[0].label;

        this.tableData = this.store.filter(
          (item) => item.haulType == haulTypeName
        );
      }
    },
  },
  mounted() {
    this.getCustomer();
    this.getHaulType();
    this.getTripOverview(null, null);
    this.getTripLog("", "", "All");
  },
  watch: {
    "setting.selectCustomer": function (value) {
      if (this.datePicker == "") {
        this.getTripLog("", "", value);
      } else {
        let start = moment(this.datePicker[0]).format("YYYY-MM-DD");
        let end = moment(this.datePicker[1]).format("YYYY-MM-DD");
        this.getTripLog(start, end, value);
      }
    },
    "setting.selectHaul": function (val) {
      if (val != "All") {
        let haulTypeName = this.setting.haulTypes.filter(
          (item) => item.value == val
        )[0].label;

        this.tableData = this.store.filter(
          (item) => item.haulType == haulTypeName
        );
      } else {
        this.tableData = this.store;
      }
    },
    datePicker: function (value) {
      let start = moment(value[0]).format("YYYY-MM-DD");
      let end = moment(value[1]).format("YYYY-MM-DD");
      this.getTripLog(start, end, this.setting.selectCustomer);
    },
  },
  beforeDestroy() {},
};
</script>
<style >
.el-table__cell.gutter {
  background-color: white;
}

#map-mini {
  width: 100%;
  height: 300px;
  position: relative;
  margin-bottom: 20px;
  border-radius: 20px;
  position: relative;
  z-index: 500;
  padding: 0%;
}

.info-card {
  margin: 0%;
  padding: 40px;
  vertical-align: middle;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.info-card > p {
  color: #15cf79;
  font-size: 40px;
  font-weight: 600;
}

.info-card > h4 {
  font-weight: 600;
}

.el-table__cell.gutter {
  background: transparent;
}
</style>
