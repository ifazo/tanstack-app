import { useStore } from "@tanstack/react-store";
import store, { addToCart, clearCart, removeFromCart } from "../store";
import { Product } from "../types";


export default function DashboardPage() {
  const products = [

    {
      "id": 1,
      "title": "iPhone 7",
      "description": "An apple mobile which is nothing like apple",
      "price": 549,
      "discountPercentage": 12.96,
      "rating": 4.69,
      "stock": 94,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "...",
      "images": ["...", "...", "..."]
    },
    {
      "id": 2,
      "title": "iPhone 8",
      "description": "An apple mobile which is nothing like apple",
      "price": 549,
      "discountPercentage": 12.96,
      "rating": 4.69,
      "stock": 94,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "...",
      "images": ["...", "...", "..."]
    },
    {
      "id": 3,
      "title": "iPhone 9",
      "description": "An apple mobile which is nothing like apple",
      "price": 549,
      "discountPercentage": 12.96,
      "rating": 4.69,
      "stock": 94,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "...",
      "images": ["...", "...", "..."]
    }
  ];

  const Product = ({ product }: { product: Product }) => (
    <div>
      <span>{product.title}</span>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
      <button onClick={() => removeFromCart(product)}>Remove from Cart</button>
      <button onClick={() => clearCart()}>Clear Cart</button>
    </div>
  );

  const Cart = () => {
    const cartItems = useStore(store, (state) => state.cart);

    return (
      <div>
        <h2>Your Cart</h2>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1>Simple Store Example - Product Cart</h1>
      <div>
        <h2>Products</h2>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <div>
        <Cart />
      </div>
    </div>
  )
}
