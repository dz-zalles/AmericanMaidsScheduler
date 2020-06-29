import React, { Component } from 'react';


import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Alert,
    Button,
} from 'react-native';

import I18n from 'react-native-i18n';
import { CalendarList } from 'react-native-calendars';
import styles from './styles.js';


var moment = require('moment-timezone');
require('moment/min/locales.min');
if (I18n.currentLocale() === 'en-US') {
    moment.locale('en');
}
var dateSelection = 'Warning Date Not Selected';
var setEndTime = '';
var setStartTime = '';
var displayTime = '';
var itemSummary = 'Service Appointment: ';

export default class SchedulerPortal extends React.Component {

    static navigationOptions = {
        //  Header
        title: 'View our Scheduler',
    };

    constructor(props) {
        super(props)
        let date = moment().format('MMMM');
        const windowSize = Dimensions.get('window');
        this.viewHeight = windowSize.height;
        this.state = {
            dataSource: [],
            pageToken: '',
            loading: false,
            scrollPosition: 0,
            selectedDay: '',
            month: '',
            error: null,
            refreshing: false,
            text: 'Your Client ID',
            time: '08:30',
            markedDates: {},
            isStartDatePicked: false,
            isEndDatePicked: false,
            startDate: ''
        };
    };

    sendEvents = () => {
        const CALENDAR_ID = 'kooccn6k8g685lijaf99maukj4@group.calendar.google.com';
        const API_KEY = 'AIzaSyCOjNnukHCAS3eJ6RzcoptMr7DugqM0OKg';


        let url = 'https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&pageToken=${this.state.pageToken}';
        this.setState({ loading: true });
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

            body: "{ \"end:\" {   \"dateTime\" : \"" + setEndTime + "\" },\"start\": { \"dateTime\" : \"" + setStartTime + "\"},\"summary\": \"" + itemSummary + "\" }"

            // remove to when handling response
            //.then((response) => response.json())
            /*.then((responseJson) => {
                this.setState({
                    pageToken: responseJson.nextPageToken,
                    dataSource: [...this.state.dataSource, ...responseJson.items],
                    loading: false,
                    refreshing: false,
                    error: responseJson.error || null,
                });
            })
            */
        })
    };



    onDayPress = (day) => {
        if (this.state.isStartDatePicked == false) {
            let markedDates = {}
            markedDates[day.dateString] = { startingDay: true, color: '#191970', textColor: '#FFFFFF' };
            this.setState({
                markedDates: markedDates,
                isStartDatePicked: true,
                isEndDatePicked: false,
                startDate: day.dateString,
            });
            Alert.alert('Selected Day', String(day["dateString"] + " \n\nPress OK to Confirm"))
            dateSelection = day.dateString;
        }
        else {
            alert('You are changing the selected date! Select date again to confirm change');
            this.state.isStartDatePicked = false;
        }
    }
    GetValueSubmitFunction = () => {

        const { text } = this.state;
        const { time } = this.state;
        moment(time).format('HH:mm');
        setEndTime = moment(dateSelection + " " + time, moment.ISO_8601).add(2, 'hours').format();
        setStartTime = moment(dateSelection + " " + time, moment.ISO_8601).format();

        displayTime = moment(dateSelection + " " + time, moment.ISO_8601).format('LLL');
        itemSummary = itemSummary + text;

        Alert.alert(text + " your Routine Service Appointment is set for ", displayTime + "\nPlease expect a confirmation within the next 24 hours")
        this.sendEvents(); //requires OAUTH 2.0 Setup and credentials JSON
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.sectionDescription} >Service Appointment Schedule for:</Text>
                <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 5, marginBottom: 5 }}
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}

                />

                <Text style={styles.sectionDescription} >Enter Desired Appointment Start Time in Hrs:Mins</Text>
                <Text style={styles.sectionDescription, { color: 'red', marginBottom: 5 }}>Your Selected Date : {dateSelection}</Text>
                <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 5 }}
                    onChangeText={(time) => this.setState({ time })}
                    value={this.state.time} />
                <Text style={styles.sectionDescription} >Select Day for Visit on Calendar Below</Text>
                <Button style={styles.button}
                    title="Click Here to Submit Appointment"
                    color='#191970'
                    onPress={this.GetValueSubmitFunction}
                    Button />
                <CalendarList
                    horizontal={true}
                    current={Date()}
                    minDate={'2019-05-10'}
                    maxDate={'2022-05-30'}
                    monthFormat={"MMMM yyyy"}
                    onDayPress={this.onDayPress}
                    markedDates={this.state.markedDates}
                    markingType={'period'}
                />
                <TouchableOpacity
                    onPress={() => { this.props.navigation.navigate('Home') }}
                >
                    <Text>Click Here To Go Back</Text>
                </TouchableOpacity>
            </View>
        )
    }

}
