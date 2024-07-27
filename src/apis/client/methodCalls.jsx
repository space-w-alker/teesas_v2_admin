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
      'Access-Control-Allow-Origin':'*',
     mode: '*',
    },
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
  if (params) {
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
  }
  const accessToken = localStorage.getItem('authToken')
    ? localStorage.getItem('authToken')
    : access_token;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  return { data: data };
};


export const postAPICall = async (
  url,
  params,
  isArrayType,
  access_token
) => {
  const accessToken = localStorage.getItem('authToken')
    ? localStorage.getItem('authToken')
    : access_token;
  const myHeaders = new Headers();
  myHeaders.append('mode', '*');
  myHeaders.append('Access-Control-Allow-Origin','*');

  isArrayType
    ? myHeaders.append('Content-Type', 'application/json ')
    : myHeaders.append('Content-Type', 'application/x-www-form-urlencoded ');
  access_token?.length &&
    myHeaders.append('Authorization', 'Bearer ' + access_token);
  let urlencoded = new URLSearchParams();
  if (params) {
    isArrayType
      ? (urlencoded = JSON.stringify(params))
      : Object.keys(params).forEach((key) =>
          urlencoded.append(key, params[key])
        );
  }
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  };
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  return { data: data };
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
