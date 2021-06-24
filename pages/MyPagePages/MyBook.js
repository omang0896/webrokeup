import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {firebase_db} from '../../firebaseConfig'


const ChapterItem = (props) => {
    const {navigation, chapters, chapterTitle}=props;
    
    
    const isMyitem = (typeof myitem !== 'undefined');
    if (isMyitem == false) {
        return null; // early return
    }
    return (
        <View>
            <TouchableOpacity style={styles.bookIndexOne} onPress={()=>{navigation.navigate('readArticle', {chapters: chapters, chapterTitle: chapters.chapterTitle})}}>
                <Text style={styles.bookIndexOneTitle}>{chapters.chapterTitle}</Text>  
                <Text style={styles.bookIndexOnePunchLine}>{chapters.mainText}</Text>
                <Text style={styles.bookIndexText}>{chapters.regdate}</Text>
            </TouchableOpacity>
            <View style={{borderBottomColor: "gray" ,borderBottomWidth: 1,}}/>
        </View>
    )
}


const MyBook = ({navigation, route}) => {
    const {myitem} = route.params;

    function renderMyChapter() {
        const isMyitem = (typeof myitem !== 'undefined')
        if (isMyitem == false){
            return null;
        }
    }

        const isMyChapters = (myitem.chapters > '');
        if (isMyChapters == false) {
            return null;
        }

        const {mychapters} = myitem.chapters;
        const list = Object.keys(myitem);
        const ch_list = Object.keys(list);

        const chlist = ch_list.map(key => {
            const isMyChaptersItem = chapters[key]


            return (
            <ChapterItem 
                navigation={navigation}
                chapters={chapterItemChapters}
                chapterTitle={chapters.chapterTitle}
            />);
        })

       


    return (
    <ScrollView style={styles.container}>
        <View  style={styles.bookCoverContainer}>
            <StatusBar style="white" />
            <Image style={styles.bookCoverImage} source={{uri:myitem.image}}></Image>
        </View>
        <View  style={styles.bookInfoContainer}>
            <Text style={styles.bookTitle}>{myitem.bookTitle}</Text>
            <Text style= {{padding:15}}>{myitem.regdate}</Text>
            <Text style={styles.bookDesc}>{myitem.intro.introArticle}</Text>  
            <TouchableOpacity style={styles.subButton}>        
                <Text style={styles.subButtonText}>구독하기</Text>
            </TouchableOpacity>   
        </View>
        <View style={styles.bookIndexContainer}>
            { renderMyChapter() }
        </View>
    </ScrollView>
    );
}

const styles = StyleSheet.create({ 

    container: {
        //앱의 배경 색
        backgroundColor:"#F5F4F4",
                flex:1
      },


    bookCoverContainer: {

        width:'90%',
        //컨텐츠의 높이 값
        height:220,
        //컨텐츠의 모서리 구부리기
        marginTop:"%",
        //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
        //각 속성의 값들은 공식문서에 고대로~ 나와 있음
        alignSelf:"center"
    },
    bookCoverImage: {
        marginTop:"7%",
        height:"100%",
        width: "40%",
        alignSelf:"center"


    },
   
    bookInfoContainer: {
        backgroundColor:"#F5F4F4",
        width:'90%',
        //컨텐츠의 높이 값
        height:130,
        //컨텐츠의 모서리 구부리기
        //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
        //각 속성의 값들은 공식문서에 고대로~ 나와 있음
        alignSelf:"center",

    },
    bookTitle: {
        fontSize: 15,
        marginTop: "7%",
        marginLeft:"5%",
        fontSize: 15,
        
    },
    bookDesc: {
        marginTop: "4%",
        marginLeft:"5%",
    },

    subButton:{
        width:"50%",
            height:27,
            padding:"2%",
            backgroundColor:"#fe8d6f",
            borderRadius:15,
            margin:"2%",
            marginLeft: "0%",
            marginTop: "5%",
            alignSelf:"center",    

    },

    subButtonText: {
        color:"white",
        fontWeight:"200",
        //텍스트의 현재 위치에서의 정렬 
        textAlign:"center"
    },


    bookIndexContainer:{
        backgroundColor: '#fff',

    },
    bookIndexOne: {
        marginTop:"5%",
      marginLeft:"5%",
      marginRight:"3%",
      marginBottom:"5%",
    },

    bookIndexOneTitle: {
        fontSize: 15,


    },
    bookIndexOnePunchLine:{
        fontWeight: '700',
        marginLeft:"5%",
        marginTop:"2%",


    },
    bookIndexText :{
        marginLeft:"5%",
        marginTop:"2%",


    },
  





})

export default MyBook;
