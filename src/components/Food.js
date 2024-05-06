import * as React from "react"; 
import { View, StyleSheet, Text } from "react-native"; 

export default function Food({food}){
    const {x, y,emoji} = food; 
    return(
        <View style={[Styles.main, {left: x, top: y}]}>
            <Text style={Styles.sub}>{emoji}</Text>
        </View>
    )
}
const Styles = StyleSheet.create({
    main: {
        width: 30,
        height: 30,
        position: 'absolute'
    },
    sub: {
        fontSize: 30,
        position: 'absolute'
    }
})