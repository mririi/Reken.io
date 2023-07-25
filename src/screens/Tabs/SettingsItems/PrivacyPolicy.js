import React from "react";
import ComingSoon from "../../ComingSoon";
import { Linking, ScrollView, Text, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import normalize from "react-native-normalize";

const PrivacyPolicy = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <View
        style={{
          paddingVertical: normalize(40),
          width: "90%",
          alignSelf: "center",
          flex: 1,
        }}
      >
        <Icon
          name="left"
          size={normalize(25)}
          color="white"
          onPress={() => navigation.pop(1)}
        />
        <ScrollView>
          <View
            style={{
              marginTop: normalize(20),
            }}
          >
            <Text style={{ margin: 0, color: "white", flex: 1 }}>
              <Text style={{ fontWeight: "600" }}>Privacy Policy{"\n\n"}</Text>
              Aelius Venture Limited built the Reken.io applica as a Premium app.
              This SERVICE is provided by Aelius Venture Limited at no cost and
              is intended for use as is.{"\n\n"}
              This page is used to inform visitors regarding our policies with
              the collection, use, and disclosure of Personal Information if
              anyone decided to use our Service.{"\n\n"}
              If you choose to use our Service, then you agree to the collection
              and use of information in relation to this policy. The Personal
              Information that we collect is used for providing and improving
              the Service. We will not use or share your information with anyone
              except as described in this Privacy Policy.{"\n\n"}
              The terms used in this Privacy Policy have the same meanings as in
              our Terms and Conditions, which are accessible at Reken.io unless
              otherwise defined in this Privacy Policy.
              <Text style={{ fontWeight: "600" }}>
                {"\n\n"}Information Collection and Use{"\n\n"}
              </Text>
              For a better experience, while using our Service, we may require
              you to provide us with certain personally identifiable
              information, including but not limited to Email, User Name, Full
              Name, DOB, Address. The information that we request will be
              retained by us and used as described in this privacy policy.
              {"\n\n"}
              The app does use third-party services that may collect information
              used to identify you.{"\n\n"}
              Link to the privacy policy of third-party service providers used
              by the app
              {"\n\n"}
              {"\u2022"}{" "}
              <Text
                style={{ color: "#3366CC" }}
                onPress={() => {
                  Linking.openURL("https://policies.google.com/terms");
                }}
              >
                Google Play Services
              </Text>
              {"\n"}
              {"\u2022"}{" "}
              <Text
                style={{ color: "#3366CC" }}
                onPress={() => {
                  Linking.openURL(
                    "https://firebase.google.com/terms/analytics"
                  );
                }}
              >
                Google Analytics for Firebase
              </Text>{" "}
              {"\n\n"}
              You should be aware that there are certain things that Aelius
              Venture Limited will not take responsibility for. Certain
              functions of the app will require the app to have an active
              internet connection. The connection can be Wi-Fi or provided by
              your mobile network provider, but Aelius Venture Limited cannot
              take responsibility for the app not working at full functionality
              if you don’t have access to Wi-Fi, and you don’t have any of your
              data allowance left.
              {"\n\n"}If you’re using the app outside of an area with Wi-Fi, you
              should remember that the terms of the agreement with your mobile
              network provider will still apply. As a result, you may be charged
              by your mobile provider for the cost of data for the duration of
              the connection while accessing the app, or other third-party
              charges. In using the app, you’re accepting responsibility for any
              such charges, including roaming data charges if you use the app
              outside of your home territory (i.e. region or country) without
              turning off data roaming. If you are not the bill payer for the
              device on which you’re using the app, please be aware that we
              assume that you have received permission from the bill payer for
              using the app.
              {"\n\n"}Along the same lines, Aelius Venture Limited cannot always
              take responsibility for the way you use the app i.e. You need to
              make sure that your device stays charged – if it runs out of
              battery and you can’t turn it on to avail the Service, Aelius
              Venture Limited cannot accept responsibility.
              {"\n\n"}With respect to Aelius Venture Limited’s responsibility
              for your use of the app, when you’re using the app, it’s important
              to bear in mind that although we endeavor to ensure that it is
              updated and correct at all times, we do rely on third parties to
              provide information to us so that we can make it available to you.
              Aelius Venture Limited accepts no liability for any loss, direct
              or indirect, you experience as a result of relying wholly on this
              functionality of the app.
              {"\n\n"}At some point, we may wish to update the app. The app is
              currently available on Android & iOS – the requirements for the
              both systems(and for any additional systems we decide to extend
              the availability of the app to) may change, and you’ll need to
              download the updates if you want to keep using the app. Aelius
              Venture Limited does not promise that it will always update the
              app so that it is relevant to you and/or works with the Android &
              iOS version that you have installed on your device. However, you
              promise to always accept updates to the application when offered
              to you, We may also wish to stop providing the app, and may
              terminate use of it at any time without giving notice of
              termination to you. Unless we tell you otherwise, upon any
              termination, (a) the rights and licenses granted to you in these
              terms will end; (b) you must stop using the app, and (if needed)
              delete it from your device.
              <Text style={{ fontWeight: "600" }}>
                {"\n\n"}Log Data
                {"\n\n"}
              </Text>
              We want to inform you that whenever you use our Service, in a case
              of an error in the app we collect data and information (through
              third-party products) on your phone called Log Data. This Log Data
              may include information such as your device Internet Protocol
              (“IP”) address, device name, operating system version, the
              configuration of the app when utilizing our Service, the time and
              date of your use of the Service, and other statistics.
              <Text style={{ fontWeight: "600" }}>
                {"\n\n"}Cookies{"\n\n"}
              </Text>
              Cookies are files with a small amount of data that are commonly
              used as anonymous unique identifiers. These are sent to your
              browser from the websites that you visit and are stored on your
              device's internal memory.
              {"\n\n"}This Service does not use these “cookies” explicitly.
              However, the app may use third-party code and libraries that use
              “cookies” to collect information and improve their services. You
              have the option to either accept or refuse these cookies and know
              when a cookie is being sent to your device. If you choose to
              refuse our cookies, you may not be able to use some portions of
              this Service.
              <Text style={{ fontWeight: "600" }}>
                {"\n\n"}Service Providers{"\n\n"}
              </Text>
              We may employ third-party companies and individuals due to the
              following reasons:{"\n"}{" "}
            </Text>
            <View style={{ width: "100%" }}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    width: 5,
                    color: "white",
                    overflow: "visible",
                    marginRight: 12,
                  }}
                >
                  {"\u2022"}
                </Text>
                <Text style={{ flex: 1, color: "white" }}>
                  To facilitate our Service;
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    width: 5,
                    color: "white",
                    overflow: "visible",
                    marginRight: 12,
                  }}
                >
                  {"\u2022"}
                </Text>
                <Text style={{ flex: 1, color: "white" }}>
                  To provide the Service on our behalf;
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    width: 5,
                    color: "white",
                    overflow: "visible",
                    marginRight: 12,
                  }}
                >
                  {"\u2022"}
                </Text>
                <Text style={{ flex: 1, color: "white" }}>
                  To perform Service-related services; or
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    width: 5,
                    overflow: "visible",
                    color: "white",
                    marginRight: 12,
                  }}
                >
                  {"\u2022"}
                </Text>
                <Text style={{ flex: 1, color: "white" }}>
                  To assist us in analyzing how our Service is used.
                </Text>
              </View>
            </View>
            {/* {'\u2022'}   
{'\u2022'}   To perform Service-related services; or{'\n'}
{'\u2022'}  To assist us in analyzing how our Service is used.{'\n'}
{'\u2022'}   We want to inform users of this Service that these third parties have access to their Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose */}
            <Text style={{ color: "white" }}>
              <Text style={{ fontWeight: "600" }}>
                {"\n\n"}Security{"\n\n"}
              </Text>
              We value your trust in providing us your Personal Information,
              thus we are striving to use commercially acceptable means of
              protecting it. But remember that no method of transmission over
              the internet, or method of electronic storage is 100% secure and
              reliable, and we cannot guarantee its absolute security.
              <Text style={{ fontWeight: "600" }}>
                {"\n\n"}Links to Other Sites{"\n\n"}
              </Text>
              This Service may contain links to other sites. If you click on a
              third-party link, you will be directed to that site. Note that
              these external sites are not operated by us. Therefore, we
              strongly advise you to review the Privacy Policy of these
              websites. We have no control over and assume no responsibility for
              the content, privacy policies, or practices of any third-party
              sites or services.
              <Text style={{ fontWeight: "600" }}>
                {"\n\n"}Children’s Privacy{"\n\n"}
              </Text>
              These Services do not address anyone under the age of 13. We do
              not knowingly collect personally identifiable information from
              children under 13 years of age. In the case we discover that a
              child under 13 has provided us with personal information, we
              immediately delete this from our servers. If you are a parent or
              guardian and you are aware that your child has provided us with
              personal information, please contact us so that we will be able to
              do the necessary actions.
              <Text style={{ fontWeight: "600" }}>
                {"\n\n"}Changes to This Privacy Policy{"\n\n"}
              </Text>
              We may update our Privacy Policy from time to time. Thus, you are
              advised to review this page periodically for any changes. We will
              notify you of any changes by posting the new Privacy Policy on
              this page.
              {"\n\n"}This policy is effective as of 2022-10-18
              <Text style={{ fontWeight: "600" }}>
                {"\n\n"}Contact Us{"\n\n"}
              </Text>
              If you have any questions or suggestions about our Terms and
              Conditions, do not hesitate to contact us at
              contact@aeliusventure.co.uk.
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default PrivacyPolicy;
