export const environment = {
  production: true,
  adService: {
    baseUrl: 'https://apigateway.summitbankng.com',
    authEndpoint: '/auth/v1/redirect',
    userInfoEndpoint: '/auth/v1/userinfo',
    refreshEndpoint: '/auth/v1/refresh',
    logoutEndpoint: '/auth/v1/logout'
  }
}; 