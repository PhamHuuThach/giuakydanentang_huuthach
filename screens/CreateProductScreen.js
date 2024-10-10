import React, { useState } from "react";
import {
  View,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { db } from "../database/firebase";
import { collection, addDoc } from "firebase/firestore";

const CreateProductsScreen = (props) => {
  const [state, setState] = useState({
    ten: "",
    loai: "",
    gia: "",
    image: null,
  });

  const SaveNewProduct = async () => {
    if (state.ten === "") {
      alert("Vui lòng nhập tên");
    } else if (state.loai === "") {
      alert("Vui lòng nhập loại");
    } else if (state.gia === "") {
      alert("Vui lòng nhập giá");
    } else {
      try {
        await addDoc(collection(db, "Sanpham"), {
          ten: state.ten,
          loai: state.loai,
          gia: state.gia,
          image: state.image,
        });
        alert("Thêm thành công");
        props.navigation.navigate("ProductList");
      } catch (error) {
        console.log("Lỗi thêm: ", error);
      }
    }
    setState({
      ten: "",
      loai: "",
      gia: "",
      image: null,
    });
  };

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Cần có quyền truy cập cuộn camera!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (result.canceled) {
      alert("Không có hình ảnh nào được chọn.");
    }
    if (!result.canceled) {
      setState({ ...state, image: result.assets[0].uri });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Tên sản phẩm"
          onChangeText={(value) => handleChangeText("ten", value)}
        ></TextInput>
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Loai sản phẩm"
          onChangeText={(value) => handleChangeText("loai", value)}
        ></TextInput>
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Giá sản phẩm"
          onChangeText={(value) => handleChangeText("gia", value)}
        ></TextInput>
      </View>
      <View style={styles.inputGroup}>
        <Button title="Chọn hình ảnh" onPress={() => pickImage()} />
      </View>
      {state.image && ( // Hiển thị hình ảnh nếu đã chọn
        <Image
          source={{ uri: state.image }}
          style={{ width: 100, height: 100, marginBottom: 10 }}
        />
      )}
      <View>
        <Button title="Thêm mới" onPress={() => SaveNewProduct()}></Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
});
export default CreateProductsScreen;
