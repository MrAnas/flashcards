export const GET_DECKS = 'GET_DECKS';
export const GET_DECK = 'GET_DECK';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK';


// Create
export function saveDeck(title) {
    return {
        type: ADD_DECK,
        title,
    }
}
// Create
export function saveQuestion(card) {
    return {
        type: ADD_CARD_TO_DECK,
        card,
    }
}

// List
export function retreiveDecks(decks) {
    return {
        type: GET_DECKS,
        decks
    }
}