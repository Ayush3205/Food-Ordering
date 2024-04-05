import { StyleSheet,View, Text, Image, Pressable, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack, useRouter, Link, } from 'expo-router';
import { defaultPizzaImage } from '@/components/ProductListItem';
import { useState } from 'react';
import Button from '@/components/Button';
import { useCart } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { useProduct } from '@/api/products';

const sizes: PizzaSize[] = ['S','M','L','XL'];

const ProductDetailsScreen = () => {
    const {id: idString} = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
    const {data: product, error, isLoading} = useProduct(id); 

    const {addItem} = useCart();

    const router = useRouter();

    const [selectedSize, setSelecetedSize] = useState<PizzaSize>('M');
    
    const addToCart = () => {
        if (!product) {
            return;
        } 
        addItem(product, selectedSize);
        router.push('/cart')
    };

    if(isLoading) {
        return <ActivityIndicator />;
      }
    
      if(error) {
        return <Text>Failed to fetch products</Text>;
      }

    return(
        <View style={styles.container}>
        <Stack.Screen 
        options={{ 
            title: 'Menu',
            headerRight: () => (
                <Link href={`/(admin)/Menu/create?id=${id}`} asChild>
                    <Pressable>
                        {({ pressed }) => (
                            <FontAwesome
                              name="pencil"
                              size={25}
                              color={Colors.light.tint}
                              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                            />
                        )}
                    </Pressable>
                </Link>
        ), }} />


            <Stack.Screen options={{title: product.name }}/>
            <Image source = {{uri:product.image || defaultPizzaImage}} style={styles.image} />
            

            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>

        </View>
    );
};
export default ProductDetailsScreen; 

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1,
        padding: 10,
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    image:{
        width:'100%',
        aspectRatio: 1,
    },
    price:{
        fontSize:18,
        fontWeight: 'bold',
    },
  });