import storage from './storage'

const TOKEN = 'HEIMA_TOUTTAO_TOUKEN'

export const setToken = (value) => storage.set(TOKEN, value)

export const getToken = () => storage.get(TOKEN)

export const removeToken = () => storage.remove(TOKEN)
