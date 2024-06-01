export const liveServer = 'https://api.wewerehere.online/api/v1.0';
// export const imgBaseUrl = 'https://crm-api-1.herokuapp.com';

//TODO Change Production URL for going live
const devTesting = false;
export const baseURL = liveServer;
export const endPoints = {
  login: '/User/login',
  socialLogin: '/User/externallogin',
  signup: '/User/createaccount',
  getcountry: '/Lookups/getallcountries',
  verifyUser: '/Notifications/confirmotp',
  confirmResetPassOtp: '/Notifications/confirmresetuserpasswordotp',
  newPassword: '/User/resetnewpassword',
  resendOtp: '/User/resendotp',
  resetRequest: '/User/resetpasswordrequest',
  addExp: '/Communication/AddExperiance',
  addWorker: '/Communication/IWorkHere',
  addReview: '/Communication/CompanyRate',
  getProfile: '/User/GetProfile',
  getIwasHere: '/Communication/GetMyExperiances',
  updateProfileEndpoint: '/User/UpdateProfile',
  CompanyCreateAccount: '/User/CompanyCreateAccount',
  addCompanyservices: '/Services/AddService',
  updateCompanyProfileEndPoint: '/User/UpdateCompanyProfile',
  getCompanyData: '/User/GetUserCompany',
  getSetting: '/Lookups/GetSettings',
  deleteService: '/Services/DeleteService',
  addServiceReview: '/Communication/ServiceRate',
  // End Points with params
  businessApiEndpoint: (catId, size, number) =>
    `/Category/GetCategories?CategoryId=${catId}&PageSize=${size}&PageNumber=${number}`,

  bsnsDetailsApiEndpoint: (catId, size, number) =>
    `/Category/GetCompaniesByCategoryId?CategoryId=${catId}&PageSize=${size}&PageNumber=${number}`,

  getExpApiEndpoint: (comId, size, number) =>
    `/Communication/GetCompanyExperiances?CompanyId=${comId}&PageSize=${size}&PageNumber=${number}`,

  getWorkersEndpoint: (comId, size, number) =>
    `/Communication/WhoWorkHere?CompanyId=${comId}&PageSize=${size}&PageNumber=${number}`,

  getRatingsEndpoint: (comId, size, number) =>
    `/Communication/GetCompanyRatesAndReviews?CompanyId=${comId}&PageSize=${size}&PageNumber=${number}`,
  getUserRatingsEndpoint: (userId, size, number) =>
    `/Communication/GetUserRatesAndReviews?UserId=${userId}&PageSize=${size}&PageNumber=${number}`,
  getServiceRatingsEndpoint: (comId, size, number) =>
    `/Communication/GetServiceRatesAndReviews?ServiceId=${comId}&PageSize=${size}&PageNumber=${number}`,

  // deleteService: (serviceId,) =>
  //   `/Services/DeleteService?ServiceId=${Number(serviceId)}`,

  // updateProfileEndpoint: (data) =>
  //   `/User/UpdateProfile?Email=${data.email && data.email}&FullName=${data.userName && data.userName}&Gender=${data.gender && data.gender}&BirthDate=${data.dob && data.dob}&ProfileImage_ImagePath=${data.profile && data.profile}&ProfilePrivacyId=${data.privacyId && data.privacyId}&GoogleSocialId=${''}&FacebookSocialId=${''}`,
};
