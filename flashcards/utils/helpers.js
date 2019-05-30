import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_QUIZ = 'NOTIFICATION_KEY_QUIZ';

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_QUIZ)
        .then(Notifications.cancelAllScheduledNotificationsAsync);
}

function createNotification() {
    return {
        title: 'Take some time to do a small quiz',
        body: "quick test will boost your smartness!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'low',
            sticky: false,
            vibrate: true,
        }
    }
}

// Used from udacity project
export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_QUIZ)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(20)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )
                            AsyncStorage.setItem(NOTIFICATION_QUIZ, JSON.stringify(true))
                        }
                    })
            }
        })
}