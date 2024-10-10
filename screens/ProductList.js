import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { db } from "../database/firebase";
import { collection, getDocs } from "firebase/firestore";

const ProductsList = (props) => {
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "Sanpham"));
      const Products = [];
      querySnapshot.forEach((doc) => {
        const { ten, loai, gia, image } = doc.data();
        Products.push({
          id: doc.id,
          ten,
          loai,
          gia,
          image,
        });
      });
      setProducts(Products);
    };
    getProducts();
  });
  return (
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("CreateProductScreen")}
        title="Thêm mới sản phẩm"
      />

      {Products.map((Product) => (
        <TouchableOpacity
          key={Product.id}
          onPress={() => {
            props.navigation.navigate("ProductDetailScreen", {
              ProductId: Product.id,
            });
          }}
          style={styles.listItem}
        >
          <Image source={{ uri: Product.image }} style={styles.avatar} />
          <View style={styles.content}>
            <Text style={styles.title}>Tên: {Product.ten}</Text>
            <Text style={styles.subtitle}>Loại: {Product.loai}</Text>
            <Text style={styles.subtitle}>Giá: {Product.gia}đ</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
  },
  subtitle: {
    color: "#555",
  },
});

export default ProductsList;
