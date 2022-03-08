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
      <template slot="footer" style="padding-bottom: 20px !important">
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
    <div class="col-lg-6" style="margin-bottom: 20px">
      <base-button round type="primary" @click.native="addWarehouse()"
        >+ Add Trailer</base-button
      >
    </div>
    <div class="col-lg-6">
      <div class="row flex-row-reverse">
        <base-input style="margin-top: 5px; margin-right: 20px">
          <el-input
            type="search"
            clearable
            prefix-icon="el-icon-search"
            placeholder="Search Trailer No"
            v-model="searchQuery"
            aria-controls="datatables"
          >
          </el-input>
        </base-input>
        <base-button
          style="margin-right: 20px"
          class="justify-content-right"
          round
          type="primary"
          @click="fileModal = true"
          >+ Upload CSV</base-button
        >
      </div>
    </div>
    <div class="col-lg-12">
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
            min-width="130"
            sortable
            label="Trailer No"
            property="trailerNo"
          ></el-table-column>
          <el-table-column
            min-width="130"
            sortable
            align="center"
            header-align="center"
            label="Trailer Type"
            property="trailerType"
          ></el-table-column>
          <el-table-column
            min-width="130"
            sortable
            label="Reg Date"
            property="regDate"
          ></el-table-column>
          <el-table-column
            min-width="100"
            sortable
            label="BGK"
            property="bgk"
          ></el-table-column>
          <el-table-column
            min-width="100"
            sortable
            align="center"
            header-align="center"
            label="BDM"
            property="bdm"
          ></el-table-column>
          <el-table-column
            min-width="100"
            sortable
            align="center"
            header-align="center"
            label="BTM"
            property="btm"
          ></el-table-column>
          <el-table-column
            min-width="100"
            sortable
            align="center"
            header-align="center"
            label="BG 1"
            property="bg1"
          ></el-table-column>
          <el-table-column
            min-width="100"
            sortable
            align="center"
            header-align="center"
            label="BG 2"
            property="bg2"
          ></el-table-column>
          <el-table-column
            min-width="100"
            sortable
            align="center"
            header-align="center"
            label="BG 3"
            property="bg3"
          ></el-table-column>
          <el-table-column
            min-width="130"
            sortable
            align="center"
            header-align="center"
            label="Permit No"
            property="permitNo"
          ></el-table-column>
          <el-table-column
            min-width="130"
            sortable
            align="center"
            header-align="center"
            label="Permit Type"
            property="permitType"
          ></el-table-column>

          <el-table-column
            min-width="180"
            sortable
            align="center"
            header-align="center"
            label="Load Capacity"
            property="loadCapacity"
          ></el-table-column>
          <el-table-column
            min-width="130"
            sortable
            align="center"
            header-align="center"
            label="Status"
            property="status"
          ></el-table-column>
          <el-table-column
            min-width="90"
            sortable
            align="center"
            header-align="center"
            label="Edit"
          >
            <template slot-scope="props">
              <div id="edit-table-btn" @click="editTrailer(props.row.id)">
                <i class="fas fa-pencil-alt"></i>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </card>
    </div>
    <modal :show.sync="trailerModal">
      <h2
        slot="header"
        class="modal-title"
        style="color: #686868; font-weight: 600"
        id="modal-title-default"
      >
        {{ isEdit ? "Edit" : "Create New" }} Trailer
      </h2>
      <div class="form-row">
        <base-input
          class="col-md-6 modal-input-label"
          label="Trailer No"
          type="text"
          placeholder="Trailer No"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="trailerNo"
        >
        </base-input>
        <base-input
          label="Trailer Type"
          class="col-md-6 modal-input-label"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
        >
          <select
            class="form-control"
            style="color: #686868"
            v-model="selectTrailerType"
          >
            <option :key="trailerType.id" v-for="trailerType in trailerTypes">
              {{ trailerType.trailerTypeName }}
            </option>
          </select>
        </base-input>
      </div>

      <div class="form-row">
        <base-input
          label="Trailer Status"
          class="col-md-6 modal-input-label"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
        >
          <select
            class="form-control"
            style="color: #686868"
            v-model="selectTrailerStatus"
          >
            <option
              :key="trailerStatus.id"
              v-for="trailerStatus in trailerStatuses"
            >
              {{ trailerStatus.trailerStatusName }}
            </option>
          </select>
        </base-input>
        <base-input
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
            placeholder="Date Registered"
            v-model="dateRegistered"
          >
          </el-date-picker>
        </base-input>
      </div>

      <div class="form-row">
        <base-input
          class="col-md-6 modal-input-label"
          label="BTM"
          type="text"
          placeholder="BTM"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="btm"
        >
        </base-input>
        <base-input
          class="col-md-6 modal-input-label"
          label="BDM"
          type="text"
          placeholder="BDM"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="bdm"
        >
        </base-input>
      </div>

      <div class="form-row">
        <base-input
          class="col-md-6 modal-input-label"
          label="BGK"
          type="text"
          placeholder="BGK"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="bgk"
        >
        </base-input>
        <base-input
          class="col-md-6 modal-input-label"
          label="BG1"
          type="text"
          placeholder="BG1"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="bg1"
        >
        </base-input>
      </div>

      <div class="form-row">
        <base-input
          class="col-md-6 modal-input-label"
          label="BG2"
          type="text"
          placeholder="BG2"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="bg2"
        >
        </base-input>
        <base-input
          class="col-md-6 modal-input-label"
          label="BG3"
          type="text"
          placeholder="BG3"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="bg3"
        >
        </base-input>
      </div>

      <div class="form-row">
        <base-input
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
            <option :key="permitType.id" v-for="permitType in permitTypes">
              {{ permitType.permitTypeName }}
            </option>
          </select>
        </base-input>
        <base-input
          class="col-md-6 modal-input-label"
          label="Permit No"
          type="text"
          placeholder="Permit No"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="permitNo"
        >
        </base-input>
      </div>

      <div class="form-row">
        <base-input
          class="col-md-6 modal-input-label"
          label="Load Capacity"
          placeholder="Load Capacity"
          type="text"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="loadCapacity"
        >
        </base-input>
      </div>

      <base-button
        @click="isEdit ? submitTrailer(true) : submitTrailer(false)"
        type="primary"
        >Save</base-button
      >
    </modal>
  </div>
</template>
<script>
import { Table, TableColumn, Input, DatePicker } from "element-ui";
import { Modal } from "src/components";
import moment from "moment";
import swal from "sweetalert2";

export default {
  components: {
    Modal,
    [DatePicker.name]: DatePicker,
    [Input.name]: Input,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },

  data() {
    return {
      searchQuery: "",
      store: [],
      tableData: [],
      isEdit: false,
      trailerModal: false,

      // FILE CSV ATTRIBUTE
      payloadCSV: [],
      fileName: "No File Selected",
      fileModal: false,

      // SETTINGS ATTRIBUTE
      trailerTypes: [],
      trailerStatuses: [],
      permitTypes: [],

      // MODAL FORM
      trailerID: "",
      trailerNo: "",
      selectTrailerType: "",
      selectTrailerStatus: "",
      dateRegistered: "",
      btm: "",
      bdm: "",
      bgk: "",
      bg1: "",
      bg2: "",
      bg3: "",
      selectPermit: "",
      permitNo: "",
      loadCapacity: "",
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
          // TRAILER TYPE VALIDATION
          let trailerTypeID;
          if (
            this.trailerTypes.filter(
              (value) => value.trailerTypeName === lines[i][1]
            ).length > 0
          ) {
            for (let j = 0; j < this.trailerTypes.length; j++) {
              if (this.trailerTypes[j].trailerTypeName == lines[i][1]) {
                trailerTypeID = this.trailerTypes[j].id;
              }
            }
          } else {
            this.fileModal = false;
            this.$refs.fileupload.value = null;
            this.fileName = "";
            return swal({
              type: "error",
              title: `Trailer Type on line ${i + 1} does not exist!`,
            });
          }

          // TRAILER STATUS VALIDATION
          let trailerStatusID;
          if (
            this.trailerStatuses.filter(
              (value) => value.trailerStatusName === lines[i][2]
            ).length > 0
          ) {
            for (let j = 0; j < this.trailerStatuses.length; j++) {
              if (this.trailerStatuses[j].trailerStatusName == lines[i][2]) {
                trailerStatusID = this.trailerStatuses[j].id;
              }
            }
          } else {
            this.fileModal = false;
            this.$refs.fileupload.value = null;
            this.fileName = "";
            return swal({
              type: "error",
              title: `Trailer Status on line ${i + 1} does not exist!`,
            });
          }

          // PERMIT TYPE VALIDATION
          let permitTypeID;
          if (
            this.permitTypes.filter(
              (value) => value.permitTypeName === lines[i][10]
            ).length > 0
          ) {
            for (let j = 0; j < this.permitTypes.length; j++) {
              if (this.permitTypes[j].permitTypeName == lines[i][10]) {
                permitTypeID = this.permitTypes[j].id;
              }
            }
          } else {
            this.fileModal = false;
            this.$refs.fileupload.value = null;
            this.fileName = "";
            return swal({
              type: "error",
              title: `Permit Type on line ${i + 1} does not exist!`,
            });
          }

          // VALIDATE INTEGER VALUE
          let btm = parseInt(lines[i][4]);
          if (!/^[0-9]+$/.test(btm)) {
            return swal({
              type: "error",
              title: `Invalid BTM value on line ${i + 1}!`,
            });
          }

          let bdm = parseInt(lines[i][5]);
          if (!/^[0-9]+$/.test(bdm)) {
            return swal({
              type: "error",
              title: `Invalid BDM value on line ${i + 1}!`,
            });
          }

          let bgk = parseInt(lines[i][6]);
          if (!/^[0-9]+$/.test(bgk)) {
            return swal({
              type: "error",
              title: `Invalid BGK value on line ${i + 1}!`,
            });
          }

          let bg1 = parseInt(lines[i][7]);
          if (!/^[0-9]+$/.test(bg1)) {
            return swal({
              type: "error",
              title: `Invalid BG1 value on line ${i + 1}!`,
            });
          }

          let bg2 = parseInt(lines[i][8]);
          if (!/^[0-9]+$/.test(bg2)) {
            return swal({
              type: "error",
              title: `Invalid BG2 value on line ${i + 1}!`,
            });
          }

          let bg3 = parseInt(lines[i][9]);
          if (!/^[0-9]+$/.test(bg3)) {
            return swal({
              type: "error",
              title: `Invalid BG3 value on line ${i + 1}!`,
            });
          }

          let loadCapacity = parseInt(lines[i][11]);
          if (!/^[0-9]+$/.test(loadCapacity)) {
            return swal({
              type: "error",
              title: `Invalid Load Capacity value on line ${i + 1}!`,
            });
          }

          let trailer = {
            TrailerNumber: lines[i][0],
            TrailerTypeID: trailerTypeID,
            TrailerStatusID: trailerStatusID,
            DateRegistered: moment(lines[i][3]).toISOString(),
            BTM: btm.toString(),
            BDM: bdm.toString(),
            BGK: bgk.toString(),
            BG1: bg1.toString(),
            BG2: bg2.toString(),
            BG3: bg3.toString(),
            PermitTypeID: permitTypeID,
            LoadCapacity: loadCapacity.toString(),
            PermitNo: lines[i][12],
          };
          this.payloadCSV.push(trailer);
        }
        console.log(this.payloadCSV);
        this.$refs.fileupload.value = null;
      };
    },
    async submitBatch() {
      let payload = {
        Items: this.payloadCSV,
      };

      console.log(payload);
      let res = await this.$http.post(
        `:6769/api/v1/management/trailer`,
        payload
      );

      if (!res.error) {
        this.getTrailer();
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
    addWarehouse() {
      this.trailerNo = "";
      this.selectTrailerType = "";
      this.selectTrailerStatus = "";
      this.dateRegistered = "";
      this.btm = "";
      this.bdm = "";
      this.bgk = "";
      this.bg1 = "";
      this.bg2 = "";
      this.bg3 = "";
      this.selectPermit = "";
      this.permitNo = "";
      this.loadCapacity = "";

      this.isEdit = false;
      this.trailerModal = true;
    },
    async submitTrailer(isEdit) {
      // GET TRAILER STATUS ID
      let trailerStatusID;
      this.trailerStatuses.forEach((value) => {
        if (value.trailerStatusName == this.selectTrailerStatus)
          trailerStatusID = value.id;
      });

      // GET TRAILER TYPE ID
      let trailerTypeID;
      this.trailerTypes.forEach((value) => {
        if (value.trailerTypeName == this.selectTrailerType)
          trailerTypeID = value.id;
      });

      // GET TRAILER TYPE ID
      let permitTypeID;
      this.permitTypes.forEach((value) => {
        if (value.permitTypeName == this.selectPermit) permitTypeID = value.id;
      });

      let payload = {
        Items: [
          {
            TrailerNumber: this.trailerNo,
            TrailerTypeID: trailerTypeID,
            TrailerStatusID: trailerStatusID,
            DateRegistered: moment(this.dateRegistered).toISOString(),
            BTM: this.btm,
            BDM: this.bdm,
            BGK: this.bgk,
            BG1: this.bg1,
            BG2: this.bg2,
            BG3: this.bg3,
            PermitTypeID: permitTypeID,
            LoadCapacity: this.loadCapacity,
            PermitNo: this.permitNo,
          },
        ],
      };

      if (isEdit) {
        let res = await this.$http.put(
          `:6769/api/v1/management/trailer/${this.trailerID}`,
          payload.Items[0]
        );

        if (!res.error) {
          this.getTrailer();
          swal
            .fire({
              type: "success",
              title: res.message,
              showDenyButton: false,
              showCancelButton: false,
              confirmButtonText: "Okay",
            })
            .then((result) => {
              if (result.value) {
                this.trailerModal = false;
              }
            });
        } else {
          swal
            .fire({
              type: "error",
              title: res.message,
              showDenyButton: false,
              showCancelButton: false,
              confirmButtonText: "Okay",
            })
            .then((result) => {
              if (result.value) {
                this.trailerModal = false;
              }
            });
        }
      } else {
        let res = await this.$http.post(
          `:6769/api/v1/management/trailer`,
          payload
        );

        if (!res.error) {
          this.getTrailer();
          swal
            .fire({
              type: "success",
              title: res.message,
              showDenyButton: false,
              showCancelButton: false,
              confirmButtonText: "Okay",
            })
            .then((result) => {
              if (result.value) {
                this.trailerModal = false;
              }
            });
        } else {
          swal
            .fire({
              type: "error",
              title: res.message,
              showDenyButton: false,
              showCancelButton: false,
              confirmButtonText: "Okay",
            })
            .then((result) => {
              if (result.value) {
                this.trailerModal = false;
              }
            });
        }
      }

      console.log(payload);
    },
    async editTrailer(trailerID) {
      this.isEdit = true;
      this.trailerID = trailerID;

      let res = await this.$http.get(
        `:6769/api/v1/management/trailer/${trailerID}`
      );

      if (!res.error) {
        let data = res.message;

        this.trailerNo = data.TrailerNumber;
        this.dateRegistered = data.DateRegistered;
        this.btm = data.BTM;
        this.bdm = data.BDM;
        this.bgk = data.BGK;
        this.bg1 = data.BG1;
        this.bg2 = data.BG2;
        this.bg3 = data.BG3;
        this.permitNo = data.PermitNo;
        this.loadCapacity = data.LoadCapacity;

        this.permitTypes.forEach((value) => {
          if (value.id == data.PermitTypeID)
            this.selectPermit = value.permitTypeName;
        });

        this.trailerTypes.forEach((value) => {
          if (value.id == data.TrailerTypeID)
            this.selectTrailerType = value.trailerTypeName;
        });

        this.trailerStatuses.forEach((value) => {
          if (value.id == data.TrailerStatusID)
            this.selectTrailerStatus = value.trailerStatusName;
        });
      }

      this.trailerModal = true;
    },
    async getTrailer() {
      let res = await this.$http.get(`:6769/api/v1/management/trailer`);

      if (!res.error) {
        this.tableData = [];
        let data = res.message;
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          let truck = {
            id: data[i].TrailerID,
            trailerNo: data[i].TrailerNumber,
            trailerType: data[i].TrailerTypeName,
            regDate: data[i].DateRegistered,
            bgk: data[i].BGK,
            bdm: data[i].BDM,
            btm: data[i].BTM,
            bg1: data[i].BG1,
            bg2: data[i].BG2,
            bg3: data[i].BG3,
            permitNo: data[i].PermitNo,
            permitType: data[i].PermitTypeName,
            loadCapacity: data[i].LoadCapacity,
            status: data[i].TrailerStatusName,
          };
          this.tableData.push(truck);
          this.store.push(truck);
        }
      }
    },
    async getTrailerType() {
      let res = await this.$http.get(
        `:6769/api/v1/setting/trailer/trailer-type`
      );

      if (!res.error) {
        this.trailerTypes = [];
        let data = res.message;
        for (let i = 0; i < data.length; i++) {
          let trailerType = {
            id: data[i].TrailerTypeID,
            trailerTypeName: data[i].TrailerTypeName,
          };
          this.trailerTypes.push(trailerType);
        }
      }
    },
    async getPermitType() {
      let res = await this.$http.get(`:6769/api/v1/setting/permit-type`);

      if (!res.error) {
        this.permitTypes = [];
        let data = res.message;
        for (let i = 0; i < data.length; i++) {
          let permitType = {
            id: data[i].PermitTypeID,
            permitTypeName: data[i].PermitTypeName,
          };
          this.permitTypes.push(permitType);
        }
      }
    },
    async getTrailerStatus() {
      let res = await this.$http.get(
        `:6769/api/v1/setting/trailer/trailer-status`
      );

      if (!res.error) {
        this.trailerStatuses = [];
        let data = res.message;
        for (let i = 0; i < data.length; i++) {
          let trailerStatus = {
            id: data[i].TrailerStatusID,
            trailerStatusName: data[i].TrailerStatusName,
          };
          this.trailerStatuses.push(trailerStatus);
        }
      }
    },
  },
  mounted() {
    // let token = JSON.parse(atob(sessionStorage.getItem("token").split(".")[1]));
    this.getTrailer();
    this.getTrailerType();
    this.getPermitType();
    this.getTrailerStatus();
    // this.getTruckList(token.Companyid);
  },
  beforeDestroy() {},
  watch: {
    searchQuery: function (search) {
      if (search != "") {
        this.tableData = this.store.filter((value) =>
          value.trailerNo.toLowerCase().includes(search.toLowerCase())
        );
      } else {
        this.tableData = this.store;
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

#edit-table-btn {
  background-color: #15cf79;
  color: black;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
}

#edit-table-btn > i {
  margin-top: 10px;
  margin-center: 10px;
}
</style>
