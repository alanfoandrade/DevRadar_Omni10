import React from 'react';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

// import { Container } from './styles';

export default function Profile({ navigation }) {
  const gitUser = navigation.getParam('git_user');
  return (
    <WebView
      style={{ flex: 1 }}
      source={{ uri: `https://github.com/${gitUser}` }}
    />
  );
}

Profile.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
