import React, { useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";

const DefaultPopover = ({ content }) => {
  const [show, setShow] = useState(false);

  return (
    <div style={{ position: "relative", display: "inline-block", margin: 0 }}>
      <AiFillInfoCircle
        onMouseMove={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="m-0"
      />
      {show ? (
        <div
          style={{
            position: "absolute",
            top: "30px",
            background: "#ffffff",
            padding: "15px",
            border: "1px solid #929292",
            borderRadius: "8px",
            fontSize: "10px",
            fontWeight: 400,
            lineHeight: "10px",
            minWidth: "440px",
            minHeight: "330px",
            zIndex: 1,
          }}
        >
          {content}
        </div>
      ) : null}
    </div>
  );
};

export default DefaultPopover;
