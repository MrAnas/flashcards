import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { primary, white, red, green } from "../theme/theme";

import {createNotification } from '../utils/helpers';
class QuizView extends Component {
    state = {
        showAnswer: false,
        currentQuestion: 0,
        showResult: false,
        statisticCorrectAnswer: 0,
    };

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params

        return {
            title: `${title} Quiz`
        }
    }

    showAnswer = () => {
        this.setState({
            showAnswer: true,
        })
    };

    nextQuestion = (cardsNumber, correct) => {
        this.setState((prevState) => {
            const newCurrentQuestion = prevState.currentQuestion + 1;
            const increseCorrect = correct ? 1 : 0;
            if (cardsNumber == newCurrentQuestion) {
                createNotification();
                return {
                    showResult: true,
                    statisticCorrectAnswer: prevState.statisticCorrectAnswer + increseCorrect,
                }
            } else {
                return {
                    currentQuestion: newCurrentQuestion,
                    showAnswer: false,
                    statisticCorrectAnswer: prevState.statisticCorrectAnswer + increseCorrect,
                }
            }
        })
    }

    render() {
        const { decks, title } = this.props;
        const { currentQuestion, showResult, showAnswer, statisticCorrectAnswer } = this.state;
        const cardsNumber = decks[title].questions.length;
        const questions = decks[title].questions;
        return (
            <View style={styles.container}>
                {showResult
                    ? (
                        <View>
                            <Text Style={styles.text}> {statisticCorrectAnswer} questions solved </Text>
                            <TouchableOpacity style={styles.button} onPress={() => {
                                this.setState({
                                    showAnswer: false,
                                    currentQuestion: 0,
                                    showResult: false,
                                    statisticCorrectAnswer: 0,
                                })
                            }}>
                                <Text style={styles.buttonText}>
                                    Restart Quiz
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => {
                                this.props.navigation.navigate(
                                    'DeckView',
                                    { title: this.props.title }
                                )
                            }}>
                                <Text onpress={()=>{
                                    this.props.navigation.navigate(
                                    'DeckView',
                                    { title: this.props.title }
                                )}} style={styles.buttonText}>
                                    Back to Deck
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
                    : (
                        <View style={styles.formBox}>
                            <Text style={styles.text}>{cardsNumber + '/' + (currentQuestion + 1)}</Text>
                            <Text style={styles.text}>
                                {questions[currentQuestion].question}

                            </Text>
                            {showAnswer && (<Text style={styles.text}>
                                {questions[currentQuestion].answer}
                            </Text>)}
                            {
                                <View style={styles.formBox}>
                                    {(!showAnswer &&
                                        <TouchableOpacity style={styles.button} onPress={this.showAnswer}>
                                            <Text style={styles.answerText}>
                                                Show Answer
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                    <View style={styles.answerBtnsBox}>
                                        <TouchableOpacity style={[styles.correct, styles.button]} onPress={() => this.nextQuestion(cardsNumber, true)}>
                                            <Text style={styles.correctText}>
                                                Exactly
                                                </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={[styles.wrong, styles.button]} onPress={() => this.nextQuestion(cardsNumber, false)}>
                                            <Text style={styles.wrongText}>
                                                Nope
                                                </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                        </View>
                    )
                }
            </View>
        )
    }
}



function mapStateToProps(state, props) {

    return {
        decks: state,
        title: props.navigation.state.params.title
    }
}

export default connect(
    mapStateToProps
)(QuizView)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: white,
        alignItems: 'center',
    },
    formBox: {
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    text: {
        color: primary,
        fontSize: 30,
        textAlign: 'center'
    },
    button: {
        paddingTop: 25,
        borderRadius: 2,
        height: 55,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 30,
        width: 250,
        height: 60,
    },
    buttonText: {
        color: white,
        fontSize: 25,
    },
    answerBtnsBox: {
        margin: 25,
        alignItems: 'flex-start',
    },
    correct: {
        backgroundColor: green,
    },
    correctText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
        padding: 0,
        borderRadius: 0,
    },
    wrong: {
        backgroundColor: red,
    },
    wrongText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
        padding: 0,
        borderRadius: 2,
    },
    answerText: {
        fontSize: 18,
        color: red,
    },
})

