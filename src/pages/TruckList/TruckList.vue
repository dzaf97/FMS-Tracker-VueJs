<template>
  <div class="row">
    <modal
      :show.sync="fileModal"
      footer-classes="justify-content-center"
      type="notice"
    >
      <h3 slot="header" class="modal-title">Upload CSV</h3>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-12 text-center">
            <label id="fileName">{{ fileName }}</label>
            <span class="btn btn-info btn-file">
              <span class="fileinput-new">Choose File</span>
              <input
                ref="fileupload"
                accept=".csv"
                type="file"
                class="valid"
                :multiple="false"
                aria-invalid="false"
                @change="uploadCSV"
              />
            </span>
          </div>
        </div>
      </div>
      <template slot="footer">
        <base-button
          class="mt-3"
          native-type="submit"
          type="success"
          @click="submitBatch()"
          >Submit</base-button
        >&nbsp;&nbsp;&nbsp;
        <base-button
          class="mt-3"
          type="danger"
          @click.native="fileModal = false"
          >Cancel</base-button
        >
      </template>
    </modal>
    <div class="col-lg-12" v-if="!this.$isPremium">
      <card>
        <el-table
          :header-cell-style="{
            background: 'transparent',
            border: 'transparent',
            'font-size': '18px',
            'font-weight': '400',
            'padding-bottom': '0%',
            'padding-right': '10px',
            color: 'white',
          }"
          :cell-style="{
            border: 'transparent',
            'font-size': '18px',
            'padding-right': '20px',
          }"
          :data="tableData"
          :height="730"
          :max-height="730"
        >
          <el-table-column
            min-width="150"
            sortable
            label="Opr No"
            property="oprNo"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Reg No"
            property="regNo"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Model"
            property="model"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            align="right"
            header-align="right"
            label="Maker"
            property="maker"
          ></el-table-column>
        </el-table>
      </card>
    </div>
    <div class="col-lg-12" v-if="this.$isPremium" style="margin-bottom: 20px">
      <div class="row">
        <div class="col-lg">
          <p>Maker:</p>
          <el-select
            class="select-primary"
            placeholder="Maker"
            v-model="setting.selectMaker"
          >
            <el-option
              v-for="maker in setting.makers"
              class="select-primary"
              :value="maker.value"
              :label="maker.label"
              :key="maker.label"
            >
            </el-option>
          </el-select>
        </div>
        <div class="col-lg-2">
          <p>Model:</p>
          <el-select
            class="select-primary"
            placeholder="Model"
            v-model="setting.selectModel"
            :disabled="isModelDisable"
          >
            <el-option
              v-for="model in setting.models"
              class="select-primary"
              :value="model.value"
              :label="model.label"
              :key="model.label"
            >
            </el-option>
          </el-select>
        </div>
        <div class="col-lg-2">
          <p>Yard:</p>
          <el-select
            class="select-primary"
            placeholder="Yard"
            v-model="setting.selectYard"
          >
            <el-option
              v-for="yard in setting.yards"
              class="select-primary"
              :value="yard.value"
              :label="yard.label"
              :key="yard.label"
            >
            </el-option>
          </el-select>
        </div>
        <div class="col-lg-6">
          <div class="row justify-content-end align-items-baseline">
            <base-button round type="primary" @click.native="addTruck()"
              >+ Add Truck</base-button
            >
            &nbsp; &nbsp;
            <base-button @click="fileModal = true" round type="primary"
              >+ Upload CSV</base-button
            >
            &nbsp; &nbsp;
            <base-input required style="margin-top: 25px; margin-right: 20px">
              <el-input
                style="width: 220px; border: 1px"
                type="search"
                clearable
                prefix-icon="el-icon-search"
                placeholder="Search OPR No/Reg No"
                v-model="searchQuery"
                aria-controls="datatables"
              >
              </el-input>
            </base-input>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-12" v-if="this.$isPremium">
      <card>
        <el-table
          :header-cell-style="{
            background: 'transparent',
            border: 'transparent',
            'font-size': '14px',
            'font-weight': '400',
            'padding-bottom': '0%',
            'padding-center': '10px',
            color: 'white',
          }"
          :cell-style="{
            border: 'transparent',
            'font-size': '14px',
            'padding-center': '20px',
          }"
          :data="tableData"
          :height="730"
          :max-height="730"
        >
          <el-table-column
            min-width="120"
            sortable
            label="Group"
            property="group"
          ></el-table-column>
          <el-table-column
            min-width="120"
            sortable
            label="Opr No"
            property="oprNo"
          ></el-table-column>
          <el-table-column
            min-width="120"
            sortable
            label="Reg No"
            property="regNo"
          >
            <template slot-scope="props">
              <router-link
                style="color: white"
                class="link footer-link"
                :to="{
                  name: 'Truck Info',
                  params: { regNo: props.row.regNo },
                }"
              >
                <p id="table-link">
                  {{ props.row.regNo }}
                </p>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            min-width="120"
            sortable
            align="right"
            header-align="right"
            label="Trailer No"
            property="trailerNo"
          ></el-table-column>
          <el-table-column
            min-width="120"
            sortable
            align="right"
            header-align="right"
            label="Size"
            property="size"
          ></el-table-column>
          <!-- <el-table-column
            min-width="150"
            sortable
            align="right"
            header-align="right"
            label="Group"
            property="group"
          ></el-table-column> -->
          <el-table-column
            min-width="200"
            sortable
            align="right"
            header-align="right"
            label="Model"
            property="model"
          ></el-table-column>
          <el-table-column
            min-width="200"
            sortable
            align="right"
            header-align="right"
            label="Maker"
            property="maker"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            align="right"
            header-align="right"
            label="Chassis No"
            property="chassisNo"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            align="right"
            header-align="right"
            label="Engine No"
            property="engineNo"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            align="right"
            header-align="right"
            label="Reg Date"
            property="regDate"
          ></el-table-column>
          <el-table-column
            min-width="120"
            sortable
            align="right"
            header-align="right"
            label="Year"
            property="year"
          ></el-table-column>
          <el-table-column
            min-width="120"
            sortable
            align="right"
            header-align="right"
            label="BGK"
            property="bgk"
          ></el-table-column>
          <el-table-column
            min-width="120"
            sortable
            align="right"
            header-align="right"
            label="BTM"
            property="btm"
          ></el-table-column>
          <el-table-column
            min-width="120"
            sortable
            align="right"
            header-align="right"
            label="BG1"
            property="bg1"
          ></el-table-column>
          <el-table-column
            min-width="120"
            sortable
            align="right"
            header-align="right"
            label="BG2"
            property="bg2"
          ></el-table-column>
          <el-table-column
            min-width="120"
            sortable
            align="right"
            header-align="right"
            label="BG3"
            property="bg3"
          ></el-table-column>
          <el-table-column
            min-width="120"
            sortable
            align="right"
            header-align="right"
            label="Permit No"
            property="permitNo"
          ></el-table-column>
          <el-table-column
            min-width="140"
            sortable
            align="right"
            header-align="right"
            label="Permit Type"
            property="permitType"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            align="right"
            header-align="right"
            label="BTM Trailer"
            property="btmTrailer"
          ></el-table-column>
          <el-table-column
            min-width="170"
            sortable
            align="right"
            header-align="right"
            label="Load Capacity"
            property="loadCapacity"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            align="right"
            header-align="right"
            label="Load"
            property="load"
          ></el-table-column>

          <el-table-column
            min-width="90"
            sortable
            align="center"
            header-align="center"
            label="Edit"
          >
            <template slot-scope="props">
              <div id="edit-table-btn" @click="editTruck(props.row.id)">
                <i class="fas fa-pencil-alt"></i>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </card>
    </div>
    <modal :show.sync="truckModal">
      <h2
        slot="header"
        class="modal-title"
        style="color: #686868; font-weight: 600"
        id="modal-title-default"
      >
        {{ isEdit ? "Edit" : "Create New" }} Truck
      </h2>

      <div class="form-row">
        <base-input
          required
          class="col-md-6 modal-input-label"
          label="Registration No"
          type="text"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="registerNo"
        >
        </base-input>
        <base-input
          required
          label="Yard"
          class="col-md-6 modal-input-label"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
        >
          <select
            class="form-control"
            style="color: #686868"
            v-model="selectYard"
          >
            <option :key="yard.id" v-for="yard in yards">
              {{ yard.yardName }}
            </option>
          </select>
        </base-input>
      </div>

      <div class="form-row">
        <base-input
          required
          label="Truck Status"
          class="col-md-6 modal-input-label"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
        >
          <select
            class="form-control"
            style="color: #686868"
            v-model="selectTruckStatus"
          >
            <option :key="truckStatus.id" v-for="truckStatus in truckStatuses">
              {{ truckStatus.truckStatusName }}
            </option>
          </select>
        </base-input>
        <base-input
          label="Pre-assigned Driver"
          class="col-md-6 modal-input-label"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
        >
          <select
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

      <div class="form-row">
        <base-input
          required
          label="Maker"
          class="col-md-6 modal-input-label"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
        >
          <select
            class="form-control"
            style="color: #686868"
            v-model="selectMaker"
          >
            <option :key="maker.id" v-for="maker in makers">
              {{ maker.truckMakerName }}
            </option>
          </select>
        </base-input>
        <base-input
          required
          label="Model"
          class="col-md-6 modal-input-label"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
        >
          <select
            class="form-control"
            style="color: #686868"
            v-model="selectModel"
            :disabled="isDisable"
          >
            <option :key="model.id" v-for="model in models">
              {{ model.truckModelName }}
            </option>
          </select>
        </base-input>
      </div>

      <div class="form-row">
        <base-input
          required
          label="Group"
          class="col-md-6 modal-input-label"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
        >
          <select
            class="form-control"
            style="color: #686868"
            v-model="selectGroup"
          >
            <option :key="group.id" v-for="group in groups">
              {{ group.groupName }}
            </option>
          </select>
        </base-input>
        <base-input
          required
          label="Date Registered"
          class="col-md-6 modal-input-label"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
        >
          <el-date-picker
            type="date"
            style="color: black"
            v-model="dateRegistered"
          >
          </el-date-picker>
        </base-input>
      </div>

      <div class="form-row">
        <base-input
          required
          class="col-md-6 modal-input-label"
          label="Chassis No"
          type="text"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="chassisNo"
        >
        </base-input>
        <base-input
          required
          class="col-md-6 modal-input-label"
          label="Engine No"
          type="text"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="engineNo"
        >
        </base-input>
      </div>

      <div class="form-row">
        <base-input
          required
          class="col-md-6 modal-input-label"
          label="BTM"
          type="text"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="btm"
        >
        </base-input>
        <base-input
          required
          class="col-md-6 modal-input-label"
          label="BDM"
          type="text"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="bdm"
        >
        </base-input>
      </div>

      <div class="form-row">
        <base-input
          required
          class="col-md-6 modal-input-label"
          label="BGK"
          type="text"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="bgk"
        >
        </base-input>
        <base-input
          required
          class="col-md-6 modal-input-label"
          label="BG1"
          type="text"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="bg1"
        >
        </base-input>
      </div>

      <div class="form-row">
        <base-input
          required
          class="col-md-6 modal-input-label"
          label="BG2"
          type="text"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="bg2"
        >
        </base-input>
        <base-input
          required
          class="col-md-6 modal-input-label"
          label="BG3"
          type="text"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="bg3"
        >
        </base-input>
      </div>

      <div class="form-row">
        <base-input
          required
          label="Permit"
          class="col-md-6 modal-input-label"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
        >
          <select
            class="form-control"
            style="color: #686868"
            v-model="selectPermit"
          >
            <option :key="permit.id" v-for="permit in permits">
              {{ permit.permitTypeName }}
            </option>
          </select>
        </base-input>
        <base-input
          required
          class="col-md-6 modal-input-label"
          label="Permit No"
          type="text"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="permitNo"
        >
        </base-input>
      </div>

      <div class="form-row">
        <base-input
          required
          class="col-md-6 modal-input-label"
          label="Year"
          type="text"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
        >
          <el-date-picker v-model="year" type="year" placeholder="Year">
          </el-date-picker>
        </base-input>
        <base-input
          required
          class="col-md-6 modal-input-label"
          label="Opr No"
          type="text"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="oprNo"
        >
        </base-input>
      </div>

      <div class="form-row">
        <base-input
          required
          class="col-md-6 modal-input-label"
          label="Size"
          type="text"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="size"
        >
        </base-input>
      </div>

      <base-button
        @click="isEdit ? submitTruck(true) : submitTruck(false)"
        type="primary"
        >Save</base-button
      >
    </modal>
  </div>
</template>
<script>
import { Table, TableColumn, Select, Option, DatePicker } from "element-ui";
import { Modal } from "src/components";
import swal from "sweetalert2";
import moment from "moment";
import { debounce } from "src/util/debounce";

export default {
  components: {
    Modal,
    [DatePicker.name]: DatePicker,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },

  data() {
    return {
      nonPremiumTable: [],
      tableData: [],
      store: [],
      truckModal: false,
      isEdit: false,
      searchQuery: "",

      // FILE CSV ATTRIBUTE
      payloadCSV: [],
      fileName: "No File Selected",
      fileModal: false,

      // FILTER DROPDOWN
      setting: {
        selectYard: "",
        selectModel: "",
        selectMaker: "",
        yards: [
          {
            value: "all",
            label: "All",
          },
        ],
        models: [
          {
            value: "all",
            label: "All",
          },
        ],
        makers: [
          {
            value: "all",
            label: "All",
          },
        ],
      },
      isModelDisable: true,

      // SETTINGS ATTRIBUTE
      drivers: [],
      yards: [],
      storeModels: [],
      models: [],
      truckStatuses: [],
      makers: [],
      groups: [],
      permits: [],

      // MODAL FORM
      truckID: "",
      registerNo: "",
      selectYard: "",
      selectTruckStatus: "",
      selectDriver: "",
      selectModel: "",
      selectMaker: "",
      selectGroup: "",
      dateRegistered: "",
      chassisNo: "",
      engineNo: "",
      btm: "",
      bdm: "",
      bgk: "",
      bg1: "",
      bg2: "",
      bg3: "",
      selectPermit: "",
      permitNo: "",
      year: "",
      oprNo: "",
      size: "",
    };
  },
  computed: {},
  methods: {
    uploadCSV(e) {
      this.payloadCSV = [];
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      this.fileName = file.name;

      reader.onload = async (e) => {
        let header;
        let lines = [];
        let csv = e.target.result; // Content from file
        let allTextLines = csv.split(/\r\n|\n/);
        for (let i = 0; i < allTextLines.length; i++) {
          if (i == 0) {
            header = allTextLines[i].split(",");
          } else {
            lines.push(allTextLines[i].split(","));
          }
        }
        console.log(lines);

        for (let i = 0; i < lines.length; i++) {
          // TRUCK STATUS
          let truckStatusID;
          if (
            this.truckStatuses.filter(
              (value) => value.truckStatusName === lines[i][1]
            ).length > 0
          ) {
            for (let j = 0; j < this.truckStatuses.length; j++) {
              if (this.truckStatuses[j].truckStatusName == lines[i][1]) {
                truckStatusID = this.truckStatuses[j].id;
              }
            }
          } else {
            this.fileModal = false;
            this.$refs.fileupload.value = null;
            this.fileName = "";
            return swal({
              type: "error",
              title: `Truck Status on line ${i + 1} does not exist!`,
            });
          }

          // MODEL
          let truckModelID;
          if (
            this.storeModels.filter(
              (value) => value.truckModelName === lines[i][3]
            ).length > 0
          ) {
            for (let j = 0; j < this.storeModels.length; j++) {
              if (this.storeModels[j].truckModelName == lines[i][3]) {
                truckModelID = this.storeModels[j].id;
              }
            }
          } else {
            this.fileModal = false;
            this.$refs.fileupload.value = null;
            this.fileName = "";
            return swal({
              type: "error",
              title: `Model on line ${i + 1} does not exist!`,
            });
          }

          // PERMIT TYPE
          let permitTypeID;
          if (
            this.permits.filter(
              (value) => value.permitTypeName === lines[i][16]
            ).length > 0
          ) {
            for (let j = 0; j < this.permits.length; j++) {
              if (this.permits[j].permitTypeName == lines[i][16]) {
                permitTypeID = this.permits[j].id;
              }
            }
          } else {
            this.fileModal = false;
            this.$refs.fileupload.value = null;
            this.fileName = "";
            return swal({
              type: "error",
              title: `Permit on line ${i + 1} does not exist!`,
            });
          }

          // YARD
          let yardID;
          if (
            this.yards.filter((value) => value.yardName === lines[i][18])
              .length > 0
          ) {
            for (let j = 0; j < this.yards.length; j++) {
              if (this.yards[j].yardName == lines[i][18]) {
                yardID = this.yards[j].id;
              }
            }
          } else {
            this.fileModal = false;
            this.$refs.fileupload.value = null;
            this.fileName = "";
            return swal({
              type: "error",
              title: `Yard on line ${i + 1} does not exist!`,
            });
          }

          // GROUP
          let groupID;
          if (
            this.groups.filter((value) => value.groupName === lines[i][19])
              .length > 0
          ) {
            for (let j = 0; j < this.groups.length; j++) {
              if (this.groups[j].groupName == lines[i][19]) {
                groupID = this.groups[j].id;
              }
            }
          } else {
            this.fileModal = false;
            this.$refs.fileupload.value = null;
            this.fileName = "";
            return swal({
              type: "error",
              title: `Group on line ${i + 1} does not exist!`,
            });
          }

          // DRIVER
          let driverID = "";
          if (
            this.drivers.filter((value) => value.driverName === lines[i][20])
              .length > 0
          ) {
            for (let j = 0; j < this.drivers.length; j++) {
              if (this.drivers[j].driverName == lines[i][20]) {
                driverID = this.drivers[j].id;
              }
            }
          } else {
            if (lines[i][20] != "") {
              this.fileModal = false;
              this.$refs.fileupload.value = null;
              this.fileName = "";

              return swal({
                type: "error",
                title: `Driver on line ${i + 1} does not exist!`,
              });
            }
          }

          let truck = {
            TruckRegistrationPlate: lines[i][0],
            TruckStatusID: truckStatusID,
            TruckModelID: truckModelID,
            OprNumber: lines[i][4],
            ChassisNo: lines[i][5],
            EngineNo: lines[i][6],
            LoadCapacity: lines[i][7],
            DateRegistered: moment(lines[i][8]).toISOString(),
            BTM: lines[i][9],
            BDM: lines[i][10],
            BGK: lines[i][11],
            BG1: lines[i][12],
            BG2: lines[i][13],
            BG3: lines[i][14],
            Size: lines[i][15],
            PermitTypeID: permitTypeID,
            PermitNo: lines[i][17],
            YardID: yardID,
            GroupID: groupID,
            PreAssignedDriver: driverID != "" ? driverID : null,
            Year: lines[i][21],
          };
          this.payloadCSV.push(truck);
        }
        console.log("SINII");
        console.log(this.payloadCSV);
        this.$refs.fileupload.value = null;
      };
    },
    async submitBatch() {
      let payload = {
        Items: this.payloadCSV,
      };

      console.log(payload);
      let res = await this.$http.post(`:6769/api/v1/management/truck`, payload);

      if (!res.error) {
        this.getTruck();
        swal
          .fire({
            type: "success",
            title: res.message,
            showCancelButton: false,
            confirmButtonText: "Okay",
          })
          .then((result) => {
            if (result.value) {
              this.fileModal = false;
            }
          });
      } else {
        swal
          .fire({
            type: "error",
            title: res.message,
            showCancelButton: false,
            confirmButtonText: "Okay",
          })
          .then((result) => {
            this.fileModal = false;
          });
      }
    },
    async submitTruck(isEdit) {
      let truckStatusID;
      this.truckStatuses.forEach((value) => {
        if (this.selectTruckStatus == value.truckStatusName)
          truckStatusID = value.id;
      });

      let truckModelID;
      this.models.forEach((value) => {
        if (this.selectModel == value.truckModelName) truckModelID = value.id;
      });

      let permitTypeID;
      this.permits.forEach((value) => {
        if (this.selectPermit == value.permitTypeName) permitTypeID = value.id;
      });

      let yardID;
      this.yards.forEach((value) => {
        if (this.selectYard == value.yardName) yardID = value.id;
      });

      let groupID;
      this.groups.forEach((value) => {
        if (this.selectGroup == value.groupName) groupID = value.id;
      });

      let driverID;
      this.drivers.forEach((value) => {
        if (this.selectDriver == value.driverName) driverID = value.id;
      });

      if (
        this.registerNo == "" ||
        this.oprNo == "" ||
        this.chassisNo == "" ||
        this.engineNo == "" ||
        this.dateRegistered == "" ||
        this.btm == "" ||
        this.bdm == "" ||
        this.bgk == "" ||
        this.bg1 == "" ||
        this.bg2 == "" ||
        this.bg3 == "" ||
        this.size == "" ||
        this.permitNo == "" ||
        this.year == "" ||
        this.selectYard == "" ||
        this.selectTruckStatus == "" ||
        this.selectModel == "" ||
        this.selectMaker == "" ||
        this.selectGroup == ""
      ) {
        return swal.fire({
          type: "error",
          title: "Please fill in all the required fields",
          showCancelButton: false,
          confirmButtonText: "Okay",
        });
      }

      let payload = {
        Items: [
          {
            TruckRegistrationPlate: this.registerNo,
            TruckStatusID: truckStatusID,
            TruckModelID: truckModelID,
            OprNumber: this.oprNo,
            ChassisNo: this.chassisNo,
            EngineNo: this.engineNo,
            DateRegistered: moment(this.dateRegistered).toISOString(),
            BTM: this.btm,
            BDM: this.bdm,
            BGK: this.bgk,
            BG1: this.bg1,
            BG2: this.bg2,
            BG3: this.bg3,
            Size: this.size,
            PermitTypeID: permitTypeID,
            PermitNo: this.permitNo,
            YardID: yardID,
            GroupID: groupID,
            PreAssignedDriver: driverID != "" ? driverID : null,
            Year: this.year,
          },
        ],
      };
      console.log(payload.Items);
      console.log(this.truckID);

      if (!isEdit) {
        let res = await this.$http.post(
          `:6769/api/v1/management/truck`,
          payload
        );

        if (!res.error) {
          this.getTruck();
          swal
            .fire({
              type: "success",
              title: res.message,
              showCancelButton: false,
              confirmButtonText: "Okay",
            })
            .then((result) => {
              if (result.value) {
                this.truckModal = false;
              }
            });
        } else {
          swal
            .fire({
              type: "error",
              title: res.message,
              showCancelButton: false,
              confirmButtonText: "Okay",
            })
            .then((result) => {
              this.truckModal = false;
            });
        }
      } else {
        let res = await this.$http.put(
          `:6769/api/v1/management/truck/${this.truckID}`,
          payload.Items[0]
        );

        if (!res.error) {
          this.getTruck();
          swal
            .fire({
              type: "success",
              title: res.message,
              showCancelButton: false,
              confirmButtonText: "Okay",
            })
            .then((result) => {
              if (result.value) {
                this.truckModal = false;
              }
            });
        } else {
          swal
            .fire({
              type: "error",
              title: res.message,
              showCancelButton: false,
              confirmButtonText: "Okay",
            })
            .then((result) => {
              this.truckModal = false;
            });
        }
      }
    },
    addTruck() {
      this.isEdit = false;
      this.truckModal = true;

      this.registerNo = "";
      this.oprNo = "";
      this.dateRegistered = "";
      this.chassisNo = "";
      this.engineNo = "";
      this.btm = "";
      this.bdm = "";
      this.bgk = "";
      this.bg1 = "";
      this.bg2 = "";
      this.bg3 = "";
      this.permitNo = "";
      this.size = "";
      this.year = "";
      this.selectModel = "";
      this.selectMaker = "";
      this.selectPermit = "";
      this.selectYard = "";
      this.selectTruckStatus = "";
      this.selectDriver = "";
      this.selectGroup = "";
    },
    async editTruck(truckID) {
      this.truckID = truckID;
      this.isEdit = true;
      this.truckModal = true;
      let res = await this.$http.get(
        `:6769/api/v1/management/truck/${truckID}`
      );
      if (!res.error) {
        let data = res.message;
        this.registerNo = data.TruckRegistrationPlate;
        this.oprNo = data.OprNumber;
        this.dateRegistered = data.DateRegistered;
        this.chassisNo = data.ChassisNo;
        this.engineNo = data.EngineNo;
        this.btm = data.BTM;
        this.bdm = data.BDM;
        this.bgk = data.BGK;
        this.bg1 = data.BG1;
        this.bg2 = data.BG2;
        this.bg3 = data.BG3;
        this.permitNo = data.PermitNo;
        this.size = data.Size;
        this.year = data.Year;

        let makerID;
        this.models.forEach((value) => {
          if (value.id == data.TruckModelID) {
            makerID = value.truckMakerID;
            this.selectModel = value.truckModelName;
          }
        });

        this.makers.forEach((value) => {
          if (value.id == makerID) this.selectMaker = value.truckMakerName;
        });

        this.permits.forEach((value) => {
          if (value.id == data.PermitTypeID)
            this.selectPermit = value.permitTypeName;
        });

        this.yards.forEach((value) => {
          if (value.id == data.YardID) this.selectYard = value.yardName;
        });

        this.truckStatuses.forEach((value) => {
          if (value.id == data.TruckStatusID)
            this.selectTruckStatus = value.truckStatusName;
        });

        this.drivers.forEach((value) => {
          if (value.id == data.PreAssignedDriver)
            this.selectDriver = value.driverName;
        });

        this.groups.forEach((value) => {
          if (value.id == data.GroupID) this.selectGroup = value.groupName;
        });
      }
    },

    async getDriver() {
      let res = await this.$http.get(`:6769/api/v1/management/driver`);

      if (!res.error) {
        this.drivers = [];
        let data = res.message;
        for (let i = 0; i < data.length; i++) {
          let driver = {
            id: data[i].DriverID,
            driverName: data[i].DriverName,
          };

          this.drivers.push(driver);
        }
      }
    },
    async getModel() {
      let res = await this.$http.get(`:6769/api/v1/setting/truck/truck-model`);

      if (!res.error) {
        this.models = [];
        let data = res.message;
        for (let i = 0; i < data.length; i++) {
          let model = {
            id: data[i].TruckModelID,
            truckModelName: data[i].TruckModelName,
            truckMakerID: data[i].TruckMakerID,
          };

          let modelFilter = {
            value: data[i].TruckModelID,
            label: data[i].TruckModelName,
            truckMakerID: data[i].TruckMakerID,
          };

          this.models.push(model);
          this.storeModels.push(model);
          this.setting.models.push(modelFilter);
        }
      }
    },
    async getYard() {
      let res = await this.$http.get(`:6769/api/v1/management/yard`);

      if (!res.error) {
        this.yards = [];
        let data = res.message;
        for (let i = 0; i < data.length; i++) {
          let yard = {
            id: data[i].YardID,
            yardName: data[i].YardName,
          };

          let yardFilter = {
            value: data[i].YardID,
            label: data[i].YardName,
          };

          this.yards.push(yard);
          this.setting.yards.push(yardFilter);
        }
      }
    },
    async getTruckStatus() {
      let res = await this.$http.get(`:6769/api/v1/setting/truck/truck-status`);

      if (!res.error) {
        this.truckStatuses = [];
        let data = res.message;
        for (let i = 0; i < data.length; i++) {
          let truckStatus = {
            id: data[i].TruckStatusID,
            truckStatusName: data[i].TruckStatusName,
          };

          this.truckStatuses.push(truckStatus);
        }
      }
    },
    async getMaker() {
      let res = await this.$http.get(`:6769/api/v1/setting/truck/truck-maker`);

      if (!res.error) {
        this.makers = [];
        let data = res.message;
        for (let i = 0; i < data.length; i++) {
          let maker = {
            id: data[i].TruckMakerID,
            truckMakerName: data[i].TruckMakerName,
          };

          let makerFilter = {
            value: data[i].TruckMakerID,
            label: data[i].TruckMakerName,
          };

          this.makers.push(maker);
          this.setting.makers.push(makerFilter);
        }
      }
    },
    async getGroup() {
      let res = await this.$http.get(`:6769/api/v1/management/group`);

      if (!res.error) {
        this.groups = [];
        let data = res.message;
        for (let i = 0; i < data.length; i++) {
          let group = {
            id: data[i].GroupID,
            groupName: data[i].GroupName,
          };

          this.groups.push(group);
        }
      }
    },
    async getPermit() {
      let res = await this.$http.get(`:6769/api/v1/setting/permit-type`);

      if (!res.error) {
        this.permits = [];
        let data = res.message;
        for (let i = 0; i < data.length; i++) {
          let permit = {
            id: data[i].PermitTypeID,
            permitTypeName: data[i].PermitTypeName,
          };

          this.permits.push(permit);
        }
      }
    },
    async getNonPremiumTruck(companyID) {
      let res = await this.$http.get(`/api/v1/manage/lorry/${companyID}`);
      console.log(res);

      if (!res.error) {
        this.nonPremiumTable = [];
        let data = res.message;
        for (let i = 0; i < data.length; i++) {
          let truck = {
            id: i,
            oprNo: data[i].SWNo,
            regNo: data[i].LorryRegNo,
            model: data[i].Model,
            maker: data[i].Maker,
          };

          this.nonPremiumTable.push(truck);
        }
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
            id: data[i].TruckID,
            group: data[i].GroupName,
            oprNo: data[i].OprNumber,
            regNo: data[i].TruckRegistrationPlate,
            trailerNo: data[i].TrailerNumber,
            size: data[i].Size,
            model: data[i].Model,
            maker: data[i].Maker,
            chassisNo: data[i].ChassisNo,
            engineNo: data[i].EngineNo,
            regDate: data[i].DateRegistered,
            year: data[i].Year,
            bgk: data[i].BGK,
            btm: data[i].BTM,
            bg1: data[i].BG1,
            bg2: data[i].BG2,
            bg3: data[i].BG3,
            permitNo: data[i].PermitNo,
            permitType: data[i].PermitTypeName,
            btmTrailer: data[i].TrailerBTM,
            loadCapacity: data[i].LoadCapacity,
            load: "-",
          };
          this.tableData.push(truck);
          this.store.push(truck);
        }
      }
    },

    async storeTruckData(data) {
      let res = await data;
      console.log(res);
      if (!res.error) {
        this.tableData = [];
        this.store = [];
        let data = res.message;
        for (let i = 0; i < data.length; i++) {
          let truck = {
            id: data[i].TruckID,
            group: data[i].GroupName,
            oprNo: data[i].OprNumber,
            regNo: data[i].TruckRegistrationPlate,
            trailerNo: data[i].TrailerNumber,
            size: data[i].Size,
            model: data[i].Model,
            maker: data[i].Maker,
            chassisNo: data[i].ChassisNo,
            engineNo: data[i].EngineNo,
            regDate: data[i].DateRegistered,
            year: data[i].Year,
            bgk: data[i].BGK,
            btm: data[i].BTM,
            bg1: data[i].BG1,
            bg2: data[i].BG2,
            bg3: data[i].BG3,
            permitNo: data[i].PermitNo,
            permitType: data[i].PermitTypeName,
            btmTrailer: data[i].TrailerBTM,
            loadCapacity: data[i].LoadCapacity,
            load: "-",
          };
          this.tableData.push(truck);
          this.store.push(truck);
        }
      }
    },
  },
  mounted() {
    // let token = JSON.parse(atob(sessionStorage.getItem("token").split(".")[1]));
    // this.getNonPremiumTruck(token.Companyid);
    this.getTruck();
    this.getYard();
    this.getTruckStatus();
    this.getMaker();
    this.getGroup();
    this.getPermit();
    this.getDriver();
    this.getModel();

    this.setting.selectYard = "all";
    this.setting.selectModel = "all";
    this.setting.selectMaker = "all";
  },
  beforeDestroy() {},
  computed: {
    isDisable: function () {
      return this.selectMaker == "" ? true : false;
    },
  },
  watch: {
    selectMaker: function (maker) {
      let makerID;

      if (maker != "") {
        this.makers.forEach((value) => {
          if (value.truckMakerName == maker) makerID = value.id;
        });
        this.models = this.storeModels.filter(
          (value) => value.truckMakerID == makerID
        );
      } else {
        this.models = this.storeModels;
      }
    },
    searchQuery: debounce(function (search) {
      if (search != "") {
        this.tableData = this.store.filter(
          (value) =>
            value.regNo.toLowerCase().includes(search.toLowerCase()) ||
            value.oprNo.toLowerCase().includes(search.toLowerCase())
        );
      } else {
        this.tableData = this.store;
      }
    }, 500),
    "setting.selectYard": async function (selected) {
      const MAKER = this.setting.selectMaker;
      const MODEL = this.setting.selectModel;
      const YARD = this.setting.selectYard;

      if (YARD != "all") {
        if (MAKER != "all" && MODEL != "all") {
          let res = await this.$http.get(
            `:6769/api/v1/management/truck?maker=${MAKER}&model=${MODEL}&yard=${YARD}`
          );
          this.storeTruckData(res);
        } else if (MAKER != "all" && MODEL == "all") {
          let res = await this.$http.get(
            `:6769/api/v1/management/truck?maker=${MAKER}&yard=${YARD}`
          );
          this.storeTruckData(res);
        } else if (MAKER == "all" && MODEL == "all") {
          let res = await this.$http.get(
            `:6769/api/v1/management/truck?yard=${YARD}`
          );
          this.storeTruckData(res);
        }
      } else {
        if (MAKER != "all" && MODEL != "all") {
          let res = await this.$http.get(
            `:6769/api/v1/management/truck?maker=${MAKER}&model=${MODEL}`
          );
          this.storeTruckData(res);
        } else if (MAKER != "all" && MODEL == "all") {
          let res = await this.$http.get(
            `:6769/api/v1/management/truck?maker=${MAKER}`
          );
          this.storeTruckData(res);
        } else if (MAKER == "all" && MODEL == "all") {
          let res = await this.$http.get(`:6769/api/v1/management/truck`);
          this.storeTruckData(res);
        }
      }
    },
    "setting.selectModel": async function (selected) {
      const MAKER = this.setting.selectMaker;
      const MODEL = this.setting.selectModel;
      const YARD = this.setting.selectYard;

      if (MODEL != "all") {
        if (YARD != "all") {
          let res = await this.$http.get(
            `:6769/api/v1/management/truck?maker=${MAKER}&model=${MODEL}&yard=${YARD}`
          );
          this.storeTruckData(res);
        } else if (YARD == "all") {
          let res = await this.$http.get(
            `:6769/api/v1/management/truck?maker=${MAKER}&model=${MODEL}`
          );
          this.storeTruckData(res);
        }
      } else {
        if (YARD != "all") {
          let res = await this.$http.get(
            `:6769/api/v1/management/truck?maker=${MAKER}&yard=${YARD}`
          );
          this.storeTruckData(res);
        } else if (YARD == "all") {
          let res = await this.$http.get(
            `:6769/api/v1/management/truck?maker=${MAKER}`
          );
          this.storeTruckData(res);
        }
      }
    },
    "setting.selectMaker": async function (selected) {
      const MAKER = this.setting.selectMaker;
      const YARD = this.setting.selectYard;
      this.setting.models = [
        {
          value: "all",
          label: "All",
        },
      ];
      this.setting.selectModel = "all";

      if (MAKER != "all") {
        this.isModelDisable = false;
        this.storeModels.forEach((value) => {
          if (selected == value.truckMakerID) {
            this.setting.models.push({
              value: value.id,
              label: value.truckModelName,
            });
          }
        });

        if (YARD != "all") {
          let res = await this.$http.get(
            `:6769/api/v1/management/truck?maker=${MAKER}&yard=${YARD}`
          );
          this.storeTruckData(res);
        } else if (YARD == "all") {
          let res = await this.$http.get(
            `:6769/api/v1/management/truck?maker=${MAKER}`
          );
          this.storeTruckData(res);
        }
      } else {
        this.isModelDisable = true;
        if (YARD != "all") {
          let res = await this.$http.get(
            `:6769/api/v1/management/truck?yard=${YARD}`
          );
          this.storeTruckData(res);
        } else if (YARD == "all") {
          let res = await this.$http.get(`:6769/api/v1/management/truck`);
          this.storeTruckData(res);
        }
      }
    },
  },
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
