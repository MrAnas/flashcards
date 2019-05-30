import { AsyncStorage } from 'react-native'

export const STORAGE_KEY = 'UdaciMobileFlashCard:decks03';


export function readyData () {
    let readyData ={
        Deck1: {
            title: 'Deck 1',
            questions: [
                {
                    question: 'What is your Name',
                    answer: 'Anas'
                },
                {
                    question: 'How old are you?',
                    answer: '25'
                }
            ]
        },
        Deck2: {
            title: 'Deck 2',
            questions: [
                {
                    question: 'How are you?',
                    answer: 'Superb'
                }
            ]
        }
    };

    return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(readyData));
}