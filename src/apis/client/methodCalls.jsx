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

export const postAPICall = async (url, params) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('api-key', 'V9dlnpPotY4NzJWB9cwhdLeAba1Zc4UyFlmwq9df2PrH0KquXBu9e7hJuAa5jxPR');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(params)
  };

  console.log('Request:', { url, body: params });
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  console.log('Response:', data);
  return { data };
};

export const postFileAPICall = async (url, formData, access_token) => {
  const accessToken = localStorage.getItem('authToken') || access_token;
  const API_KEY = 'V9dlnpPotY4NzJWB9cwhdLeAba1Zc4UyFlmwq9df2PrH0KquXBu9e7hJuAa5jxPR';
  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'api-key': API_KEY
    },
    body: formData
  };

  const response = await fetch(url, requestOptions);
  const data = await response.json();

  return { data };
};



export const putAPICall = async (url, body, auth = false, token = null) => {
  const accessToken = localStorage.getItem('authToken') || access_token;
  const API_KEY = 'V9dlnpPotY4NzJWB9cwhdLeAba1Zc4UyFlmwq9df2PrH0KquXBu9e7hJuAa5jxPR';
  const headers = {
    'Content-Type': 'application/json',
    'api-key': API_KEY,
    'Authorization': `Bearer ${accessToken}`,

  };

  // if (auth && token) {
  //   headers['Authorization'] = `Bearer ${accessToken}`
  // }

  const response = await fetch(url, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(body),
  });

  return {
    data: await response.json(),
  };
};


export const patchAPICall = async (url, body, auth = false, token = null) => {
  const accessToken = localStorage.getItem('authToken') || access_token;
  const API_KEY = 'V9dlnpPotY4NzJWB9cwhdLeAba1Zc4UyFlmwq9df2PrH0KquXBu9e7hJuAa5jxPR';
  const headers = {
    'Content-Type': 'application/json',
    'api-key': API_KEY,
    'Authorization': `Bearer ${accessToken}`,

  };

  // if (auth && token) {
  //   headers['Authorization'] = `Bearer ${accessToken}`
  // }

  const response = await fetch(url, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(body),
  });

  return {
    data: await response.json(),
  };
};