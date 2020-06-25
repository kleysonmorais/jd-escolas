// import { isServer } from 'app/lib/func';

// Helper function get environment variables.
export const getConstant = name => {
  // const value = isServer() ? process.env[name] : window.env[name];
  const value = undefined;
  // Default values in case var is undefined.
  if (typeof value === 'undefined') {
    switch (name) {
      case 'APP_HOST':
        return 'https://www.nsctotal.com.br';
      case 'FACEBOOK_APP_ID':
        return '390969538026908';
      case 'GTM_ID':
        return 'GTM-NBXJGMV';
      case 'NSC_AUTH_CLIENT_ID':
        return '1g8ebhmaa1s11igpq4i3m6pi19';
      case 'API_HOST':
        return 'https://api.nsctotal.com.br';
      default:
        return '';
    }
  }

  return value;
};

export const isFeatureEnabled = name => {
  const features = {
    SIGNWALL: getConstant('FF_SIGNWALL') !== 'false',
  };

  return features[name] || false;
};
