import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import  MaterialCommunityIcons  from 
'react-native-vector-icons/MaterialCommunityIcons';

import ZusLogo from "../../assets/images/zusLogo.png";

const BusinessHome = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Product 1',
      price: '$100',
      image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
      backgroundColor: '#ffdcb2',
      titleColor: '#ff8c00',
    },
    {
      id: 2,
      name: 'Product 2',
      price: '$50',
      image: 'https://bootdey.com/img/Content/avatar/avatar2.png',
      backgroundColor: '#bfdfdf',
      titleColor: '#008080',
    },
    {
      id: 3,
      name: 'Product 3',
      price: '$80',
      image: 'https://bootdey.com/img/Content/avatar/avatar8.png',
      backgroundColor: '#e2caf8',
      titleColor: '#8a2be2',
    },
    {
      id: 4,
      name: 'Product 4',
      price: '$120',
      image: 'https://bootdey.com/img/Content/avatar/avatar6.png',
      backgroundColor: '#d8e4fa',
      titleColor: '#6495ed',
    },
  ]);

  const Addproduct = () => {
    navigation.navigate('ProductUpload');
  };

  const renderProductCard = ({ item }) => (
    <View style={[styles.card, { backgroundColor: "white"}]}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={[styles.cardTitle, { color: "black" }]}>{item.name}</Text>
      <Text style={styles.cardPrice}>{item.price}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.actionButton} className="bg-[#BEADFA] shadow">
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} className="bg-gray-300 shadow">
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const searchFilter = (item) => {
    const query = searchQuery.toLowerCase();
    return item.name.toLowerCase().includes(query);
  };


  return (
    <View style={styles.container}>
      <View className={`w-fit h-fit flex flex-row`}>
        <Text className="text-[30px] font-bold text-gray-600">Edu</Text>
        <Text className="text-[30px] font-bold text-[#614BC3]">Deals</Text>
      </View>
      <View className="flex flex-row items-center"> 
        <Text style={styles.title}>Zus coffee</Text>
      </View>
      <View className="w-full h-[2%]">

      </View>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={products.filter(searchFilter)}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
      <TouchableOpacity
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      width: 70,
      position: 'absolute',
      bottom: 110,
      right: 10,
      height: 70,
      backgroundColor: '#BEADFA',
      borderRadius: 9999,
    }}
    onPress={Addproduct}
  >
     <MaterialCommunityIcons name="plus" color="white" size={26}/>  
</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 80,
    paddingBottom: 1,
  },
  listContainer: {
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    paddingLeft: 20,
  },
  searchInput: {
    height: 40,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#A9A9A9',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    marginBottom: 20,
    padding: 10,
    marginHorizontal: 7,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    overflow: 'hidden', // Ensure the image doesn't overflow the card
  },
  productImage: {
    width: '100%', // Take up 100% of the card width
    height: '60%', // Cover 70% of the card height
    borderRadius: 5,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  cardPrice: {
    color: '#888',
    marginBottom: 2,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    marginTop: 15,
    padding: 7,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: '#614BC3',
  },
});

export default BusinessHome;
