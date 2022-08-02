import request from '@/utils/request'

/**
 * 获取文章
 * @param {*} channelID 频道的id
 * @param {*} timestamp 请求第一页数据当前的时间戳，请求上一页传上一页的时间戳
 * @returns
 */
export const getArticleAIP = (channelID, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelID,
      timestamp
    }
  })
}
