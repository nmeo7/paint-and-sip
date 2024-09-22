import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import { firebase } from './config'

const storage = getStorage(firebase)

export { ref, getDownloadURL, storage }
