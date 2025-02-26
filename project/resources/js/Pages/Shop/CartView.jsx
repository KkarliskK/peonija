import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PostNotification from '@/Components/Modals/Notification';
import axios from 'axios';

const GuestCartPage = ({ auth }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');
  const [isLoading, setIsLoading] = useState(true);

  const syncCartWithUser = async () => {
    setIsLoading(true);
    
    if (auth && auth.user) { 
      try {
        console.log("Syncing cart for logged-in user");
        const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        
        if (guestCart.length > 0) {
          console.log("Guest cart found, syncing with server:", guestCart);
          const syncResponse = await axios.post('/checkout/sync-cart', { cart: guestCart });
          
          if (syncResponse.data.success) {
            console.log("Sync successful, clearing guest cart");
            localStorage.setItem('guestCart', JSON.stringify([])); 
          } else {
            console.error("Sync failed:", syncResponse.data);
          }
        }

        console.log("Fetching current cart from server");
        const response = await axios.get('/cart');
        
        if (response.data && response.data.cartItems) {
          console.log("Received cart items from server:", response.data.cartItems);
          
          const formattedCartItems = response.data.cartItems.map(item => ({
            id: item.id,  
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            image: item.product.image,
            stock: item.product.quantity, 
            product_id: item.product_id
          }));
          
          console.log("Formatted cart items:", formattedCartItems);
          setCartItems(formattedCartItems);
          
          localStorage.setItem('userCart', JSON.stringify(formattedCartItems));
          window.dispatchEvent(new CustomEvent('cartUpdated', {
            detail: { cart: formattedCartItems }
          }));
        } else {
          console.error("No cart items in response or unexpected format:", response.data);
          setNotificationMessage('Kļūda ielādējot grozu no servera.');
          setNotificationType('error');
          setNotificationOpen(true);
        }
      } catch (error) {
        console.error('Error syncing/fetching cart:', error);
        console.error('Error details:', error.response?.data || error.message);
        setNotificationMessage('Kļūda ielādējot grozu: ' + (error.response?.data?.message || error.message));
        setNotificationType('error');
        setNotificationOpen(true);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Loading guest cart from localStorage");
      const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
      setCartItems(guestCart);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    syncCartWithUser();

    const handleCartUpdate = (e) => {
      if (e.detail && e.detail.cart) {
        setCartItems(e.detail.cart);
      }
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [auth]);

  const handleDeleteItem = async (itemId) => {
    console.log("Delete requested for item ID:", itemId);
    
    const currentItem = cartItems.find(item => item.id === itemId);
    console.log("Found item:", currentItem);
      
    if (!currentItem) {
      console.error("Item not found in cart items");
      setNotificationMessage('Neizdevās atrast preci grozā.');
      setNotificationType('error');
      setNotificationOpen(true);
      return;
    }

    const originalCart = [...cartItems];
    
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    
    if (auth && auth.user) {
      try {
        console.log(`Making API request to /cart/remove/${itemId}`);
        
        const url = `/cart/remove/${itemId}`;
        
        const response = await axios.post(url);
        console.log("Delete API response:", response);
        
        if (response.status >= 200 && response.status < 300) {
          console.log("Delete successful, updating localStorage");
          localStorage.setItem('userCart', JSON.stringify(updatedCart));
          
          window.dispatchEvent(new CustomEvent('cartUpdated', {
            detail: { cart: updatedCart }
          }));
          
          setNotificationMessage('Prece veiksmīgi izdzēsta no groza.');
          setNotificationType('success');
          setNotificationOpen(true);
        } else {
          console.error("API returned unsuccessful response:");
          // Revert UI change if server indicates failure
          setCartItems(originalCart);
          
          setNotificationMessage('Neizdevās noņemt preci no groza. Servera kļūda.');
          setNotificationType('error');
          setNotificationOpen(true);
        }
      } catch (error) {
        console.error('Error removing item:', error);
        console.error('Error details:', error.response?.data || error.message);
        
        if (error.response && error.response.status >= 300 && error.response.status < 400) {
          localStorage.setItem('userCart', JSON.stringify(updatedCart));
          
          window.dispatchEvent(new CustomEvent('cartUpdated', {
            detail: { cart: updatedCart }
          }));
          
          setNotificationMessage('Prece veiksmīgi izdzēsta no groza.');
          setNotificationType('success');
          setNotificationOpen(true);
          
          window.location.reload();
          return;
        }
        
        setCartItems(originalCart);
        
        setNotificationMessage('Neizdevās noņemt preci no groza. ' + (error.response?.data?.message || error.message));
        setNotificationType('error');
        setNotificationOpen(true);
      }
    } else {
      console.log("Guest user, updating localStorage only");
      localStorage.setItem('guestCart', JSON.stringify(updatedCart));
      
      window.dispatchEvent(new CustomEvent('cartUpdated', {
        detail: { cart: updatedCart }
      }));
      
      setNotificationMessage('Prece veiksmīgi izdzēsta no groza.');
      setNotificationType('success');
      setNotificationOpen(true);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity, stock) => {
    if (newQuantity > stock) {
      setNotificationMessage('Nav pieejams tik daudz preces!');
      setNotificationType('error');
      setNotificationOpen(true);
      return;
    }

    const updatedCart = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCart);

    if (auth && auth.user) {
      try {
        const currentItem = cartItems.find(item => item.id === itemId);
        
        if (!currentItem) {
          throw new Error('Item not found in cart');
        }
        
        await axios.post(`/cart/update/${currentItem.product_id}`, { 
          quantity: newQuantity
        });
        
        localStorage.setItem('userCart', JSON.stringify(updatedCart));
      } catch (error) {
        console.error('Error updating quantity:', error);
        setNotificationMessage('Neizdevās atjaunināt preces daudzumu.');
        setNotificationType('error');
        setNotificationOpen(true);
        return;
      }
    } else {
      localStorage.setItem('guestCart', JSON.stringify(updatedCart));
    }

    window.dispatchEvent(new CustomEvent('cartUpdated', {
      detail: { cart: updatedCart }
    }));
  };

  const handleClearCart = async () => {
    const confirmClear = window.confirm("Vai tiešām vēlaties iztukšot grozu?");
    if (confirmClear) {
      if (auth && auth.user) {
        try {
          await axios.post('/cart/clear');
          localStorage.setItem('userCart', JSON.stringify([]));
        } catch (error) {
          console.error('Error clearing cart:', error);
          setNotificationMessage('Neizdevās iztukšot grozu.');
          setNotificationType('error');
          setNotificationOpen(true);
          return;
        }
      } else {
        localStorage.setItem('guestCart', JSON.stringify([]));
      }
      
      setCartItems([]);
      window.dispatchEvent(new CustomEvent('cartUpdated', {
        detail: { cart: [] }
      }));
    }
  };

  const proceedToCheckout = async () => {
    if (cartItems.length === 0) {
      setNotificationMessage('Jūsu grozs ir tukšs. Lūdzu, pievienojiet produktus pirms pasūtīšanas.');
      setNotificationType('error');
      setNotificationOpen(true);
      return;
    }

    if (auth && auth.user) {
      window.location.href = '/checkout';
    } else {
      const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
      
      try {
        const response = await axios.post('/checkout/sync-cart', { 
          cart: guestCart 
        });
        
        if (response.data.success) {
          window.location.href = '/checkout';
        } else {
          setNotificationMessage('Kļūda pasūtījuma procesā. Lūdzu, mēģiniet vēlreiz.');
          setNotificationType('error');
          setNotificationOpen(true);
        }
      } catch (error) {
        console.error('Error during checkout sync:', error);
        setNotificationMessage('Kļūda pasūtījuma procesā. Lūdzu, mēģiniet vēlreiz.');
        setNotificationType('error');
        setNotificationOpen(true);
      }
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.price && typeof item.price === 'string' 
        ? parseFloat(item.price.replace(/[^0-9.-]+/g, '')) 
        : parseFloat(item.price) || 0;
      
      return total + (itemPrice * item.quantity);
    }, 0).toFixed(2);
  };

  return (
    <AuthenticatedLayout auth={auth}>
      <div className="py-16 mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 mt-12 md:flex-row">
          <div className="flex-grow">
            <h1 className="mb-6 text-3xl font-bold">Jūsu grozs</h1>
            
            {isLoading ? (
              <div className="p-8 text-center bg-white shadow-sm rounded-xl">
                <div className="max-w-md mx-auto">
                  <h3 className="mb-2 text-xl font-semibold">Ielādē grozu...</h3>
                </div>
              </div>
            ) : cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div 
                    key={item.id}
                    className="overflow-hidden transition-shadow duration-200 bg-white shadow-sm rounded-xl hover:shadow-md "
                  >
                    <div className="flex flex-col items-center gap-4 p-4 sm:flex-row">
                      <div className="relative flex-shrink-0 w-32 h-32">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="object-cover w-full h-full rounded-lg"
                        />
                      </div>

                      <div className="flex-grow space-y-2 text-center sm:text-left ">
                        <h4 className="text-xl font-semibold">{item.name}</h4>
                        <p className="text-lg font-medium text-accent">{item.price}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1), item.stock)}
                          className="p-2 transition-colors rounded-full hover:bg-gray-100"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="w-12 font-medium text-center">{item.quantity}</span>
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.stock)} 
                          className="p-2 transition-colors rounded-full hover:bg-gray-100"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>

                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-2 text-red-500 transition-colors rounded-full hover:bg-red-50"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-white shadow-sm rounded-xl">
                <div className="max-w-md mx-auto">
                  <h3 className="mb-2 text-xl font-semibold">Jūsu iepirkuma grozs ir tukšs</h3>
                  <p className="mb-6 text-gray-600">Apskatiet mūsu produktus un pievienojiet tos grozam</p>
                  <button 
                    onClick={() => window.location.href = '/shop'}
                    className="inline-flex items-center px-6 py-3 text-white transition-colors rounded-lg bg-violet-600 hover:bg-violet-700"
                  >
                    Turpināt iepirkties
                  </button>
                </div>
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="flex-shrink-0 w-full md:w-80">
              <div className="sticky p-6 bg-white shadow-sm rounded-xl top-24">
                <h2 className="mb-4 text-xl font-semibold">Pasūtījuma kopsavilkums</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <span className="text-gray-600">Preces ({cartItems.length})</span>
                    <span className="font-medium">{calculateTotal()} €</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Kopā</span>
                    <span>{calculateTotal()} €</span>
                  </div>

                  <button
                    className="w-full py-3 text-white transition-colors rounded-lg bg-primary-pink hover:bg-accent"
                    onClick={proceedToCheckout} 
                  >
                    Turpināt pasūtījumu
                  </button>

                  <button
                    onClick={handleClearCart}
                    className="w-full py-3 text-red-500 transition-colors border border-red-500 rounded-lg hover:bg-red-50"
                  >
                    Iztukšot grozu
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <PostNotification 
        message={notificationMessage} 
        type={notificationType} 
        isOpen={isNotificationOpen} 
        onClose={() => setNotificationOpen(false)} 
      />
    </AuthenticatedLayout>
  );
};

export default GuestCartPage;