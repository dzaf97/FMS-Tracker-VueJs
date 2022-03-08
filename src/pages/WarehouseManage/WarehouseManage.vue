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
        >+ Add Warehouse</base-button
      >
    </div>
    <div class="col-lg-6">
      <div class="row flex-row-reverse">
        <base-input style="margin-top: 5px; margin-right: 20px">
          <el-input
            type="search"
            clearable
            prefix-icon="el-icon-search"
            placeholder="Search Warehouse"
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
            label="Warehouse"
            property="warehouse"
          ></el-table-column>
          <el-table-column
            min-width="130"
            sortable
            label="Customer"
            property="customer"
          ></el-table-column>
          <el-table-column
            min-width="100"
            sortable
            label="Contact Person"
            property="contactPerson"
          ></el-table-column>
          <el-table-column
            min-width="100"
            sortable
            align="center"
            header-align="center"
            label="Phone"
            property="phone"
          ></el-table-column>
          <el-table-column
            min-width="100"
            sortable
            align="center"
            header-align="center"
            label="Email"
            property="email"
          ></el-table-column>
          <el-table-column
            min-width="90"
            sortable
            align="center"
            header-align="center"
            label="Edit"
          >
            <template slot-scope="props">
              <div id="edit-table-btn" @click="editWarehouse(props.row.id)">
                <i class="fas fa-pencil-alt"></i>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag> -->
      </card>
    </div>
    <modal :show.sync="warehouseModal">
      <h2
        slot="header"
        class="modal-title"
        style="color: #686868; font-weight: 600"
        id="modal-title-default"
      >
        {{ isEdit ? "Edit" : "Create New" }} Warehouse
      </h2>

      <div class="form-row">
        <base-input
          label="Customer"
          class="col-md-12 modal-input-label"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
        >
          <select
            class="form-control"
            style="color: #686868"
            v-model="selectCompany"
          >
            <option :key="customer.id" v-for="customer in companies">
              {{ customer.customer }}
            </option>
          </select>
        </base-input>
      </div>
      <div class="form-row">
        <base-input
          class="col-md-6 modal-input-label"
          label="Warehouse Name"
          type="text"
          placeholder="Warehouse Name"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="warehouseName"
        >
        </base-input>
        <base-input
          class="col-md-6 modal-input-label"
          label="Postcode"
          type="text"
          placeholder="Postcode"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="postcode"
        >
        </base-input>
      </div>

      <div class="form-row">
        <base-input
          class="col-md-12 modal-input-label"
          label="Address"
          type="text"
          line="2"
          placeholder="Address"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
          v-model="address"
        >
        </base-input>
      </div>

      <div class="form-row">
        <base-input
          label="Country"
          class="col-md-6 modal-input-label"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
        >
          <select
            class="form-control"
            style="color: #686868"
            v-model="selectCountry"
          >
            <option :key="country.id" v-for="country in countries">
              {{ country.countryName }}
            </option>
          </select>
        </base-input>

        <base-input
          label="State"
          class="col-md-6 modal-input-label"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
        >
          <select
            class="form-control"
            style="color: #686868"
            v-model="selectState"
            :disabled="isDisable"
          >
            <option :key="state.id" v-for="state in states">
              {{ state.stateName }}
            </option>
          </select>
        </base-input>
      </div>

      <div class="form-row">
        <base-input
          class="col-md-6 modal-input-label"
          label="Latitude"
          type="number"
          placeholder="Latitude"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
          v-model="latitude"
        >
        </base-input>
        <base-input
          class="col-md-6 modal-input-label"
          label="Longitude"
          type="number"
          placeholder="Longitude"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
          v-model="longitude"
        >
        </base-input>
      </div>

      <div class="modal-table">
        <el-table
          :header-cell-style="{
            background: 'transparent',
            'border-bottom': 'solid 1px grey',
            'font-size': '14px',
            'font-weight': '600',
            'padding-bottom': '1%',
            'margin-bottom': '0px',
            color: '#686868',
          }"
          :cell-style="{
            border: 'transparent',
            'padding-bottom': '0%',
            'font-size': '14px',
          }"
          :data="tableContact"
        >
          <el-table-column label="Name" min-width="100" align="center">
            <template slot-scope="props">
              <div v-if="props.row.ContactPersonName == ''">
                <base-input
                  type="text"
                  placeholder="Name"
                  :inputStyle="{
                    'border-color': '#686868',
                    color: '#686868',
                  }"
                  v-model="nameInput"
                >
                </base-input>
              </div>
              <div v-else>
                <p style="color: grey">
                  {{ props.row.ContactPersonName }}
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Phone No" min-width="100" align="center">
            <template slot-scope="props">
              <div v-if="props.row.PhoneNumber == ''">
                <base-input
                  type="text"
                  placeholder="Phone No"
                  :inputStyle="{
                    'border-color': '#686868',
                    color: '#686868',
                  }"
                  v-model="phoneNoInput"
                >
                </base-input>
              </div>
              <div v-else>
                <p style="color: grey">
                  {{ props.row.PhoneNumber }}
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Email" min-width="100" align="center">
            <template slot-scope="props">
              <div v-if="props.row.Email == ''">
                <base-input
                  type="text"
                  placeholder="Email"
                  :inputStyle="{
                    'border-color': '#686868',
                    color: '#686868',
                  }"
                  v-model="emailInput"
                >
                </base-input>
              </div>
              <div v-else>
                <p style="color: grey">
                  {{ props.row.Email }}
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column min-width="40">
            <template slot-scope="props">
              <div
                id="add-table-btn"
                v-if="props.row.isAdd"
                @click="addContact()"
              >
                <i class="fas fa-plus"></i>
              </div>
              <div
                id="delete-table-btn"
                v-else
                @click="deleteContact(props.row.id)"
              >
                <i class="fa-lg fa-solid fa-xmark"></i>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <base-button
        @click="isEdit ? submitWarehouse(true) : submitWarehouse(false)"
        type="primary"
        >Save</base-button
      >
    </modal>
  </div>
</template>

<script>
import { Table, TableColumn, Input, Tag, Select } from "element-ui";
import { Modal, TagsInput } from "src/components";
import swal from "sweetalert2";

export default {
  components: {
    Modal,
    TagsInput,
    [Select.name]: Select,
    [Tag.name]: Tag,
    [Input.name]: Input,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },

  data() {
    return {
      // FILE CSV ATTRIBUTE
      payloadCSV: [],
      fileName: "No File Selected",
      fileModal: false,

      warehouseIDInput: "",
      nameInput: "",
      phoneNoInput: "",
      emailInput: "",
      latitude: "",
      longitude: "",
      tableContact: [
        {
          ContactPersonName: "",
          PhoneNumber: "",
          Email: "",
          isAdd: true,
        },
      ],
      selectCountry: "",
      selectState: "",
      selectCompany: "",
      countries: [],
      states: [],
      companies: [],
      options: [],
      warehouseModal: false,
      isEdit: false,
      warehouseName: "",
      address: "",
      postcode: "",
      contactPerson: [],
      email: [],
      phoneNo: [],
      searchQuery: "",
      tableData: [],
      store: [],
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
          // COUNTRY VALIDATION
          if (
            this.countries.filter((value) => value.countryName === lines[i][3])
              .length > 0
          ) {
            for (let j = 0; j < this.countries.length; j++) {
              if (this.countries[j].countryName == lines[i][3]) {
                await this.getState(this.countries[j].id);
              }
            }
          } else {
            this.fileModal = false;
            return swal({
              type: "error",
              title: `Country name on line ${i + 1} does not exist!`,
            });
          }

          // STATE VALIDATION
          let stateID;
          if (
            this.states.filter((value) => value.stateName === lines[i][4])
              .length > 0
          ) {
            for (let j = 0; j < this.states.length; j++) {
              if (this.states[j].stateName == lines[i][4]) {
                stateID = this.states[j].id;
              }
            }
          } else {
            this.fileModal = false;
            return swal({
              type: "error",
              title: `State name on line ${i + 1} does not exist!`,
            });
          }

          // COMPANY VALIDATION
          let companyID;
          if (
            this.companies.filter((value) => value.customer === lines[i][5])
              .length > 0
          ) {
            for (let j = 0; j < this.companies.length; j++) {
              if (this.companies[j].customer == lines[i][5]) {
                companyID = this.companies[j].id;
              }
            }
          } else {
            this.fileModal = false;
            return swal({
              type: "error",
              title: `Customer on line ${i + 1} does not exist!`,
            });
          }

          let warehouse = {
            WarehouseName: lines[i][0],
            Address: lines[i][2],
            Postcode: lines[i][3],
            StateID: stateID,
            CompanyID: companyID,
            ContactPerson: [
              {
                ContactPersonName: lines[i][6],
                PhoneNumber: lines[i][7],
                Email: lines[i][8],
              },
            ],
            Latitude: lines[i][9],
            Longitude: lines[i][10],
          };
          this.payloadCSV.push(warehouse);
        }
        this.$refs.fileupload.value = null;
      };
    },
    async submitBatch() {
      let payload = {
        Items: this.payloadCSV,
      };

      console.log(payload);
      let res = await this.$http.post(
        `:6769/api/v1/management/warehouse`,
        payload
      );

      if (!res.error) {
        this.getWarehouse();
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
    addContact() {
      let contact = {
        id: Math.floor(Math.random() * 100000),
        ContactPersonName: this.nameInput != "" ? this.nameInput : "-",
        PhoneNumber: this.phoneNoInput != "" ? this.phoneNoInput : "-",
        Email: this.emailInput != "" ? this.emailInput : "-",
        isAdd: false,
      };
      this.nameInput = "";
      this.phoneNoInput = "";
      this.emailInput = "";
      this.tableContact.push(contact);
    },
    deleteContact(id) {
      console.log(id);
      this.tableContact = this.tableContact.filter((item) => item.id != id);
    },
    addWarehouse() {
      this.tableContact = [
        {
          ContactPersonName: "",
          PhoneNumber: "",
          Email: "",
          isAdd: true,
        },
      ];
      this.selectCompany = "";
      this.selectCountry = "";
      this.selectState = "";
      this.warehouseName = "";
      this.postcode = "";
      this.address = "";
      this.nameInput = "";
      this.phoneNoInput = "";
      this.emailInput = "";
      this.latitude = "";
      this.longitude = "";
      this.isEdit = false;
      this.warehouseModal = true;
    },
    async editWarehouse(warehouseID) {
      this.tableContact = [
        {
          ContactPersonName: "",
          PhoneNumber: "",
          Email: "",
          isAdd: true,
        },
      ];
      this.nameInput = "";
      this.phoneNoInput = "";
      this.emailInput = "";

      this.selectCountry = "Malaysia";
      this.countries.forEach((value, index) => {
        if (value.countryName == this.selectCountry) {
          this.getState(this.countries[index].id);
        }
      });

      this.warehouseIDInput = warehouseID;

      this.isEdit = true;
      let res = await this.$http.get(
        `:6769/api/v1/management/warehouse/${warehouseID}`
      );

      if (res.error) return;

      let data = res.message;
      this.warehouseModal = true;

      // GET STATE ID
      this.states.forEach((value) => {
        if (value.id == data.StateID) this.selectState = value.stateName;
      });

      // GET COMPANY ID
      this.companies.forEach((value) => {
        if (value.id == data.CompanyID) this.selectCompany = value.customer;
      });

      // STORE CONTACT PERSON
      if (data.ContactPerson != null) {
        for (let i = 0; i < data.ContactPerson.length; i++) {
          let contact = {
            id: Math.floor(Math.random() * 100000),
            ContactPersonName: data.ContactPerson[i].ContactPersonName,
            PhoneNumber: data.ContactPerson[i].PhoneNumber,
            Email: data.ContactPerson[i].Email,
            isAdd: false,
          };

          this.tableContact.push(contact);
        }
      }

      this.warehouseName = data.WarehouseName;
      this.address = data.Address;
      this.postcode = data.Postcode;
      this.latitude = data.Latitude;
      this.longitude = data.Longitude;
    },
    async submitWarehouse(isEdit) {
      // FORMAT CONTACT PERSON ARRAY
      this.tableContact.map((value) => delete value.isAdd);
      this.tableContact.map((value) => delete value.id);

      // GET STATE ID
      let stateID;
      this.states.forEach((value) => {
        if (value.stateName == this.selectState) stateID = value.id;
      });

      // GET COMPANY ID
      let companyID;
      this.companies.forEach((value) => {
        if (value.customer == this.selectCompany) companyID = value.id;
      });

      let payload = {
        Items: [
          {
            WarehouseName: this.warehouseName,
            ContactPerson: this.tableContact.slice(1),
            Address: this.address,
            Postcode: this.postcode,
            StateID: stateID,
            CompanyID: companyID,
            Latitude: this.latitude,
            Longitude: this.longitude,
          },
        ],
      };

      this.tableContact = [
        {
          ContactPersonName: "",
          PhoneNumber: "",
          Email: "",
          isAdd: true,
        },
      ];

      if (!isEdit) {
        let res = await this.$http.post(
          `:6769/api/v1/management/warehouse`,
          payload
        );

        if (!res.error) {
          this.getWarehouse();
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
                this.warehouseModal = false;
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
              this.warehouseModal = false;
            });
        }
      } else {
        let res = await this.$http.put(
          `:6769/api/v1/management/warehouse/${this.warehouseIDInput}`,
          payload.Items[0]
        );

        if (!res.error) {
          this.getWarehouse();
          swal
            .fire({
              type: "success",
              title: res.message,
              showCancelButton: false,
              confirmButtonText: "Okay",
            })
            .then((result) => {
              if (result.value) {
                this.warehouseModal = false;
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
              this.warehouseModal = false;
            });
        }
      }
    },

    async getCompany() {
      let res = await this.$http.get(`:6769/api/v1/management/company`);

      // let res = await this.$http.get(`/api/v1/manage/lorry/${companyID}`);
      if (!res.error) {
        this.companies = [];
        let data = res.message;
        for (let i = 0; i < data.length; i++) {
          let company = {
            id: data[i].CompanyID,
            customer: data[i].CompanyName,
          };
          this.companies.push(company);
        }
      }
    },
    async getWarehouse() {
      let res = await this.$http.get(`:6769/api/v1/management/warehouse`);

      console.log(res);

      // let res = await this.$http.get(`/api/v1/manage/lorry/${companyID}`);
      if (!res.error) {
        this.tableData = [];
        let data = res.message;
        for (let i = 0; i < data.length; i++) {
          let warehouse = {
            id: data[i].WarehouseID,
            warehouse: data[i].WarehouseName,
            customer: data[i].CompanyName,
            contactPerson: data[i].ContactPerson,
            phone: data[i].PhoneNumber,
            email: data[i].Email,
          };
          this.tableData.push(warehouse);
          this.store.push(warehouse);
        }
      }
    },
    async getCountry() {
      let res = await this.$http.get(`:6769/api/v1/setting/countries`);

      // let res = await this.$http.get(`/api/v1/manage/lorry/${companyID}`);
      if (!res.error) {
        this.countries = [];
        let data = res.message;
        for (let i = 0; i < data.length; i++) {
          let country = {
            id: data[i].CountryID,
            countryName: data[i].CountryName,
            twoCharCode: data[i].TwoCharCountryCode,
            threeCharCode: data[i].ThreeCharCountryCode,
          };
          this.countries.push(country);
        }
      }
    },
    async getState(country) {
      let res = await this.$http.get(`:6769/api/v1/setting/states/${country}`);

      // let res = await this.$http.get(`/api/v1/manage/lorry/${companyID}`);
      if (!res.error) {
        this.states = [];
        let data = res.message;
        for (let i = 0; i < data.length; i++) {
          let state = {
            id: data[i].StateID,
            stateName: data[i].StateName,
          };
          this.states.push(state);
        }
      }
    },
  },
  mounted() {
    this.getCompany();
    this.getCountry();
    this.getWarehouse();
  },
  beforeDestroy() {},
  computed: {
    isDisable: function () {
      return this.selectCountry == "" ? true : false;
    },
  },
  watch: {
    searchQuery: function (search) {
      if (search != "") {
        this.tableData = this.store.filter((value) =>
          value.warehouse.toLowerCase().includes(search.toLowerCase())
        );
      } else {
        this.tableData = this.store;
      }
    },
    selectCountry: function (country) {
      this.countries.forEach((value, index) => {
        if (value.countryName == country) {
          this.getState(this.countries[index].id);
        }
      });
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
}

#add-table-btn {
  background-color: #15cf79;
  color: black;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
}

#add-table-btn > i {
  margin-top: 10px;
  margin-left: 11px;
  margin-bottom: 5px;
}

#delete-table-btn {
  background-color: red;
  color: black;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
}

#delete-table-btn > i {
  margin-top: 10px;
  margin-left: 12px;
  margin-bottom: 5px;
}

.modal-input-label {
  font-size: 16px !important;
  color: #686868 !important;
  font-weight: 600 !important;
}

.modal-table > .el-table > .el-table__header-wrapper > .el-table__header {
  margin-bottom: 0px !important;
}
</style>
