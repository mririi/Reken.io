import React from 'react'
import { View } from 'react-native'
import CustomText from '../../../component/CustomText'
import colors from '../../../constants/colors'
import CustomButton from '../../../component/CustomButton'
import { useEffect } from 'react'
import { useState } from 'react'

const TransactionDetails = ({route}) => {
    const [merchantName,setMerchantName]=useState("")
    useEffect(()=>{
      const data=route.params.data
      setMerchantName(data.fields.MerchantName.text??'No Merchant Name')
      
    },[route])
  return (
    <View style={{backgroundColor:colors.background,flex:1,alignItems:"center",justifyContent:"center"}}>
        <CustomText title="true">{merchantName}</CustomText>
        
        <CustomButton title="Save"/>
    </View>
  )
}

export default TransactionDetails
