import * as React from "react"; 
import { View, StyleSheet } from "react-native";
export default function Food({x,y}){
    return(
        <View style={[Styles.main, {left: x, top: y}]}>
            <View style={Styles.sub}></View>
        </View>
    )
}
const Styles = StyleSheet.create({
    main: {
        width: 30,
        height: 30,
        // backgroundColor: "yellow",
        position: 'absolute'
    },
    sub: {
        width: 20,
        height: 20,
        backgroundColor: 'yellow',
        borderRadius: 10,
        position: 'absolute'
    }
})