<template>
  <div class="row">
    <div class="col-lg-3" style="margin-bottom: 20px">
      <el-date-picker
        v-model="datePicker"
        type="daterange"
        placeholder="Pick a day"
        start-placeholder="Start "
        end-placeholder="End "
      >
      </el-date-picker>
    </div>
    <div class="col-lg-12">
      <div class="row">
        <div class="col-lg">
          <div class="row">
            <div class="card order-card" style="margin-bottom: 20px">
              <h4>Total Order This Week</h4>
              <p>{{ weeklyOrder }}</p>
            </div>
          </div>
          <div class="row">
            <div class="card order-card">
              <h4>Total Order This Month</h4>
              <p>{{ monthlyOrder }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 d-flex">
          <card class="card-chart card-chart-pie">
            <h5 slot="header" class="card-category"></h5>

            <div class="row">
              <div class="col-10 ml-auto mr-auto">
                <div class="chart-area">
                  <pie-chart
                    :chart-data="pieChart2.chartData"
                    :extra-options="pieChart2.extraOptions"
                    :height="180"
                    v-if="pieChart2.isLoading"
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
                    :chart-data="pieChart3.chartData"
                    :extra-options="pieChart3.extraOptions"
                    :height="180"
                    v-if="pieChart3.isLoading"
                  >
                  </pie-chart>
                </div>
              </div>
            </div>
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
          <router-link
            style="color: white"
            class="link footer-link"
            :to="{
              name: 'CreateTrip',
            }"
          >
            <base-button style="margin: 10px 0px" round type="primary"
              >Create New Trip&nbsp;>&nbsp;></base-button
            >
          </router-link>

          <div class="col-lg-8">
            <el-select
              class="select-primary"
              placeholder="Haul Type"
              v-model="setting.selectHaul"
              style="margin-top: 10px"
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
              placeholder="Search Pilot"
              v-model="searchQuery"
            >
            </el-input>
          </base-input>
        </div>
        <div class="col-lg-12" style="margin-top: 20px">
          <h2 slot="header" class="card-title" style="font-weight: 600">
            Schedule Log
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
            min-width="160"
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
            min-width="150"
            sortable
            label="Load Status"
            property="loadStatus"
          ></el-table-column>
          <el-table-column
            min-width="180"
            sortable
            label="ETA"
            property="eta"
          ></el-table-column>
          <el-table-column
            min-width="210"
            sortable
            label="Route"
            property="route"
          ></el-table-column>
          <el-table-column
            min-width="210"
            sortable
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
            label="Pilot Name"
            property="pilotName"
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
import * as scheduleConfig from "./schedule.js";
import PieChart from "src/components/Charts/PieChart";
import moment from "moment";
import { debounce } from "src/util/debounce";

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
      weeklyOrder: "0",
      monthlyOrder: "0",
      datePicker: "",

      setting: {
        selectHaul: "All",
        haulTypes: [
          {
            value: "All",
            label: "All",
          },
        ],
      },

      // CHART
      pieChart2: {
        chartData: {
          labels: ["Assigned", "Unassigned"],
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
        extraOptions: scheduleConfig.assignedUnassigned,
        isLoading: true,
      },
      pieChart3: {
        chartData: {
          labels: ["Assigned", "Unassigned", "Acknowledged"],
          datasets: [
            {
              label: "",
              pointRadius: 0,
              pointHoverRadius: 0,
              backgroundColor: ["#9b9b9b", "#ffffff", "#15cf79"],
              borderWidth: 0,
              data: [60, 20, 30],
            },
          ],
        },
        extraOptions: scheduleConfig.pilotStatus,
        isLoading: true,
      },
      // TABLE
      tableData: [],
      store: [],
    };
  },
  computed: {},
  methods: {
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
    async getScheduleOverview(start, end) {
      let endpoint = "";
      if (start != null) {
        endpoint = `:6769/api/v1/trip/schedule/overview?start=${start}&end=${end}`;
      } else {
        endpoint = `:6769/api/v1/trip/schedule/overview`;
      }

      this.pieChart2.isLoading = false;
      this.pieChart3.isLoading = false;

      var res = await this.$http.get(endpoint);
      if (res.error) return;

      let data = res.message;

      this.weeklyOrder = data.CountWeek;
      this.monthlyOrder = data.CountMonth;

      this.pieChart2.chartData.datasets[0].data = [
        data.AssignedTruck,
        data.UnassignedTruck,
      ];

      this.pieChart3.chartData.datasets[0].data = [
        data.AssignedPilot,
        data.UnassignedPilot,
        data.AcknowledgedPilot,
      ];

      this.pieChart2.isLoading = true;
      this.pieChart3.isLoading = true;
    },
    async getScheduleLog(start, end) {
      let endpoint = "";
      if (start != null) {
        endpoint = `:6769/api/v1/trip/schedule/log?start=${start}&end=${end}`;
      } else {
        endpoint = `:6769/api/v1/trip/schedule/log`;
      }

      var res = await this.$http.get(endpoint);
      if (res.error) return;

      let data = res.message;
      this.tableData = [];

      for (let i = 0; i < data.length; i++) {
        let scheduleLog = {
          id: data[i].ScheduleID,
          pilotStatus: data[i].PilotStatus,
          haulType: data[i].HaulType,
          loadStatus: data[i].LoadStatus,
          eta: data[i].ETA,
          route: data[i].Route,
          group: data[i].Group,
          destination: data[i].Destination,
          pilotName: data[i].PilotName,
          contactNo: data[i].ContactNo,
        };

        this.tableData.push(scheduleLog);
        this.store.push(scheduleLog);
      }
    },
  },
  mounted() {
    this.getHaulType();
    this.getScheduleLog(null, null);
    this.getScheduleOverview(null, null);
  },
  watch: {
    searchQuery: debounce(function (search) {
      if (search != "") {
        this.tableData = this.store.filter((value) =>
          value.pilotName.toLowerCase().includes(search.toLowerCase())
        );
      } else {
        this.tableData = this.store;
      }
    }, 500),
    datePicker: function (val) {
      let start = moment(val[0]).format("YYYY-MM-DD");
      let end = moment(val[1]).format("YYYY-MM-DD");
      this.getScheduleLog(start, end);
      this.getScheduleOverview(start, end);
    },
    "setting.selectHaul": function (val) {
      if (val != "All") {
        let haulTypeName = this.setting.haulTypes.filter(
          (item) => item.value == val
        )[0].label;

        console.log(haulTypeName);

        this.tableData = this.store.filter(
          (item) => item.haulType == haulTypeName
        );
      } else {
        this.tableData = this.store;
      }
    },
  },
  beforeDestroy() {},
};
</script>
<style >
.order-card {
  padding: 15px;
  vertical-align: middle;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.order-card > p {
  color: #15cf79;
  font-size: 32px;
  font-weight: 600;
}

.order-card > h4 {
  font-weight: 600;
}
</style>
