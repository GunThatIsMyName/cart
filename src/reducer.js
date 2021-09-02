export const ClearCart = "CLAEARCART";
export const RemoveItem = "RemoveItem";
export const Increse = "Increse";
export const Decrease = "Decrease";
export const CAL = "CAL";
export const DISPLAY = "DISPLAY";
export const LOADING = "LOADING";
export const AMOUNT = "AMOUNT";

const reducer = (state, action) => {
  switch (action.type) {
    case ClearCart:
      return {
        ...state,
        cart: [],
      };
    case RemoveItem:
      const newItem = state.cart.filter((item) => item.id !== action.payload);
      return {
        ...state,
        cart: newItem,
      };
    case CAL:
      let { totalAmount, totalPrice } = state.cart.reduce(
        (acc, curr) => {
          const { price, amount } = curr;
          acc.totalAmount += amount;
          acc.totalPrice += amount * price;
          return acc;
        },
        {
          totalAmount: 0,
          totalPrice: 0,
        }
      );
      totalPrice = parseFloat(totalPrice.toFixed(2));
      console.log(totalAmount, "reduce");
      console.log(totalPrice, "totalPrice");
      console.log(state);
      return {
        ...state,
        total: totalPrice,
        amount: totalAmount,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case DISPLAY:
      const data = action.payload;
      return {
        ...state,
        cart: data,
        loading: false,
      };
    case AMOUNT:
      const all = state.cart.map((item) => {
          if (item.id === action.payload.id) {
            console.log("1");
            return action.payload.type === "inc"
              ? { ...item, amount: item.amount + 1 }
              : { ...item, amount: item.amount - 1 };
          }
          return item;
        }).filter((item) => item.amount !== 0);
      return {
        ...state,
        cart: all,
      };
    default:
      throw new Error();
  }
};

export default reducer;
