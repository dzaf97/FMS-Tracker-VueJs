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
      <div class="col-lg">
        <el-date-picker
          v-model="datePicker"
          type="daterange"
          start-placeholder="Start"
          end-placeholder="End"
        >
        </el-date-picker>
      </div>
      <div class="col-lg-7 text-right" style="margin-bottom: 10px">
        <el-switch
          v-model="isMonthly"
          active-color="grey"
          inactive-color="grey"
          active-text="This month"
          inactive-text="This week"
          style="color: grey"
        >
        </el-switch>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4 d-flex">
        <div class="map-card">
          <l-map
            id="map-mini"
            class="sidebar-map"
            :zoom="zoom"
            :attribution="attribution"
            :center="center"
            :options="{ zoomControl: false }"
          >
            <l-marker
              :key="marker.id"
              v-for="marker in markers"
              :lat-lng="marker.latLng"
              :icon="markerIcon(marker.markerType)"
            ></l-marker>
            <l-tile-layer :url="url"></l-tile-layer>
            <l-control-zoom position="bottomleft"></l-control-zoom>
          </l-map>
          <h3 :style="titleStyle">Truck Information</h3>
          <div :style="detailStyle" class="row">
            <div class="col-lg-6">
              <p>Status</p>
            </div>
            <div class="col-lg-6">
              <p style="font-weight: bold">:&nbsp;&nbsp;{{ status }}</p>
            </div>
          </div>
          <div :style="detailStyle" class="row">
            <div class="col-lg-6">
              <p>Group</p>
            </div>
            <div class="col-lg-6">
              <p style="font-weight: bold">:&nbsp;&nbsp;{{ group }}</p>
            </div>
          </div>
          <div :style="detailStyle" class="row">
            <div class="col-lg-6">
              <p>Registration No</p>
            </div>
            <div class="col-lg-6">
              <p style="font-weight: bold">:&nbsp;&nbsp;{{ regNo }}</p>
            </div>
          </div>
          <div :style="detailStyle" class="row">
            <div class="col-lg-6">
              <p>Model</p>
            </div>
            <div class="col-lg-6">
              <p style="font-weight: bold">:&nbsp;&nbsp;{{ model }}</p>
            </div>
          </div>
          <div :style="detailStyle" class="row">
            <div class="col-lg-6">
              <p>Maker</p>
            </div>
            <div class="col-lg-6">
              <p style="font-weight: bold">:&nbsp;&nbsp;{{ make }}</p>
            </div>
          </div>
          <div :style="detailStyle" class="row">
            <div class="col-lg-6">
              <p>Engine No</p>
            </div>
            <div class="col-lg-6">
              <p style="font-weight: bold">:&nbsp;&nbsp;{{ engineNo }}</p>
            </div>
          </div>
          <div :style="detailStyle" class="row">
            <div class="col-lg-6">
              <p>Chassis No</p>
            </div>
            <div class="col-lg-6">
              <p style="font-weight: bold">:&nbsp;&nbsp;{{ chassisNo }}</p>
            </div>
          </div>
          <div :style="detailStyle" class="row">
            <div class="col-lg-6">
              <p>Year Registered</p>
            </div>
            <div class="col-lg-6">
              <p style="font-weight: bold">:&nbsp;&nbsp;{{ yearReg }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="row">
          <div class="col-lg d-flex">
            <div class="card canbus-card">
              <h4>Fuel Consumption</h4>
              <p>{{ fuelConsumption }}</p>
              <h4>Litres</h4>
            </div>
          </div>
          <div class="col-lg d-flex">
            <div class="card canbus-card">
              <h4>Idle Time</h4>
              <p>{{ idleTime }}</p>
              <h4>Hours</h4>
            </div>
          </div>
          <div class="col-lg d-flex">
            <div class="card canbus-card">
              <h4>Distance Travelled</h4>
              <p>{{ distanceTravelled }}</p>
              <h4>Kilometers</h4>
            </div>
          </div>
        </div>
        <div class="row" style="margin-top: 20px">
          <div class="col-lg-12">
            <card style="margin-bottom: 0px">
              <h2 slot="header" class="card-title" style="font-weight: 600">
                Trip Log
              </h2>
              <el-table
                :header-cell-style="{
                  background: 'transparent',
                  border: 'transparent',
                  'font-size': '14px',
                  'font-weight': '400',
                  'padding-bottom': '0%',
                  color: 'white',
                }"
                :cell-style="{ border: 'transparent', 'font-size': '14px' }"
                :data="tableData"
                :height="'29vw'"
                :max-height="500"
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
    </div>
  </div>
</template>
<script>
import moment from "moment";
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LControl,
  LControlZoom,
  LTooltip,
} from "vue2-leaflet";
import {
  Table,
  TableColumn,
  Switch,
  DatePicker,
  Select,
  Option,
} from "element-ui";
import { BaseSwitch } from "src/components";

export default {
  components: {
    BaseSwitch,
    [Select.name]: Select,
    [Option.name]: Option,
    [DatePicker.name]: DatePicker,
    [Switch.name]: Switch,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LControl,
    LControlZoom,
    LTooltip,
  },

  data() {
    return {
      tableData: [],
      store: [],
      titleStyle: {
        "font-weight": "600",
        color: "white",
        "padding-left": "10px",
        "border-top-color": "grey",
      },
      detailStyle: {
        color: "grey",
        "font-size": "15px",
        padding: "10px",
        margin: "1px 1px",
        "border-top-color": "grey",
        "border-top-style": "solid",
        "border-top-width": "thin",
      },

      isMonthly: true,

      // MAP
      zoom: 20,
      markers: [
        {
          id: 1,
          latLng: L.latLng(2.920715, 101.63724),
          markerType: "Moving",
        },
      ],
      center: L.latLng(2.920715, 101.63724),
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',

      datePicker: "",
      // CARDS
      fuelConsumption: "0",
      idleTime: "0",
      distanceTravelled: "0",
      storeCard: {},

      // SIDE CARD
      regNo: "-",
      model: "-",
      make: "-",
      status: "-",
      group: "-",
      engineNo: "-",
      chassisNo: "-",
      yearReg: "-",

      options: [],
      value: "",
    };
  },
  computed: {},
  methods: {
    markerIcon(markerType) {
      switch (markerType) {
        case "Under Maintenance":
          return L.icon({
            iconUrl: require("../../../public/img/Inactive.png"),
            iconSize: [35, 25], // size of the icon
            iconAnchor: [30, 20], // point of the icon which will corespond to marker's location
            shadowAnchor: [-1, 16], // the same for the shadow
            shadowSize: [17, 17],
            popupAnchor: [-15, -15],
          });
        case "Moving":
          return L.icon({
            iconUrl: require("../../../public/img/Moving.png"),
            iconSize: [35, 25], // size of the icon
            iconAnchor: [30, 20], // point of the icon which will corespond to marker's location
            shadowAnchor: [-1, 16], // the same for the shadow
            shadowSize: [17, 17],
            popupAnchor: [-15, -15],
          });
        case "Stop":
          return L.icon({
            iconUrl: require("../../../public/img/Stopped.png"),
            iconSize: [35, 25], // size of the icon
            iconAnchor: [30, 20], // point of the icon which will corespond to marker's location
            shadowAnchor: [-1, 16], // the same for the shadow
            shadowSize: [17, 17],
            popupAnchor: [-15, -15],
          });
        case "Idling":
          return L.icon({
            iconUrl: require("../../../public/img/Idling.png"),
            iconSize: [35, 25], // size of the icon
            iconAnchor: [30, 20], // point of the icon which will corespond to marker's location
            shadowAnchor: [-1, 16], // the same for the shadow
            shadowSize: [17, 17],
            popupAnchor: [-15, -15],
          });
        case "Not Communicating":
          return L.icon({
            iconUrl: require("../../../public/img/Not Communicating.png"),
            iconSize: [35, 25], // size of the icon
            iconAnchor: [30, 20], // point of the icon which will corespond to marker's location
            shadowAnchor: [-1, 16], // the same for the shadow
            shadowSize: [17, 17],
            popupAnchor: [-15, -15],
          });
        default:
          break;
      }
    },
    async getTruck() {
      let res = await this.$http.get(`:6769/api/v1/management/truck`);

      // let res = await this.$http.get(`/api/v1/manage/lorry/${companyID}`);
      if (!res.error) {
        this.tableData = [];
        let data = res.message;
        for (let i = 0; i < data.length; i++) {
          let truck = {
            value: data[i].TruckRegistrationPlate,
            label: data[i].TruckRegistrationPlate,
          };
          this.options.push(truck);
        }
      }
    },
    async getTruckInfo(regNo) {
      let res = await this.$http.get(
        `:6769/api/v1/management/truck/${regNo}/info`
      );
      if (res.error) return;

      let data = res.message;
      this.status = data.Status;
      this.group = data.Group;
      this.model = data.Model;
      this.make = data.Maker;
      this.engineNo = data.EngineNo;
      this.chassisNo = data.ChassisNo;
      this.yearReg = data.Year;
    },
    async getTruckDetail(regNo) {
      // LOADING
      let loader = this.$loading.show({
        loader: "dots",
        color: "#15cf79",
        // container: this.$refs.mapContainer,
        "is-full-page": true,
        canCancel: true,
        onCancel: this.onCancel,
      });

      this.markers = [];

      let res = await this.$http.get(`/api/v1/lorry/${regNo}`);
      if (!res.error) {
        let data = res.message;

        this.regNo = data.LorryRegNo;
        this.center = L.latLng(data.LastHealthLat, data.LastHealthLon);
        this.storeCard = data.LorryS3Data;

        // MARKER
        let markerType = "";
        if (data.VehMoveFlag == "true") {
          markerType = "Moving";
        } else {
          markerType = "Idling";
        }

        if (data.LastCanTs != null) {
          let deviceTimestamp = moment(data.LastCanTs);
          let hours = moment().diff(deviceTimestamp, "hours");
          let minutes = moment().diff(deviceTimestamp, "minutes");

          if (hours > 24) {
            markerType = "Not Communicating";
          } else if (minutes > 15 && minutes < 60) {
            markerType = "Stop";
          }
        } else {
          markerType = "Not Communicating";
        }

        this.markers.push({
          id: 1,
          latLng: L.latLng(data.LastHealthLat, data.LastHealthLon),
          markerType: markerType,
        });

        if (this.isMonthly) {
          if (
            this.storeCard.Monthly.FuelConsumption == "-1" &&
            this.storeCard.Monthly.IdleTime == "-1" &&
            this.storeCard.Monthly.DistanceTravel == "-1"
          ) {
            this.fuelConsumption = "NO CANBUS DATA";
            this.idleTime = "NO CANBUS DATA";
            this.distanceTravelled = "NO CANBUS DATA";
          } else {
            this.fuelConsumption =
              this.storeCard.Monthly.FuelConsumption != "-1"
                ? this.storeCard.Monthly.FuelConsumption
                : "NO DATA";

            this.idleTime =
              this.storeCard.Monthly.IdleTime != "-1"
                ? this.storeCard.Monthly.IdleTime
                : "NO DATA";

            this.distanceTravelled =
              this.storeCard.Monthly.DistanceTravel != "-1"
                ? this.storeCard.Monthly.DistanceTravel
                : "NO DATA";
          }
        } else {
          if (
            this.storeCard.Weekely.FuelConsumption == "-1" &&
            this.storeCard.Weekely.IdleTime == "-1" &&
            this.storeCard.Weekely.DistanceTravel == "-1"
          ) {
            this.fuelConsumption = "NO CANBUS DATA";
            this.idleTime = "NO CANBUS DATA";
            this.distanceTravelled = "NO CANBUS DATA";
          } else {
            this.fuelConsumption =
              this.storeCard.Weekely.FuelConsumption != "-1"
                ? this.storeCard.Weekely.FuelConsumption
                : "NO DATA";

            this.idleTime =
              this.storeCard.Weekely.IdleTime != "-1"
                ? this.storeCard.Weekely.IdleTime
                : "NO DATA";

            this.distanceTravelled =
              this.storeCard.Weekely.DistanceTravel != "-1"
                ? this.storeCard.Weekely.DistanceTravel
                : "NO DATA";
          }
        }
      } else {
        this.fuelConsumption = "NO CANBUS DATA";
        this.idleTime = "NO CANBUS DATA";
        this.distanceTravelled = "NO CANBUS DATA";
      }
      loader.hide();
    },
    async getTripLog(regNo, start, end) {
      let endpoint = "";

      if (start != "") {
        endpoint = `:6769/api/v1/trip/log?start=${start}&end=${end}&truck-id=${regNo}`;
      } else {
        endpoint = `:6769/api/v1/trip/log?truck-id=${regNo}`;
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
  },
  watch: {
    datePicker: function (val) {
      let start = moment(val[0]).format("YYYY-MM-DD");
      let end = moment(val[1]).format("YYYY-MM-DD");
      this.getTripLog(this.$route.params.regNo, start, end);
    },
    isMonthly: function (val) {
      if (this.storeCard != {}) {
        if (val) {
          if (
            this.storeCard.Monthly.FuelConsumption == "-1" &&
            this.storeCard.Monthly.IdleTime == "-1" &&
            this.storeCard.Monthly.DistanceTravel == "-1"
          ) {
            this.fuelConsumption = "NO CANBUS DATA";
            this.idleTime = "NO CANBUS DATA";
            this.distanceTravelled = "NO CANBUS DATA";
          } else {
            this.fuelConsumption =
              this.storeCard.Monthly.FuelConsumption != "-1"
                ? this.storeCard.Monthly.FuelConsumption
                : "NO DATA";

            this.idleTime =
              this.storeCard.Monthly.IdleTime != "-1"
                ? this.storeCard.Monthly.IdleTime
                : "NO DATA";

            this.distanceTravelled =
              this.storeCard.Monthly.DistanceTravel != "-1"
                ? this.storeCard.Monthly.DistanceTravel
                : "NO DATA";
          }
        } else {
          if (
            this.storeCard.Weekely.FuelConsumption == "-1" &&
            this.storeCard.Weekely.IdleTime == "-1" &&
            this.storeCard.Weekely.DistanceTravel == "-1"
          ) {
            this.fuelConsumption = "NO CANBUS DATA";
            this.idleTime = "NO CANBUS DATA";
            this.distanceTravelled = "NO CANBUS DATA";
          } else {
            this.fuelConsumption =
              this.storeCard.Weekely.FuelConsumption != "-1"
                ? this.storeCard.Weekely.FuelConsumption
                : "NO DATA";

            this.idleTime =
              this.storeCard.Weekely.IdleTime != "-1"
                ? this.storeCard.Weekely.IdleTime
                : "NO DATA";

            this.distanceTravelled =
              this.storeCard.Weekely.DistanceTravel != "-1"
                ? this.storeCard.Weekely.DistanceTravel
                : "NO DATA";
          }
        }
      } else {
        this.fuelConsumption = "NO CANBUS DATA";
        this.idleTime = "NO CANBUS DATA";
        this.distanceTravelled = "NO CANBUS DATA";
      }
    },
  },
  mounted() {
    this.getTruck();
    this.value = this.$route.params.regNo;
    this.getTruckDetail(this.$route.params.regNo);
    this.getTruckInfo(this.$route.params.regNo);
    this.getTripLog(this.$route.params.regNo, "", "");
  },
};
</script>
<style >
.el-switch__label {
  color: white !important;
}
#map-mini {
  height: 300px !important;
  position: relative !important;
  margin-bottom: 20px !important;
  border-bottom-left-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
  position: relative !important;
  z-index: 500 !important;
  padding: 0% !important;
}

.map-card {
  background: #1c1b1b;
  padding: 0%;
  border: 0;
  position: relative;
  width: 100%;
  border-radius: 20px;
}

.canbus-card {
  margin: 0%;
  padding: 40px;
  vertical-align: middle;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.canbus-card > p {
  color: #15cf79;
  font-size: 30px;
  font-weight: 600;
}

.canbus-card > h4 {
  font-weight: 600;
}

.el-table .el-table__cell.gutter {
  background: transparent;
}
</style>
