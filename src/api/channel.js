import storage from '@/utils/storage'
import request from '@/utils/request'

export const getMyChannel = () => {
  return request({
    url: '/v1_0/user/channels'
    // headers: {
    //   Authorization: 'Bearer ' + store.state.tokenObj.token
    // }
  })
}

export const getAllChannels = () =>
  request({
    url: '/v1_0/channels'
  })

export const delChannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}

export const addChannel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}

const HETMA_TOUTIAO_MY_CHANNELS = 'HETMA_TOUTIAO_MY_CHANNELS'

export const setMyChannelsToLocal = (myChannels) => {
  storage.set(HETMA_TOUTIAO_MY_CHANNELS, myChannels)
}

export const getMyChannelsByLocal = () => {
  return storage.get(HETMA_TOUTIAO_MY_CHANNELS)
}
