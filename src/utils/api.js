import http from './http'

/**
 *
 * @param {登录} data
 * @returns
 */
export const POSTlogin = (data) => {
  return http({ url: 'login', method: 'POST', data })
}
