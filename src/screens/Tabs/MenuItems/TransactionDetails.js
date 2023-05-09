import React from 'react'
import { View } from 'react-native'
import CustomText from '../../../component/CustomText'
import colors from '../../../constants/colors'

const TransactionDetails = (route) => {
    console.log(route.params.data)
  return (
    <View style={{backgroundColor:colors.backgroundColor}}>
        <CustomText>TransactionDetails</CustomText>
    </View>
  )
}

export default TransactionDetails
