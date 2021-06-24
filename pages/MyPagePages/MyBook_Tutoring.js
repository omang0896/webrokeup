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
                {/* <Text style={styles.bookIndexOneTitle}>{myitem.chapters.chapterTitle}</Text>   */}
                <Text style={styles.bookIndexOneTitle}>{chapterTitle}</Text>  
                {/* <Text style={styles.bookIndexOnePunchLine}>{myitem.chapters.mainText}</Text> */}
                <Text style={styles.bookIndexOnePunchLine}>{chapters.mainText}</Text>
                {/* <Text style={styles.bookIndexText}>{myitem.chapters.regdate}</Text> */}
                <Text style={styles.bookIndexText}>{chapters.regdate}</Text>
            </TouchableOpacity>
            <View style={{borderBottomColor: "gray" ,borderBottomWidth: 1,}}/>
        </View>
    )
}


const MyBook = ({navigation, route}) => {
    const [myBook,setMyBook] = useState([]);
    const [state, setState] = useState([])
    const [data, setData] = useState([]);
    const {myitem} = route.params;
    const { chapters } = route.params;


    const aboutImage = "http://ojsfile.ohmynews.com/STD_IMG_FILE/2018/0309/IE002297749_STD.jpg"


    useEffect(()=>{
        firebase_db.ref('/book/chapters').once('value').then((snapshot)=>{
            let data = snapshot.val();
            //let myBookList = Object.values(myBook)
            //if(myBookList.length > 0){
                setData(data)
        //}
    })

    }, [])

    function renderChapterList() {
        // 검증 단계 validation
        const isMyitem = (typeof myitem !== 'undefined'); // no 개런티: myitem이 진짜.. 있나?
        if (isMyitem == false) {
            // 함수 바깥에 있는 변수 검증: 진짜, 존재하는, 변수냐?
            return null; // early return
        }
        
        const isChapters = (myitem.chapters > ''); // javascript truthy/falsy 문제
        if (isChapters == false) {
            // 데이터 검증: chapters가 없는 경우도 있더라
            return null; // early return
        }
        
        // if(myitem.chapters == undefined) { // 이것만 가지고는 javascript truthy/falsy 문제를 해결하기 어렵다~!
        //     return null
        // }
        // else {


        // 할 일 시작!
            console.log({myitem});
            console.log({'myitem.chapters':myitem.chapters});

            const {chapters} = myitem;
            console.log({chapters});
            // jconsole.log({'typeof chapters.keys': typeof chapters.keys});
            
            const list = Object.keys(chapters); // 자바스크립트 객체의 키들을 쭉 불러다가 아무튼, 어떻게든, 여하튼간에! 리스트로, array로 만들어준다-> map을 쓸 수 있다 (야호!)
            // 자바스크립트 객체는, <순서>라는 개념이 없다.
            // -> map()을 애초에, 쓸 수가 없다.
            // 아주 정확한 표현: map은, array에서만 쓸 수 있다

            console.log({list});
            const filteredList = list
                .map(key => chapters[key])
                .filter(chapterItemChapters => chapterItemChapters.userId == '내아이디!');

            const chlist = list.map(key => {
            // const chlist = filteredList.map(key => {
                console.log({key});
                const chapterItemChapters = chapters[key];
                // const {userId} = chapterItemChapters;
                // if (userId == '-_-?내아ㅣ디!') {
                //     //return ();
                // } else {
                //     // do nothing
                // }

                return (<ChapterItem 
                    navigation={navigation}
                    chapters={chapterItemChapters} // = 에 있어서 좌항과 우항은 무엇인가? // 좌항: 보통 변수, 우항: 사실상 무조건 값
                    chapterTitle={chapters.chapterTitle}
                />);
            });

            // const chlist = myitem.chapters.map(chapters => (
            //     <ChapterItem 
            //         navigation={navigation}
            //         chapters={chapters}
            //         bookTitle={myitem.chapters.chapterTitle}
            //     />
            // ))
            return chlist
        //}
        // return (<Text>-_-?</Text>);
    }

    return (
    <ScrollView style={styles.container}>
        <View  style={styles.bookCoverContainer}>
            <StatusBar style="white" />
            <Image style={styles.bookCoverImage} source={{uri:myitem}}></Image>
        </View>
        <View  style={styles.bookInfoContainer}>
            <Text style={styles.bookTitle}>{myitem.bookTitle}</Text>  
            <Text style={styles.bookDesc}>{myitem.intro.introArticle}</Text>  
            <TouchableOpacity style={styles.subButton}>        
                <Text style={styles.subButtonText}>구독하기</Text>
            </TouchableOpacity>   
        </View>
        <View style={styles.bookIndexContainer}>
            { renderChapterList() }
        </View>
    </ScrollView>
    );
    // return (
    //     <ScrollView>
    //         <View>
    //             <Text>-_-?</Text>
    //         </View>
    //     </ScrollView>
    // )
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
