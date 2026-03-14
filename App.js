import * as React from "react";

import {
  createStaticNavigation,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "@react-navigation/elements";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { useState } from "react";

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Welcome</Text>
      <Text>Bạn đã đăng nhập thành công !</Text>
    </View>
  );
}

// ... other code from the previous section

function SignUp() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const validatePhone = () => {
    const phoneRegex = /^(0|\+84)[0-9]{9}$/;

    if (phoneRegex.test(phone)) {
      setError("");
      navigation.navigate("Home");
    } else {
      setError("Số điện thoại không đúng định dạng");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <View style={styles.content}>
        <Text style={styles.label}>Nhập số điện thoại</Text>
        <Text style={styles.desc}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing
          Pro
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại của bạn"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          onPress={validatePhone}
          style={[
            styles.button,
            { backgroundColor: phone ? "#007bff" : "#ccc", marginTop: 30 },
          ]}
        >
          <Text style={{ color: "#fff" }}>Tiếp tục</Text>
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const RootStack = createNativeStackNavigator({
  initialRouteName: "SignUp",
  screens: {
    Home: HomeScreen,
    SignUp: SignUp,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 24,
    marginLeft: 20,
  },
  content: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  desc: {
    fontSize: 13,
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 16,
    paddingVertical: 8,
  },
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    marginTop: 5,
    fontSize: 13,
  },
});
