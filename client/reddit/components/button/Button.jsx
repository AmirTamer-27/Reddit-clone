import React from "react";

import "./Button.css";

export default function Button({ primary, secondary, tertiary, label }) {
  if (tertiary) {
    return <div className="button tertiary-button">{label}</div>;
  } else if (secondary) {
    return <div className="button secondary-button">{label}</div>;
  } else {
    return <div className="button primary-button">{label}</div>;
  }
}
