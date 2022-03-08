<template>
  <div class="row">
    <div class="col-lg-6"></div>
    <div class="col-lg-6">
      <h4 style="text-align: end">Last refresh {{ lastRefresh }}</h4>
    </div>

    <div class="col-lg-12">
      <div id="map" class="map" style="padding: 0px" ref="mapContainer">
        <l-map
          class="sidebar-map"
          :zoom="zoom"
          :attribution="attribution"
          :center="center"
          :options="{ zoomControl: false }"
          :maxZoom="22"
          @ready="onReady"
        >
          <div v-if="legends[5].isActive">
            <v-marker-cluster
              :options="clusterOptions"
              v-for="cluster in yardsCluster"
              :key="cluster.id"
            >
              <l-marker
                v-for="(marker, index) in cluster.clusterMarker"
                :key="marker.id"
                :lat-lng="marker.latLng"
                :icon="markerIcon(marker.markerType)"
                @ready="storeYardMarker"
                @mouseover="openSesameYard($event, index)"
              >
                <l-popup
                  :options="{
                    minWidth: '300',
                  }"
                >
                  <div class="row">
                    <div class="col-lg-6 marker-popup">
                      <h5>Driver Name</h5>
                    </div>
                    <div class="col-lg-6 marker-popup">
                      <p>:&nbsp;{{ marker.driver }}</p>
                    </div>
                    <div class="col-lg-6 marker-popup"><h5>Opr No</h5></div>
                    <div class="col-lg-6 marker-popup">
                      <p>:&nbsp;{{ marker.oprNo }}</p>
                    </div>
                    <div class="col-lg-6 marker-popup"><h5>Reg No</h5></div>
                    <div class="col-lg-6 marker-popup">
                      <p>:&nbsp;{{ marker.regNo }}</p>
                    </div>
                    <div class="col-lg-6 marker-popup">
                      <h5>Current Loc</h5>
                    </div>
                    <div class="col-lg-6 marker-popup">
                      <p>:&nbsp;{{ marker.location }}</p>
                    </div>
                    <div class="col-lg-6 marker-popup"><h5>Speed</h5></div>
                    <div class="col-lg-6 marker-popup">
                      <p>:&nbsp;{{ marker.speed }} km/h</p>
                    </div>
                    <div class="col-lg-12 text-center" style="margin-top: 10px">
                      <router-link
                        :to="{
                          name: 'Truck Info',
                          params: { regNo: marker.regNo },
                        }"
                      >
                        <base-button type="primary" round style="width: 200px"
                          >See truck info&nbsp;>&nbsp;></base-button
                        ></router-link
                      >
                    </div>
                  </div>
                </l-popup>
              </l-marker>
            </v-marker-cluster>
          </div>

          <l-marker
            :key="marker.id"
            v-for="(marker, index) in showMarker"
            :lat-lng="marker.latLng"
            :icon="markerIcon(marker.markerType)"
            @ready="storeMarker"
            @mouseover="openSesame($event, index)"
          >
            <l-popup
              :options="{
                minWidth: '300',
              }"
            >
              <div class="row">
                <div class="col-lg-4 marker-popup"><h5>Driver Name</h5></div>
                <div class="col-lg-8 marker-popup">
                  <p>:&nbsp;{{ marker.driver }}</p>
                </div>
                <div class="col-lg-4 marker-popup"><h5>Opr No</h5></div>
                <div class="col-lg-8 marker-popup">
                  <p>:&nbsp;{{ marker.oprNo }}</p>
                </div>
                <div class="col-lg-4 marker-popup"><h5>Reg No</h5></div>
                <div class="col-lg-8 marker-popup">
                  <p>:&nbsp;{{ marker.regNo }}</p>
                </div>
                <div class="col-lg-4 marker-popup"><h5>Current Loc</h5></div>
                <div class="col-lg-8 marker-popup">
                  <p>:&nbsp;{{ marker.location }}</p>
                </div>
                <div class="col-lg-4 marker-popup"><h5>Speed</h5></div>
                <div class="col-lg-8 marker-popup">
                  <p>:&nbsp;{{ marker.speed }}km/h</p>
                </div>
                <div class="col-lg-12 text-center" style="margin-top: 10px">
                  <router-link
                    :to="{
                      name: 'Truck Info',
                      params: { regNo: marker.regNo },
                    }"
                  >
                    <base-button type="primary" round style="width: 200px"
                      >See truck info&nbsp;>&nbsp;></base-button
                    ></router-link
                  >
                </div>
              </div>
            </l-popup>
          </l-marker>

          <l-tile-layer
            :url="url"
            :options="{ maxNativeZoom: 19, maxZoom: 22 }"
          ></l-tile-layer>
          <l-control-zoom position="bottomleft"></l-control-zoom>
          <l-control position="topright">
            <base-switch
              v-model="$isPremium"
              on-text="Premium"
              off-text="Basic"
            ></base-switch>
            <!-- <base-switch
              type="primary"
              round
              style="width: 200px"
              @click="$isPremium = !$isPremium"
              >Test></base-switch
            > -->
            <div class="map-legend" v-if="!$isPremium">
              <div
                :key="legend.id"
                v-for="legend in legends"
                class="row"
                style="margin-top: 5px"
              >
                <div class="col-lg-1" style="margin-top: 5px">
                  <input
                    v-model="legend.isActive"
                    type="checkbox"
                    @change="showLegend()"
                  />
                </div>
                <div class="col-lg-3">
                  <img id="icon-legend" :src="legend.image" />
                </div>
                <div class="col-lg">
                  <p id="icon-text">{{ legend.title }}</p>
                </div>
              </div>
            </div>
            <div class="map-legend" v-if="$isPremium">
              <div
                :key="legend.id"
                v-for="legend in premiumLegend"
                class="row"
                style="margin-top: 5px"
              >
                <div class="col-lg-1" style="margin-top: 5px">
                  <input
                    v-model="legend.isActive"
                    type="checkbox"
                    @change="showLegend()"
                  />
                </div>
                <div class="col-lg-3">
                  <img id="icon-legend" :src="legend.image" />
                </div>
                <div class="col-lg">
                  <p id="icon-text">{{ legend.title }}</p>
                </div>
              </div>
            </div>
          </l-control>
        </l-map>
      </div>
    </div>

    <div class="col-md-4 d-flex">
      <card class="card-chart card-chart-pie">
        <h5 slot="header" class="card-category"></h5>

        <div class="row">
          <div class="col-10 ml-auto mr-auto">
            <div class="chart-area">
              <pie-chart
                v-if="pieChart1.isLoading"
                :chart-data="pieChart1.chartData"
                :extra-options="pieChart1.extraOptions"
                :height="180"
              >
              </pie-chart>
            </div>
          </div>
        </div>
      </card>
    </div>
    <div class="col-md-4 d-flex">
      <card id="truck-status">
        <div class="row">
          <div class="col-lg-12">
            <h3 style="color: white; font-weight: 600; margin-bottom: 20px">
              Truck Status
            </h3>
            <div :key="count.id" v-for="count in statusCount" class="row">
              <div class="col-lg-10">
                <p style="font-size: 16px">
                  {{ count.title }}
                </p>
              </div>
              <div class="col-lg-2">
                <p style="font-size: 19px; color: white; font-weight: bold">
                  {{ count.count }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </card>
    </div>

    <div class="col-md-4 d-flex">
      <card class="card-chart card-chart-pie">
        <div class="premium">Upgrade to Premium to View This Data</div>
        <h5 slot="header" class="card-category"></h5>

        <div class="row">
          <div class="col-10 ml-auto mr-auto">
            <div class="chart-area">
              <pie-chart
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
    <div class="col-lg-12">
      <card>
        <div class="premium" style="font-size: 30px">
          Upgrade to Premium to View This Data
        </div>
        <template slot="header">
          <h3 class="card-title"></h3>
        </template>
        <div class="chart-area">
          <bar-chart
            :chart-data="barChart1.chartData"
            :extra-options="barChart1.extraOptions"
            :gradient-colors="barChart1.gradientColors"
            :gradient-stops="barChart1.gradientStops"
            :height="400"
          >
          </bar-chart>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import PieChart from "src/components/Charts/PieChart";
import BarChart from "@/components/Charts/BarChart";
import * as chartConfigs from "@/components/Charts/config";
import * as dashboardConfig from "./dashboard.js";
import config from "@/config";
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LControl,
  LControlZoom,
  LTooltip,
} from "vue2-leaflet";
import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";
import { BaseSwitch } from "src/components";
import moment from "moment";
import { Popover, Tooltip } from "element-ui";
import { divIcon as DivIcon, point as Point } from "leaflet";

export default {
  components: {
    "v-marker-cluster": Vue2LeafletMarkerCluster,
    BaseSwitch,
    BarChart,
    PieChart,
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LControl,
    LControlZoom,
    LTooltip,
    [Popover.name]: Popover,
    [Tooltip.name]: Tooltip,
  },

  data() {
    return {
      yardsCluster: [
        {
          id: "6",
          clusterMarker: [],
        },
        {
          id: "9",
          clusterMarker: [],
        },
      ],
      clusterOptions: {
        maxClusterRadius: 500,
        iconCreateFunction: (cluster) => {
          var childCount = cluster.getChildCount();
          var c = " my-marker-cluster-";
          if (childCount < 10) {
            c += "small";
          } else if (childCount < 100) {
            c += "medium";
          } else {
            c += "large";
          }

          return new DivIcon({
            html:
              "<div><img src='img/Truck at Yard.png' id='cluster-yard'><p id='cluster-value'>" +
              childCount +
              "</p></div>",
            className: "marker-cluster" + c,
            iconSize: new Point(40, 40),
          });
        },
      },
      lastRefresh: moment().format("h:mmA Do MMMM YYYY"),
      interval: "",
      isActive: false,
      // MAP
      zoom: 10,
      center: L.latLng(2.920715, 101.63724),
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      markers: [
        {
          id: 1,
          latLng: L.latLng(2.920534, 101.635683),
          markerType: "Under Maintenance",
          driver: "Yahya",
          oprNo: "xxxxx",
          regNo: "WA8935S",
          location: "Cyberjaya",
          speed: "20km/h",
        },
        {
          id: 2,
          latLng: L.latLng(2.920715, 101.63724),
          markerType: "Moving",
          driver: "Yahya",
          oprNo: "xxxxx",
          regNo: "WA8935S",
          location: "Cyberjaya",
          speed: "20km/h",
        },
        {
          id: 3,
          latLng: L.latLng(2.92062, 101.637603),
          markerType: "Stop",
          driver: "Yahya",
          oprNo: "xxxxx",
          regNo: "WA8935S",
          location: "Cyberjaya",
          speed: "20km/h",
        },
        {
          id: 4,
          latLng: L.latLng(2.919035, 101.637678),
          markerType: "Idling",
          driver: "Yahya",
          oprNo: "xxxxx",
          regNo: "WA8935S",
          location: "Cyberjaya",
          speed: "20km/h",
        },
        {
          id: 5,
          latLng: L.latLng(2.918606, 101.636906),
          markerType: "Not Communicating",
          driver: "Yahya",
          oprNo: "xxxxx",
          regNo: "WA8935S",
          location: "Cyberjaya",
          speed: "20km/h",
        },
        {
          id: 6,
          latLng: L.latLng(2.9197438, 101.6379576),
          markerType: "Not Communicating",
          driver: "Yahya",
          oprNo: "xxxxx",
          regNo: "WA8935S",
          location: "Cyberjaya",
          speed: "20km/h",
        },
      ],
      showMarker: [],

      legends: [
        {
          id: 1,
          image: "img/Inactive.png",
          title: "Under Maintenance",
          isActive: true,
        },
        {
          id: 2,
          image: "img/Moving.png",
          title: "Moving",
          isActive: true,
        },
        {
          id: 3,
          image: "img/Stopped.png",
          title: "Stop",
          isActive: true,
        },
        {
          id: 4,
          image: "img/Idling.png",
          title: "Idling",
          isActive: true,
        },
        {
          id: 5,
          image: "img/Not Communicating.png",
          title: "Not Communicating",
          isActive: true,
        },
        {
          id: 6,
          image: "img/Truck at Yard.png",
          title: "Truck at Yard",
          isActive: true,
        },
      ],

      premiumLegend: [
        {
          id: 1,
          image: "img/Moving.png",
          title: "Laden",
          isActive: true,
        },
        {
          id: 2,
          image: "img/Idling.png",
          title: "Unladen",
          isActive: true,
        },
        {
          id: 3,
          image: "img/Truck at Yard.png",
          title: "Truck at Yard",
          isActive: true,
        },
      ],

      // CHART
      barChart1: {
        chartData: {
          labels: ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
          datasets: [
            {
              label: "Data",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [80, 100, 70, 80, 120, 80],
            },
          ],
        },
        extraOptions: chartConfigs.barChartOptionsGradient,
        gradientColors: config.colors.purpleGradient,
        gradientStops: [1, 0],
      },

      pieChart1: {
        chartData: {
          labels: [
            "Under Maintenance",
            "Stopped",
            "Idling",
            "Moving",
            "Not Communicating",
          ],
          datasets: [
            {
              label: "",
              pointRadius: 0,
              pointHoverRadius: 0,
              backgroundColor: [
                "#9b9b9b",
                "#2e2e2e",
                "#fab42f",
                "#15cf79",
                "#cf1716",
              ],
              borderWidth: 0,
              data: [60, 40, 60, 40, 60],
            },
          ],
        },
        extraOptions: dashboardConfig.truckStatus,
        isLoading: true,
      },
      pieChart2: {
        chartData: {
          labels: ["Empty", "Laden"],
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
        extraOptions: dashboardConfig.ladenUnladen,
      },

      // CARDS
      statusCount: [
        {
          id: 1,
          title: "Under Maintenance",
          count: 10,
        },
        {
          id: 2,
          title: "Moving",
          count: 20,
        },
        {
          id: 3,
          title: "Stop",
          count: 30,
        },
        {
          id: 4,
          title: "Idling",
          count: 40,
        },
        {
          id: 5,
          count: 50,
          title: "Not Communicating",
        },
      ],
      storeMarkerE: [],
      storeYardMarkerE: [],
    };
  },
  computed: {},
  methods: {
    // ------------------------------------- UI RELATED -------------------------------------
    openSesame(e, id) {
      this.storeMarkerE[id].openPopup();
    },
    openSesameYard(e, id) {
      this.storeYardMarkerE[id].openPopup();
    },
    storeMarker(mapObject) {
      this.storeMarkerE.push(mapObject);
    },
    storeYardMarker(mapObject) {
      this.storeYardMarkerE.push(mapObject);
    },
    onCancel() {
      console.log("User cancelled the loader.");
    },
    onReady() {
      this.$refs.myCluster.mapObject.refreshClusters();
    },
    showLegend() {
      this.showMarker = [];
      if (!this.$isPremium) {
        for (let i = 0; i < this.legends.length; i++) {
          for (let j = 0; j < this.markers.length; j++) {
            if (
              this.legends[i].isActive &&
              this.legends[i].title == this.markers[j].markerType
            ) {
              this.showMarker.push(this.markers[j]);
            }
          }
        }
      }
    },
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

    // ------------------------------------- BACKEND RELATED -------------------------------------
    async getOverview() {
      // LOADING
      let loader = this.$loading.show({
        loader: "dots",
        color: "#15cf79",
        // container: this.$refs.mapContainer,
        "is-full-page": true,
        canCancel: true,
        onCancel: this.onCancel,
      });

      // INITIALIZE VARIABLE
      this.markers = [];
      this.yardsCluster = [];
      this.showMarker = [];
      this.statusCount[0].count = 0;
      this.statusCount[1].count = 0;
      this.statusCount[2].count = 0;
      this.statusCount[3].count = 0;
      this.statusCount[4].count = 0;
      this.pieChart1.isLoading = false;

      // GET LIST OF YARD AVAILABLE FOR CURRENT COMPANY
      let yardList = await this.$http.get(`:6769/api/v1/management/yard`);
      if (!yardList.error) {
        let data = yardList.message;
        for (let i = 0; i < data.length; i++) {
          let yard = {
            id: data[i].YardName,
            clusterMarker: [],
          };
          this.yardsCluster.push(yard);
        }
      }

      // GET TRUCK LATEST DATA
      let res = await this.$http.get(`:6770/api/v1/telemetry/lorry/gps/latest`);
      this.lastRefresh = moment().format("h:mmA Do MMMM YYYY");

      if (!res.error) {
        let data = res.message;

        for (let i = 0; i < data.LatestGps.length; i++) {
          let markerType = "";
          if (data.LatestGps[i].MovingFlag) {
            markerType = "Moving";
          } else {
            markerType = "Idling";
          }

          if (data.LatestGps[i].LastUpdate != null) {
            let deviceTimestamp = moment(data.LatestGps[i].LastUpdate);
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

          // FOR TRUCK THAT IS NOT AT YARD
          if (!data.LatestGps[i].AtYard) {
            let marker = {
              id: i,
              latLng: L.latLng(
                data.LatestGps[i].Latitude,
                data.LatestGps[i].Longitude
              ),
              markerType: markerType,
              driver: data.LatestGps[i].DriverName,
              oprNo: data.LatestGps[i].OprNumber,
              regNo: data.LatestGps[i].PlateNumber,
              location: data.LatestGps[i].LocationName,
              speed: data.LatestGps[i].Speed.toFixed(2),
            };
            this.markers.push(marker);
          } else {
            // FOR TRUCK THAT IS AT YARD
            for (let j = 0; j < this.yardsCluster.length; j++) {
              if (this.yardsCluster[j].id == data.LatestGps[i].YardName) {
                let marker = {
                  id: i,
                  latLng: L.latLng(
                    data.LatestGps[i].Latitude,
                    data.LatestGps[i].Longitude
                  ),
                  markerType: markerType,
                  driver: data.LatestGps[i].DriverName,
                  oprNo: data.LatestGps[i].OprNumber,
                  regNo: data.LatestGps[i].PlateNumber,
                  location: data.LatestGps[i].LocationName,
                  speed: data.LatestGps[i].Speed.toFixed(2),
                };
                this.yardsCluster[j].clusterMarker.push(marker);
              }
            }
          }

          switch (markerType) {
            case "Under Maintenance":
              this.statusCount[0].count += 1;
              break;
            case "Moving":
              this.statusCount[1].count += 1;
              break;
            case "Stop":
              this.statusCount[2].count += 1;
              break;
            case "Idling":
              this.statusCount[3].count += 1;
              break;
            case "Not Communicating":
              this.statusCount[4].count += 1;
              break;
            default:
              break;
          }
        }
      }

      console.log(this.markers);

      // TOTAL COUNT OF TRUCK STATUS
      for (let i = 0; i < this.markers.length; i++) {
        this.showMarker.push(this.markers[i]);
      }

      // TOTAL COUNT OF TRUCK STATUS IN PIE CHART
      this.pieChart1.chartData.datasets[0].data = [];
      this.pieChart1.chartData.datasets[0].data.push(this.statusCount[0].count);
      this.pieChart1.chartData.datasets[0].data.push(this.statusCount[1].count);
      this.pieChart1.chartData.datasets[0].data.push(this.statusCount[2].count);
      this.pieChart1.chartData.datasets[0].data.push(this.statusCount[3].count);
      this.pieChart1.chartData.datasets[0].data.push(this.statusCount[4].count);

      this.pieChart1.isLoading = true;
      loader.hide();
    },
  },
  mounted() {
    this.getOverview();
    // this.interval = window.setInterval(() => {
    //   this.getOverview();
    // }, 30000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>
<style>
@import "~leaflet.markercluster/dist/MarkerCluster.css";

#cluster-value {
  vertical-align: middle;
  transform: translateX(-15px) translateY(-10px); /* 10px to left */
  width: 30px;
  height: 30px;
  color: grey;
  font-weight: bold;
  text-align: center;
  background-color: white;
  font-size: 17px;
  border: solid 1px black;
  border-radius: 20px;
}

#cluster-yard {
  width: 40px;
  position: fixed;
  /* background-color: rgba(255, 255, 255, 1); */
  z-index: -99999;
}

#map {
  width: 100%;
  height: 800px;
  position: relative;
  background-color: transparent;
  margin-bottom: 20px;
  border-radius: 20px;
  position: relative;
  z-index: 500;
}

#icon-legend {
  width: 30px;
  margin-left: 10px;
}
#icon-text {
  color: grey;
  font-size: 1.2em;
  text-align: start;
}

.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {
  border-radius: 10px;
}

.map-legend {
  width: 23em;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 5%;
  padding: 20px;
}

#truck-status {
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 3%;
}

.premium {
  position: absolute;
  background: #2e2e2eb0;
  color: white;
  font-size: 18px;
  width: 100%;
  height: 100%;
  z-index: 99;
  vertical-align: middle;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  border-radius: 20px;
  left: 0;
}
.fa-sync:hover {
  color: #15cf79;
}

.marker-popup > p {
  color: grey;
  font-weight: bold;
  display: inline;
}

.marker-popup > h5 {
  color: grey;
  display: inline;
}

.bootstrap-switch-handle-on {
  background-color: #2e2e2e !important;
}
</style>
