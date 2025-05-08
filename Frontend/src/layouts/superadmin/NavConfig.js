// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;


const navConfig = [
  {
    title: 'dashboard',
    path: '/superadmin/dashboard',
    icon: getIcon('line-md:home-md-twotone'),
  },
  {
    title: 'Company List ',
    path: '/superadmin/adminlist',
    icon: getIcon('line-md:account-add'),
  },
  {
    title: 'packages',
    path: '/superadmin/packages',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  // {
  //   title: 'system',
  //   path: '/superadmin/system',
  //   icon: getIcon('eva:file-text-fill'),
  // },
  {
    title: 'Funds History',
    path: '/superadmin/fundhistory',
    icon: getIcon('ri:funds-box-line'),
  },
  // {
  //   title: 'funds history',
  //   path: '/superadmin/fundhistory',
  //   icon: getIcon('ri:funds-box-line'),
  // },
  {
    title: 'Active Companies',
    path: '/superadmin/activecompany',
    icon: getIcon('bi:people'),
  },
  {
    title: 'Expired Companies',
    path: '/superadmin/expirecomapny',
    icon: getIcon('ci:user-close'),
  },
  {
    title: 'Transaction History',
    path: '/superadmin/alltransections',
    icon: getIcon('icon-park-outline:transaction-order'),
  },
  {
    title: 'Package History',
    path: '/superadmin/packagehistory',
    icon: getIcon('icon-park-outline:transaction-order'),
  },

  // {
  //   subheader: 'management',
  //   // items: [
  //   //   {
  //   //     title: 'user',
  //   //     path: '/dashboard/user',
  //   //     // icon: ICONS.user,
  //   //     children: [
  //   //       { title: 'Four', path: '/dashboard/user/four' },
  //   //       { title: 'Five', path: '/dashboard/user/five' },
  //   //       { title: 'Six', path: '/dashboard/user/six' },
  //   //     ],
  //   //   },
  //   // ],
  // },


  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon('eva:lock-fill'),
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon('eva:person-add-fill'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default navConfig;
