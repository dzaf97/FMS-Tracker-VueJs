import DashboardLayout from 'src/pages/Layout/DashboardLayout.vue';
import AuthLayout from 'src/pages/Pages/AuthLayout.vue';
// GeneralViews
import NotFound from 'src/pages/GeneralViews/NotFoundPage.vue';


// Dashboard pages
const Dashboard = () =>
  import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Dashboard.vue');

const TruckInfo = () =>
  import(/* webpackChunkName: "truckinfo" */ 'src/pages/TruckInfo/TruckInfo.vue');

const TruckList = () =>
  import(/* webpackChunkName: "trucklist" */ 'src/pages/TruckList/TruckList.vue');

const TrailerManage = () =>
  import(/* webpackChunkName: "trailermanage" */ 'src/pages/TrailerManage/TrailerManage.vue');

const WarehouseManage = () =>
  import(/* webpackChunkName: "drivermanage" */ 'src/pages/WarehouseManage/WarehouseManage.vue');

const CustomerManage = () =>
  import(/* webpackChunkName: "drivermanage" */ 'src/pages/CustomerManage/CustomerManage.vue');

const TripOverview = () =>
  import(/* webpackChunkName: "tripoverview" */ 'src/pages/TripOverview/TripOverview.vue');

const DriverManage = () =>
  import(/* webpackChunkName: "drivermanage" */ 'src/pages/DriverManage/DriverManage.vue');

const DriverInfo = () =>
  import(/* webpackChunkName: "drivermanage" */ 'src/pages/DriverInfo/DriverInfo.vue');

const Schedule = () =>
  import(/* webpackChunkName: "drivermanage" */ 'src/pages/Schedule/Schedule.vue');

const CreateTrip = () =>
  import(/* webpackChunkName: "drivermanage" */ 'src/pages/Schedule/CreateTrip.vue');


const Login = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/Login.vue');
const SetPassword = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/SetPassword.vue');
const ForgotPassword = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/ForgotPassword.vue');
const Register = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/Register.vue');


let authPages = {
  path: '/',
  component: AuthLayout,
  name: 'Authentication',
  children: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/set-password/:token',
      name: 'First Time Login',
      component: SetPassword
    },
    {
      path: '/forgot-password',
      name: 'Forgot Password',
      component: ForgotPassword
    },
  ]
};

const routes = [
  {
    path: '/',
    redirect: '/login',
    name: 'Home'
  },
  authPages,
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/dashboard',
    name: 'Dashboard layout',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        components: { default: Dashboard }
      },
      {
        path: 'truck-info/:regNo',
        name: 'Truck Info',
        components: { default: TruckInfo }
      },
      {
        path: 'truck-list',
        name: 'Truck List',
        components: { default: TruckList }
      },
      {
        path: 'trailer',
        name: 'Trailer Management',
        components: { default: TrailerManage }
      },
      {
        path: 'warehouse',
        name: 'Warehouse Management',
        components: { default: WarehouseManage }
      },
      {
        path: 'customer',
        name: 'Customer Management',
        components: { default: CustomerManage }
      },
      {

        path: 'trip-overview',
        name: 'Trip Overview',
        components: { default: TripOverview }
      },
      {
        path: 'driver-management',
        name: 'Driver Management',
        components: { default: DriverManage }
      },
      {
        path: 'driver-info/:driverID',
        name: 'Driver Info',
        components: { default: DriverInfo }
      },
      {
        path: 'schedule',
        name: 'Schedule',
        components: { default: Schedule }
      },
      {
        path: 'create-trip',
        name: 'CreateTrip',
        components: { default: CreateTrip }
      },
    ]
  },
  { path: '*', component: NotFound }
];

export default routes;
