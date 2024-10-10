import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { db } from "../database/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { Avatar } from "react-native-elements";

import * as ImagePicker from "expo-image-picker";

const ProductsDetailScreen = (props) => {
  const initialState = {
    id: "",
    ten: "",
    loai: "",
    gia: "",
    image: "",
  };

  const [Product, setProduct] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, key) => {
    setProduct({ ...Product, [key]: value });
  };

  const getProductById = async (id) => {
    const querySnapshot = await getDocs(collection(db, "Sanpham"));
    querySnapshot.forEach((doc) => {
      if (doc.id === id) {
        setProduct({ ...doc.data(), id: doc.id });
      }
    });
    setLoading(false);
  };

  const deleteProduct = async () => {
    const ProductRef = doc(db, "Sanpham", Product.id);
    setLoading(true);
    try {
      await deleteDoc(ProductRef);
      Alert.alert("Xóa thành công");
      props.navigation.navigate("ProductList");
    } catch (error) {
      console.error("Lỗi xóa sản phẩm: ", error);
      Alert.alert("Lỗi xóa sản phẩm");
    } finally {
      setProduct(initialState);
      setLoading(false);
    }
  };

  const updateProduct = async () => {
    try {
      const ProductRef = doc(db, "Sanpham", Product.id);
      await updateDoc(ProductRef, Product);
      Alert.alert("Update thành công");
      props.navigation.navigate("ProductList");
      setLoading(false);
      setProduct(initialState);
    } catch (error) {
      console.error("Không update được sản phẩm: ", error);
    }
  };

  // const selectImage = () => {
  //   const options = {
  //     mediaType: "photo",
  //     includeBase64: false,
  //   };

  //   launchImageLibrary(options, (response) => {
  //     if (response.didCancel) {
  //       console.log("Hủy chọn hình ảnh");
  //     } else if (response.error) {
  //       console.log(" Lỗi ImagePicker : ", response.error);
  //     } else {
  //       const source = response.assets[0].uri;
  //       handleTextChange(source, "image");
  //     }
  //   });
  // };

  const selectImage = async () => {
    // Xin quyền truy cập vào thư viện ảnh
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Bạn cần cấp quyền truy cập vào thư viện ảnh!");
      return;
    }

    // Mở thư viện ảnh
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const source = result.assets[0].uri; // Lấy URI của hình ảnh
      handleTextChange(source, "image"); // Cập nhật hình ảnh
    }
  };

  useEffect(() => {
    getProductById(props.route.params.ProductId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="Tên sản phẩm"
          autoCompleteType="ten"
          style={styles.inputGroup}
          value={Product.ten}
          onChangeText={(value) => handleTextChange(value, "ten")}
        />
      </View>
      <View>
        <TextInput
          autoCompleteType="Loại sản phẩm"
          placeholder="loai"
          style={styles.inputGroup}
          value={Product.loai}
          onChangeText={(value) => handleTextChange(value, "loai")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Giá sản phẩm"
          autoCompleteType="gia"
          style={styles.inputGroup}
          value={Product.gia}
          onChangeText={(value) => handleTextChange(value, "gia")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Hình ảnh (URL)"
          autoCompleteType="url"
          style={styles.inputGroup}
          value={Product.image}
          onChangeText={(value) => handleTextChange(value, "image")}
        />
      </View>
      <TouchableOpacity onPress={() => selectImage()}>
        <Avatar
          source={{
            uri: Product.image,
          }}
          rounded
          size="large"
        />
      </TouchableOpacity>
      <View style={styles.btn}>
        <Button
          title="Delete"
          onPress={() => deleteProduct()}
          color="#E37399"
        />
      </View>
      <View>
        <Button
          title="Update"
          onPress={() => updateProduct()}
          color="#19AC52"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});

export default ProductsDetailScreen;
