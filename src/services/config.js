import '@firebase/auth'
import '@firebase/firestore'
import { initializeApp } from 'firebase/app'

const SANDBOX = {
	apiKey: 'AIzaSyA2T6jBKdUq09otQPwSW77ayWGyvza4F1I',
	authDomain: 'sandbox-4d8e0.firebaseapp.com',
	projectId: 'sandbox-4d8e0',
	storageBucket: 'sandbox-4d8e0.appspot.com',
	messagingSenderId: '348161285704',
	appId: '1:348161285704:web:383edaaad59a50ff92027d',
	measurementId: 'G-ZLYKMCP55E',
}

const firebaseConfig = { SANDBOX }['SANDBOX']
let firebase = initializeApp(firebaseConfig)
export { firebase }
