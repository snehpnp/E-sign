
// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/admin/dashboard',
    icon: getIcon('line-md:home-md-twotone'),
  },
  {
    title: 'Client List',
    path: '/admin/clientlist',
    icon: getIcon('line-md:account-add'),
  },
  {
    title: 'Sign Status',
    path: '/admin/BulkClientList',
    icon: getIcon('mdi:people-group'),
  },

  // {
  //   title: 'system',
  //   path: '/admin/system',
  //   icon: getIcon('eva:file-text-fill'),
  // },
  {
    title: 'Fund History',
    path: '/admin/fundhistory',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Transaction History',
    path: '/admin/transectionhistory',
    icon: getIcon('icon-park-outline:transaction-order'),
  },
   {
     title: 'Templetes',
     path: '/admin/templetelist',
     icon: getIcon('icon-park-outline:transaction-order'),
   },
 {
     title: 'Variables',
     path: '/admin/allveriables',
     icon: getIcon('icon-park-outline:transaction-order'),
   },



];

export default navConfig;
