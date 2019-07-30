import React, { Component } from 'react';
import { Alert, StyleSheet, TextInput, Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { LoginButton, ShareDialog } from 'react-native-fbsdk';

const SHARE_LINK_CONTENT = {
  contentType: 'link',
  contentUrl: 'https://www.facebook.com/',
  contentDescription: 'Wow, check out this great site!',
};
const photoUri = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5ogpAM-4Um8m_glGaO88S6DbRbRfBZnLxPscNMfDrHFZqUrXhMQ'
const sharePhotoContent = {
  contentType: 'photo',
  photos: [{ imageUrl: photoUri }],
}
export default class App extends Component {
  _sharePhotoWithShareDialog = async () => {
    const canShow = await ShareDialog.canShow(sharePhotoContent);
    if (canShow) {
      try {
        const { isCancelled, postId } = await ShareDialog.show(
          SHARE_LINK_CONTENT,
        );
        if (isCancelled) {
          Alert.alert('Share cancelled');
        } else {
          Alert.alert('Share success with postId: ' + postId);
        }
      } catch (error) {
        Alert.alert('Share fail with error: ' + error);
      }
    }
  };
  _shareLinkWithShareDialog = async () => {
    const canShow = await ShareDialog.canShow(SHARE_LINK_CONTENT);
    if (canShow) {
      try {
        const { isCancelled, postId } = await ShareDialog.show(
          SHARE_LINK_CONTENT,
        );
        if (isCancelled) {
          Alert.alert('Share cancelled');
        } else {
          Alert.alert('Share successful with postId: ' + postId);
        }
      } catch (error) {
        Alert.alert('Share fail with error: ' + error);
      }
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <LoginButton
          onLoginFinished={(error, data) => {
            Alert.alert(JSON.stringify(error || data, null, 2));
          }}
        />
        <TextInput style={{ height: 40, width: 300, borderWidth: 2, marginTop: 50, fontSize: 20, backgroundColor: 'pink' }}
          placeholder=" write something here........" />
        <TouchableOpacity onPress={this._sharePhotoWithShareDialog}
          style={{ height: 40, width: 250, borderWidth: 2, marginTop: 20, backgroundColor: 'green' }}>
          <Text style={styles.shareText}>Share link and photos</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  shareText: {
    fontSize: 20,
    margin: 5,
    color: 'white',
    alignSelf: 'center'
  },
});