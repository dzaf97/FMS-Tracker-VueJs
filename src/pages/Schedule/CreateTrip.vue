<template>
  <div class="row justify-content-center">
    <div class="trip-container">
      <div class="trip-header">
        <h2>List of Trip</h2>
        <button @click="addTripModal()">+ Add Trip</button>
      </div>

      <div class="trip-scroll">
        <div v-for="trip in trips" :key="trip.id">
          <trip-card
            @on-edit="editTripModal(trip)"
            @on-delete="deleteTrip(trip.id)"
            :data="trip"
          >
          </trip-card>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <base-button @click="submit()" type="primary">Submit</base-button>
      </div>
    </div>
    <div class="col-lg-5" v-if="false">
      <div class="trip-modal">
        <h2>Create New Trip</h2>
        <div class="form-row" style="justify-content: space-between">
          <base-input
            class="col-md-5 modal-input-label"
            label="DO"
            type="text"
            placeholder="Name"
            :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
            v-model="deliveryOrder"
          >
          </base-input>
          <base-input
            required
            label="Route"
            class="col-md-5 modal-input-label"
            :inputStyle="{
              'border-color': '#686868',
              color: '#686868',
            }"
          >
            <select
              class="form-control"
              style="color: #686868"
              v-model="selectRoute"
            >
              <option :key="route.id" v-for="route in routes">
                {{ route.routeName }}
              </option>
            </select>
          </base-input>
        </div>
        <div class="form-row" style="justify-content: space-between">
          <base-input
            required
            label="From Warehouse"
            class="col-md-5 modal-input-label"
            :inputStyle="{
              'border-color': '#686868',
              color: '#686868',
            }"
          >
            <select
              class="form-control"
              style="color: #686868"
              v-model="fromWarehouse"
            >
              <option :key="warehouse.id" v-for="warehouse in warehouses">
                {{ warehouse.warehouseName }}
              </option>
            </select>
          </base-input>
          <base-input
            required
            label="To Warehouse"
            class="col-md-5 modal-input-label"
            :inputStyle="{
              'border-color': '#686868',
              color: '#686868',
            }"
          >
            <select
              class="form-control"
              style="color: #686868"
              v-model="toWarehouse"
            >
              <option :key="warehouse.id" v-for="warehouse in warehouses">
                {{ warehouse.warehouseName }}
              </option>
            </select>
          </base-input>
        </div>
        <div class="form-row" style="justify-content: space-between">
          <base-input
            disabled
            label="Mileage"
            class="col-md-5 modal-input-label"
            v-model="mileage"
            :inputStyle="{
              'border-color': '#686868',
              color: '#686868',
            }"
          >
          </base-input>
          <base-input
            label="ETA"
            class="col-md-5 modal-input-label"
            :inputStyle="{
              'border-color': '#686868',
              color: '#686868',
            }"
          >
            <el-date-picker
              type="date"
              style="color: black"
              placeholder="Start Date"
              v-model="eta"
            >
            </el-date-picker>
          </base-input>
        </div>

        <div class="form-row" style="justify-content: space-between">
          <base-input
            label="ETD"
            class="col-md-5 modal-input-label"
            :inputStyle="{
              'border-color': '#686868',
              color: '#686868',
            }"
          >
            <el-date-picker
              type="date"
              style="color: black"
              placeholder="Start Date"
              v-model="etd"
            >
            </el-date-picker>
          </base-input>
          <base-input
            required
            label="Driver"
            class="col-md-5 modal-input-label"
            :inputStyle="{
              'border-color': '#686868',
              color: '#686868',
            }"
          >
            <select
              :disabled="disableDriver"
              class="form-control"
              style="color: #686868"
              v-model="selectDriver"
            >
              <option :key="driver.id" v-for="driver in drivers">
                {{ driver.driverName }}
              </option>
            </select>
          </base-input>
        </div>
        <div class="form-row" style="justify-content: space-between">
          <base-input
            required
            label="Truck"
            class="col-md-5 modal-input-label"
            :inputStyle="{
              'border-color': '#686868',
              color: '#686868',
            }"
          >
            <select
              :disabled="disableTruck"
              class="form-control"
              style="color: #686868"
              v-model="selectTruck"
            >
              <option :key="truck.id" v-for="truck in trucks">
                {{ truck.truckName }}
              </option>
            </select>
          </base-input>
          <base-input
            required
            label="Trailer"
            class="col-md-5 modal-input-label"
            :inputStyle="{
              'border-color': '#686868',
              color: '#686868',
            }"
          >
            <select
              :disabled="disableTrailer"
              class="form-control"
              style="color: #686868"
              v-model="selectTrailer"
            >
              <option :key="trailer.id" v-for="trailer in trailers">
                {{ trailer.trailerName }}
              </option>
            </select>
          </base-input>
        </div>

        <div class="form-row" style="justify-content: space-between">
          <base-input
            required
            label="Haul Type"
            class="col-md-5 modal-input-label"
            :inputStyle="{
              'border-color': '#686868',
              color: '#686868',
            }"
          >
            <select
              class="form-control"
              style="color: #686868"
              v-model="selectHaul"
            >
              <option :key="haul.id" v-for="haul in hauls">
                {{ haul.haulName }}
              </option>
            </select>
          </base-input>
          <base-input
            required
            label="Laden Type"
            class="col-md-5 modal-input-label"
            :inputStyle="{
              'border-color': '#686868',
              color: '#686868',
            }"
          >
            <select
              class="form-control"
              style="color: #686868"
              v-model="selectLadenType"
            >
              <option :key="ladenType.id" v-for="ladenType in ladenTypes">
                {{ ladenType.ladenName }}
              </option>
            </select>
          </base-input>
        </div>

        <div class="trip-footer">
          <base-button
            round
            type="primary"
            style="margin-right: 0px"
            @click="addTrip()"
            >Save</base-button
          >
        </div>
      </div>
      <!-- <div class="return-trip" v-if="!isReturn">
        <base-button @click="isReturn = true" type="primary" round
          >+ Create Return Trip</base-button
        >
      </div> -->
    </div>
    <modal :show.sync="tripModal">
      <h2
        slot="header"
        class="modal-title"
        style="color: #686868; font-weight: 600"
        id="modal-title-default"
      >
        Trip Form
      </h2>
      <div class="form-row" style="justify-content: space-between">
        <base-input
          class="col-md-5 modal-input-label"
          label="DO"
          type="text"
          placeholder="Name"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="deliveryOrder"
        >
        </base-input>
        <base-input
          required
          label="Route"
          class="col-md-5 modal-input-label"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
        >
          <select
            class="form-control"
            style="color: #686868"
            v-model="selectRoute"
          >
            <option :key="route.id" v-for="route in routes">
              {{ route.routeName }}
            </option>
          </select>
        </base-input>
      </div>
      <div class="form-row" style="justify-content: space-between">
        <base-input
          required
          label="From Warehouse"
          class="col-md-5 modal-input-label"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
        >
          <select
            class="form-control"
            style="color: #686868"
            v-model="fromWarehouse"
          >
            <option :key="warehouse.id" v-for="warehouse in warehouses">
              {{ warehouse.warehouseName }}
            </option>
          </select>
        </base-input>
        <base-input
          required
          label="To Warehouse"
          class="col-md-5 modal-input-label"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
        >
          <select
            class="form-control"
            style="color: #686868"
            v-model="toWarehouse"
          >
            <option :key="warehouse.id" v-for="warehouse in warehouses">
              {{ warehouse.warehouseName }}
            </option>
          </select>
        </base-input>
      </div>
      <div class="form-row" style="justify-content: space-between">
        <base-input
          disabled
          label="Mileage"
          class="col-md-5 modal-input-label"
          v-model="mileage"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
        >
        </base-input>
        <base-input
          label="ETA"
          class="col-md-5 modal-input-label"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
        >
          <el-date-picker
            type="date"
            style="color: black"
            placeholder="Start Date"
            v-model="eta"
          >
          </el-date-picker>
        </base-input>
      </div>

      <div class="form-row" style="justify-content: space-between">
        <base-input
          label="ETD"
          class="col-md-5 modal-input-label"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
        >
          <el-date-picker
            type="date"
            style="color: black"
            placeholder="Start Date"
            v-model="etd"
          >
          </el-date-picker>
        </base-input>
        <base-input
          required
          label="Driver"
          class="col-md-5 modal-input-label"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
        >
          <select
            :disabled="disableDriver"
            class="form-control"
            style="color: #686868"
            v-model="selectDriver"
          >
            <option :key="driver.id" v-for="driver in drivers">
              {{ driver.driverName }}
            </option>
          </select>
        </base-input>
      </div>
      <div class="form-row" style="justify-content: space-between">
        <base-input
          required
          label="Truck"
          class="col-md-5 modal-input-label"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
        >
          <select
            :disabled="disableTruck"
            class="form-control"
            style="color: #686868"
            v-model="selectTruck"
          >
            <option :key="truck.id" v-for="truck in trucks">
              {{ truck.truckName }}
            </option>
          </select>
        </base-input>
        <base-input
          required
          label="Trailer"
          class="col-md-5 modal-input-label"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
        >
          <select
            :disabled="disableTrailer"
            class="form-control"
            style="color: #686868"
            v-model="selectTrailer"
          >
            <option :key="trailer.id" v-for="trailer in trailers">
              {{ trailer.trailerName }}
            </option>
          </select>
        </base-input>
      </div>

      <div class="form-row" style="justify-content: space-between">
        <base-input
          required
          label="Haul Type"
          class="col-md-5 modal-input-label"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
        >
          <select
            class="form-control"
            style="color: #686868"
            v-model="selectHaul"
          >
            <option :key="haul.id" v-for="haul in hauls">
              {{ haul.haulName }}
            </option>
          </select>
        </base-input>
        <base-input
          required
          label="Laden Type"
          class="col-md-5 modal-input-label"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
        >
          <select
            class="form-control"
            style="color: #686868"
            v-model="selectLadenType"
          >
            <option :key="ladenType.id" v-for="ladenType in ladenTypes">
              {{ ladenType.ladenName }}
            </option>
          </select>
        </base-input>
      </div>
      <base-button @click="saveTrip(isEdit)" type="primary">Save</base-button>
    </modal>
  </div>
</template>
<script>
import { DatePicker } from "element-ui";
import moment from "moment";
import swal from "sweetalert2";
import TripCard from "./TripCard.vue";
import { Modal } from "src/components";

export default {
  components: {
    [DatePicker.name]: DatePicker,
    TripCard,
    Modal,
  },

  data() {
    return {
      isReturn: false,
      trips: [],
      tripModal: false,
      isEdit: false,
      editID: "",

      // MANAGEMENT
      warehouses: [],
      routes: [],
      drivers: [],
      trucks: [],
      trailers: [],
      hauls: [],
      ladenTypes: [],

      // LEVEL DROPDOWN
      disableDriver: true,
      disableTruck: true,
      disableTrailer: true,

      // FRONT FORM INPUT
      deliveryOrder: "",
      etd: "",
      eta: "",
      fromWarehouse: "",
      toWarehouse: "",
      selectRoute: "",
      selectDriver: "",
      selectTruck: "",
      selectTrailer: "",
      mileage: "",
      selectHaul: "",
      selectLadenType: "",
    };
  },
  computed: {},
  methods: {
    editTripModal(trip) {
      this.isEdit = true;
      this.tripModal = true;
      this.editID = trip.id;
      this.deliveryOrder = trip.DeliveryOrderNumber;
      this.selectRoute = trip.route;
      this.fromWarehouse = trip.from;
      this.toWarehouse = trip.to;
      this.mileage = trip.Mileage;
      this.eta = trip.EstTimeArrival;
      this.etd = trip.EstTimeDeparture;
      this.selectDriver = trip.driver;
      this.selectTruck = trip.truck;
      this.selectTrailer = trip.trailer;
      this.selectHaul = trip.haul;
      this.selectLadenType = trip.ladenType;
    },
    addTripModal() {
      this.tripModal = true;
      this.isEdit = false;
      this.deliveryOrder = "";
      this.selectRoute = "";
      this.fromWarehouse = "";
      this.toWarehouse = "";
      this.eta = "";
      this.etd = "";
      this.selectLadenType = "";
      this.selectDriver = "";
      this.selectTruck = "";
      this.selectTrailer = "";
      this.selectHaul = "";
      this.selectLadenType = "";
    },
    deleteTrip(id) {
      this.trips = this.trips.filter((item) => item.id != id);
    },

    saveTrip(isEdit) {
      if (
        this.deliveryOrder == "" ||
        this.selectRoute == "" ||
        this.fromWarehouse == "" ||
        this.toWarehouse == "" ||
        this.eta == "" ||
        this.etd == "" ||
        this.selectLadenType == ""
      )
        return swal.fire({
          type: "error",
          title: "Please fill in the required fields",
          showCancelButton: false,
          confirmButtonText: "Okay",
        });

      let fromID = this.warehouses.filter(
        (value) => value.warehouseName == this.fromWarehouse
      )[0].id;

      let toID = this.warehouses.filter(
        (value) => value.warehouseName == this.toWarehouse
      )[0].id;

      let routeID = this.routes.filter(
        (value) => value.routeName == this.selectRoute
      )[0].id;

      let driverID = null;
      if (this.selectDriver != "") {
        driverID = this.drivers.filter(
          (value) => value.driverName == this.selectDriver
        )[0].id;
      }

      let truckID = null;
      if (this.selectTruck != "") {
        truckID = this.trucks.filter(
          (value) => value.truckName == this.selectTruck
        )[0].id;
      }

      let trailerID = null;
      if (this.selectTrailer != "") {
        trailerID = this.trailers.filter(
          (value) => value.trailerName == this.selectTrailer
        )[0].id;
      }

      let haulTypeID = this.hauls.filter(
        (value) => value.haulName == this.selectHaul
      )[0].id;

      let ladenTypeID = this.ladenTypes.filter(
        (value) => value.ladenName == this.selectLadenType
      )[0].id;

      let id = "";
      if (isEdit) {
        id = this.editID;
      } else {
        id = Math.floor(Math.random() * 10000000);
      }

      let trip = {
        id: id,
        DeliveryOrderNumber: this.deliveryOrder,
        EstTimeDeparture: moment(this.etd).toISOString(),
        EstTimeArrival: moment(this.eta).toISOString(),
        FromWarehouseID: fromID,
        ToWarehouseID: toID,
        RouteID: routeID,
        Mileage: this.mileage,
        DriverID: driverID,
        TruckID: truckID,
        HaulTypeID: haulTypeID,
        TrailerID: trailerID,
        LadenTypeID: ladenTypeID,
        from: this.fromWarehouse,
        to: this.toWarehouse,
        route: this.selectRoute,
        driver: this.selectDriver,
        truck: this.selectTruck,
        haul: this.selectHaul,
        trailer: this.selectTrailer,
        trailer: this.selectTrailer,
        ladenType: this.selectLadenType,
      };

      if (isEdit) {
        for (let i = 0; i < this.trips.length; i++) {
          if (this.trips[i].id == id) {
            this.trips[i] = trip;
          }
        }
      } else {
        this.trips.push(trip);
      }

      // RESET
      this.deliveryOrder = "";
      this.selectRoute = "";
      this.fromWarehouse = "";
      this.toWarehouse = "";
      this.eta = "";
      this.etd = "";
      this.selectLadenType = "";
      this.selectDriver = "";
      this.selectTruck = "";
      this.selectTrailer = "";
      this.selectHaul = "";
      this.selectLadenType = "";

      this.tripModal = false;
    },
    async getHaul() {
      let res = await this.$http.get(`:6769/api/v1/setting/haul/type`);
      if (res.error) return;

      let data = res.message;

      for (let i = 0; i < data.length; i++) {
        let haul = {
          id: data[i].HaulTypeID,
          haulName: data[i].HaulTypeName,
        };
        this.hauls.push(haul);
      }
    },
    async getLaden() {
      let res = await this.$http.get(`:6769/api/v1/setting/laden/type`);
      console.log(res);
      if (res.error) return;

      let data = res.message;

      for (let i = 0; i < data.length; i++) {
        let ladenType = {
          id: data[i].LadenTypeID,
          ladenName: data[i].LadenTypeName,
        };
        this.ladenTypes.push(ladenType);
      }
    },
    async getMileage(from, to) {
      let fromID = this.warehouses.filter(
        (value) => value.warehouseName == from
      )[0].id;
      let toID = this.warehouses.filter((value) => value.warehouseName == to)[0]
        .id;

      if (fromID == toID) {
        this.fromWarehouse = "";
        this.toWarehouse = "";
        return swal.fire({
          type: "error",
          title: "Cannot fill in the same from and to warehouse!",
          showCancelButton: false,
          confirmButtonText: "Okay",
        });
      }

      let endpoint = `:6769/api/v1/trip/schedule/mileage?from=${fromID}&to=${toID}`;
      let res = await this.$http.get(endpoint);
      if (res.error) return;

      this.mileage = res.message;
    },
    async submit() {
      let payload = {
        Items: [],
      };

      let tempTrip = this.trips;

      for (let i = 0; i < tempTrip.length; i++) {
        delete tempTrip[i].id;
        delete tempTrip[i].from;
        delete tempTrip[i].to;
        delete tempTrip[i].route;
        delete tempTrip[i].driver;
        delete tempTrip[i].truck;
        delete tempTrip[i].haul;
        delete tempTrip[i].trailer;
        delete tempTrip[i].ladenType;

        payload.Items.push(this.trips[i]);
      }

      console.log(JSON.stringify(payload));

      let res = await this.$http.post(`:6769/api/v1/trip/schedule`, payload);
      console.log(res);
      if (!res.error) {
        swal
          .fire({
            type: "success",
            title: res.message,
            showCancelButton: false,
            confirmButtonText: "Okay",
          })
          .then((result) => {
            this.$router.push("/trip-overview");
          });
      } else {
        this.$router.push("/schedule");
      }
    },
    async getWarehouse() {
      let res = await this.$http.get(`:6769/api/v1/management/warehouse`);

      if (!res.error) {
        let data = res.message;

        for (let i = 0; i < data.length; i++) {
          let warehouse = {
            id: data[i].WarehouseID,
            warehouseName: data[i].WarehouseName,
          };

          this.warehouses.push(warehouse);
        }
      }
    },
    async getRoute() {
      let res = await this.$http.get(`:6769/api/v1/management/route`);

      if (!res.error) {
        let data = res.message;

        for (let i = 0; i < data.length; i++) {
          let route = {
            id: data[i].RouteID,
            routeName: data[i].RouteDescription,
          };

          this.routes.push(route);
        }
      }
    },
    async getDriver(date) {
      let res = await this.$http.get(
        `:6769/api/v1/trip/schedule/driver/available?date=${date}`
      );

      if (!res.error) {
        this.drivers = [];
        let data = res.message;

        for (let i = 0; i < data.length; i++) {
          let driver = {
            id: data[i].DriverID,
            driverName: data[i].DriverName,
            prefTruck: data[i].PreAssignedTruck,
          };

          this.drivers.push(driver);
        }
      }
    },
    async getTruck(date, prefTruck) {
      let res = await this.$http.get(
        `:6769/api/v1/trip/schedule/truck/available?date=${date}&truck=${prefTruck}`
      );

      if (!res.error) {
        this.trucks = [];
        let data = res.message;

        for (let i = 0; i < data.length; i++) {
          let truck = {
            id: data[i].TruckID,
            truckName: data[i].TruckRegistrationPlate,
          };

          this.trucks.push(truck);
        }
      }
    },
    async getTrailer(date, prefTruck) {
      let res = await this.$http.get(
        `:6769/api/v1/trip/schedule/trailer/available?date=${date}&truck=${prefTruck}`
      );

      if (!res.error) {
        this.trailers = [];
        let data = res.message;

        for (let i = 0; i < data.length; i++) {
          let trailer = {
            id: data[i].TrailerID,
            trailerName: data[i].TrailerNumber,
          };

          this.trailers.push(trailer);
        }
      }
    },
  },
  watch: {
    fromWarehouse: function (value) {
      if (value != "" && this.toWarehouse != "") {
        this.getMileage(value, this.toWarehouse);
      }
    },
    toWarehouse: function (value) {
      if (value != "" && this.fromWarehouse != "") {
        this.getMileage(this.fromWarehouse, value);
      }
    },
    etd: function (value) {
      if (value != "") {
        this.disableDriver = false;
        this.disableTruck = true;
        this.disableTrailer = true;
        this.selectDriver = "";
        this.selectTruck = "";
        this.selectTrailer = "";
        let date = moment(this.etd).format("YYYY-MM-DD");
        this.getDriver(date);
      } else {
        this.disableDriver = true;
      }
    },
    selectDriver: function (value) {
      if (value != "") {
        this.disableTruck = false;
        this.disableTrailer = false;

        let prefTruck = this.drivers.filter(
          (item) => item.driverName == value
        )[0].prefTruck;

        let date = moment(this.etd).format("YYYY-MM-DD");
        this.getTruck(date, prefTruck);
        this.getTrailer(date, prefTruck);
      } else {
        this.disableTruck = true;
        this.disableTrailer = true;
      }
    },
  },
  mounted() {
    this.getWarehouse();
    this.getRoute();
    this.getHaul();
    this.getLaden();
  },
  beforeDestroy() {},
};
</script>
<style >
.trip-modal {
  background-color: white;
  border-radius: 20px;
  padding-top: 30px;
  padding-bottom: 20px;
  padding-left: 40px;
  padding-right: 40px;
}

.trip-modal > h2 {
  color: #2e2e2ede;
  font-weight: 600;
}

.trip-modal > .trip-footer {
  padding: 0px;
  margin: 0px;
  margin-top: 20px;
  background-color: white;
  display: flex;
  justify-content: flex-end;
}

.trip-scroll {
  overflow-y: scroll;
  height: 54vh;
}
</style>
