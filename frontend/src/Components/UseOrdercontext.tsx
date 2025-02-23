import React, { createContext, useContext, useState } from 'react';

// Define the shape of the order
export interface Order {
  name: string;
  lastname: string;
  phone: string;
  email: string;
  company: string;
  address: string;
  apartment: string;
  postalCode: string;
  status: string;
  city: string;
  country: string;
  orderNotice: string;
  total: number;
}

// Create the default state
const defaultOrder: Order = {
  name: '',
  lastname: '',
  phone: '',
  email: '',
  company: '',
  address: '',
  apartment: '',
  postalCode: '',
  status: 'draft',
  city: '',
  country: '',
  orderNotice: '',
  total: 0,
};

// Define context type
type OrderContextType = {
  order: Order;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
};

// Create the context
const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Context provider
export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [order, setOrder] = useState<Order>(defaultOrder);

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook for using the context
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
