import React, { Component } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, TextInput, Alert } from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import colors from '../Colors'
import tempData from '../tempData'


export default class AddListModal extends Component {

    backgroundColors = ["#345995","#E5DB9C","#E40066","#03CEA4","#FB4D3D","#C64191","#7A93AC"]

    state = {
        name: '',
        color: this.backgroundColors[0]
    }

    createTodo = () => {
        const {name, color} = this.state;
        
        if(name === ''){
            Alert.alert('Error creating Todo List','Please enter a name for your todo list')
        }else{
            tempData.push({
                name,
                color,
                todos:[]
            })
            this.setState({name: ''})
            this.props.closeModal()
        }
        
    }

    renderColors = () => {
        return this.backgroundColors.map(color => {
            return(
                <TouchableOpacity key={color} style={[styles.colorSelect, {backgroundColor: color}]} onPress={() => this.setState({color: color})} />
            )
        })
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <TouchableOpacity style={{position:'absolute',top: 64, right: 32}} onPress={this.props.closeModal} >
                    <AntDesign name="close" size={24} color={colors.black} />
                </TouchableOpacity>

                <View style={{alignSelf: 'stretch',marginHorizontal: 32}}>
                    <Text style={styles.title}>Create Todo List</Text>

                    <TextInput style={styles.input} placeholder="Enter a name for your new Todo List 📄" value={this.state.name} onChangeText={name => this.setState({name})} />

                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop: 12}} >{this.renderColors()}</View>

                    <TouchableOpacity style={[styles.create,{backgroundColor: this.state.color}]} onPress={() => this.createTodo()}>
                        <Text  style={{color:colors.white,fontWeight:'600',}}>Create!</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        alignSelf:'center',
        color: colors.black,
        marginBottom: 16
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18
    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent:'center'
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4
    }
})
