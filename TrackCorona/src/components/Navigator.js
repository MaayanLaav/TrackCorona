import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFirstAid, faMapMarkedAlt, faComment, faPaperPlane, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { Linking } from 'expo';

export default class Navigator extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => Linking.openURL('whatsapp://send?text=שלום,&phone=972507925400')}>
                    <View style={styles.button}>
                        <FontAwesomeIcon icon={faComment} size={18} color={'orange'} />
                    </View>
                    <Text style={styles.buttonText}>ווטסאפ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => Linking.openURL('https://t.me/s/MOHreport')}>
                    <View style={styles.button}>
                        <FontAwesomeIcon icon={faPaperPlane} size={18} color={'orange'} />
                    </View>
                    <Text style={styles.buttonText}>טלגרם</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer} onPress = {() => Linking.openURL('https://info.oref.org.il/')}>
                    <View style={styles.button}>
                        <FontAwesomeIcon icon={ faLightbulb } size={ 18} color={'orange'} />
                    </View>
                    <Text style={styles.buttonText}>פורטל חירום</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => Linking.openURL('https://www.health.gov.il/Subjects/disease/corona/Pages/default.aspx')}>
                    <View style={styles.button}>
                        <FontAwesomeIcon icon={faFirstAid} size={18} color={'orange'} />
                    </View>
                    <Text style={styles.buttonText}>הנחיות</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => Linking.openURL('https://imoh.maps.arcgis.com/apps/webappviewer/index.html?id=20ded58639ff4d47a2e2e36af464c36e&locale=he&/')}>
                    <View style={styles.button}>
                        <FontAwesomeIcon icon={faMapMarkedAlt} size={18} color={'orange'} />
                    </View>
                    <Text style={styles.buttonText}>מפת חשיפה</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flexDirection: "row-reverse",
            flex: 1,
            borderTopRightRadius: 50,
            borderTopLeftRadius: 50,
            backgroundColor: "orange",
        },
        buttonContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        },
        button: {
            backgroundColor: "white",
            borderRadius: 1000,
            height: 35,
            width: 35,
            justifyContent: "center",
            alignItems: "center",
        },
        buttonText: {
            color: "white",
            fontWeight: "bold",
            fontSize: 11,
        }
    }
)