import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { connect } from 'react-redux';
import { fetchDecks, saveNewDeck } from "../api/api";
import { retreiveDecks, saveDeck } from "../redux/actions";
import { primary, white, gray } from "../theme/theme";

class AddDeck extends Component {
    state = {
        ready: false,
        title: '',
    };

    componentDidMount() {
        const { dispatch } = this.props;
        fetchDecks()
            .then((entries) => {
                dispatch(retreiveDecks(entries))
            })
            .then(() => this.setState(() => ({ ready: true })))
    }

    onSaveDeck = () => {
        if (this.state.title === null) {
            Alert.alert("please provide a title")
            return
        }
        if (this.props.decks[this.state.title]) {
            Alert.alert("the title is already existing")
            return
        } else {
            saveNewDeck(this.state.title)
                .then(() => {
                    return this.props.dispatch(saveDeck(
                        {
                            [this.state.title]: {
                                title: this.state.title,
                                questions: []
                            }
                        }
                    ));
                })
                .then(() => {
                    this.props.navigation.navigate(
                        'DeckView',
                        { title: this.state.title }
                    )
                })
                .catch((error) => console.warn('Error cant navigate', error));
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formBox}>
                    <Text style={styles.text}>Title</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({ title: text })}
                        value={this.state.title}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.onSaveDeck}>
                        <Text style={styles.buttonText}>
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {

    return {
        decks: state
    }
}

export default connect(
    mapStateToProps
)(AddDeck)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: white,
        alignItems: 'flex-start',
    },
    formBox: {
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    },
    text: {
        color: primary,
        fontSize: 30,
        textAlign: 'left'
    },
    input: {
        width: 250,
        height: 40,
        padding: 10,
        borderWidth: 1,
        borderColor: gray,
        backgroundColor: white,
        margin: 25,
        alignSelf: 'center',
    },
    button: {
        padding: 10,
        backgroundColor: primary,
        alignSelf: 'center',
        borderRadius: 5,
        margin: 25,
    },
    buttonText: {
        color: white,
        fontSize: 25,
    },
})
