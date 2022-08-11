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
export const getArticleById = (articleId) => {
  return request({
    url: `/v1_0/articles/${articleId}`
  })
}

export const addCollect = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

export const deleteCollect = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}

export const addLike = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}

export const deleteLike = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`
  })
}
