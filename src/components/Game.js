import * as React from "react";
import { useEffect, useState } from "react";
import { 
    SafeAreaView, 
    Dimensions, 
    View, 
    StyleSheet, 
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Header from "./Header";
import Snake from "./Snake";
import Food from "./Food";
import Direction from "../Classes/utils"; 
import { colors } from "..//styles/GameStyles";
import { random } from "../Classes/funcs"; 
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const REFRESH_RATE = 40;
const SPEED = 4; 
const BORDER_BOUNDS = {
    xMin: 30, 
    xMax: screenWidth - 2*(30), 
    yMin: 150, 
    yMax: screenHeight - 100
} 
const SNAKE_BODY = [ {x: 200, y: 200, isHead: true} ]; 
const PRECISION = 15;
const FOOD_ARRAY = ["🍎", "🍊", "🍌", "🍉", "🍇", "🍕", "🍔", "🥪"];
export default function Game(){ 
    const [isPaused, setIsPaused] = useState(false);
    const [food, setFood] = useState(
        {
            x: random(BORDER_BOUNDS.xMin, BORDER_BOUNDS.xMax),
            y: random(BORDER_BOUNDS.yMin, BORDER_BOUNDS.yMax),
            emoji: FOOD_ARRAY[0] 
        }
    );
    const [score, setScore] = useState(0);  
    const [direction, setDirection] = useState(Direction.DOWN);
    const [snake, setSnake] = useState([{
        x: random(BORDER_BOUNDS.xMin, BORDER_BOUNDS.xMax),
        y: random(BORDER_BOUNDS.yMin, BORDER_BOUNDS.yMax),
    }]); 
    const [gameOver, setGameOver] = useState(false); 
    const checkGameOver = () => {
        // check if snake crossed the bounds 
        if(snake[0].x < BORDER_BOUNDS.xMin || snake[0].x > BORDER_BOUNDS.xMax || snake[0].y > BORDER_BOUNDS.yMax || snake[0].y < BORDER_BOUNDS.yMin){
            console.log('GAME IS OVER')
        
            setGameOver(true); 
        }
        // check if snake touched its tail 
        const head = snake[0]; 
        for(let i = 1; i < snake.length; i++){
            if(head.x === snake[i].x && head.y === snake[i].y){
                setGameOver(true); 
                console.log('GAME IS OVER');
                break; 
            }
        }
    }
    const handleGesture = (event) => { 
        const { translationX, translationY } = event.nativeEvent; 
        if(Math.abs(translationX) > Math.abs(translationY)){
            if(translationX >= 0){
                // moving to the right 
                setDirection(Direction.RIGHT); 
            }else{
                // moving to the left 
                setDirection(Direction.LEFT); 
            } 
        }else{
            if(translationY >= 0){
                // moving down 
                setDirection(Direction.DOWN); 
            }else{
                // moving up 
                setDirection(Direction.UP); 
            }
        }
    }

    const generateFood = () => {
        const foodX = random(BORDER_BOUNDS.xMin, BORDER_BOUNDS.xMax);
        const foodY = random(BORDER_BOUNDS.yMin, BORDER_BOUNDS.yMax);
        const randomFruit = FOOD_ARRAY[Math.floor(Math.random() * (FOOD_ARRAY.length - 1))]; 
        setFood({x: foodX, y: foodY, emoji: randomFruit});
    }

    const moveSnake = () => {
        // checks if the game is over 
        console.log(snake);
        checkGameOver();
        const oldHead = snake[0];
        const newHead = {...oldHead}; 
        switch(direction){
            case Direction.UP:
                newHead.y -= SPEED; 
                break; 
            case Direction.DOWN:
                newHead.y += SPEED;
                break; 
            case Direction.RIGHT:
                newHead.x += SPEED; 
                break; 
            case Direction.LEFT:
                newHead.x -= SPEED; 
                break; 
            default: 
                break;
        }
        if(snake[0].x < food.x + PRECISION && snake[0].x > food.x - PRECISION && snake[0].y < food.y + PRECISION && snake[0].y > food.y - PRECISION){
            setScore(prev => prev + 10);
            generateFood(); 
            setSnake([newHead, ...snake])
        }else{
            setSnake([newHead, ...snake.slice(0,-1)]); 
        }

    }; 

    const pauseGame = () => {
        setIsPaused(!isPaused); 
    }
    const restartGame = () => {
        setGameOver(false); 
        setSnake([{
            x: random(BORDER_BOUNDS.xMin, BORDER_BOUNDS.xMax),
            y: random(BORDER_BOUNDS.yMin, BORDER_BOUNDS.yMax),
        }]);
        setFood(
            {
                x: random(BORDER_BOUNDS.xMin, BORDER_BOUNDS.xMax),
                y: random(BORDER_BOUNDS.yMin, BORDER_BOUNDS.yMax),
                emoji: FOOD_ARRAY[0] 
            }
        ); 
        setScore(0); 
        setIsPaused(false); 
    }
    useEffect(() => { 
        let intervalId;
        if(!gameOver && !isPaused){
            intervalId = setInterval(moveSnake, REFRESH_RATE); 
        }
        return () => clearInterval(intervalId); 
    }, [direction, snake, gameOver, isPaused])
    return(
        <PanGestureHandler onGestureEvent={handleGesture}>
            <SafeAreaView style={Styles.container}>
                <Header score={score} borderBounds={BORDER_BOUNDS} pauseGame={pauseGame} restartGame={restartGame}/>
                <View style={Styles.gameCanvas}></View>
                <Snake coordinates={snake} setGameOver={setGameOver}/>
                <Food food={food}/>
            </SafeAreaView>
        </PanGestureHandler>
    )
}

const Styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#2d4b13', 
        alignItems: "center"
    },
    gameCanvas: {
        height: screenHeight - BORDER_BOUNDS.yMin,
        width: "100%",
        backgroundColor: colors.lightGreen,
        borderColor: colors.bgColor_primary,
        borderLeftWidth: BORDER_BOUNDS.xMin,
        borderRightWidth: BORDER_BOUNDS.xMin,
        borderBottomWidth: BORDER_BOUNDS.yMin - 111,
        borderTopWidth: BORDER_BOUNDS.yMin - 2*66,
    }
})