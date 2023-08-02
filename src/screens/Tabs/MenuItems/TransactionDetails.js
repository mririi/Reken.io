import React, { useCallback } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import CustomText from '../../../component/CustomText'
import colors from '../../../constants/colors'
import CustomButton from '../../../component/CustomButton'
import { useEffect } from 'react'
import { useState } from 'react'
import normalize from 'react-native-normalize'
import { Dropdown } from 'react-native-element-dropdown'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../../component/Loading'
import { ScrollView } from 'react-native-gesture-handler'
import * as Transactionss from "@store/actions/transactions"
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const TransactionDetails = ({route,navigation}) => {
    const [merchantName,setMerchantName]=useState("No Merchant Name")
    const [isFocus,setIsFocus]=useState(false)
    const [selectedCategory,setSelectedCategory]=useState("")
    const [categoryData,setCategoryData]=useState([])
    const [items,setItems]=useState([])
    const [error,setError]=useState("")
    const [total,setTotal]=useState(0)
    const [totalText,setTotalText]=useState("0")
    const [tax,setTax]=useState(0)
    const [taxText,setTaxText]=useState("0")
    const [address,setAddress]=useState("No Address")
    const [isLoading,setIsLoading]=useState(false)
    const categories = useSelector((state) => state.transactions.categories);
    const dispatch=useDispatch()
    useEffect(()=>{
      const data=route.params?.data
      if(data && data.fields){
          console.log(data)
          if(data.fields.MerchantName){
            setMerchantName(data.fields.MerchantName.text ?? "No Merchant Name")
          }
          if(data.fields.Items){
            setItems(data.fields.Items.valueArray ?? [])
          }
          if(data.fields.Tax){
            setTax(data.fields.Tax.valueNumber ?? 0)
            setTaxText(data.fields.Tax.text ?? "0")
          }
          if(data.fields.Total){
            setTotal(data.fields.Total.valueNumber ?? 0)
            setTotalText(data.fields.Total.text ?? "0")
          }
          if(data.fields.MerchantAddress){
            setAddress(data.fields.MerchantAddress.text ?? "No Address")
        }
      }
    },[route])
    const submitHandler=async()=>{
      setIsLoading(true);
      if (selectedCategory===""){
        setError("Please Select a Category")
        setIsLoading(false)
        return;
      }
      let final = {};
      const finalItems=items?.map(item=>{
        const name=item?.valueObject.Name?item.valueObject.Name.text:"No Name"
        const price=item?.valueObject.TotalPrice?item.valueObject.TotalPrice.valueNumber:"0"
        const quantity=item?.valueObject.Quantity?item.valueObject.Quantity.valueNumber:"0"
        return {name,price,quantity}
      })
      Object.assign(final, {
        name: merchantName??"",
        category: selectedCategory??"",
        total:total??"0",
        items:finalItems??[],
        address:address??"No Address",
        tax:tax??"0",
        expanse_date:new Date().toISOString().slice(0, 10)
      });
      action = Transactionss.addExpense(final);
      setError(null);
      try {
        await dispatch(action);
        setIsLoading(false);
        navigation.pop(1);
      } catch (err) {
        setError("Invalid credentials");
        setIsLoading(false);
      }
    }
    useEffect(() => {
      if (error) {
        Toast.show({
          type: "error",
          text1: error,
          text2: "Check your informations",
          visibilityTime: 6000,
          autoHide: true,
        });
      }
    }, [error]);
  useEffect(() => {
    if (categories) {
      setCategoryData(
        categories.map((item) => ({ label: item.name, value: item.name }))
      );
    }
  }, [categories]);
  const loadCategories = useCallback(async () => {
    try {
      dispatch(Transactionss.list("category"));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);
  return (
    <>
    {!categoryData && <Loading />}
    {categoryData && <KeyboardAwareScrollView contentContainerStyle={{backgroundColor:colors.background,flex:1,alignItems:"center",justifyContent:"center"}}>
    <CustomText title="true">{merchantName}</CustomText>
    <View style={{marginVertical:normalize(20)}}>
    <View style={{borderWidth:3,borderColor:colors.primary,borderRadius:10,padding:10,marginVertical:normalize(15)}}>
      
    <CustomText style={{marginBottom:normalize(10),color:"white"}}>Receipt</CustomText>
    <View style={{backgroundColor:colors.primary,width:normalize(60),height:2}}></View>
    {Array.isArray(items) &&
              items.map((m, i) => (<View key={i} style={{flexDirection:"row",justifyContent:"space-between",marginVertical:normalize(10)}}>
      <CustomText>{m?.valueObject.Name? m?.valueObject.Name.text : "No name"} [{m?.valueObject.Quantity? m?.valueObject.Quantity.text : "No Qty"}]</CustomText>
      <CustomText>{m?.valueObject.TotalPrice? m?.valueObject.TotalPrice.text : "No price"}</CustomText>
    </View>))}
    </View>
    <CustomText>Category</CustomText>
    <Dropdown
                style={[
                  { ...styles.dropdown, ...{ width: normalize(320) } },

                  isFocus && { borderColor: colors.primary },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                containerStyle={styles.container}
                data={categoryData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Select Category" : selectedCategory}
                value={selectedCategory}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setSelectedCategory(item.value);
                  setIsFocus(false);
                }}
              />
      <View style={{marginTop:normalize(10),alignItems:"center",justifyContent:"center"}}>
    <CustomText style={{color:"white"}}>Total</CustomText>
    <CustomText>{totalText}</CustomText>
    <CustomText style={{color:"white"}}>Tax</CustomText>
    <CustomText>{taxText}%</CustomText>
    <CustomText style={{color:"white"}}>Address</CustomText>
    <CustomText>{address}</CustomText>
      </View>
    </View>
    {isLoading && <ActivityIndicator color={colors.primary} size={25} />}
    {!isLoading && <>
      <View style={{flexDirection:"row",justifyContent:"space-between",width:"90%"}}>
      <CustomButton title="Cancel" style={{backgroundColor:colors.red}} onPress={()=>navigation.pop(1)}/>
      <CustomButton title="Edit" onPress={()=>navigation.navigate("FillManually",{screen:"details",data:{items:items,name:merchantName,tax:tax,address:address}})}/>
      </View>
      <CustomButton style={{width:"90%",marginTop:normalize(10)}} title="Save" onPress={submitHandler}/>
      </>}
</KeyboardAwareScrollView>}
    <Toast />
    </>
    
  )
}
const styles = StyleSheet.create({
  dropdown: {
    height: normalize(50),
    borderColor: "gray",
    borderBottomWidth: 2,
    paddingHorizontal: 8,
    color: "white",
    width: normalize(120),
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: normalize(22),
    top: normalize(8),
    zIndex: 999,
    fontSize: normalize(14),
    color: "white",
  },
  placeholderStyle: {
    fontSize: 16,
    color:"white"
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "white",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})
export default TransactionDetails
