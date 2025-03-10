import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PostNotification from '@/Components/Modals/Notification';
import axios from 'axios';
import Cookies from 'js-cookie';


const GuestCartPage = ({ auth }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');
  const [isFirstPurchase, setIsFirstPurchase] = useState(false);

    const getCartFromCookies = () => {
      try {
        const cartCookie = Cookies.get('guest_cart');
        return cartCookie ? JSON.parse(cartCookie) : [];
      } catch (error) {
        console.error('Error parsing cart cookie:', error);
        return [];
      }
    };
  
    useEffect(() => {
      const savedCart = getCartFromCookies();
      setCartItems(savedCart);

      if (auth.user) {
        const fetchFirstPurchaseStatus = async () => {
          try {
            const response = await axios.get('/check-first-purchase');
            setIsFirstPurchase(response.data.isFirstPurchase);
          } catch (error) {
            console.error('Error checking first purchase:', error);
          }
        };

        fetchFirstPurchaseStatus();
      } else {
        setIsFirstPurchase(false);
      }

      const handleCartUpdate = (event) => {
        setCartItems(event.detail.cart);
      };

      window.addEventListener('cartUpdated', handleCartUpdate);
      return () => {
        window.removeEventListener('cartUpdated', handleCartUpdate);
      };
    }, []);

    const handleDeleteItem = (itemId) => {
      const updatedCart = cartItems.filter(item => item.id !== itemId);
      
      Cookies.set('guest_cart', JSON.stringify(updatedCart), { 
        expires: 1,  // 1 day
        path: '/' 
      });

      setCartItems(updatedCart);
      showToast('Prece izņemta no groza');
    };

    const handleUpdateQuantity = (itemId, newQuantity) => {
      if (newQuantity < 1) {
        handleDeleteItem(itemId);
        return;
      }
      
      const updatedCart = cartItems.map(item => 
        item.id === itemId 
          ? { ...item, quantity: Math.min(newQuantity, item.available_stock || 99) } 
          : item
      );
      
      Cookies.set('guest_cart', JSON.stringify(updatedCart), { 
        expires: 1,  // 1 day
        path: '/' 
      });

      setCartItems(updatedCart);
      showToast('Groza daudzums atjaunināts');
    };

    const handleClearCart = () => {
      const confirmClear = window.confirm("Vai tiešām vēlaties iztukšot grozu?");
      if (confirmClear) {
        Cookies.remove('guest_cart', { path: '/' });
        Cookies.remove('isFirstPurchase', { path: '/' });

        setCartItems([]);
        showToast('Grozs veiksmīgi iztukšots');
      }
    };

    const proceedToCheckout = () => {
        if (cartItems.length === 0) {
            showToast('Jūsu grozs ir tukšs', 'error');
            return;
        }

        window.location.href = '/checkout';
    };

    const calculateTotal = () => {
        const total = cartItems.reduce((sum, item) => {
            const price = parseFloat(item.price) || 0;
            return sum + (price * item.quantity);
        }, 0);

        return isFirstPurchase ? total * 0.9 : total;
    };
  
    const originalTotal = cartItems.reduce((total, item) => {
    const itemPrice = item.price && typeof item.price === 'string' 
        ? parseFloat(item.price.replace(/[^0-9.-]+/g, '')) 
        : parseFloat(item.price) || 0;
      
      return total + (itemPrice * item.quantity);
    }, 0);

    const showToast = (message, type = 'success') => {
        setNotificationMessage(message);
        setNotificationOpen(true);
        setTimeout(() => setNotificationOpen(false), 2000);
    };

  return (
    <AuthenticatedLayout auth={auth}>
      <div className="py-16 mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 mt-12 md:flex-row">
          <div className="flex-grow">
            {isFirstPurchase && (
              <div className="p-4 mb-6 border border-green-200 rounded-lg bg-green-50 dark:bg-green-950 dark:border-green-600">
                <p className="font-semibold text-green-700 dark:text-green-100">
                  🎉 Īpašs piedāvājums: 10% atlaide pirmajai iegādei!
                </p>
              </div>
            )}
            <h1 className="mb-6 text-3xl font-bold dark:text-gray-200">Jūsu grozs</h1>
            
              {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div 
                    key={item.id}
                    className="overflow-hidden transition-shadow duration-200 bg-white shadow-sm rounded-xl hover:shadow-md dark:bg-gray-800 dark:text-gray-200"
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
                        <p className="text-lg font-medium text-accent dark:text-primary-pink">{item.price}</p>
                      </div>

                      <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
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
              <div className="p-8 text-center bg-white shadow-sm rounded-xl dark:bg-gray-800">
                <div className="max-w-md mx-auto">
                  <h3 className="mb-2 text-xl font-semibold dark:text-gray-200">Jūsu iepirkuma grozs ir tukšs</h3>
                  <p className="mb-6 text-gray-600 dark:text-gray-200">Apskatiet mūsu produktus un pievienojiet tos grozam</p>
                  <button 
                    onClick={() => window.location.href = '/shop'}
                    className="inline-flex items-center px-6 py-3 text-white transition-colors rounded-lg bg-accent hover:bg-primary-pink"
                  >
                    Turpināt iepirkties
                  </button>
                </div>
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="flex-shrink-0 w-full md:w-80">
              <div className="sticky p-6 bg-white shadow-sm rounded-xl top-24 dark:bg-gray-800 dark:text-gray-200">
                <h2 className="mb-4 text-xl font-semibold">Pasūtījuma kopsavilkums</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <span className="text-gray-600 dark:text-gray-400">Preces ({cartItems.length})</span>
                    <span className="font-medium">{originalTotal.toFixed(2)} €</span>
                  </div>
                  
                  {isFirstPurchase && (
                    <div className="flex items-center justify-between text-green-600">
                      <span>Atlaide (10%)</span>
                      <span>-{(originalTotal * 0.1).toFixed(2)} €</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Kopā</span>
                    <span>{calculateTotal().toFixed(2)} €</span>
                  </div>

                  <button
                    className="w-full py-3 text-white transition-colors rounded-lg bg-primary-pink hover:bg-accent"
                    onClick={proceedToCheckout} 
                  >
                    Turpināt pasūtījumu
                  </button>

                  <button
                    onClick={handleClearCart}
                    className="w-full py-3 text-red-500 transition-all border border-red-500 rounded-lg hover:scale-105"
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