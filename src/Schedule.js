  import React from 'react';





    import {
        View,
        Text,
        TextInput,
        StyleSheet,
        TouchableOpacity,
        Image,
        ScrollView,
        SafeAreaView,
        Alert,

    } from 'react-native';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

//test schedule page
export default class Schedule extends React.Component {

    static navigationOptions = {
        title: 'View our Schedule',
    };
    constructor(props) {
        super(props);

        this.state = {
          items: {}
        };
      }

    render () {
        return (
            <SafeAreaView>
            <ScrollView contentInsetAdjustmentBehavior="automatic" >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                <Image source = {require('../AmericaLogo.jpg')} />

                                           <TouchableOpacity
                                               onPress={()=>{this.props.navigation.navigate('Home')}}
                                           >
                                                <Text>Return to Client Schedule Portal</Text>
                                           </TouchableOpacity>
                      <CalendarList

                      horizontal={true}
                      current={'2020-07-01'}
                      minDate={'2019-05-10'}
                      maxDate={'2030-05-30'}
                      onDayPress={(day) => {console.log('selected day', day)}}
                      markedDates={{
                          '2020-07-20': {startingDay: true, selected: true,textColor: 'white', color: 'green', endingDay: true},
                          '2020-07-22': {startingDay: true, color: 'green', textColor: 'white'},
                          '2020-07-23': {selected: true, endingDay: true, color: 'red', textColor: 'white'},
                          '2020-07-29': {disabled: true, startingDay: true, color: 'green', endingDay: true}
                        }}

                        markingType={'period'}
                      />




            </View>
            </ScrollView>

            </SafeAreaView>
        )
    };
}







