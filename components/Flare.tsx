import * as React from "react"

export const Flare = () => {
  return (
    <div
      style={{
        display: "block",
        position: "fixed",
        width: "100%",
        height: "100%"
      }}
    >
      <span
        id="flare"
        style={{
          display: "block",
          position: "fixed",
          left: "12%",
          top: "0",
          background: "rgba(255, 255, 255, 0.07)",
          transform: "rotate(30deg)",
          width: "100%",
          height: "100%",
          minHeight: "179px",
          maxHeight: "179px"
        }}
      />
    </div>
  )
}
