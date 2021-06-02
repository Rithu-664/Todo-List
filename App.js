import React from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from './Colors';
import {AntDesign} from '@expo/vector-icons'
import tempData from './tempData';
import TodoList from './components/TodoList';
import AddListModal from './components/AddListModal';

export default class App extends React.Component {
  state = {
    addTodoModalVisible: false
  }

  toggleAddTodoModal() {
    this.setState({addTodoModalVisible: !this.state.addTodoModalVisible})
  }

  renderList = list => {
    return <TodoList list={list} />
  }

  render(){
    return (
      <View style={styles.container}>
        <Modal animationType="slide" visible={this.state.addTodoModalVisible} onRequestClose={() => this.toggleAddTodoModal()} >
          <AddListModal closeModal = {() => this.toggleAddTodoModal()} />
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
              data={tempData}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.name}
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
