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
                id="uploadFile"
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
      <base-button round type="primary" @click.native="addCustomer()"
        >+ Add Customer</base-button
      >
    </div>
    <div class="col-lg-6">
      <div class="row flex-row-reverse">
        <base-input style="margin-top: 5px; margin-right: 20px">
          <el-input
            type="search"
            clearable
            prefix-icon="el-icon-search"
            placeholder="Search Customer"
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
              <div id="edit-table-btn" @click="editCustomer(props.row.id)">
                <i class="fas fa-pencil-alt"></i>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </card>
    </div>
    <modal :show.sync="customerModal">
      <h2
        slot="header"
        class="modal-title"
        style="color: #686868; font-weight: 600"
        id="modal-title-default"
      >
        {{ isEdit ? "Edit" : "Create New" }} Customer
      </h2>

      <div class="form-row">
        <base-input
          class="col-md-6 modal-input-label"
          label="Customer Name"
          type="text"
          placeholder="Customer Name"
          :inputStyle="{ 'border-color': '#686868', color: '#686868' }"
          v-model="customerName"
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
          label="Contact Person Name"
          type="text"
          class="col-md-12 modal-input-label"
          placeholder="Name"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
          v-model="nameInput"
        >
        </base-input>
      </div>

      <div class="form-row">
        <base-input
          type="text"
          class="col-md-6 modal-input-label"
          label="Email"
          placeholder="Email"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
          v-model="emailInput"
        >
        </base-input>
        <base-input
          label="Phone No"
          type="text"
          class="col-md-6 modal-input-label"
          placeholder="Phone No"
          :inputStyle="{
            'border-color': '#686868',
            color: '#686868',
          }"
          v-model="phoneNoInput"
        >
        </base-input>
      </div>

      <!-- <div class="modal-table">
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
              <div v-if="props.row.Name == ''">
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
                  {{ props.row.Name }}
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Phone No" min-width="100" align="center">
            <template slot-scope="props">
              <div v-if="props.row.PhoneNo == ''">
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
                  {{ props.row.PhoneNo }}
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
            </template>
          </el-table-column>
        </el-table>
      </div> -->
      <base-button
        @click="isEdit ? submitCustomer(true) : submitCustomer(false)"
        type="primary"
        >Save</base-button
      >
    </modal>
  </div>
</template>
<script>
import { Table, TableColumn, Input } from "element-ui";
import { Modal } from "src/components";
import swal from "sweetalert2";

export default {
  components: {
    Modal,
    [Input.name]: Input,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },

  data() {
    return {
      fileModal: false,
      fileName: "No File Selected",
      searchQuery: "",
      tableData: [],
      store: [],
      payloadCSV: [],

      // SETTINGS ATTRIBUTE
      countries: [],
      states: [],

      // MODAL FORM
      customerID: "",
      customerName: "",
      nameInput: "",
      phoneNoInput: "",
      emailInput: "",

      selectCountry: "",
      selectState: "",

      customerModal: false,
      isEdit: false,
      address: "",
      postcode: "",
      contactPerson: [],
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

          let customer = {
            CompanyName: lines[i][0],
            Address: lines[i][1],
            Postcode: lines[i][2],
            StateID: stateID,
            ContactPerson: lines[i][5],
            Email: lines[i][6],
            PhoneNumber: lines[i][7],
          };
          this.payloadCSV.push(customer);
        }
        console.log(this.payloadCSV);
      };
    },
    async submitBatch() {
      let payload = {
        Items: this.payloadCSV,
      };
      let res = await this.$http.post(
        `:6769/api/v1/management/company`,
        payload
      );

      if (!res.error) {
        this.getCustomer();
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
              this.customerModal = false;
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
            this.customerModal = false;
          });
      }
    },
    addCustomer() {
      this.selectCountry = "";
      this.selectState = "";
      this.customer = "";
      this.postcode = "";
      this.address = "";
      this.nameInput = "";
      this.phoneNoInput = "";
      this.emailInput = "";
      this.isEdit = false;
      this.customerModal = true;
    },
    async editCustomer(customerID) {
      this.nameInput = "";
      this.phoneNoInput = "";
      this.emailInput = "";

      this.selectCountry = "Malaysia";
      this.countries.forEach((value, index) => {
        if (value.countryName == this.selectCountry) {
          this.getState(this.countries[index].id);
        }
      });

      this.customerID = customerID;

      this.isEdit = true;
      let res = await this.$http.get(
        `:6769/api/v1/management/company/${customerID}`
      );

      if (!res.error) {
        let data = res.message;
        console.log(data);
        this.customerModal = true;

        // GET STATE ID
        this.states.forEach((value) => {
          if (value.id == data.StateID) this.selectState = value.stateName;
        });

        this.nameInput = data.ContactPerson;
        this.phoneNoInput = data.PhoneNumber;
        this.emailInput = data.Email;

        this.customerName = data.CompanyName;
        this.address = data.Address;
        this.postcode = data.Postcode;
      }
    },
    async submitCustomer(isEdit) {
      // GET STATE ID
      let stateID;
      this.states.forEach((value) => {
        if (value.stateName == this.selectState) stateID = value.id;
      });

      let payload = {
        Items: [
          {
            CompanyName: this.customerName,
            Address: this.address,
            Postcode: this.postcode,
            StateID: stateID,
            ContactPerson: this.nameInput,
            Email: this.emailInput,
            PhoneNumber: this.phoneNoInput,
          },
        ],
      };

      if (!isEdit) {
        let res = await this.$http.post(
          `:6769/api/v1/management/company`,
          payload
        );

        if (!res.error) {
          this.getCustomer();
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
                this.customerModal = false;
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
              this.customerModal = false;
            });
        }
      } else {
        let res = await this.$http.put(
          `:6769/api/v1/management/company/${this.customerID}`,
          payload.Items[0]
        );

        if (!res.error) {
          this.getCustomer();
          swal
            .fire({
              type: "success",
              title: res.message,
              showCancelButton: false,
              confirmButtonText: "Okay",
            })
            .then((result) => {
              if (result.value) {
                this.customerModal = false;
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
              this.customerModal = false;
            });
        }
      }
    },
    async getCustomer() {
      let res = await this.$http.get(`:6769/api/v1/management/company`);

      // let res = await this.$http.get(`/api/v1/manage/lorry/${companyID}`);
      if (!res.error) {
        this.tableData = [];
        let data = res.message;
        for (let i = 0; i < data.length; i++) {
          let company = {
            id: data[i].CompanyID,
            customer: data[i].CompanyName,
            contactPerson: data[i].ContactPerson,
            phone: data[i].PhoneNumber,
            email: data[i].Email,
          };
          this.tableData.push(company);
          this.store.push(company);
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
      console.log(country);
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
    this.getCustomer();
    this.getCountry();
    // this.getTruckList(token.Companyid);
  },
  computed: {
    isDisable: function () {
      return this.selectCountry == "" ? true : false;
    },
  },
  watch: {
    searchQuery: function (search) {
      if (search != "") {
        this.tableData = this.store.filter((value) =>
          value.customer.toLowerCase().includes(search.toLowerCase())
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

#fileName {
  padding-right: 20px;
}
</style>
