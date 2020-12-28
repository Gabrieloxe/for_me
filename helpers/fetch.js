const fetch = require('node-fetch');


const fetchBaseURL = 'https://api.intercom.io';
const fetchHeaders = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

async function fetchFromIntercom(endpoint, method, body) {
  const url = `${fetchBaseURL}/${endpoint}`;
  const options = {
    method,
    headers: fetchHeaders,
    ...(body && { body }),
  };
  const res = await fetch(url, options);
  const json = await res.json();

  if (res.ok) return json;
  const { code, message } = json.errors[0];

  if (code === 'rate_limit_exceeded') {
    fetchFromIntercom(endpoint, method, body);
  } else {
    console.log(`${url} \n ${code} -> ${message}`);
    console.log('skipped')
  }
}

async function get(endpoint) {
  return await fetchFromIntercom(endpoint, 'GET');
}

async function post(endpoint, payload) {
  const body = JSON.stringify(payload);
  return await fetchFromIntercom(endpoint, 'POST', body);
}

async function put(endpoint, payload) {
  const body = JSON.stringify(payload);
  return await fetchFromIntercom(endpoint, 'PUT', body);
}

async function getContacts() {
  const json = await get('contacts');
  return json.admins;
}

async function updateContactById(id, payload) {
  const json = await put(`contacts/${id}`, payload);
  return json.admins;
}

async function searchContactByExternalId(external_id, payload) {
  const json = await post(, payload);
  return json.admins;
}

module.exports = {
  getContacts,
  updateContactById
};
