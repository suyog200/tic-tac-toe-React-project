import React from "react";

export default function SymbolSelector({ selectedSymbol, onSelectSymbol }) {
  const symbols = ["X", "O", "⭐", "⚽", "❤️"];

  return (
    <select
      value={selectedSymbol}
      onChange={(e) => onSelectSymbol(e.target.value)}
    >
      {symbols.map((symbol) => (
        <option key={symbol} value={symbol}>
          {symbol}
        </option>
      ))}
    </select>
  );
}
