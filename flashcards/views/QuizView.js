import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { primary, white, red, green } from "../theme/theme";

import {setLocalNotification } from '../utils/helpers';
class QuizView extends Component {
    state = {
        viewAnswer: false,
        currentQuestion: 0,
        showResult: false,
        noCorrectAnswers: 0,
    };

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params

        return {
            title: `${title}`
        }
    }

    viewAnswer = () => {
        this.setState({
            viewAnswer: true,
        })
    };

    nextQuestion = (cardsNumber, correct) => {
        this.setState((prevState) => {
            const newCurrentQuestion = prevState.currentQuestion + 1;
            const incrementCorrectAnswers = correct ? 1 : 0;
            if (cardsNumber == newCurrentQuestion) {
                setLocalNotification();
                return {
                    showResult: true,
                    noCorrectAnswers: prevState.noCorrectAnswers + incrementCorrectAnswers,
                }
            } else {
                return {
                    currentQuestion: newCurrentQuestion,
                    viewAnswer: false,
                    noCorrectAnswers: prevState.noCorrectAnswers + incrementCorrectAnswers,
                }
            }
        })
    }

    render() {
        const { decks, title } = this.props;
        const { currentQuestion, showResult, viewAnswer, noCorrectAnswers } = this.state;
        const cardsNumber = decks[title].questions.length;
        const questions = decks[title].questions;
        return (
            <View style={styles.container}>
                {showResult
                    ? (
                        <View>
                            <Text style={styles.text}> {noCorrectAnswers} questions solved </Text>
                            <TouchableOpacity style={styles.button} onPress={() => {
                                this.setState({
                                    viewAnswer: false,
                                    currentQuestion: 0,
                                    showResult: false,
                                    noCorrectAnswers: 0,
                                })
                            }}>
                                <Text style={styles.buttontext}>
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
                                )}} style={styles.buttontext}>
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
                            {viewAnswer && (<Text style={styles.text}>
                                {questions[currentQuestion].answer}
                            </Text>)}
                            {
                                <View style={styles.formBox}>
                                    {(!viewAnswer &&
                                        <TouchableOpacity style={styles.button} onPress={this.viewAnswer}>
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
        paddingTop: 20,
        borderRadius: 2,
        height: 60,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 30,
        width: 250,
        height: 60,
        backgroundColor: primary
    },
    buttontext: {
        color: white,
        fontSize: 25,
    },
    answerBtnsBox: {
        margin: 20,
        alignItems: 'center',
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

