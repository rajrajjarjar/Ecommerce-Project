import { useState, useEffect } from 'react';
import Header from "../../Components/Header"
import axios from 'axios';
import './checkout-header.css';
import './Checkout.css';

function Checkout() {
    const [cart, setCart] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        // Fetch cart and all products in parallel
        Promise.all([
            axios.get("http://localhost:3000/api/v1/cart", {
                headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get("http://localhost:3000/api/v1/products")
        ])
            .then(([cartRes, productsRes]) => {
                setCart(cartRes.data);
                setProducts(productsRes.data);
            })
            .catch(err => console.log(err.response?.data || err.message));
    }, []);

    // Helper: look up full product details by the ID stored in a cart item
    function getProductDetails(productId) {
        return products.find(p => p._id === productId);
    }

    if (!cart || products.length === 0) {
        return (
            <>
                <Header></Header>
                <div className="checkout-page">Loading cart...</div>
            </>
        );
    }

    return (
        <>
            <Header></Header>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <div className="order-summary">
                        {cart.items.map((item) => {
                            const product = getProductDetails(item.product);

                            // Skip rendering if product wasn't found (e.g. deleted from DB)
                            if (!product) return null;

                            return (
                                <div key={item._id} className="cart-item-container">
                                    <div className="cart-item-details-grid">
                                        <img className="product-image"
                                            src={product.image} />

                                        <div className="cart-item-details">
                                            <div className="product-name">
                                                {product.name}
                                            </div>
                                            <div className="product-price">
                                                ${(product.priceCents / 100).toFixed(2)}
                                            </div>
                                            <div className="product-quantity">
                                                <span>
                                                    Quantity: <span className="quantity-label">{item.quantity}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="payment-summary">
                        <div className="payment-summary-title">
                            Payment Summary
                        </div>

                        <div className="payment-summary-row">
                            <div>Items ({cart.items.length}):</div>
                            <div className="payment-summary-money">
                                ${(cart.items.reduce((sum, item) => {
                                    const product = getProductDetails(item.product);
                                    return sum + (product ? product.priceCents * item.quantity : 0);
                                }, 0) / 100).toFixed(2)}
                            </div>
                        </div>

                        <button className="place-order-button button-primary">
                            Place your order
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Checkout