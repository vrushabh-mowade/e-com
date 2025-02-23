import { useState } from "react";

const PaymentModes = () => {
  const paymentModes = [
    { id: "card", label: "Credit/ Debit Card", content: "Pay securely using your credit or debit card." },
    { id: "netbanking", label: "NetBanking", content: "Pay using NetBanking from leading banks." },
    { id: "wallet", label: "Wallet", content: "Use popular wallets for quick payment." },
    { id: "upi", label: "UPI", content: "Pay using UPI for fast and easy transactions." },
    { id: "emi", label: "EMI", content: "Choose EMI options for affordable payments." },
    { id: "cod", label: "Cash on Delivery", content: "For safe, contactless and hassle-free delivery, pay using card/wallet/netbanking." },
  ];

  const [selectedMode, setSelectedMode] = useState("cod");

  const selectedContent = paymentModes.find((mode) => mode.id === selectedMode)?.content;

  return (
    <div className="p-6 font-sans">
      <h2 className="text-lg font-semibold mb-4">Select Payment Mode</h2>
      <div className="flex border rounded-md">
        {/* Left panel */}
        <div className="w-1/3 border-r">
          {paymentModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className={`block w-full text-left px-4 py-2 border-b hover:bg-gray-100 ${
                selectedMode === mode.id ? "text-yellow-600 font-medium" : "text-gray-700"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        {/* Right panel */}
        <div className="w-2/3 p-4">
          <h3 className="text-lg font-medium">{paymentModes.find((mode) => mode.id === selectedMode)?.label}</h3>
          <p className="text-gray-600 mt-2">{selectedContent}</p>
          {selectedMode === "cod" && (
            <>
              <button  className="mt-4 px-6 py-2 bg-yellow-600 text-white font-medium rounded hover:bg-yellow-700">
                PLACE ORDER
              </button>
              <p className="text-sm text-gray-500 mt-2">
                By placing this order, you agree to AJIO's T&C
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModes;
