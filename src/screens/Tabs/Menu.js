import React, { useState } from "react";
import { Image, View } from "react-native";
import normalize from "react-native-normalize";
import CustomText from "../../component/CustomText";
import colors from "../../constants/colors";
import { Pressable } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import {postReceipt,fetchReceipt} from "../../store/actions/transactions";
import { useDispatch, useSelector } from "react-redux";
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import { useEffect } from "react";
import Loading from "../../component/Loading";

const Menu = ({ navigation }) => {
  const [image,setImage]=useState()
  const [keyHolder,setKeyHolder]=useState("")
  const [loading,setLoading]=useState(false)
  const key=useSelector(state=>state.transactions.key)
  const scandata=useSelector(state=>state.transactions.scandata)
  const dispatch=useDispatch()
  const handleGallery=async()=>{
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    alert('Sorry, we need media library permissions to make this work!');
    return;
  }
 
  const result = await ImagePicker.launchImageLibraryAsync();
  if (!result.canceled) {
    setImage(result.assets[0].uri);
    setLoading(true)
    postReceiptHandler(result)
  }
  }
  useEffect(()=>{
    if(scandata && scandata.status==="running" && keyHolder){
      console.log("====SCAN DATA ====")
      console.log(scandata)
      setTimeout(()=>{
        fetchReceiptHandler(keyHolder)
      },2000)
      if(scandata.status==="running"){
        setTimeout(()=>{
          fetchReceiptHandler(keyHolder)
        },2000)
      }
    }
  },[scandata])
  useEffect(()=>{
    if(scandata && scandata.status==="succeeded"){
      setLoading(false)
      navigation.navigate("TransactionDetails",{data:scandata.analyzeResult.documentResults[0]})
      console.log(scandata.analyzeResult.documentResults[0])
    }
  },[scandata])
  const fetchReceiptHandler=async(Key)=>{
    action=fetchReceipt(Key)
    try{
      await dispatch(action)
    }catch (err) {console.log(err)}
  }
  const postReceiptHandler=async(result)=>{
    const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
      encoding: FileSystem.EncodingType.Base64,
    });    
    const buffer = new Buffer.from(base64, "base64");
    action=postReceipt(buffer,result.assets[0].type)
    try{
      await dispatch(action)
    }catch (err) {console.log(err)}
  }
  useEffect(()=>{
    if(key!=""){
      setKeyHolder(key)
    }
  },[key])
  useEffect(()=>{
    if(keyHolder){
      setTimeout(()=>{
        fetchReceiptHandler(keyHolder)
      },2000)
    }
  },[keyHolder])
  const handleCamera=async()=>{
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
if (status !== 'granted') {
  alert('Sorry, we need camera permissions to make this work!');
  return;
}
const result = await ImagePicker.launchCameraAsync();
if (!result.canceled) {
  setImage(result.assets[0].uri );
  setLoading(true)
  postReceiptHandler(result)
}
  }
  return (
    <>
    {loading && <Loading />}
    {!loading && <><View style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: normalize(100),
          alignSelf: "center",
          justifyContent: "space-evenly",
          width: "95%",
        }}
      >

        <Pressable onPress={handleCamera}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image source={require("@assets/camera-icon.png")} />
            <CustomText>Capture Reciept</CustomText>
          </View>
        </Pressable>
        <Pressable onPress={handleGallery}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image source={require("@assets/image-icon.png")} />
            <CustomText>Gallery</CustomText>
          </View>
        </Pressable>
        <Pressable
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={() => navigation.navigate("FillManually")}
        >
          <Image source={require("@assets/keyboard-icon.png")} />

          <CustomText style={{ color: colors.primary }}>
            Fill Manually
          </CustomText>
        </Pressable>
      </View>
    </View></>}
    </>
  );
};

export default Menu;