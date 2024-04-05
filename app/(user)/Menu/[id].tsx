import { StyleSheet,View, Text, Image, Pressable } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/components/ProductListItem';
import { useState } from 'react';
import Button from '@/components/Button';
import { useCart } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';

const sizes: PizzaSize[] = ['S','M','L','XL'];

const ProductDetailsScreen = () => {
    const {id} = useLocalSearchParams();
    const {addItem} = useCart();

    const router = useRouter();

    const [selectedSize, setSelecetedSize] = useState<PizzaSize>('M');

    const product = products.find((p) => p.id.toString() === id);
    
    const addToCart = () => {
        if (!product) {
            return;
        } 
        addItem(product, selectedSize);
        router.push('/cart')
    };

    if(!product){
        return <Text> Product Not Found</Text>
    }

    return(
        <View style={styles.container}>
            <Stack.Screen options={{title: product?.name }}/>
            <Image source = {{uri:product.image || defaultPizzaImage}} style={styles.image} />
            
            <Text>Select size</Text>
            <View style={styles.sizes}>
            {sizes.map((size) => (
                <Pressable onPress={() => { setSelecetedSize(size); }}
                style={[styles.size, 
                {backgroundColor:selectedSize == size ? 'gainsboro': 'white'}
                ]} 
                key={size}
                >

                    <Text style={[styles.sizeText, 
                    {color : selectedSize == size ? 'black': 'grey'}
                    ]}>{size}
                    </Text>
                </Pressable>
            ))}
            </View>

            <Text style={styles.price}>${product.price}</Text>
            <Button onPress ={addToCart} text="Add to cart" />
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
    image:{
        width:'100%',
        aspectRatio: 1,
    },
    price:{
        fontSize:18,
        fontWeight: 'bold',
        marginTop: 'auto',
    },
    sizes:{
        flexDirection:'row',
        justifyContent: 'space-around',
        marginVertical:10,
    },
    size:{
        backgroundColor: 'gainsboro',
        width:50,
        aspectRatio:1,
        borderRadius:25,
        alignItems: 'center',
        justifyContent:'center',
    },
    sizeText:{
        fontSize:20,
        fontWeight:'500',
    },
  });