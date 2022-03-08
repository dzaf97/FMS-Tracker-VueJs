<template>
  <div class="col-lg-12">
    <div class="row">
      <div class="col-lg-2" style="margin-bottom: 10px">
        <el-select
          v-model="value"
          filterable
          placeholder="Select"
          class="select-primary"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="col-lg-3">
        <el-date-picker
          v-model="datePicker"
          type="daterange"
          start-placeholder="Start"
          end-placeholder="End"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4 d-flex">
        <div class="driver-card">
          <img src="img/emilyz.jpg" id="avatar" />
          <h3
            class="text-center"
            style="margin: 20px; font-weight: 600; color: white"
          >
            {{ name }}
          </h3>
          <div :style="detailStyle" class="row">
            <div class="col-lg-5">
              <p>NRIC / Passport</p>
            </div>
            <div class="col-lg-7">
              <p style="font-weight: bold">:&nbsp;&nbsp;{{ ic }}</p>
            </div>
          </div>
          <div :style="detailStyle" class="row">
            <div class="col-lg-5">
              <p>Staff ID</p>
            </div>
            <div class="col-lg-7">
              <p style="font-weight: bold">:&nbsp;&nbsp;{{ staffID }}</p>
            </div>
          </div>
          <div :style="detailStyle" class="row">
            <div class="col-lg-5">
              <p>Group</p>
            </div>
            <div class="col-lg-7">
              <p style="font-weight: bold">:&nbsp;&nbsp;{{ group }}</p>
            </div>
          </div>
          <div :style="detailStyle" class="row">
            <div class="col-lg-5">
              <p>Weekly Driving Hours</p>
            </div>
            <div class="col-lg-7">
              <p style="font-weight: bold">
                :&nbsp;&nbsp;{{ weeklyDrivingHours }}
              </p>
            </div>
          </div>
          <div :style="detailStyle" class="row">
            <div class="col-lg-5">
              <p>Availability</p>
            </div>
            <div class="col-lg-7">
              <p style="font-weight: bold">:&nbsp;&nbsp;{{ availability }}</p>
            </div>
          </div>
          <div :style="detailStyle" class="row">
            <div class="col-lg-5">
              <p>Category</p>
            </div>
            <div class="col-lg-7">
              <p style="font-weight: bold">:&nbsp;&nbsp;{{ category }}</p>
            </div>
          </div>
          <div :style="detailStyle" class="row">
            <div class="col-lg-5">
              <p>Hired Date</p>
            </div>
            <div class="col-lg-7">
              <p style="font-weight: bold">:&nbsp;&nbsp;{{ hiredDate }}</p>
            </div>
          </div>
          <div :style="detailStyle" class="row">
            <div class="col-lg-5">
              <p>Phone</p>
            </div>
            <div class="col-lg-7">
              <p style="font-weight: bold">:&nbsp;&nbsp;{{ phone }}</p>
            </div>
          </div>
          <div :style="detailStyle" class="row">
            <div class="col-lg-5">
              <p>Email</p>
            </div>
            <div class="col-lg-7">
              <p style="font-weight: bold">:&nbsp;&nbsp;{{ email }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-8 d-flex" style="padding: 0%">
        <card style="margin-bottom: 0px">
          <h2 slot="header" class="card-title" style="font-weight: 600">
            Trip Log
          </h2>
          <el-table
            :header-cell-style="{
              background: 'transparent',
              border: 'transparent',
              'font-size': '16px',
              'font-weight': '400',
              'padding-bottom': '0%',
              color: 'white',
            }"
            :cell-style="{ border: 'transparent', 'font-size': '16px' }"
            :data="tableData"
            :height="'50vw'"
            :max-height="680"
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
  </div>
</template>
<script>
import {
  Table,
  TableColumn,
  Switch,
  Select,
  Option,
  DatePicker,
} from "element-ui";
import { BaseSwitch } from "src/components";
import moment from "moment";

export default {
  components: {
    BaseSwitch,
    [Switch.name]: Switch,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Select.name]: Select,
    [Option.name]: Option,
    [DatePicker.name]: DatePicker,
  },

  data() {
    return {
      tableData: [],
      titleStyle: {
        "font-weight": "600",
        color: "white",
        "padding-left": "10px",
        "border-top-color": "grey",
      },
      detailStyle: {
        color: "grey",
        "font-size": "16px",
        "padding-top": "10px",
        "padding-bottom": "10px",
        "padding-right": "10px",
        "padding-left": "0px",
        "margin-left": "1px",
        "margin-right": "1px",
        "border-top-color": "grey",
        "border-top-style": "solid",
        "border-top-width": "thin",
      },

      datePicker: "",
      options: [],
      value: "",

      // CARDS
      name: "-",
      ic: "-",
      staffID: "-",
      group: "-",
      weeklyDrivingHours: "",
      availability: "-",
      category: "-",
      hiredDate: "",
      phone: "",
      email: "",
    };
  },
  computed: {},
  methods: {
    async getTripLog(driverID, start, end) {
      let endpoint = "";

      if (start != "") {
        endpoint = `:6769/api/v1/trip/log?start=${start}&end=${end}&driver-id=${driverID}`;
      } else {
        endpoint = `:6769/api/v1/trip/log?driver-id=${driverID}`;
      }

      let res = await this.$http.get(endpoint);
      if (res.error) return;

      let data = res.message;
      this.tableData = [];

      for (let i = 0; i < data.length; i++) {
        let trip = {
          id: data[i].TripID,
          date: moment(data[i].Date).format("YYYY-MM-DD"),
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
      }
    },
    async getDriverList() {
      let res = await this.$http.get(`:6769/api/v1/management/driver`);

      if (!res.error) {
        this.options = [];
        let data = res.message;
        for (let i = 0; i < data.length; i++) {
          let driver = {
            value: data[i].DriverID,
            label: data[i].DriverName,
          };
          this.options.push(driver);
        }
      }
    },
    async getDriver(driverID) {
      console.log(driverID);
      let res = await this.$http.get(
        `:6769/api/v1/management/driver/${driverID}/overview`
      );

      if (!res.error) {
        let driverInfo = res.message.DriverInfo;
        console.log(res);
        this.name = driverInfo.Name;
        this.ic = driverInfo.NricPassport;
        this.staffID = driverInfo.StaffID;
        this.group = driverInfo.GroupName;
        this.availability =
          driverInfo.Availability != "" ? driverInfo.Availability : "-";
        this.category = driverInfo.Category;
        this.weeklyDrivingHours = driverInfo.WeeklyDrivingHours;
        this.hiredDate = driverInfo.HiredDate;
        this.phone = driverInfo.PhoneNumber;
        this.email = driverInfo.Email;

        let trips = res.message.Trips;
        this.tableData = [];

        for (let i = 0; i < trips.length; i++) {
          let trip = {
            id: i + 1,
            date: trips[i].Date,
            regNo: trips[i].TruckRegistrationPlate,
            tripStatus: trips[i].TripStatus,
            returnCargoCust: trips[i].ReturnCargoCustomer,
            returnCargoEta: trips[i].ReturnCargoETA,
            route: trips[i].Route,
            group: "-",
            destination: trips[i].Destination,
            pilotName: trips[i].PilotName,
            contactNo: trips[i].PhoneNumber,
          };

          this.tableData.push(trip);
        }
      }
    },
  },
  mounted() {
    this.getDriver(this.$route.params.driverID);
    this.getTripLog(this.$route.params.driverID, "", "");
    this.getDriverList();
    this.value = this.$route.params.driverID;
  },
  beforeDestroy() {},
  watch: {
    datePicker: function (val) {
      let start = moment(val[0]).format("YYYY-MM-DD");
      let end = moment(val[1]).format("YYYY-MM-DD");
      this.getTripLog(this.$route.params.driverID, start, end);
    },
    value: function (val) {
      this.getDriver(val);
      if (this.datePicker != "") {
        let start = moment(this.datePicker[0]).format("YYYY-MM-DD");
        let end = moment(this.datePicker[1]).format("YYYY-MM-DD");
        this.getTripLog(val, start, end);
      } else {
        this.getTripLog(val, "", "");
      }
    },
  },
};
</script>
<style >
.el-switch__label {
  color: white !important;
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

.el-table .el-table__cell.gutter {
  background: transparent;
}

#avatar {
  border-radius: 50% !important;
  border: solid white 2px;
  width: 250px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.driver-card {
  background: #1c1b1b;
  padding: 0%;
  padding-top: 20px;
  border: 0;
  position: relative;
  width: 100%;
  border-radius: 20px;
}
</style>
