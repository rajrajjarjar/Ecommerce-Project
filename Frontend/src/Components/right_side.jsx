import { useState, useRef, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router';
import './right_side.css'; // import the styles

export function Right_side() {
    const { isLoggedin, logout } = useAuth();
    const navigate = useNavigate();

    // Tracks whether the dropdown is open or closed
    const [isOpen, setIsOpen] = useState(false);

    // Ref to the wrapper div so we can detect clicks outside it
    const dropdownRef = useRef(null);

    // Close the dropdown if the user clicks anywhere outside of it
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        // Cleanup: remove the listener when component unmounts
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Helper to navigate AND close the dropdown afterward
    function handleNavigate(path) {
        navigate(path);
        setIsOpen(false);
    }

    if (isLoggedin) {
        return (
            <div className="dropdown" ref={dropdownRef}>
                {/* Toggle button — click to open/close the menu */}
                <button className="dropdown-toggle" onClick={() => setIsOpen(prev => !prev)}>
                    user <span className="dropdown-arrow">▾</span>
                </button>

                {/* Only render the menu when isOpen is true */}
                {isOpen && (
                    <div className="dropdown-menu">
                        <button className="dropdown-item" onClick={() => handleNavigate('/orders')}>
                            Orders
                        </button>
                        <button className="dropdown-item" onClick={() => handleNavigate('/checkout')}>
                            Checkout
                        </button>
                        <button className="dropdown-item dropdown-item-danger" onClick={() => { logout(); setIsOpen(false); }}>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <button className="login-btn" onClick={() => navigate('/login')}>
            login/Register
        </button>
    );
}