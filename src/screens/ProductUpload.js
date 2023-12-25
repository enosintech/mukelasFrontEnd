import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import Ionicons from
 
'@expo/vector-icons/Ionicons';
import AsyncStorage from
 
"@react-native-async-storage/async-storage";
import { useNavigation } from
 
'@react-navigation/native';

const ProductUpload = () => {
  const [productid, setProductId] = useState('');
  const [productname, setProductName] = useState('');
  const [productprice, setProductPrice] = useState('');
  const [businessID, setBusinessID] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [uploading, setUploading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const handleUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing:
 
true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImageUri(result.uri);
        setImageName(result.uri.split('/').pop());
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert(`Error picking image: ${error.message}`);
    }
  };

  const handleSubmit = async () => {
    if (uploading) {
      console.log('Image upload in progress. Please wait.');
      return;
    }

    try {
      if ( !productname || !productprice || !imageUri) {
        alert('Please fill in all fields and upload a product image.');
        console.log('Validation failed:', productid, productname, productprice, businessID, imageUri);
        return;
      }

      setUploading(true);

      const body = new FormData();
      body.append('productid', productid);
      body.append('productname', productname);
      body.append('productprice', productprice);
      body.append('businessID', businessID);
      body.append('file', {
        uri: imageUri,
        name: imageName,
        type: 'image/jpeg',
      });

      const response = await fetch('http://192.168.31.124:4057/prod/add-product', {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const json = await response.json();

      if (response.ok) {
        setUploading(false);
        Alert.alert('Product uploaded successfully!');
        // Clear form fields
        setProductId('');
        setProductName('');
        setProductPrice('');
        setBusinessID('');
        setImageUri(null);
        setImageName(null);
        // Navigate back to previous screen
        navigation.goBack();
      } else {
        setUploading(false);
        Alert.alert('Error uploading product:', json.message);
      }
    } catch (error) {
      setUploading(false);
      console.error('Error uploading product:', error);
      Alert.alert('Error uploading product. Please try again later.');
    } finally {
      setUploading(false); // Ensure uploading state is set back to false after completing the upload process
    }
  };

  return (
    <View className="w-full h-full flex items-center justify-center">

        <TouchableOpacity className="absolute w-[40px] left-3 top-14 h-[40px] shadow border-[0.5px] border-gray-300 rounded-xl bg-white flex items-center justify-center">
            <Ionicons name='chevron-back'size={25} color="black"/>
        </TouchableOpacity>

      <View className="w-full h-[90%]">

      <View className="w-full h-[35%] items-center justify-center mb-[-20%]">
      <Image 
    source={require("../../assets/images/eduDealsLogo.png")}
    className="w-[50%] h-[50%] object-cover"
      />
    </View>
        <View className="w-full h-[70%] flex items-center justify-center">

          <View className="w-[90%] h-[85%] border border-gray-300 shadow bg-white rounded-lg">
            <View className="w-full h-[15%] flex items-center justify-center">
              <Text className="font-bold text-[20px]"> Add Product</Text>
            </View>
            <View className="w-full h-[45%] flex items-center justify-evenly">
              <TextInput
                value={productname}
                onChangeText={(text) => setProductName(text)}
                className="w-[80%] h-[25%] bg-white shadow border-[0.5px] font-normal border-gray-300 rounded-2xl px-3"
                placeholder='Product Name'
              />
                <TextInput
                  value={productprice}
                  onChangeText={(text) => setProductPrice(text)}
                  className="w-[80%] h-[25%] bg-white shadow border-[0.5px] font-normal border-gray-300 rounded-2xl px-3"
                  placeholder='Product Price'
                  keyboardType="numeric"
                />
              
            </View>

            <View className="w-[60%] h-[20%] shadow border-[0.5px] border-gray-300 bg-gray-100 rounded-xl mx-auto mt-2 flex flex-col items-center">
              <TouchableOpacity onPress={handleUpload} className="items-center justify-center pt-1">
              <FontAwesome name="upload" size={50} color="black"/>
                   <Text className="text-center text-gray-500 pt-3">Upload Product Image</Text>
              </TouchableOpacity>                
           </View>

            <View className="w-full h-[25%] flex items-center justify-center pt-1">
              <TouchableOpacity onPress={handleSubmit} className="w-[55%] h-[35%] rounded-2xl mt-[-10%] bg-[#614BC3] items-center justify-center">
                <Text className="font-bold text-[20px] text-white">Add Product</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

}

export default ProductUpload;
