import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { white, primary, gray, black } from '../theme/theme'
import { fetchDecks } from "../api/api";

class Home extends Component {

    render(){
        let cardsNumber = 0;
        console.log(this.props.decks["Deck2"]);
        console.log(this.props.title);
        if (this.props.decks[this.props.title].questions !== undefined){
            cardsNumber = this.props.decks[this.props.title].questions.length;
        }
        return (
            <View style={styles.deck}>
                <Text style={styles.deckTitle}>{this.props.title}</Text>
                <Text style={styles.questions}>{cardsNumber} cards</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deck: {
        flexDirection: 'column',
        marginTop: 5,
        height: 65,
        backgroundColor: white,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    deckTitle: {
        fontSize: 20,
        color: black,
        textAlign: 'left',
    },
    questions: {
        textAlign: 'left',
        fontSize: 16,
        color: gray,
    },
})

function mapStateToProps (state) {

    return {
        decks: state
    }
}

export  default connect(
    mapStateToProps
)(Home)