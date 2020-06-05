import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  AsyncStorage
} from 'react-native'

class App extends Component {

  // https://medium.com/@rossbulat/react-native-user-authentication-flow-explained-d988905ba106

  initAuthToken = async () => {

    const authData = await AsyncStorage.getItem('authentication_data');

    if (authData !== null) {

      const API_URL = 'https://api.plixsite.net/lbc/users/info?token=6bce4cd1b28642c586d0a1a0831b8b3ae740c1c6166141859fb3a9d23c606b21';

      const authDataJson = JSON.parse(authData);

      // get user data
      fetch(API_URL, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          authToken: authData.authToken,
          deviceId: authData.deviceId
        }),
        method: "POST"
      })
        .then(res => res.json())
        .then(data => {

          if (data.ack === 'success') {
            this.populateUserSettings(data.response);
          } else {
            this.props.navigation.navigate("SignIn");
          }
        })
        .catch(e => {
          this.setState({
            error: true
          });
        });

    } else {
      this.props.navigation.navigate("SignIn");
    }
  }

  componentDidUpdate() {
    if(this.props.userSettings !== undefined) {
      this.props.navigate("Home");
    }
  }

  componentDidMount() {  
    this.initAuthToken();
  }

  state = {
    count: 0
  }

  onPress = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

 render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
         style={styles.button}
         onPress={this.onPress}
        >
         <Text>O 23 i</Text>
        </TouchableOpacity>
        <View style={styles.countContainer}>
          <Text>
            You clicked { this.state.count } times
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10
  }
})

export default App;
