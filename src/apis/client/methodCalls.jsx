export const getAPICall = async (
  endPoint,
  params,
  access_token
) => {
  const url = new URL(endPoint);
  if (params) {
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
  }
  const accessToken = localStorage.getItem('authToken')
    ? localStorage.getItem('authToken')
    : access_token;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'api-key': 'V9dlnpPotY4NzJWB9cwhdLeAba1Zc4UyFlmwq9df2PrH0KquXBu9e7hJuAa5jxPR',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      mode: '*',
    },
  });

  const data = await response.json();
  return { data: data };
};

export const getViaPostAPICall = async (
  endPoint,
  params,
  access_token
) => {
  const url = new URL(endPoint);
  // if (params) {
  //   Object.keys(params).forEach((key) =>
  //     url.searchParams.append(key, params[key])
  //   );
  // }
  const accessToken = access_token
    ? localStorage.getItem('authToken')
    : access_token;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: "Bearer " + accessToken,
      'api-key': 'V9dlnpPotY4NzJWB9cwhdLeAba1Zc4UyFlmwq9df2PrH0KquXBu9e7hJuAa5jxPR',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      mode: '*',
    },
    body: JSON.stringify(params)
  });

  const data = await response.json();
  return { data: data };
};

export const deleteAPICall = async (
  endPoint,
  params,
  access_token
) => {
  const url = new URL(endPoint);
  // if (params) {
  //   Object.keys(params).forEach((key) =>
  //     url.searchParams.append(key, params[key])
  //   );
  // }
  const accessToken = localStorage.getItem('authToken')
    ? localStorage.getItem('authToken')
    : access_token;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: "Bearer " + accessToken,
      'api-key': 'V9dlnpPotY4NzJWB9cwhdLeAba1Zc4UyFlmwq9df2PrH0KquXBu9e7hJuAa5jxPR',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      mode: '*',
    },
  });

  const data = await response.json();
  return { data: data };
};

export const postAPICall = async (url, params, isFormData = false) => {
  const myHeaders = new Headers();
  myHeaders.append('api-key', 'V9dlnpPotY4NzJWB9cwhdLeAba1Zc4UyFlmwq9df2PrH0KquXBu9e7hJuAa5jxPR');

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: null,
  };

  if (isFormData) {
    // Create FormData object
    const formDataToSend = new FormData();
    Object.keys(params).forEach((key) => {
      if (Array.isArray(params[key])) {
        // If the value is an array (for multiple files), append each item
        params[key].forEach((file) => formDataToSend.append(`${key}[]`, file));
      } else {
        formDataToSend.append(key, params[key]);
      }
    });

    requestOptions.body = formDataToSend;
  } else {
    // Handle JSON request
    myHeaders.append('Content-Type', 'application/json');
    requestOptions.body = JSON.stringify(params);
  }

  console.log('Request:', { url, body: requestOptions.body });

  const response = await fetch(url, requestOptions);
  const data = await response.json();

  console.log('Response:', data);
  return { data };
};

export const postFileAPICall = async (
  url,
  formdata,
  access_token
) => {
  const myHeaders = new Headers();
  myHeaders.append('mode', '*');

  const accessToken = localStorage.getItem('authToken')
    ? localStorage.getItem('authToken')
    : access_token;

  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
    body: formdata,
    redirect: 'follow',
  };
  const response = await fetch(url, requestOptions);
  const data = await response.json();

  // if (data?.statusCode == 401) {
  //   deleteCookie('username');
  //   deleteCookie('authToken');
  //   deleteCookie('authID');
  // } else {
  // }
  return { data: data };
};

export const putAPICall = async (url, body, auth = false, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
    'api-key': 'V9dlnpPotY4NzJWB9cwhdLeAba1Zc4UyFlmwq9df2PrH0KquXBu9e7hJuAa5jxPR'

  };

  if (auth && token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(body),
  });

  return {
    data: await response.json(),
  };
};

