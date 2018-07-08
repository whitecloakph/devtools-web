import axios from '../clients/axios'

function getRootCollections({ apiKey, }) {
  return axios({
    method: 'get',
    url: '/collections',
    headers: {
      'X-Api-Key': apiKey,
    },
  })
}

function getCollection({ id, apiKey, }) {
  return axios({
    method: 'get',
    url: `/collections/${id}`,
    headers: {
      'X-Api-Key': apiKey,
    },
  })
}

export { getRootCollections, getCollection, }
