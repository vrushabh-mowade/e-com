import React, { createContext, useContext, useState } from "react";

// Create the context
const OrderContext = createContext<any>(null);

export const UseOrderContext = ({ children }: { children: React.ReactNode }) => {
    const [order, setOrder] = useState({}); // Correct capitalization for `setOrder`

    return (
        <OrderContext.Provider value={{ order, setOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

// Custom hook to use the OrderContext
export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrder must be used within a UseOrderContext");
    }
    return context;
};
