import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import  MaterialCommunityIcons  from 
'react-native-vector-icons/MaterialCommunityIcons';

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
    <View style={[styles.card, { backgroundColor: item.backgroundColor, borderTopWidth: 4, borderTopColor: item.titleColor }]}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={[styles.cardTitle, { color: item.titleColor }]}>{item.name}</Text>
      <Text style={styles.cardPrice}>{item.price}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
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
      <Text style={styles.title}>Zus coffee</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={products.filter(searchFilter)}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
      <TouchableOpacity
    style={{
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      width: 70,
      position: 'absolute',
      bottom: 10,
      right: 10,
      height: 70,
      backgroundColor: '#00FFFF',
      borderRadius: 100,
    }}
    onPress={Addproduct}
  >
     <MaterialCommunityIcons name="plus" color="black" size={26}/>  
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
    fontSize: 40,
    fontWeight: 'bold',
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
    borderRadius: 5,
    marginHorizontal: 7,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
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
    backgroundColor: '#DCDCDC',
    padding: 5,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#00008B',
    marginRight: 10,
  },
  buttonText: {
    color: '#00008B',
  },
});

export default BusinessHome;
