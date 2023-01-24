import axios from "axios";
import React, { useState } from "react";
import Response from "./Response";

function Input() {
  const [input, setInput] = useState({
    url: "",
    prefPrice: "",
  });
  const [response, setResponse] = useState({
    price: undefined,
    isUnderPrefPrice: undefined,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    setResponse({ price: undefined, isUnderPrefPrice: undefined });
    e.preventDefault();
    const { data } = await axios.post(
      "/pages/api/pricetracker",
      input
    );
    const { price, isUnderPrefPrice, prefPrice } = data;
    setResponse({ price: price, isUnderPrefPrice: isUnderPrefPrice });
    setLoading(false);
  };

  return (
    <div className="w-[80vw] mx-auto">
      {loading ? (
        <div className="mt-44 flex flex-col w-fit mx-auto items-center text-white">
          <p className="text-center font-semibold text-xl">
            Response is loading from the server!
          </p>
          <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            required
            placeholder="amazon url"
            value={input.url}
            onChange={({ target }) => setInput({ ...input, url: target.value })}
          />
          <input
            required
            placeholder="Price to track"
            value={input.prefPrice}
            onChange={({ target }) =>
              setInput({ ...input, prefPrice: target.value })
            }
          />
          <button type="submit">check product</button>
        </form>
      )}
      <Response price={response.price} isUnderPrefPrice={response.isUnderPrefPrice} prefPrice={input.prefPrice}/>
    </div>
  );
}

export default Input;
