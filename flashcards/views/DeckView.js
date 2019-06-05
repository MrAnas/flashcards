import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { primary, white, black } from '../theme/theme'
import Home from "./Home";

class DeckView extends Component {
    

    addCard = () => {
        this.props.navigation.navigate(
            'AddQuestion',
            { title: this.props.title }
        )
    };


    static navigationOptions = ({ navigation }) => {
        const { entryId } = navigation.state.params

        return {
            title: entryId
        }
    }

    
    start = () => {
        this.props.navigation.navigate(
            'QuizView',
            { title: this.props.title }
        )
    };

    render() {
        const { title } = this.props;
        return (
            <View style={styles.container}>
                <Home title={title} />
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.addCardButton} onPress={this.addCard}>
                        <Text style={styles.addCardText}>
                            Add New Card to the deck
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.startQuizButton} onPress={this.start}>
                        <Text style={styles.startQuizText}>
                            Start
                        </Text>
                    </TouchableOpacity>
                </View>
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

export default connect(mapStateToProps)(DeckView)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: white,
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    buttonsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        marginLeft: 60,
        marginRight: 60,
    },
    addCardButton: {
        backgroundColor: white,
        borderColor: primary,
        borderWidth: 2,
        borderRadius: 5,
        padding: 25,
    },
    startQuizButton: {
        backgroundColor: primary,
        borderColor: primary,
        borderWidth: 2,
        borderRadius: 5,
        padding: 25,
        marginTop: 25,
    },
    addCardText: {
        fontSize: 25,
        alignSelf: 'center',
    },
    startQuizText: {
        fontSize: 25,
        color: white,
        alignSelf: 'center',
    },
})