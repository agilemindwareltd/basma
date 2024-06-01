import * as Util from '../index';
import axios from 'axios';

class Api {
  static postAxios(route, formData, config) {
    return this.axiosPost(route, formData, config);
  }

  static getAxios(route, formData, config) {
    return this.axiosGet(route, formData, config);
  }

  static getAxios1(route, formData, config) {
    return this.axiosGet1(route, formData, config);
  }
  static putAxios(route, params, config) {
    return this.axiosPut(route, params, config);
  }

  static deleteAxios(route, params, config) {
    return this.axiosDelete(route, params, config);
  }

  static postMulitpart = async (endpoint, params, config) => {
    const url = `${Util.baseURL}${endpoint}`;
    let options = {
      headers: {
        'Content-type': 'multipart/form-data',
        'device-Token': '3c754e4987ea1dc515ed9a01a54583ff',
        'device-Key': '3c754e4987ea1dc515ed9a01a54583ff',
        Authorization: `Bearer ${config}`,
      },
    };
    let configration = Object.assign(options);
    return axios
      .post(url, params, configration)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error.response;
      });
  };
  static postMulitpart1 = async (endpoint, params, config) => {
    const url = `${Util.baseURL}${endpoint}`;
    let options = {
      headers: {
        'Content-type': 'application/json-patch+json',
        'device-Token': '3c754e4987ea1dc515ed9a01a54583ff',
        'device-Key': '3c754e4987ea1dc515ed9a01a54583ff',
        Authorization: `Bearer ${config}`,
      },
    };
    let configration = Object.assign(options);
    return axios
      .post(url, params, configration)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error.response;
      });
  };

  static axiosPost = async (endpoint, formData, config) => {
    const url = `${Util.baseURL}${endpoint}`; 
    var config = {
      method: 'post',
      url: url,
      data: formData,
      headers: {
        'Content-Type': 'application/json',
        'device-Token': '3c754e4987ea1dc515ed9a01a54583ff',
        'device-Key': '3c754e4987ea1dc515ed9a01a54583ff',
      },
    };
    return axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error;
      });
  };

  static axiosGet = async (endpoint, formData, config) => {
    let url = `${Util.baseURL}${endpoint}`;

    if (config) {
      var config = {
        method: 'get',
        url: url,
        headers: {
          'Content-Type': 'application/json',
          'device-Token': '3c754e4987ea1dc515ed9a01a54583ff',
          'device-Key': '3c754e4987ea1dc515ed9a01a54583ff',
        },
      };
      return axios(config)
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          return error;
        });
    } else {
      // without header request
      return axios
        .get(url, formData)
        .then(response => {
          return response.data;
        })
        .catch(error => {
          return error;
        });
    }
  };

  static axiosGet1 = async (endpoint, formData, config) => {
    let url = `${Util.baseURL}${endpoint}`;
    if (!config) {
      var config = {
        method: 'get',
        url: url,
        headers: {
          'Content-Type': 'application/json',
          'device-Token': '3c754e4987ea1dc515ed9a01a54583ff',
          'device-Key': '3c754e4987ea1dc515ed9a01a54583ff',
          Authorization: `Bearer ${formData.token}`,
        },
      };
      return axios(config)
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) { 
          return error;
        });
    } else {
      // without header request
      return axios
        .get(url, formData)
        .then(response => {
          return response.data;
        })
        .catch(error => { 
          return error;
        });
    }
  };

  static axiosDelete = async (endpoint, formData, config) => {
    let url = `${Util.baseURL}${endpoint}`;

    if (config) {
      // with header request
      let options = {
        headers: {
          Authorization: `Bearer ${config.token}`,
        },
      };

      let configration = Object.assign(options);

      return axios
        .delete(url, formData, configration)
        .then(response => {
          return response.data;
        })
        .catch(error => {
          return error;
        });
    } else {
      // without header request
      return axios
        .delete(url, formData)
        .then(response => {
          return response.data;
        })
        .catch(error => {
          return error;
        });
    }
  };

  static axiosPut = async (endpoint, formData, config) => {
    return fetch(`${Util.baseURL}${endpoint}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
    })
      .then(response => response.json())
      .then(responseJOSN => {
        return responseJOSN;
      })
      .catch(error => {
        return error;
      });
  };
}

export default Api;
