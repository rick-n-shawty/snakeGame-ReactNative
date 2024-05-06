import * as React from "react" ;
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles/GameStyles";
const screenWidth = Dimensions.get('window').width; 
export default function Header({pauseGame,borderBounds,restartGame, score}){
    
    return(
        <View style={[Styles.header, {
            height: borderBounds.yMin - 70,  
            width: screenWidth - 2 * borderBounds.xMin,      
        }]}>
            <TouchableOpacity onPress={restartGame}>
                <MaterialIcons name="restart-alt" size={30}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={pauseGame}>
                <Feather name="pause" size={30}/>
            </TouchableOpacity> 
            <Text style={Styles.text}>{score}</Text>
        </View>
    )
}

const Styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row', 
        alignItems: "center",
        justifyContent: 'space-around',
        backgroundColor: '#e7fcc3',
        borderTopEndRadius: 15,
        borderTopStartRadius: 15
    }, 
    text: {
        fontSize: 27,
        fontWeight: 700
    }
})