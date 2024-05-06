import * as React from "react";
import { Fragment } from "react"; 
import { View, StyleSheet } from "react-native";
export default function Snake({coordinates}){
    const showSnake = () => {
        const snakeBody = []; 
        for(let i = 0; i < coordinates.length; i++){
            const x = coordinates[i].x; 
            const y = coordinates[i].y;
            if(i === 0){
                snakeBody[i] = <View key={i} style={[Styles.main, {left: x, top: y}, {backgroundColor: 'green'}]}></View>
            }else{
                snakeBody[i] = <View key={i} style={[Styles.main, {left: x, top: y},  {backgroundColor: 'red'}]}></View>
            } 
        }
        return snakeBody;
    }
    return(
        <Fragment>
            {showSnake()}
        </Fragment>            
    );
}
const Styles = StyleSheet.create({
    main: {
        width: 30,
        height: 30, 
        borderRadius: 30,
        backgroundColor: "red",
        position: "absolute"
    }
})