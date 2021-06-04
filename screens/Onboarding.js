import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'

const Dots = ({selected}) => {
        let backgroundColor; 

        backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)'

        return (
                <View style={{width: 5, height: 5, marginHorizontal: 3, backgroundColor}}/>
        )
}

const Skip = ({...props}) => {
        return(
                <TouchableOpacity  style={{marginHorizontal:10}} {...props}>
                        <Text style={{fontSize:16}}>Skip</Text>
                </TouchableOpacity> 
        )
}

const Next = ({...props}) => {
        return(
                <TouchableOpacity  style={{marginHorizontal:10}} {...props}>
                        <Text style={{fontSize:16}}>Next</Text>
                </TouchableOpacity> 
        )
}

const Done = ({...props}) => {
        return(
                <TouchableOpacity  style={{marginHorizontal:10}} {...props}>
                        <Text style={{fontSize:16}}>Done</Text>
                </TouchableOpacity> 
        )
}

export default class OnboardingScreen extends React.Component {

    render(){
        return(
            <Onboarding
                    SkipButtonComponent={Skip}
                    NextButtonComponent={Next}
                    DoneButtonComponent={Done}
                    DotComponent={Dots}
                    transitionAnimationDuration={600}                  
                    onSkip={() => this.props.closeModal()}
                    onDone={() => this.props.closeModal()}
                    pages={[
                            {
                                    backgroundColor: '#A6E4D0',
                                    image: <Image source={require('../assets/onboarding-img1.png')}  style={{borderRadius: 6, width: 200, height: 200}} />,
                                    title: 'Create Todo Lists with a corresponding color!',
                                    subtitle: 'You can add colors to your todo lists!',
                            },
                            {
                                backgroundColor: '#FDEB93',
                                image: <Image source={require('../assets/onboarding-img2.png')} style={{borderRadius: 6, width: 200, height: 200}}/>,
                                title: 'Delete Todo Lists',
                                subtitle: 'Long press on a todo list to delete it.',
                            },
                            {
                                    backgroundColor: '#E9BCBE',
                                    image: <Image source={require('../assets/onboarding-img3.png')} style={{borderRadius: 6,width:200,height:200}}/>,
                                    title: 'Delete Todos and mark them as complete',
                                    subtitle: 'Swipe a todo to delete them.',
                            },
                    ]}
            />
    )
    }
}

const styles = StyleSheet.create({
        container: {
                flex:1,
                alignItems:'center',
                justifyContent:'center'
        }
})
