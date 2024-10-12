const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.escolaberta.escolaberta.dev';
  }

  if (IS_PREVIEW) {
    return 'com.escolaberta.escolaberta.preview';
  }

  return 'com.escolaberta.escolaberta';
};

const getAppName = () => {
  if (IS_DEV) {
    return '(Dev) EscolAberta';
  }

  if (IS_PREVIEW) {
    return '(Preview) EscolAberta';
  }

  return 'EscolAberta';
};

export default {
  name: getAppName(),
  "slug": "escolaberta",
  "version": "1.0.7",
  "orientation": "portrait",
  "icon": "./assets/images/icon.png",
  "scheme": "myapp",
  "userInterfaceStyle": "automatic",
  "splash": {
    "image": "./assets/images/splash.png",
    "resizeMode": "contain",
    "backgroundColor": "#ffffff"
  },
  "ios": {
    bundleIdentifier: getUniqueIdentifier(),
    "supportsTablet": true,
  },
  "android": {
    package: getUniqueIdentifier(),
    "adaptiveIcon": {
      "foregroundImage": "./assets/images/adaptive-icon.png",
      "backgroundColor": "#5271ff"
    },
    "versionCode": 7
  },
  "web": {
    "bundler": "metro",
    "output": "static",
    "favicon": "./assets/images/favicon.png"
  },
  "plugins": [
    "expo-router",
    "expo-secure-store"
  ],
  "experiments": {
    "typedRoutes": true
  },
  "extra": {
    "router": {
      "origin": false
    },
    "eas": {
      "projectId": "8abbb427-3fb4-4cb2-972e-70aaac15c2cf"
    }
  },
  "owner": "escolaberta",
  "updates": {
    "url": "https://u.expo.dev/8abbb427-3fb4-4cb2-972e-70aaac15c2cf"
  },
  "runtimeVersion": {
    "policy": "appVersion"
  }
}
