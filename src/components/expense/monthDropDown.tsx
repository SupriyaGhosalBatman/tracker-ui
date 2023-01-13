import React, { useState, useEffect } from "react";

export default function MonthDropDown() {
    const [items] = React.useState([
      {
        label: "Luke Skywalker",
        value: "Luke Skywalker"
      },
      { label: "C-3PO", value: "C-3PO" },
      { label: "R2-D2", value: "R2-D2" }
    ]);
    return (
      <select>
        {items.map(item => (
          <option
            key={item.value}
            value={item.value}
          >
            {item.label}
          </option>
        ))}
      </select>
    );
  }