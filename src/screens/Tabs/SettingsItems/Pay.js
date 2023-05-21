import { Purchases } from 'react-native-purchases';

const hasActiveSubscription = async () => {
  const purchaserInfo = await Purchases.getPurchaserInfo();
  return purchaserInfo.entitlements.active;
};

// Usage:
hasActiveSubscription().then((isActive) => {
  console.log('User has active subscription:', isActive);
});
const Pay = () => {
  return (
   <></>
  )
}

export default Pay
