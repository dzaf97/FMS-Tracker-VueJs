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
      <base-button round type="primary" @click.native="addDriver()"
        >+ Add Driver</base-button
      >
    </div>
    <div class="col-lg-6">
      <div class="row flex-row-reverse">
        <base-input search>
          <el-input
            type="search"
            clearable
            prefix-icon="el-icon-search"
            placeholder="Search Staff ID/Pilot Name"
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
    <div class="col-lg-12" style="margin-top: 20px">
      <card>
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
          :height="730"
          :max-height="730"
        >
          <el-table-column
            min-width="150"
            sortable
            label="Staff ID"
            property="staffID"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Pilot Name"
            property="pilotName"
            style="font-weight: bold"
          >
            <template slot-scope="props">
              <router-link
                style="color: white"
                class="link footer-link"
                :to="'/driver-info/' + props.row.id"
              >
                <p id="table-link">
                  {{ props.row.pilotName }}
                </p>
              </router-link>
            </template></el-table-column
          >
          <el-table-column
            min-width="150"
            sortable
            label="Category"
            property="category"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            align="right"
            header-align="right"
            label="Phone No"
            property="phoneNo"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            align="right"
            header-align="right"
            label="Email"
            property="email"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            align="right"
            header-align="right"
            label="Start Date"
            property="startDate"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            align="right"
            header-align="right"
            label="Start Date"
            property="group"
          ></el-table-column>
          <el-table-column
            min-width="90"
            sortable
            align="center"
            header-align="center"
            label="Edit"
          >
            <template slot-scope="props">
              <div id="edit-table-btn" @click="editDriver(props.row.id)">
                <i class="fas fa-pencil-alt"></i>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </card>
    </div>
    <modal :show.sync="driverModal">
      <h2
        slot="header"
        class="modal-title"
        style="color: #686868; font-weight: 600"
        id="modal-title-default"
      >
        {{ isEdit ? "Edit" : "Create New" }} Driver
      </h2>
      <div class="form-row">
        <base-input
          class="col-md-6 modal-input-label"
          label="Name"
          type="text"
          placeholder="Name"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="name"
        >
        </base-input>
        <base-input
          class="col-md-6 modal-input-label"
          label="NRIC / Passport"
          type="text"
          placeholder="NRIC / Passport"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="ic"
        >
        </base-input>
      </div>

      <div class="form-row">
        <base-input
          class="col-md-6 modal-input-label"
          label="Staff ID"
          type="text"
          placeholder="Staff ID"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="staffID"
        >
        </base-input>
        <base-input
          label="Start Date"
          class="col-md-6 modal-input-label"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
        >
          <el-date-picker
            type="date"
            style="color: black"
            placeholder="Start Date"
            v-model="startDate"
          >
          </el-date-picker>
        </base-input>
      </div>

      <div class="form-row">
        <base-input
          label="Staff Status"
          class="col-md-6 modal-input-label"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
        >
          <select
            class="form-control"
            style="color: #686868"
            v-model="selectStaffStatus"
          >
            <option :key="staffStatus.id" v-for="staffStatus in staffStatuses">
              {{ staffStatus.staffStatusDesc }}
            </option>
          </select>
        </base-input>
        <base-input
          label="Pre-assigned Truck"
          class="col-md-6 modal-input-label"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
        >
          <select
            class="form-control"
            style="color: #686868"
            v-model="selectTruck"
          >
            <option :key="truck.id" v-for="truck in trucks">
              {{ truck.truckRegistrationPlate }}
            </option>
          </select>
        </base-input>
      </div>

      <div class="form-row">
        <base-input
          class="col-md-6 modal-input-label"
          label="Phone No"
          type="text"
          placeholder="Phone No"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="phoneNo"
        >
        </base-input>
        <base-input
          class="col-md-6 modal-input-label"
          label="Email"
          type="text"
          placeholder="Email"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="email"
        >
        </base-input>
      </div>

      <div class="form-row">
        <base-input
          label="Category"
          class="col-md-6 modal-input-label"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
        >
          <select
            class="form-control"
            style="color: #686868"
            v-model="selectCategory"
          >
            <option :key="category.id" v-for="category in categories">
              {{ category.categoryName }}
            </option>
          </select>
        </base-input>
        <base-input
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
      </div>

      <div class="form-row">
        <base-input
          label="Employment Status"
          class="col-md-6 modal-input-label"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
        >
          <select
            class="form-control"
            style="color: #686868"
            v-model="selectEmploymentStatus"
          >
            <option
              :key="employmentStatus.id"
              v-for="employmentStatus in employmentStatuses"
            >
              {{ employmentStatus.employmentStatusDesc }}
            </option>
          </select>
        </base-input>
        <base-input
          class="col-md-6 modal-input-label"
          label="Number of Leave Days"
          type="number"
          placeholder="Number of Leave Days"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="noOfLeaveDay"
        >
        </base-input>
      </div>

      <base-button
        @click="isEdit ? submitDriver(true) : submitDriver(false)"
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
import { debounce } from "src/util/debounce";

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
      driverModal: false,

      // FILE CSV ATTRIBUTE
      payloadCSV: [],
      fileName: "No File Selected",
      fileModal: false,

      // SETTINGS ATTRIBUTE
      groups: [],
      trucks: [],
      categories: [],
      staffStatuses: [],
      employmentStatuses: [],

      // MODAL FORM
      driverID: "",
      name: "",
      ic: "",
      staffID: "",
      startDate: "",
      selectStaffStatus: "",
      selectTruck: "",
      phoneNo: "",
      email: "",
      selectCategory: "",
      selectGroup: "",
      selectEmploymentStatus: "",
      noOfLeaveDay: "",
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

        for (let i = 0; i < lines.length; i++) {
          // STAFF STATUS VALIDATION
          let staffStatusID;
          if (
            this.staffStatuses.filter(
              (value) => value.staffStatusDesc === lines[i][4]
            ).length > 0
          ) {
            for (let j = 0; j < this.staffStatuses.length; j++) {
              if (this.staffStatuses[j].staffStatusDesc == lines[i][4]) {
                staffStatusID = this.staffStatuses[j].id;
              }
            }
          } else {
            this.fileModal = false;
            this.$refs.fileupload.value = null;
            this.fileName = "";
            return swal({
              type: "error",
              title: `Staff Status name on line ${i + 1} does not exist!`,
            });
          }

          // DRIVER CATEGORY VALIDATION
          let categoryID;
          if (
            this.categories.filter(
              (value) => value.categoryName === lines[i][7]
            ).length > 0
          ) {
            for (let j = 0; j < this.categories.length; j++) {
              if (this.categories[j].categoryName == lines[i][7]) {
                categoryID = this.categories[j].id;
              }
            }
          } else {
            this.fileModal = false;
            this.$refs.fileupload.value = null;
            this.fileName = "";
            return swal({
              type: "error",
              title: `Driver Category on line ${i + 1} does not exist!`,
            });
          }

          // GROUP VALIDATION
          let groupID;
          if (
            this.groups.filter((value) => value.groupName === lines[i][8])
              .length > 0
          ) {
            for (let j = 0; j < this.groups.length; j++) {
              if (this.groups[j].groupName == lines[i][8]) {
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

          // EMPLOYMENT STATUS VALIDATION
          let employmentStatusID;
          if (
            this.employmentStatuses.filter(
              (value) => value.employmentStatusDesc === lines[i][9]
            ).length > 0
          ) {
            for (let j = 0; j < this.employmentStatuses.length; j++) {
              if (
                this.employmentStatuses[j].employmentStatusDesc == lines[i][9]
              ) {
                employmentStatusID = this.employmentStatuses[j].id;
              }
            }
          } else {
            this.fileModal = false;
            this.$refs.fileupload.value = null;
            this.fileName = "";
            return swal({
              type: "error",
              title: `Employment status on line ${i + 1} does not exist!`,
            });
          }

          // TRUCK REGISTER PLATE NO VALIDATION
          let truckID = "";
          if (
            this.trucks.filter(
              (value) => value.truckRegistrationPlate === lines[i][11]
            ).length > 0
          ) {
            for (let j = 0; j < this.trucks.length; j++) {
              if (this.trucks[j].truckRegistrationPlate == lines[i][11]) {
                truckID = this.trucks[j].id;
              }
            }
          } else {
            if (lines[i][11] != "") {
              this.fileModal = false;
              this.$refs.fileupload.value = null;
              this.fileName = "";

              return swal({
                type: "error",
                title: `Truck plate no on line ${i + 1} does not exist!`,
              });
            }
          }

          // VALIDATE LEAVE DAY VALUE
          let leaveDay = parseInt(lines[i][10]);
          if (!/^[0-9]+$/.test(leaveDay)) {
            return swal({
              type: "error",
              title: `Invalid Leave day value on line ${i + 1}!`,
            });
          }

          let customer = {
            DriverName: lines[i][0],
            NricPassport: lines[i][1],
            StaffID: lines[i][2],
            StartDate: moment(lines[i][3]).toISOString(),
            StaffStatusID: staffStatusID,
            PhoneNumber: lines[i][5],
            Email: lines[i][6],
            DriverCategoryID: categoryID,
            GroupID: groupID,
            EmploymentStatusID: employmentStatusID,
            NumberOfLeaveDays: leaveDay,
            PreAssignedTruck: truckID != "" ? truckID : null,
          };
          this.payloadCSV.push(customer);
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
        `:6769/api/v1/management/driver`,
        payload
      );

      if (!res.error) {
        this.getDriver();
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
    addDriver() {
      this.isEdit = false;
      this.driverModal = true;
    },
    async editDriver(driverID) {
      this.isEdit = true;
      this.driverID = driverID;

      let res = await this.$http.get(
        `:6769/api/v1/management/driver/${driverID}`
      );

      if (!res.error) {
        let data = res.message;

        this.name = data.DriverName;
        this.ic = data.NricPassport;
        this.staffID = data.StaffID;
        this.startDate = data.StartDate;
        this.noOfLeaveDay = data.NumberOfLeaveDays;
        this.phoneNo = data.PhoneNumber;
        this.email = data.Email;

        this.categories.forEach((value) => {
          if (value.id == data.DriverCategoryID)
            this.selectCategory = value.categoryName;
        });

        this.groups.forEach((value) => {
          if (value.id == data.GroupID) this.selectGroup = value.groupName;
        });

        this.employmentStatuses.forEach((value) => {
          if (value.id == data.EmploymentStatusID)
            this.selectEmploymentStatus = value.employmentStatusDesc;
        });

        this.staffStatuses.forEach((value) => {
          if (value.id == data.StaffStatusID)
            this.selectStaffStatus = value.staffStatusDesc;
        });

        this.driverModal = true;
      }
    },
    async submitDriver(isEdit) {
      // GET STAFF STATUS ID
      let staffStatusID;
      this.staffStatuses.forEach((value) => {
        if (value.staffStatusDesc == this.selectStaffStatus)
          staffStatusID = value.id;
      });

      // GET CATEGORY ID
      let categoryID;
      this.categories.forEach((value) => {
        if (value.categoryName == this.selectCategory) categoryID = value.id;
      });

      // GET GROUP ID
      let groupID;
      this.groups.forEach((value) => {
        if (value.groupName == this.selectGroup) groupID = value.id;
      });

      // GET EMPLOYMENT STATUS ID
      let employmentStatusID;
      this.employmentStatuses.forEach((value) => {
        if (value.employmentStatusDesc == this.selectEmploymentStatus)
          employmentStatusID = value.id;
      });

      // GET TRUCK ID
      let truckID = "";
      this.employmentStatuses.forEach((value) => {
        if (value.truckRegistrationPlate == this.selectTruck)
          truckID = value.id;
      });

      let payload = {
        Items: [
          {
            DriverName: this.name,
            NricPassport: this.ic,
            StaffID: this.staffID,
            StartDate: moment(this.startDate).toISOString(),
            StaffStatusID: staffStatusID,
            PhoneNumber: this.phoneNo,
            Email: this.email,
            DriverCategoryID: categoryID,
            GroupID: groupID,
            EmploymentStatusID: employmentStatusID,
            NumberOfLeaveDays: parseInt(this.noOfLeaveDay),
            PreAssignedTruck: truckID != "" ? truckID : null,
          },
        ],
      };
      console.log(payload);

      if (isEdit) {
        let res = await this.$http.put(
          `:6769/api/v1/management/driver/${this.driverID}`,
          payload.Items[0]
        );

        if (!res.error) {
          this.getDriver();
          swal
            .fire({
              type: "success",
              title: res.message,
              showCancelButton: false,
              confirmButtonText: "Okay",
            })
            .then((result) => {
              if (result.value) {
                this.driverModal = false;
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
              if (result.value) {
                this.driverModal = false;
              }
            });
        }
      } else {
        let res = await this.$http.post(
          `:6769/api/v1/management/driver`,
          payload
        );

        if (!res.error) {
          this.getDriver();
          swal
            .fire({
              type: "success",
              title: res.message,
              showCancelButton: false,
              confirmButtonText: "Okay",
            })
            .then((result) => {
              if (result.value) {
                this.driverModal = false;
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
              if (result.value) {
                this.driverModal = false;
              }
            });
        }
      }
    },
    async getEmploymentStatus() {
      let res = await this.$http.get(
        `:6769/api/v1/setting/driver/employment-status`
      );

      if (!res.error) {
        this.employmentStatuses = [];
        let data = res.message;
        for (let i = 0; i < data.length; i++) {
          let employmentStatus = {
            id: data[i].EmploymentStatusID,
            employmentStatusDesc: data[i].EmploymentStatusDesc,
          };
          this.employmentStatuses.push(employmentStatus);
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
    async getCategory() {
      let res = await this.$http.get(`:6769/api/v1/setting/driver/category`);

      if (!res.error) {
        this.categories = [];
        let data = res.message;
        for (let i = 0; i < data.length; i++) {
          let category = {
            id: data[i].DriverCategoryID,
            categoryName: data[i].CategoryName,
          };
          this.categories.push(category);
        }
      }
    },
    async getStaffStatus() {
      let res = await this.$http.get(
        `:6769/api/v1/setting/driver/staff-status`
      );

      if (!res.error) {
        this.staffStatuses = [];
        let data = res.message;
        for (let i = 0; i < data.length; i++) {
          let staffStatus = {
            id: data[i].StaffStatusID,
            staffStatusDesc: data[i].StaffStatusDesc,
          };
          this.staffStatuses.push(staffStatus);
        }
      }
    },
    async getTruck() {
      let res = await this.$http.get(`:6769/api/v1/management/truck`);

      if (!res.error) {
        this.trucks = [];
        let data = res.message;
        for (let i = 0; i < data.length; i++) {
          let truck = {
            id: data[i].TruckID,
            truckRegistrationPlate: data[i].TruckRegistrationPlate,
          };
          this.trucks.push(truck);
        }
      }
    },
    async getDriver() {
      let res = await this.$http.get(`:6769/api/v1/management/driver`);

      if (!res.error) {
        this.tableData = [];
        let data = res.message;
        for (let i = 0; i < data.length; i++) {
          let driver = {
            id: data[i].DriverID,
            staffID: data[i].StaffID,
            pilotName: data[i].DriverName,
            category: data[i].CategoryName,
            phoneNo: data[i].PhoneNumber,
            email: data[i].Email,
            startDate: data[i].StartDate,
            group: data[i].GroupName,
          };
          console.log(driver);
          this.tableData.push(driver);
          this.store.push(driver);
        }
      }
    },
  },
  mounted() {
    this.getDriver();
    this.getCategory();
    this.getGroup();
    this.getStaffStatus();
    this.getEmploymentStatus();
    this.getTruck();
  },
  beforeDestroy() {},
  watch: {
    searchQuery: debounce(function (search) {
      if (search != "") {
        this.tableData = this.store.filter(
          (value) =>
            value.staffID.toLowerCase().includes(search.toLowerCase()) ||
            value.pilotName.toLowerCase().includes(search.toLowerCase())
        );
      } else {
        this.tableData = this.store;
      }
    }, 500),
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

#table-link {
  font-weight: bold;
}

#table-link:hover {
  font-weight: bold;
  color: #15cf79;
  cursor: pointer;
}
</style>
