import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductList from "./screens/ProductList";
import CreateProductScreen from "./screens/CreateProductScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#621FF7",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        style={styles.container}
        name="ProductList"
        component={ProductList}
        options={{ title: "Danh sách sản phẩm" }}
      />
      <Stack.Screen
        style={styles.container}
        name="CreateProductScreen"
        component={CreateProductScreen}
        options={{ title: "Tạo mới sản phẩm" }}
      />
      <Stack.Screen
        style={styles.container}
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={{ title: "Chi tiết Sản phẩm" }}
      />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
