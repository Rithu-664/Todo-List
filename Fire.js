import firebase from 'firebase'
import '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAOxL-U2Vu9BNXGLxx1N6fUH1opjqna6fs",
  authDomain: "todo-bcddb.firebaseapp.com",
  projectId: "todo-bcddb",
  storageBucket: "todo-bcddb.appspot.com",
  messagingSenderId: "1084278309696",
  appId: "1:1084278309696:web:194d4cba41142fd16470a5",
  measurementId: "G-M2MMYF1SCS",
};

class Fire {
    constructor(callback){
        this.init(callback)
    }

    init(callback) {
        if(!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
        }

        firebase.auth().onAuthStateChanged(user => {
            if(user){
                callback(null,user)
            }else {
                firebase.auth().signInAnonymously().catch(error => {
                    callback(error)
                })
            }
        })
    }

    getLists(callback) {
        let ref = this.ref.orderBy('name')

        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = []

            snapshot.forEach(doc => {
                lists.push({id: doc.id, ...doc.data()})
            })

            callback(lists)
        })
    }

    addList(list) {
        let ref = this.ref
        ref.add(list)
    }

    updateList(list) {
        let ref = this.ref

        ref.doc(list.id).update(list)
    }

    deleteLists(list) {
        let ref = this.ref

        ref.doc(list.id).delete()
    }

    get userId() {
       return firebase.auth().currentUser.uid
    }

    get ref() {
        return firebase.firestore().collection('users').doc(this.userId).collection('lists')
    }

    detach() {
        this.unsubscribe()
    }

}

export default Fire