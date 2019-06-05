import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native'
import { connect } from 'react-redux';
import {saveNewQuestion} from "../api/api";
import {saveQuestion} from "../redux/actions";
import {gray, primary, white} from "../theme/theme";

class AddQuestion extends Component {

    state = {
        question: '',
        answer: '',
    };

    onSaveCard = () => {
        const card = {
            deckTitle: this.props.title,
            question: this.state.question,
            answer: this.state.answer
        };

        saveNewQuestion(card)
            .then( () => {
                this.props.dispatch(saveQuestion(card))
            })
            .then( () => {
                this.props.navigation.navigate(
                    'DeckView',
                    { title: this.props.title }
                )
            })
    };

    static navigationOptions = ({ navigation }) => {

        return {
            title: `Add Card`
        }
    }   

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.formBox}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({question: text})}
                        value={this.state.question}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({answer:text})}
                        value={this.state.answer}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.onSaveCard}>
                        <Text style={styles.buttontext}>
                            Save 
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

function mapStateToProps (state, props) {
    return {
        decks: state,
        title: props.navigation.state.params.title
    }
}

export  default connect(
    mapStateToProps
)(AddQuestion)

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
    input: {
        width: 330,
        height: 40,
        padding: 15,
        borderWidth: 1,
        borderColor: gray,
        backgroundColor: white,
        margin: 15,
        alignSelf: 'center',
    },
    button: {
        padding: 15,
        backgroundColor: primary,
        alignSelf: 'center',
        borderRadius: 5,
        margin: 25,
    },
    buttontext :{
        color: white,
        fontSize: 25,
    },
})
