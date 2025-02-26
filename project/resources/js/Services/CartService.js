export const CartService = {
    getCart: () => {
        if (window.localStorage) {
            return JSON.parse(localStorage.getItem('guestCart') || '[]');
        }
        return [];
    },

    updateCart: (cart) => {
        if (window.localStorage) {
            localStorage.setItem('guestCart', JSON.stringify(cart));
            window.dispatchEvent(new CustomEvent('cartUpdated', {
                detail: { cart }
            }));
        }
    },

    addToCart: (product, quantity = 1) => {
        const cart = CartService.getCart();
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        CartService.updateCart(cart);
        return cart;
    },

    removeFromCart: (productId) => {
        const cart = CartService.getCart();
        const updatedCart = cart.filter(item => item.id !== productId);
        CartService.updateCart(updatedCart);
        return updatedCart;
    },

    clearCart: () => {
        CartService.updateCart([]);
        return [];
    },

    syncWithServer: async () => {
        try {
            const response = await fetch('/guest-cart/sync', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify({
                    cart: CartService.getCart()
                })
            });

            const data = await response.json();
            
            if (data.should_clear_guest_cart) {
                CartService.clearCart();
            }
            
            return data;
        } catch (error) {
            console.error('Error syncing cart:', error);
            throw error;
        }
    }
};