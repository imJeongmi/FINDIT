import React from "react";

import './Input.scss'

export default function Input({ type, placeholder }) {
  return (
    <label className="label">
      <input className="input" type={type} placeholder={placeholder} />
    </label>
  );
}
