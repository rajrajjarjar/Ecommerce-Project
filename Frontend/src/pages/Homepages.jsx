import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import './Homepages.css';
import { useAuth } from '../Components/AuthContext';
import axios from 'axios';
import Header from '../Components/Header';

function Homepage() {
    const { isLoggedin } = useAuth();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]); // now comes from backend, not local file
    const [quantities, setQuantities] = useState({});

    // Fetch real products from your DB on mount
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/products")
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    }, []);

    function handleQuantityChange(productId, value) {
        setQuantities(prev => ({ ...prev, [productId]: Number(value) }));
    }

    async function added(productId) {
        if (!isLoggedin) {
            alert("Please login before adding to cart");
            navigate("/login");
            return;
        }

        const token = localStorage.getItem("token");
        const quantity = quantities[productId] || 1;

        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/addToCart",
                {
                    product: productId, // now a real Mongo ObjectId
                    quantity: quantity
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log("Added to cart:", response.data);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

    return (
        <>
            <Header></Header>
            <div className="home-page">
                <div className="products-grid">
                    {products.map((product) => {
                        return (
                            <div key={product._id} className="product-container">
                                <div className="product-image-container">
                                    <img className="product-image" src={product.image} />
                                </div>

                                <div className="product-name limit-text-to-2-lines">
                                    {product.name}
                                </div>

                                <div className="product-rating-container">
                                    <img className="product-rating-stars"
                                        src={`images/ratings/rating-${product.rating.stars * 10}.png `} />
                                    <div className="product-rating-count link-primary">
                                        {product.rating.count}
                                    </div>
                                </div>

                                <div className="product-price">
                                    ${(product.priceCents / 100).toFixed(2)}
                                </div>

                                <div className="product-quantity-container">
                                    <select
                                        value={quantities[product._id] || 1}
                                        onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>

                                <div className="product-spacer"></div>

                                <div className="added-to-cart">
                                    <img src="images/icons/checkmark.png" />
                                    Added
                                </div>

                                <button className="add-to-cart-button button-primary"
                                    onClick={() => added(product._id)}>
                                    Add to Cart
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Homepage;