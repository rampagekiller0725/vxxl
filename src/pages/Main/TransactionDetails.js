import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Layer from "../../component/Layer";
import AuthHeader from "../../component/AuthHeader/AuthHeader";
import LogoLittle from '../../public/main/logo_littel.svg'
import { SCREEN_WIDTH } from "../../styles/mainStyles";
import Button from "../../component/Button/Button";
import {getTransactionDetails} from "../../api/transactions";


const TransactionDetails = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState(undefined);

  useEffect(() => {
    setLoading(true);

    getTransactionDetails(route.params.transaction)
        .then((tx) => setTransaction(tx))
        .finally(() => setLoading(false))
  }, [route.params.transaction])

  return (
    <Layer>
      <AuthHeader text={'Transaction Details'} onPress={() => navigation.goBack()} />
      <View style={styles.container}>

        <View>

          <View style={styles.logo_container}>
            <LogoLittle />
          </View>

          {!loading && (
            <View style={styles.main_info_container}>

              <View style={styles.main_info_box}>
                <Text style={styles.main_info_box_title}>State</Text>
                <Text style={styles.main_info_box_text}>{transaction?.blockIndex}</Text>
              </View>

              <View style={styles.main_info_box}>
                <Text style={styles.main_info_box_title}>Type</Text>
                <Text style={styles.main_info_box_text}>{!!transaction?.receive ? "Receive" : "Send"}</Text>
              </View>

              <View style={styles.main_info_box}>
                <Text style={styles.main_info_box_title}>Amount</Text>
                <Text style={styles.main_info_box_text}>{transaction?.amount} VXXL</Text>
              </View>

              <View style={styles.main_info_box}>
                <Text style={styles.main_info_box_title}>Date</Text>
                <Text style={styles.main_info_box_text}>{transaction?.getDateString()}</Text>
              </View>

              <View style={styles.main_info_box}>
                <Text style={styles.main_info_box_title}>Address</Text>
                <Text style={styles.main_info_box_text}>{transaction?.sender}</Text>
              </View>

              <View style={styles.main_info_box}>
                <Text style={styles.main_info_box_title}>Transaction id</Text>
                <Text style={styles.main_info_box_text}>{transaction?.hash}</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.bottom_container}>
          <Button text={'Save'} full={true} onPress={() => navigation.goBack()}/>
        </View>
      </View>
    </Layer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 32
  },
  logo_container: {
    marginTop: 23,
    alignItems: 'center',
    marginBottom: 11
  },
  main_info_container: {
    width: SCREEN_WIDTH - 36,
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 23,
    paddingBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginLeft: 17,
    paddingHorizontal: 24,
  },
  main_info_box: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 15
  },
  main_info_box_title: {
    color: '#8A8A8E',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 5,
    textAlign: 'center'
  },
  main_info_box_text: {
    textAlign: 'center',
    color: '#212121',
    fontSize: 13
  },
  bottom_container: {
    width: SCREEN_WIDTH - 36,
    marginTop: 30,
    marginLeft: 18
  }
});

export default TransactionDetails;
