
import React, { Component } from 'react';
import {
    Container,
    Content,

    Title,
    Text,
} from 'native-base';
import {
    StyleSheet,
    View,
    FlatList,
    Dimensions,
    ActivityIndicator,

} from 'react-native';
import _ from 'lodash';

import styles from './styles.js';
import I18n from 'react-native-i18n';

var moment = require('moment-timezone');
require('moment/min/locales.min');
if (I18n.currentLocale() === 'en-US') {
    moment.locale('en');
}

export default class ScreenAgenda extends React.Component {
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
            selectedDay: moment(),
            month: date = date[0].toUpperCase() + date.substr(1),
            error: null,
            refreshing: false,
        };
        this.newDate = [];
        this.heights = [];
        this.onLayout = this.onLayout.bind(this);
    };
    componentDidMount() {
        this.getEvents();
    };
    componentWillUnmount() {
        this.getEvents();
    }
    getEvents = () => {
        const CALENDAR_ID = 'kooccn6k8g685lijaf99maukj4@group.calendar.google.com';
        const API_KEY = 'AIzaSyCOjNnukHCAS3eJ6RzcoptMr7DugqM0OKg';
        const beginDate = moment();

        let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&timeMin=${beginDate.toISOString()}&maxResults=50&singleEvents=true&orderBy=startTime&pageToken=${this.state.pageToken}`;
        this.setState({ loading: true });
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    pageToken: responseJson.nextPageToken,
                    dataSource: [...this.state.dataSource, ...responseJson.items],
                    loading: false,
                    refreshing: false,
                    error: responseJson.error || null,
                });
            })
            .then(() => {
                this.getDates()
            })
            .catch(error => {
                this.setState({ error, loading: false, refreshing: false });
            });
    };
    handleLoadMore = () => {
        this.setState(
            {
                pageToken: this.state.pageToken,
                refreshing: true
            },
            () => {
                this.getEvents()
            }
        )
    };
    getDates() {
        let tempDate = '';
        tempDate = _.map(this.state.dataSource, 'start.dateTime');
        this.newDate.length = 0;
        for (let j in tempDate) {
            this.newDate.push(
                tempDate[j]
            );
        }
        this.newDate = this.newDate.map((v, i, a) => (a[i - 1] || '').slice(0, 10) !== v.slice(0, 10) && v); // get first day of the week
    };
    renderDate(item) {
        const date = item.start.dateTime;
        const eventdate = moment(item.start.dateTime);
        const today = (moment() == eventdate) ? styles.today : undefined;
        const checkDate = moment(item.start.dateTime).format('YYYY-MM-DD');

        if (this.newDate.includes(date)) {
            return (
                <View style={styles.day}>
                    <Text allowFontScaling={false} style={[styles.dayNum, today]}>{moment(checkDate).format('DD')}</Text>
                    <Text allowFontScaling={false} style={[styles.dayText, today]}>{moment(checkDate).format('dd')}</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.day} />
            );
        }
    };
    renderRow({ item, index }) {
        return (
            <View style={styles.datesContainer} onLayout={this.onRowLayoutChange.bind(this, index)}>
                {this.renderDate(item)}
                <View style={[styles.item, { height: item.height }]}>
                    <Text style={styles.itemtitle}>{item.summary}</Text>
                    <Text>{moment(item.start.dateTime).format('HH:mm')} - {moment(item.end.dateTime).format('HH:mm')}</Text>
                    <Text>{item.description}</Text>
                </View>
            </View>
        )
    };
    onScroll(event) {
        const yOffset = event.nativeEvent.contentOffset.y;
        let topRowOffset = 0;
        let topRow;
        for (topRow = 0; topRow < this.heights.length; topRow++) {
            if (topRowOffset + this.heights[topRow] / 2 >= yOffset) {
                break;
            }
            topRowOffset += this.heights[topRow];   //rendering the rows correctly as scrolling
        }
        const row = this.state.dataSource[topRow];
        if (!row) return;
        const month = moment(row.start.dateTime).format('MMMM');
        this.setState({ month: month[0].toUpperCase() + month.substr(1) });
    };
    onLayout(event) {
        this.viewHeight = event.nativeEvent.layout.height;  //determine screen height when scrolling
    };
    onRowLayoutChange(ind, event) {
        this.heights[ind] = event.nativeEvent.layout.height; //determine row height when scrolling
    };
    renderFooter = () => {
        if (!this.state.loading) return null;  // loading indicator when scrolling

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };
    render() {


        const { navigation } = this.props;
        return (
            <Container>

                <View style={styles.container}>
                    <View style={{ alignItems: 'center' }}>
                        <Title style={{ fontSize: 24, fontWeight: 'bold', color: 'black', paddingLeft: 0, marginBottom: 10 }}>{this.state.month}</Title>
                    </View>
                    <Content style={{ backgroundColor: "white" }} contentContainerStyle={{ flex: 1 }} scrollsToTop={true}>
                        <View style={{ flex: 1, overflow: 'hidden', backgroundColor: 'white' }}>
                            <View style={styles.reservations}>
                                <FlatList
                                    ref={(c) => this.list = c}
                                    data={this.state.dataSource}
                                    renderItem={this.renderRow.bind(this)}
                                    ListFooterComponent={this.renderFooter}
                                    onScroll={this.onScroll.bind(this)}
                                    keyExtractor={(item, index) => String(index)}
                                    refreshing={this.state.refreshing}
                                    onEndReached={this.handleLoadMore}
                                    onEndReachedThreshold={30}
                                />
                            </View>
                        </View>
                    </Content>
                </View>

            </Container>
        )
    }
}