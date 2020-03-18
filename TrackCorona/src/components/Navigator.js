import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faSearch, faComment, faPaperPlane, faLightbulb } from '@fortawesome/free-solid-svg-icons'
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
                        <FontAwesomeIcon icon={faComment} size={22} color={'orange'} />
                    </View>
                    <Text style={styles.buttonText}>ווטסאפ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => Linking.openURL('https://t.me/s/MOHreport')}>
                    <View style={styles.button}>
                        <FontAwesomeIcon icon={faPaperPlane} size={22} color={'orange'} />
                    </View>
                    <Text style={styles.buttonText}>טלגרם</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => Linking.openURL('https://www.health.gov.il/Subjects/disease/corona/Pages/default.aspx')}>
                    <View style={styles.button}>
                        <FontAwesomeIcon icon={faLightbulb} size={22} color={'orange'} />
                    </View>
                    <Text style={styles.buttonText}>עדכונים</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Map')}>
                    <View style={styles.button}>
                        <FontAwesomeIcon icon={faSearch} size={22} color={'orange'} />
                    </View>
                    <Text style={styles.buttonText}>מפה</Text>
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
            height: 40,
            width: 40,
            justifyContent: "center",
            alignItems: "center",
        },
        buttonText: {
            color: "white",
            fontWeight: "bold"
        }
    }
)