import { render, screen } from "@testing-library/react";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

test("renders Convenience Way", () => {
  render(
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  );

  expect(
    screen.getByText(/Convenience Way/i)
  ).toBeInTheDocument();
});
