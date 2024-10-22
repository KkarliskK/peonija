import React from 'react';

export default function OrderReceipt({ order }) {
    return (
        <div>
            <h1>Thank you for your purchase, {order.name}!</h1>
            <p>Here are your order details:</p>
            <ul>
                {order.items.map(item => (
                    <li key={item.id}>
                        {item.product.name} (x{item.quantity}): €{item.price.toFixed(2)}
                    </li>
                ))}
            </ul>
            <p>Total: €{order.total_price.toFixed(2)}</p>
        </div>
    );
};


