import { StyleSheet } from "react-native"
//agenda stylesheet
export default StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    whiteTheme: {
        borderColor: '#eee',
        borderStyle: 'solid',
        borderLeftWidth: 1,
    },
    datesContainer: {
        flexDirection: 'row'
    },
    headerNav: {
        alignSelf: 'stretch',
        height: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 0,
        paddingTop: 5,
        backgroundColor: '#ffffff',
    },
    headerTitle: {
        backgroundColor: 'transparent',
        paddingTop: 10,
        borderColor: '#eee',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingBottom: 20,
    },
    content: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: 30
    },
    subText: {
        fontSize: 11,
        color: '#67B26F',
        marginLeft: 32,
    },
    subTextWhite: {
        fontSize: 11,
        color: 'black',
        marginLeft: 32,
    },
    buttontext: {
        fontSize: 16,
        color: '#67B26F',
    },
    buttontextWhite: {
        fontSize: 16,
        color: 'black',
    },
    backIcon: {
        height: 20,
        width: 12,
    },
    buttons: {
        flexDirection: 'row',
    },
    button: {
        marginTop: -7,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 20,
    },
    titleWhite: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20,
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    itemtitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
    },
    subtitle: {
        fontSize: 12,
        color: 'black',
    },
    labelStyle: {
        marginLeft: 4,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#f4f4f4',
    },
    labelStyleWhite: {
        marginLeft: 4,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    reservations: {
        flex: 1,
        backgroundColor: '#f4f4f4'
    },
    dayNum: {
        fontSize: 28,
        fontWeight: '200',
        color: '#7a92a5',
    },
    dayText: {
        fontSize: 14,
        fontWeight: '300',
        color: '#7a92a5',
        marginTop: -5,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    day: {
        width: 63,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 32
    },
    today: {
        color: '#00adf5'
    },
    marginR10: {
        marginRight: 10,
    },
    sectionDescription: {
        marginTop: 5,
        marginBottom: 5,
        fontSize: 16,
        fontWeight: '400',
        color: '#000000',
        textAlign: 'center',
        fontWeight: '300',
    },
    button: {
        backgroundColor: '#191970',
        alignItems: 'center',
        padding: 16,
    },
})
