import React from 'react';
import { ActivityIndicator, Alert, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from './Colors';
import {AntDesign} from '@expo/vector-icons'
import TodoList from './components/TodoList';
import AddListModal from './components/AddListModal';
import Fire from './Fire'

export default class App extends React.Component {
  state = {
    addTodoModalVisible: false,
    lists: [],
    user: {},
    loading: true
  }

  componentDidMount() {
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
          return(
              <View style={styles.container}>
                  <ActivityIndicator size="large" color={colors.blue} />
              </View>
          )
      }
    return (
      <View style={styles.container}>
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
