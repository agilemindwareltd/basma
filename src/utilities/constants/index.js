import { appIcons, appSvgs } from '../../assets';

//Validations
const signUpValdation = (
  fullName,
  phoneNumber,
  pass,
  confirmPass
) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (phoneNumber === '') {
    return {
      success: false,
      message: 'Please enter your phone number ',
    };
  } else if (pass === '') {
    return {
      success: false,
      message: 'Please enter the password ',
    };
  } else if (fullName === '') {
    return {
      success: false,
      message: 'Please enter your name ',
    };
  }
  else if (pass?.length < 6) {
    return {
      success: false,
      message: 'Please enter at least 6 digits password',
    };
  }
  else if (pass !== confirmPass) {
    return {
      success: false,
      message: 'Password and Confirm Password does not match',
    };
  } else {
    return {
      success: true,
      message: '',
    };
  }
};

const loginValidation = (email, password) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
  if (email === '') {
    return {
      success: false,
      message: 'please enter your phone number',
    };
  } else if (password === '') {
    return {
      success: false,
      message: 'please enter password',
    };
  }
  else {
    return {
      success: true,
      message: '',
    };
  }
};

const forgotEmailValidation = email => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email === '') {
    return {
      success: false,
      message: 'Please enter the email',
    };
  } else if (!reg.test(email)) {
    return {
      success: false,
      message: 'Please enter valid email',
    };
  } else {
    return {
      success: true,
      message: '',
    };
  }
};

export const arrayData = {
  history: [
    {
      key: 0,
      title: 'Sellers',
      SignedValue: '0',
      ClosedValue: '0',
      CloseRatioValue: '0%',
      AvgCGIvalue: '$0',
      AvgCommValue: '0%',
    },
    {
      key: 1,
      title: 'Buyers',
      SignedValue: '0',
      ClosedValue: '0',
      CloseRatioValue: '0%',
      AvgCGIvalue: '$0',
      AvgCommValue: '0%',
    },
    {
      key: 2,
      title: 'Outgoing Referrals',
      SignedValue: '0',
      ClosedValue: '0',
      CloseRatioValue: '0%',
      AvgCGIvalue: '$0',
      AvgCommValue: '0%',
    },
    {
      key: 0,
      title: 'Leases',
      SignedValue: '0',
      ClosedValue: '0',
      CloseRatioValue: '0%',
      AvgCGIvalue: '$0',
      AvgCommValue: '0%',
    },
  ],
  menuData: [
    {
      id: 0,
      title: 'My Prospecting',
      iconName: appIcons.prospecting,
      screen: '',
    },
    {
      id: 1,
      title: 'My Appointments',
      iconName: appIcons.appointments,
      screen: '',
    },
    {
      id: 2,
      title: 'My Contracts',
      iconName: appIcons.contracts,
      screen: '',
    },
    {
      id: 3,
      title: 'My Performance History',
      iconName: appIcons.perfomanceHistory,
      screen: 'PerfHistory',
    },
    {
      id: 4,
      title: 'Profile',
      iconName: appIcons.profile,
      screen: 'UpdateProfile',
    },
    {
      id: 5,
      title: 'Accountability Partner',
      iconName: appIcons.partner,
      screen: 'AccountPartner',
    },
    {
      id: 6,
      title: 'Connections',
      iconName: appIcons.connections,
      screen: 'Connections',
    },
    {
      id: 7,
      title: 'Contact Us',
      iconName: appIcons.contact,
      screen: 'ContactUs',
    },
    {
      id: 8,
      title: 'Subscriptions',
      iconName: appIcons.subscription,
      screen: '',
    },
    {
      id: 9,
      title: 'Logout',
      iconName: appIcons.logout,
      screen: 'Auth',
    },
  ],
  Notification: [
    {
      id: 0,
      icon: appIcons.notifyCard,
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 1,
      icon: appIcons.notifyCard,
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 2,
      icon: appIcons.skatingPerson,
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 3,
      icon: appIcons.notifyCard,
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 4,
      icon: appIcons.notifyCard,
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 5,
      icon: appIcons.notifyCard,
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  ],
  myConnectionsList: [
    {
      id: 0,
      name: 'Irma2',
    },
    {
      id: 1,
      name: 'Irma2',
    },
    {
      id: 2,
      name: 'Irma2',
    },
  ],
};

export { signUpValdation, loginValidation, forgotEmailValidation };
