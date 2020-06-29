
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Linking
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import {
  Button
} from 'react-native-elements';

import { withAuthenticator, Authenticator, SignIn, ConfirmSignUp, Greetings, SignUp } from 'aws-amplify-react-native'
import Amplify, { Auth } from 'aws-amplify';
import awsmobile from './aws-exports';

import SchedulerPortal from './src/SchedulerPortal.js';
import ScreenAgenda from './src/ScreenAgenda.js';
Amplify.configure(awsmobile)


function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>

          <View style={styles.body}>

            <View style={styles.sectionContainer}>
              <Image source={require('./AmericaLogo.jpg')} />


              <Text style={styles.sectionDescription}>
                Welcome to our  <Text style={styles.highlight}>Service Appointment Scheduler</Text>
              </Text>
              <Button
                title="Visit Our Website Here"
                backgroundColor="#ff0000"

                onPress={() => { Linking.openURL('https://www.americanamaidservices.com') }}
                Button />
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Move-In & Move-Out Services</Text>
              <Text style={styles.sectionDescription}>
                Ready for when you need it the most. We work with your location and time!
                  </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Home Cleanings </Text>
              <Text style={styles.sectionDescription}>
                We offer a variety of scheduling options!
                  </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Commercial Cleanings </Text>
              <Text style={styles.sectionDescription}>
                We proudly serve a variety of local businesses and offer packages tailored to your needs!
                  </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Welcome to our Scheduling Portal</Text>
              <View style={styles.fixToText}>
                <Button
                  title="View Schedule"
                  onPress={() => navigation.navigate('ScreenAgenda')}
                  backgroundColor="#191970"
                />
                <Button
                  title="Schedule a Visit"
                  onPress={() => navigation.navigate('SchedulerPortal')}
                  backgroundColor="#191970"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};




const Stack = createStackNavigator();



const App: () => React$Node = () => {

  return (


    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}
          options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: '#191970',
            },
            headerTintColor: '#fff',

          }}
        />
        <Stack.Screen name="ScreenAgenda" component={ScreenAgenda}
          options={{
            title: 'Agenda',
            headerStyle: {
              backgroundColor: '#191970',
            },
            headerTintColor: '#fff',

          }}
        />
        <Stack.Screen name="SchedulerPortal" component={SchedulerPortal}
          options={{
            title: 'Our Scheduler',
            headerStyle: {
              backgroundColor: '#191970',
            },
            headerTintColor: '#fff',

          }}
        />
      </Stack.Navigator>
      <StatusBar barStyle="dark-content" />
    </NavigationContainer>

  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: '#FFF',
  },
  sectionContainer: {
    marginTop: 12,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    flexDirection: 'column',
  },
  sectionDescription: {
    marginTop: 4,
    marginBottom: 4,
    fontSize: 16,
    fontWeight: '400',
    color: Colors.dark,
    textAlign: 'center',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',

  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  buttonOne: {
    marginVertical: 10,
  },
  input: {
    height: 50,
    backgroundColor: '#ededed',
  },
  buttonContainer: {
    backgroundColor: '#ffb100',
    borderRadius: 25
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'SourceSansPro-SemiBold'
  },
});
// theme for sign in / sign up
const AmplifyTheme = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    width: '100%',
    backgroundColor: '#FFF',
  },
  section: {
    flex: 1,
    width: '100%',
    padding: 30,
  },
  sectionHeader: {
    width: '100%',
    marginBottom: 32,
  },
  sectionHeaderText: {
    color: '#152939',
    fontSize: 20,
    fontWeight: '500',
  },
  sectionFooter: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 20,
  },
  sectionFooterLink: {
    fontSize: 14,
    color: '#191970',
    alignItems: 'baseline',
    textAlign: 'center',
  },
  navBar: {
    marginTop: 5,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#f5fffa'
  },
  navButton: {
    marginLeft: 12,
    borderRadius: 4,
  },
  cell: {
    flex: 1,
    width: '50%',
  },
  errorRow: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  errorRowText: {
    marginLeft: 10,
  },

  button: {
    backgroundColor: '#191970',
    alignItems: 'center',
    padding: 16,
  },
  buttonDisabled: {
    backgroundColor: '#191970',
    alignItems: 'center',
    padding: 16,
    width: '20%',
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    alignItems: 'center',
  },
  formField: {
    marginBottom: 10,
    justifyContent: 'center',

  },
  input: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#C4C4C4',
  },
  inputLabel: {
    marginBottom: 8,
    marginLeft: 8,
  },
  phoneContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneInput: {
    flex: 2,
    padding: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#C4C4C4',
  },

});




/*
Alternative  export with Auth component modifiers
class AppWithAuth extends Component {
  render(){
    return (

      <Authenticator authState="signIn"  hideDefault={true} theme={AmplifyTheme}  onStateChange={this.handleAuthStateChange }>
        <Greetings/>
        <SignIn/>

        <SignUp/>
        <ConfirmSignUp/>


        <App/>
      </Authenticator>
    );
  }
}

export default AppWithAuth;*/
//export default (App) ;


export default withAuthenticator(App,
  { includeGreetings: true, }, // include Greetings
  undefined, // authenticatorComponents
  undefined, //  federated component
  AmplifyTheme, //  theme for sign in

)
