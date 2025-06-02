import { useState } from "react";
import "./PagesStyle/checkout.css";
import deleteButton from "../assets/deleteButton.png";
import addressIcon from "../assets/addressIcon.png";
import timeIcon from "../assets/timeIcon.png";
import closeIcon from "../assets/closeIcon.png";
import { useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "../redux/slices/state/cart.slice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAddUserMutation } from "../redux/slices/api/user.api.slice";
import { usePlaceOrderMutation } from "../redux/slices/api/order.api.slice";
import SwipeToOrder from "../components/SwipeToOrder";
import { useNavigate } from "react-router-dom";

function CheckOutPage() {
  const [mode, setMode] = useState("Dine In");
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [peopleCount, setPeopleCount] = useState(1);
  const [cookingInstructions, setCookingInstructions] = useState("");
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const [addUser] = useAddUserMutation();
  const [placeOrder] = usePlaceOrderMutation();
  const navigate = useNavigate();

  const handleToggleMode = (e) => {
    if (e.target.textContent === "Dine In") {
      setMode("Dine In");
    } else if (e.target.textContent === "Take Away") {
      setMode("Take Away");
    }
  };

  const handleAddItem = (id, product) => {
    const itemId = id;
    const existingItem = items.find((item) => item._id === itemId);
    if (existingItem) {
      setItems(
        items.map((item) =>
          item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setItems([...items, { _id: itemId, quantity: 1 }]);
    }
    dispatch(addToCart(product));
  };

  const handleRemoveItem = (id) => {
    const itemId = id;
    const existingItem = items.find((item) => item._id === itemId);
    if (existingItem) {
      if (existingItem.quantity === 1) {
        setItems(items.filter((item) => item._id !== itemId));
      } else {
        setItems(
          items.map((item) =>
            item._id === itemId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        );
      }
    }
    dispatch(removeFromCart(itemId));
  };

  const handleDecreaseQuantity = (id) => {
    const item = items.find((item) => item._id === id);
    if (item) {
      if (item.quantity === 1) {
        setItems(items.filter((i) => i._id !== id));
      } else {
        setItems(
          items.map((i) =>
            i._id === id ? { ...i, quantity: i.quantity - 1 } : i
          )
        );
      }
    }

    dispatch(decreaseQuantity(id));
  };

  const toggleCookingInstructions = () => {
    const cookingInstructions = document.querySelector(
      ".add-cooking-instructions"
    );
    cookingInstructions.style.display =
      cookingInstructions.style.display === "block" ? "none" : "block";
  };

  const handleCookingInstructionsChange = (e) => {
    setCookingInstructions(e.target.value);
  };

  const closeAddDetails = (e) => {
    e.preventDefault();
    addUser({ name, phone, deliveryAddress })
      .then((response) => {
        setUser(response.data);
        const addDetailsContainer = document.querySelector(
          ".add-details-container"
        );
        addDetailsContainer.style.display = "none";
        document.getElementById("menu-main-page").style.overflowY = "scroll";
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  const handlePlaceOrder = () => {
    const orderData = {
      items: cartItems,
      numberofPeople: peopleCount,
      cookingInstructions,
      user,
      mode
    };

    placeOrder(orderData)
      .then((response) => {
        if(response.error) {
          alert("Error placing order. Not Enough Tables Available.", error);
        } else {
          
          navigate("/order-food");
        }
      })
      .catch((error) => {
        navigate("/order-food");
        alert("Error placing order. Not Enough Tables Available.", error);
      });
  };

  return (
    <div className="checkout-page-container">
      <h1 className="checkout-header">Cart</h1>

      <div className="add-details-container">
        <h2>Add Details</h2>
        <form className="add-details-inputs">
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Address"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
            />
          </div>
          <div>
            <Link to="/order-food" className="checkout-back-button">
              Back
            </Link>
            <button
              onClick={closeAddDetails}
              className={`add-details-next-button ${
                name && phone && deliveryAddress ? "" : "disabled"
              }`}
            >
              Next
            </button>
          </div>
        </form>
      </div>

      {cartItems.length > 0 ? (
        <>
          <div className="checkout-item-list">
            {cartItems.map((item) => (
              <div key={item._id} className="checkout-item-card">
                <div className="checkout-item-image">
                  <img width={174} height={122} src={item.image} alt="pizza7" />
                </div>
                <div className="checkout-item-details">
                  <div className="checkout-item-details-header">
                    <h3>{item.itemName}</h3>
                    <img
                      onClick={() => handleRemoveItem(item._id)}
                      width={27}
                      height={27}
                      src={deleteButton}
                      alt="delete"
                    />
                  </div>
                  <p className="checkout-item-price">₹ {item.rate}</p>
                  <div className="checkout-item-card-footer">
                    <p className="checkout-item-quantity"></p>
                    <div className="checkout-item-quantity-controls">
                      <button onClick={() => handleAddItem(item._id, item)}>
                        +
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleDecreaseQuantity(item._id)}>
                        -
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p onClick={toggleCookingInstructions} className="cooking-details">
            Add cooking instructions (optional)
          </p>
          {
            <div className="add-cooking-instructions">
              <img
                onClick={toggleCookingInstructions}
                width={61}
                height={61}
                src={closeIcon}
                alt="close"
              />
              <div className="cooking-instructions-input">
                <h1>Add Cooking instructions</h1>
                <textarea
                  onChange={handleCookingInstructionsChange}
                  value={cookingInstructions}
                  rows={4}
                  cols={50}
                />
                <p>
                  The restaurant will try its best to follow your request.
                  However, refunds or cancellations in this regard won't be
                  possible.
                </p>

                <div className="cooking-instruction-buttons">
                  <button
                    onClick={toggleCookingInstructions}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                  <button onClick={toggleCookingInstructions} className="cooking-instruction-next-button">
                    Next
                  </button>
                </div>
              </div>
            </div>
          }
          <div className="delivery-mode">
            <button
              onClick={handleToggleMode}
              className={`${
                mode === "Dine In" ? "mode-active" : "mode-inactive"
              }`}
            >
              Dine In
            </button>
            <button
              onClick={handleToggleMode}
              className={`${
                mode === "Take Away" ? "mode-active" : "mode-inactive"
              }`}
            >
              Take Away
            </button>
          </div>

          <div className="checkout-total">
            <div>
              <p>Item Total</p>
              <p>₹{totalAmount}</p>
            </div>

            {mode === "Take Away" && (
              <div className="checkout-delivery-charge">
                <span>Delivery Charge</span>
                <p>₹50.00</p>
              </div>
            )}

            <div>
              <p>Taxes</p>
              <p>₹5.00</p>
            </div>

            <div className="checkout-grand-total">
              <p>Grand Total</p>
              <p>
                ₹{mode === "Take Away" ? totalAmount + 50 + 5 : totalAmount + 5}
              </p>
            </div>
          </div>

          <div className="delivery-details">
            <div className="personal-details">
              <h3>Your Details</h3>
              <p>
                <span>{name ? name : "Name"}</span>{" "}
                <span>{phone ? phone : "Phone"}</span>
              </p>
            </div>

            <div className="delivery-address">
              {mode === "Take Away" && (
                <div>
                  <img
                    width={10.06}
                    height={13}
                    src={addressIcon}
                    alt="address"
                  />
                  <p>
                    Delivery at Home -{" "}
                    {deliveryAddress ? deliveryAddress : "Address"}
                  </p>
                </div>
              )}

              {mode === "Dine In" && (
                <div>
                  <span className="material-symbols-outlined people">
                    group
                  </span>
                  <p>
                    Number of People -{" "}
                    <input
                      onChange={(e) => setPeopleCount(e.target.value)}
                      type="number"
                      placeholder="Enter people count"
                      min="1"
                      max="100"
                      value={peopleCount}
                    />
                  </p>
                </div>
              )}

              <div>
                <img width={11} height={11} src={timeIcon} alt="time" />
                <p>
                  Delivery in <span>42 min</span>
                </p>
              </div>
            </div>
          </div>

          <div className="place-order-swipe-button">
            <SwipeToOrder onConfirm={handlePlaceOrder} />
          </div>
        </>
      ) : (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/order-food" className="checkout-back-button">
            Back
          </Link>
        </div>
      )}
    </div>
  );
}

export default CheckOutPage;
