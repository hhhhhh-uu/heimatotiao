import storage from './storage'

const TOKEN = 'HEIMA_TOUTTAO_TOUKEN'

const HETMA = 'HEIMA_TOTIAO'

export const setToken = (value) => storage.set(TOKEN, value)

export const getToken = () => storage.get(TOKEN)

export const removeToken = () => storage.remove(TOKEN)

export const setHEIMA = (value) => storage.set(HETMA, value)

export const getHEIMA = () => storage.get(HETMA)
