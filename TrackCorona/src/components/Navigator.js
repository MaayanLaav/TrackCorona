import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faSearch, faComment, faPaperPlane, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { Linking } from 'expo';

export default class Navigator extends Component {

    render() {
        return (
            <View style={{ flexDirection:"row-reverse", flex: 1, borderTopRightRadius: 50, borderTopLeftRadius: 50, backgroundColor: "orange"}}>
                <TouchableOpacity style={{ flex: 1, justifyContent:"center", alignItems:"center" }} onPress = {() => Linking.openURL('whatsapp://send?text=שלום,&phone=972507925400')}>
                    <View style={{backgroundColor: "white", borderRadius: 1000, height: 40, width: 40, justifyContent:"center", alignItems:"center",}}>
                        <FontAwesomeIcon icon={ faComment } size={ 22} color={'orange'} />
                    </View>
                    <Text style={{color: "white", fontWeight: "bold"}}>ווטסאפ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, justifyContent:"center", alignItems:"center" }} onPress = {() => Linking.openURL('https://t.me/s/MOHreport')}>
                    <View style={{backgroundColor: "white", borderRadius: 1000, height: 40, width: 40, justifyContent:"center", alignItems:"center",}}>
                        <FontAwesomeIcon icon={ faPaperPlane } size={ 22} color={'orange'} />
                    </View>
                    <Text style={{color: "white", fontWeight: "bold"}}>טלגרם</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, justifyContent:"center", alignItems:"center" }} onPress = {() => Linking.openURL('https://info.oref.org.il/')}>
                    <View style={{backgroundColor: "white", borderRadius: 1000, height: 40, width: 40, justifyContent:"center", alignItems:"center",}}>
                        <FontAwesomeIcon icon={ faLightbulb } size={ 22} color={'orange'} />
                    </View>
                    <Text style={{color: "white", fontWeight: "bold"}}>הנחיות</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, justifyContent:"center", alignItems:"center" }} onPress = {() => Linking.openURL('https://imoh.maps.arcgis.com/apps/webappviewer/index.html?id=20ded58639ff4d47a2e2e36af464c36e&locale=he&/')}>
                    <View style={{backgroundColor: "white", borderRadius: 1000, height: 40, width: 40, justifyContent:"center", alignItems:"center",}}>
                        <FontAwesomeIcon icon={ faSearch } size={ 22} color={'orange'} />
                    </View>
                    <Text style={{color: "white", fontWeight: "bold"}}>חיפוש</Text>
                </TouchableOpacity>
            </View>
        );
    }
}