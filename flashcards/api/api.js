

import { AsyncStorage } from 'react-native'
import {STORAGE_KEY,
     readyData} from "../_DATA";


// Save Deck
export function saveDeck (title) {
    return AsyncStorage.mergeItem(STORAGE_KEY,JSON.stringify(
        {[title]: {
                    title: title,
                    questions: []
                }
        }))
        .catch(() => {
            console.log('Error: cant save new deck')
        });
}

// Fetch Decks
export function fetchDecks(){
    return AsyncStorage.getItem(STORAGE_KEY)
        .then((decks) => {
           if (decks === null)
                readyData()
                    .then((response) => {
                        fetchDecks();
                    })
                    .catch(() => {
                        console.log('error');
                    });
           else {
               return JSON.parse(decks);
           }
        });
}


// Save  Added Question
export function saveQuestion ({ deckTitle, question, answer }) {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then((response) => {
            const decks = JSON.parse(response);
            let updatedQuestions =  decks[deckTitle].questions;
            updatedQuestions.push({
                question: question,
                answer: answer
            })
            const updatedDeck = JSON.stringify({
                [deckTitle]:{
                    title: deckTitle,
                    questions: updatedQuestions
                }
            });
            return AsyncStorage.mergeItem(STORAGE_KEY, updatedDeck)
                .then( (response) => {
                    console.log('Success')
                })
                .catch(() => {
                    console.log('Error')
                });
        })
        .catch((error) => {
            console.error('Error: Cant fetch');
        })

}





// export function removeEntry (key) {
//     return AsyncStorage.getItem()
//         .then((response) => {
//             const data = JSON.parse(response);
//             data[key] = undefined;
//             delete data[key];
//             AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
//         })
// }