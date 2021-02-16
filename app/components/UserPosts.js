import React, {useState, useEffect} from 'react';
import {Alert,View,Image,ImageBackground,Dimensions,Text,FlatList,TouchableOpacity, Button,StyleSheet, Linking ,I18nManager} from 'react-native';
import { Content,Container, Right, Header, Left, Body} from 'native-base';
import { ProgressDialog } from 'react-native-simple-dialogs';
import NetInfo from "@react-native-community/netinfo";
import { Constant } from '../Global/Constant/Constant.js';
import CardView from 'react-native-cardview'
// BEGIN TO SETUP FONT-TYPE AND FONTSIZE
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = size => (Dimensions.get("window").width / guidelineBaseWidth) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;
const font_type = {
    FontLight: 'Helvetica',
    FontBold : 'Helvetica-Bold'
};
const UserPost = (props) => {
  const [progressVisible, setProgressVisible] = useState(false);
  const [data, setData] = useState([]);

    useEffect(()=>{
        NetInfo.fetch().then(state => {
                    console.log("Connection type", state.type);
                    console.log("Is connected?", state.isConnected);
                    if(state.isConnected){
                    setProgressVisible(true)
                    var data={
                    postId:1,
                    }

                    fetch(Constant.BaseUrl+'posts?userId=1', {
                    method: 'GET',
                    headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    },
                    })
                    .then((response) => {
                    setProgressVisible(false)
                    if(response.status==200){
                    response.json()
                    .then((responseJson) => {
                    console.log("response"+""+JSON.stringify(responseJson))
                        setData(responseJson)
                    setProgressVisible(false)
                    }).catch((error) =>
                    {
                    setProgressVisible(false)
                    console.error("error"+error);
                    }
                    );
                    }
                    })
                    }else{
                    alert('Could Not Connect Internet')
                    }
                    });
    },[]);

       const viewComments=(item)=>{
            props.navigation.navigate('PostComment',{id:item.id})
        }


    return (
        <View style={styles.MainContainer}>
            {/* BEGIN TO SETUP HEADER VIEW */}
            <Header androidStatusBarColor={"#D22E2E"} style={styles.header}>
              {/* BEGIN TO SETUP LEFT VIEW */}

              {/* END TO SETUP LEFT VIEW */}

              {/* BEGIN TO SETUP BODY VIEW */}
                <Body style={styles.body}>
                  <Text style={styles.text_title}> All Posts</Text>
                </Body>
              {/* END TO SETUP BODY VIEW */}

              {/* BEGIN TO SETUP RIGHT VIEW */}
                <Right style={styles.right}></Right>
              {/* END TO SETUP RIGHT VIEW */}
            </Header>
            <View style={styles.MainContainer}>
                 <FlatList
                    data={ data }
                    renderItem={({item}) =>
                         <CardView
                          cardElevation={10}
                          cardMaxElevation={10}
                          cornerRadius={5}
                          style={{margin:5}}>
                            <TouchableOpacity style={styles.item} onPress={viewComments(item)}>
                                <View style={{flexDirection:'column'}}>
                                    <Text numberOfLines={1} style={styles.text_head}>Id : {item.id}</Text>
                                    <Text numberOfLines={1} style={styles.text_comments}>Title : {item.title}</Text>
                                    <Text  numberOfLines={1} style={styles.text_comments}>Body : {item.body}</Text>
                                </View>
                            </TouchableOpacity>
                          </CardView>
                    }
                />
            </View>
            <ProgressDialog
              visible={progressVisible}
              title="Progress Dialog"
              message="Please wait..."
              animationType={"fade"}
          />
        </View>
    )
}
const styles = StyleSheet.create({

  MainContainer :{
  flex:1,
  backgroundColor:'#fff'
  },
   header: {
      backgroundColor: "#F34235",
      height: Dimensions.get("window").height * 0.1,
      borderBottomWidth: 0,
      ...Platform.select({
        ios: {
          paddingTop: (Dimensions.get("window").height * 0.02),
        },
        android: {
          paddingTop: Dimensions.get("window").width * 0.04
        }
      }),
      elevation: 0,
      paddingLeft: (Dimensions.get("window").width * 0.05),
      paddingRight: (Dimensions.get("window").width * 0.05),
    },
    left: {
      flex: 0.5,
      backgroundColor: 'rgba(0,0,0,0)',
    },
    back_arrow: {
      justifyContent: 'center',
      alignItems: 'center',
    },


   text_head: {
         color: 'black',
         fontSize: moderateScale(25),

         marginTop:5,
         fontFamily: font_type.FontLight,
         flex:1,
       },
   text_comments: {
    color: 'black',
    fontSize: moderateScale(18),

    marginTop:5,
    fontFamily: font_type.FontLight,
    flex:1,
  },
   body: {
       flex: 2,
       alignItems: 'center',
       backgroundColor: 'rgba(0,0,0,0)'
     },
text_title: {
        color: 'white',
        fontSize: moderateScale(20),
        alignSelf: 'center',
        fontFamily: font_type.FontLight,
      },

  item:{
    borderColor: "transparent",
    flexDirection:'row',
    margin:10,

  },
})
export default UserPost;
