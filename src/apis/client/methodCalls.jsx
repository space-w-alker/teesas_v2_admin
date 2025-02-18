const BASE_URL = 'http://localhost:3000/v1/';
const API_KEY = 'V9dlnpPotY4NzJWB9cwhdLeAba1Zc4UyFlmwq9df2PrH0KquXBu9e7hJuAa5jxPR';


export const getAPICall = async (endPoint, params, access_token) => {
  try {
    const url = new URL(endPoint, BASE_URL);
    
    if (params) {
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    }

    const accessToken = localStorage.getItem('authToken') || access_token;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'api-key': API_KEY
      }
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};


export const deleteAPICall = async (endPoint, params, access_token) => {
  try {
    const url = new URL(endPoint);
    if (params) {
      Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
    }

    const accessToken = localStorage.getItem('authToken') || access_token;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'api-key': API_KEY
      }
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('Delete API call failed:', error);
    throw error;
  }
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

