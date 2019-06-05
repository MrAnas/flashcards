
import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { retreiveDecks } from "../redux/actions";
import { fetchDecks } from "../api/api";
import Home from "./Home";
import { white } from '../theme/theme';

class DeckListView extends Component {
    state = {
        ready: false,
    };

    componentDidMount() {
        const { dispatch } = this.props;
        fetchDecks()
            .then((entries) => {
                dispatch(retreiveDecks(entries))
            })
            .then(() => this.setState(() => ({ ready: true })))
    }

    renderDeck = ({ item }) => (
        <TouchableOpacity style={styles.deck}
            key={item.title}
            onPress={() => this.props.navigation.navigate(
                'DeckView',
                { title: item.title }
            )}>
            <Home title={item.title} />
        </TouchableOpacity>
    )

    render() {
        let data = Object.values(this.props.decks).sort(
            (deck1, deck2) => deck1.title > deck2.title,
        )
        let decksResult = (<Text>Nothing to show here</Text>);

        if (this.state.ready) {
            decksResult = Object.keys(this.props.decks).map((deckTitle) => {
                return (
                    <TouchableOpacity
                        key={deckTitle}
                        onPress={() => this.props.navigation.navigate(
                            'DeckView',
                            { title: deckTitle }
                        )}>
                        <Home title={deckTitle} />
                    </TouchableOpacity>
                )
            });
        }
        return (
            <View style={styles.container}>
                <FlatList data={data} renderDeck={this.renderDeck} keyExtractor={(item, index) => index.toString()} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: white,
        padding: 25
    },
    deck: {
        padding: 0,
        margin: 0,
    },
})

function mapStateToProps(state) {
    return {
        decks: state
    }
}


export default connect(mapStateToProps)(DeckListView)