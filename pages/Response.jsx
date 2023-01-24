import React from "react";

function Response({ price, isUnderPrefPrice, prefPrice }) {
  return (
    <>
      {price && (
        <div className="mt-8 text-white">
          <h2 className="font-semibold text-lg">
            Results from PriceTracker
          </h2>
          <div className="mt-1">
            <p>{"- price was " + price}</p>
            <p>
              - Product-price was {isUnderPrefPrice ? "not " : ""} under your prefered
            price
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Response;
