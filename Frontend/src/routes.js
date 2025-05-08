import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SuperadminLayout from './layouts/superadmin';
import UserLayout from './layouts/user'
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
// import User from './pages/dashboard/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword'
import ForgretResetPassword from './pages/ForgretResetPassword'
import ThankYou from './pages/ThankYou';
import ExpiredLink from './pages/LinkExpored';
import SessionExpired from './pages/SessionExpired';


// ------------------Super Admin-----------------------------------

import SaDashboard from './pages/superadmin/SaDashboard';
import SaAdminList from './pages/superadmin/AdminList';
import SaAddAdmin from './pages/superadmin/AddAdmin';
import SaEditAdmin from './pages/superadmin/EditAdmin';
import SaPackages from './pages/superadmin/packages/Packages';
import CompanyPackageDeatails from './pages/superadmin/packages/CompanyPackageDeatails';
import SaAddPackages from './pages/superadmin/packages/AddPackage';
import SaEditPackage from './pages/superadmin/packages/EditPackage';
import SaSystem from './pages/superadmin/System/SaSystem';
import SaViewUserDetails from './pages/superadmin/ViewUserDetails';
import SaTransactionHistory from './pages/superadmin/TransactionHistory';
import SaFundHistory from './pages/superadmin/FundHistory/FundHistory';
import ExpireComapny from "./pages/superadmin/ExpireComapny/ExpireComapny" ;
import ActiveComapny from "./pages/superadmin/ActiveCompany/ActiveCompany" ;
import AllTransectinsLicence from "./pages/superadmin/AllTransectinsLicence/AllTransections" ;
import AllPackagesHistory from "./pages/superadmin/AllPackagesHistory/AllPackageHistory" ;





// ----------------------Admin--------------------------

import DashboardApp from './pages/dashboard/DashboardApp';
import ClientList from './pages/dashboard/ClientList';
import BulkClientList from './pages/dashboard/BulkClientList/BulkClientList';
import AddClient from './pages/dashboard/AddClient';
import EditClient from './pages/dashboard/EditClient';
import AdminSystem from './pages/dashboard/system/System';
import AdminSystemUpdate from './pages/dashboard/system/SystemUpdate';
import AdminFundHistory from './pages/dashboard/FundsHistory/FoundsHistory';
import AdminTransecectionHistory from './pages/dashboard/TransectionHistory/TransecectionHistory';
import AdminProfile from './pages/dashboard/Profile';
import PackageDetails from './pages/dashboard/PackageDetails/PackageDetails';
import Templete from './pages/dashboard/CreateDocTemplete/Templete';
import AddTemplete from './pages/dashboard/CreateDocTemplete/AddTemplete';
import EditTemplete from './pages/dashboard/CreateDocTemplete/EditTemplete';
import TemplateUsersList from './pages/dashboard/CreateDocTemplete/TemplateUsersList';
import AllVariables from './pages/dashboard/AddVariables/AllVariables';


// ---------------------User---------------------------------------

// import UserDashboard from './pages/user/UserDashboard';
import UserDashboard from './pages/user/SubmitOtp';

// --------------------Web Landing Page-------------------------------

import WebLanding from './pages/web-landing-page/WebLanding';
import Contact from './pages/web-landing-page/Contact';
import PrivacyPolicy from './pages/web-landing-page/PrivacyPolicy';
import TermsCondition from './pages/web-landing-page/TermsCondition';

// -------------------------------------------------------------------

export default function Router() {
  const isLoggingSuperAdmin = JSON.parse(localStorage.getItem('superadmin'));
  const isLoggingAdmin = JSON.parse(localStorage.getItem('admin'));
  const isLoggingUser = JSON.parse(localStorage.getItem('user'));

  return useRoutes([

    {
      path: '/admin',
      // element: <DashboardLayout />,
      element: isLoggingAdmin ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { path: 'dashboard', element: <DashboardApp /> },
        { path: 'profile', element: <AdminProfile /> },
        { path: 'clientlist', element: <ClientList /> },
{ path: 'bulkclientlist', element: <BulkClientList/> },

        { path: 'addclient', element: <AddClient /> },
        { path: 'editclient/:id', element: <EditClient /> },
        { path: 'system', element: <AdminSystem /> },
        { path: 'systemupdate', element: <AdminSystemUpdate /> },
        { path: 'fundhistory', element: <AdminFundHistory /> },
        { path: 'transectionhistory', element: <AdminTransecectionHistory /> },
        { path: 'packageinfo', element: <PackageDetails /> },
        { path: 'templetelist', element: <Templete /> },
        { path: 'addtemplete', element: <AddTemplete /> },
        { path: 'edittemplete/:id', element: <EditTemplete /> },
        { path: 'templateusers/:id', element: <TemplateUsersList /> },
        { path: 'allveriables', element: <AllVariables /> },

      ],
    },
    {
      path: '/superadmin',
      element: isLoggingSuperAdmin ? <SuperadminLayout /> : <Navigate to="/login" />,
      // element: <SuperadminLayout /> ,
      children: [
        { path: 'dashboard', element: <SaDashboard /> },
        { path: 'adminlist', element: <SaAdminList /> },
        { path: 'addadmin', element: <SaAddAdmin /> },
        { path: 'editadmin/:id', element: <SaEditAdmin /> },
        { path: 'packages', element: <SaPackages /> },
        { path: 'companypackage/:id', element: <CompanyPackageDeatails /> },
        { path: 'addpackages', element: <SaAddPackages /> },
        { path: 'editpackages/:id', element: <SaEditPackage /> },
        { path: 'system', element: <SaSystem /> },
        { path: 'viewdetails/:id', element: <SaViewUserDetails /> },
        { path: 'transactionhistory/:Id', element: <SaTransactionHistory /> },
        { path: 'fundhistory', element: <SaFundHistory /> },
        { path: 'activecompany', element: <ActiveComapny /> },
        { path: 'expirecomapny', element: <ExpireComapny /> },
        { path: 'alltransections', element: <AllTransectinsLicence /> },
        { path: 'packagehistory', element: <AllPackagesHistory /> },
      ],
    },
    {
      path: '/user/:id',
      // path: '/user/:id/abc',
      // element: isLoggingUser ? <UserLayout /> : <Navigate to="/login" />,
          element: <UserDashboard /> ,
    },
    {
      path: '/',
      // element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/weblanding" /> },
        { path: 'contact', element: <Contact /> },
        { path: 'privacypolicy', element: <PrivacyPolicy /> },
        { path: 'termsconditions', element: <TermsCondition /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'weblanding', element: <WebLanding /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
        { path: 'forgotpassword', element: <ForgotPassword /> },
        { path: 'resetpassword/:id', element: <ForgretResetPassword /> },
        { path: 'thankyou', element: <ThankYou /> },
        { path: 'expiredlink', element: <ExpiredLink /> },
        { path: 'expiredsession', element: <SessionExpired /> },

      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
