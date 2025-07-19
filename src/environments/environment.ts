export const environment = {
  production: false,
  adService: {
    baseUrl: 'https://apigateway-test.summitbankng.com',
    authEndpoint: '/auth/v1/redirect',
    userInfoEndpoint: '/auth/v1/userinfo',
    refreshEndpoint: '/auth/v1/refresh',
    logoutEndpoint: '/auth/v1/logout'
  }
}; 