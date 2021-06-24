import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Touchable} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';


export default function MyArticle({navigation, route}) {
    const {myitem, chapters} = route.params;
    return (

        <View style={styles.container}>
            <StatusBar style="white" />

            <View style={styles.upperButtonContainer}>
                <TouchableOpacity style={styles.editButton}>                
                    <Text style={styles.editButtonText}>편집</Text>
                </TouchableOpacity>  

                <TouchableOpacity style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>삭제</Text>
                </TouchableOpacity>  
            </View>

            <View>
                <Text style={styles.bookTitle}>{chapters.chapterTitle}</Text>  

            </View>
            <ScrollView style={styles.textContainer}>
                
                    <Text style={styles.bookText}>   
                        {chapters.chapterTitle}
                        {/*너무 쉽게 들춰보아 너덜해진 편지지가 
                        있고 너무 세게 열어두어 닫힌 줄 모르는 
                        마음과 너무 깊이 맛보아서 비릿해진 
                        그림움이 있어. 

                        너무 오래 쓰다듬어 
                        매끈해진 로라반정이 있고 너무 높이 
                        자라나서 비대해진 생각들이 있고
                        너무 자주 발음해서 입술에 물든 
                        네 이름이 있어. */}
                        </Text>  
            
            
        </ScrollView>
        <View style={styles.bottomButtonContainer}>

                <TouchableOpacity style={styles.likeButton}>                
                    <Text style={styles.likeButtonText}>공감</Text>
                </TouchableOpacity>  

                <TouchableOpacity style={styles.commentButton}>
                    <Text style={styles.commentButtonText}>댓글</Text>
                </TouchableOpacity>  
            </View>
        </View>
    )}

const styles = StyleSheet.create({ 

    container: {
        //앱의 배경 색
        backgroundColor:"#F5F4F4",
                flex:1
      },

      upperButtonContainer: {
        flex:1,
        flexDirection:"row",
        alignSelf:"flex-end",
        marginTop: "15%",
        marginRight:"10%"


      },

      editButton: {
          
      },
      deleteButton: {
          marginLeft: "7%"
      },

      textContainer:{
          height: "50%"
      },

      bookTitle:{
        fontSize: 20,
        marginLeft: "5%"

      },
      bookText:{
          marginTop: "20%",
          marginLeft:"10%",
          marginRight:"10%",

      },

      bottomButtonContainer: {
        flex:1,
        flexDirection:"row",
        marginTop: "15%",
        marginRight:"10%"

      },
    
      commentButton: {
        marginLeft: "7%"
    },
    
    likeButton: {
        marginLeft: "10%"

    }









})