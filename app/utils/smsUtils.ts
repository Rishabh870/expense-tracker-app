export const extractAmount = (text: string): number | null => {
    const match = text.match(/(?:INR|Rs\.?|₹)\s?([0-9,]+(\.\d{1,2})?)/i);
    if (match) {
      return parseFloat(match[1].replace(/,/g, ""));
    }
    return null;
  };
  
  export const guessCategory = (text: string): string => {
    if (text.toLowerCase().includes("swiggy") || text.includes("zomato")) return "Food";
    if (text.toLowerCase().includes("amazon") || text.includes("flipkart")) return "Shopping";
    if (text.toLowerCase().includes("petrol") || text.includes("fuel")) return "Fuel";
    return "General";
  };
  