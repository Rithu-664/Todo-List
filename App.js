import React from 'react';
import { ActivityIndicator, Alert, FlatList, LogBox, Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from './Colors';
import {AntDesign} from '@expo/vector-icons'
import TodoList from './components/TodoList';
import AddListModal from './components/AddListModal';
import Fire from './Fire'
import OnboardingScreen from './screens/Onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';

var firebase
export default class App extends React.Component {
  state = {
    addTodoModalVisible: false,
    lists: [],
    user: {},
    loading: true,
    isFirstLaunch: null
  }

  componentDidMount() {
      LogBox.ignoreLogs(['Setting a timer'])
    firebase = new Fire((error, user) => {
        if(error) {
            return Alert.alert('Oops!','Something went wrong. Please try again later')
        }

        firebase.getLists(lists => {
            this.setState({lists, user},() => {
                this.setState({loading: false})
            })
        })

        this.setState({user})
    })

    AsyncStorage.getItem('alreadyLaunched').then(value => {
        if (value === null) {
          AsyncStorage.setItem('alreadyLaunched', 'true')
          this.setState({isFirstLaunch: true})
        }else {
          this.setState({isFirstLaunch: false})
        }
      })

  }

  componentWillUnmount() {
    firebase.detach()
  }

  toggleAddTodoModal() {
    this.setState({addTodoModalVisible: !this.state.addTodoModalVisible})
  }

  renderList = list => {
    return <TodoList list={list}  updateList={this.updateList} deleteList={this.deleteList} />
  }

  addList = list => {
    firebase.addList({
        name: list.name,
        color: list.color,
        todos: [],
    })
  }

  updateList = list => {
    firebase.updateList(list)
  }

  deleteList = list => {
      firebase.deleteLists(list)
  }

  render(){
      if(this.state.loading){
          <StatusBar hidden/>
          return(
              <View style={styles.container}>
                  <ActivityIndicator size="large" color={colors.blue} />
              </View>
          )
      }
    return (
      <View style={styles.container}>
          <StatusBar hidden/>
          <Modal visible={this.state.isFirstLaunch} animationType="slide">
            <OnboardingScreen closeModal={() => this.setState({isFirstLaunch: false})} />
          </Modal>
        <Modal animationType="slide" visible={this.state.addTodoModalVisible} onRequestClose={() => this.toggleAddTodoModal()} >
          <AddListModal closeModal = {() => this.toggleAddTodoModal()} addList={this.addList} />
        </Modal>
        <View style={{flexDirection:'row'}}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Todo <Text style={{fontWeight:'300',color: colors.blue}}>Lists</Text>
          </Text>
          <View style={styles.divider} />
        </View>

      <View style={{marginVertical: 40}}>
        <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddTodoModal()} >
          <AntDesign name="plus" color={colors.blue} size={16}  />
        </TouchableOpacity>
        <Text style={styles.add}>Add List</Text>
      </View>

      <View style={{height: 275,paddingLeft:32}}>
            <FlatList
              data={this.state.lists}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              keyboardShouldPersistTaps="always"
              renderItem={({item}) => this.renderList(item)}
            />
      </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex:1,
    alignSelf: 'center'
  },
  title: {
    fontSize: 38,
    fontWeight:'800',
    color: colors.black,
    paddingHorizontal: 32
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    padding:16,
    alignItems:'center',
    justifyContent:'center'
  },
  add: {
    color: colors.blue,
    fontWeight:'600',
    fontSize: 14,
    marginTop: 8
  }
});
