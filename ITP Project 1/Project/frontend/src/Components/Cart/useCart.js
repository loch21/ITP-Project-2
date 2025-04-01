import { useState } from 'react';


function useCart() {
    const [cartItems, setCartItems] = useState([]);


    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((i) => i._id === item._id);
            if (existingItem) {
                return prevItems.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };


    const removeFromCart = (id) => {
        setCartItems((prevItems) =>
            prevItems
                .map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0)
        );
    };


    const clearCart = () => {
        setCartItems([]);
    };


    return { cartItems, addToCart, removeFromCart, clearCart };
}


export default useCart;





