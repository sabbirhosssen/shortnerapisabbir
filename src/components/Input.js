import React, { useState } from "react";
import { db } from "../firebase";
const tinyid = require("tiny-unique-id");

function Input() {
  const [input, setInput] = useState("");
  const [shorten, setShorten] = useState("");
  const [showShorten, setShowShorten] = useState(false);
  const [loader, setLoader] = useState(false)




  const handleDb = async (e) => {
    e.preventDefault();

    // loader 
    setLoader(true)
    // List of allowed keywords
    const allowedKeywords = [
      "180252",
      "185440",
      "153277",
      "158761&s2",
      "177685&s2",
      "162059&sm",
      "179008&s2",
      "c1b6d275",
      "189600&s2",
      "191132&s2",
      "148685&s2",
      "142414&s2",
      "147255&s2",
      "179140&s2",
      "165291&s2",
      "164235&s2",
      "191734&s2",
      "165078&s2",
      "5NDH2LNxuB0KIb&utm",
      "180284&s2",
      "192378&s2",
      "166588&s2",
      "145724&sm",
      "180273&s2",
      "168476&s2",
      "173643&s2",
      "149394&s2",
      "174805&s2",
      "191055&sm",
      "183045&s2",
      "177958&s2",
      "177576&s2",
      "182429&sm",
      "179135&s2"
    ];


    // Validate the input URL against the keywords
    const isValidUrl = allowedKeywords.some((keyword) =>
      input.includes(keyword)
    );
    if (!isValidUrl) {
      setLoader(false);
      alert("The CPA profile code is not registered here");
      return;
    }

     // fetch short url 
     const shortApiRes = await fetch(`https://levenda.pw/api?url=${encodeURIComponent(input)}`)
     const shortApiData = await shortApiRes.json()
     const sendInputUrl = shortApiData.data.shortCode;
     
     const slug = tinyid.unique();
     await db.collection("urls").add({
       url: `https://levenda.pw/${sendInputUrl}`,
       slug: slug,
      });
      setLoader(false)
      setShorten(`${window.location.origin}/${slug}`);
      setShowShorten(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shorten);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <header className="flex flex-col gap-5 h-screen">

      {/* loader */}
      {loader && (
        <div className="flex fixed h-screen w-full  justify-center items-center backdrop-blur-lg bg-gray-800/10">
          <button className="btn btn-circle loading"></button>
        </div>
      )}

      <div className="lg:w-1/4 lg:mx-auto text-center">
        <h1 className="mt-5 text-center text-3xl">
          Link shortener V-3.0
        </h1>
        <p className="text-center bg-base-300 mx-2 rounded mb-2 py-3 mt-10">শর্টনার সার্ভিস নেয়ার জন্য WhatsApp Button-এ ক্লিক করুন <a className=" bg-green-600 p-3 text-2xl btn text-white btn-circle" href="https://wa.me/message/XXYZ5UQC2REFL1"><i className="fa-brands fa-whatsapp"></i></a></p>

        <p className="text-sm text-center rounded mx-2 text-primary bg-gray-300">01660037359</p>
      </div>

      <form className="flex flex-col items-center justify-center lg:w-1/4 lg:mx-auto  mx-2 gap-3 bg-base-300 p-7 rounded" onSubmit={handleDb}>
        <input type="text"
          placeholder="Enter your link"
          className="input input-bordered input-primary w-full max-w-xs"
          value={input}
          onChange={(e) => setInput(e.target.value)} />

        <button type="submit" className="btn btn-active btn-primary mt-3">
          Shorten URL
        </button>
        {showShorten && (
          <div className="mt-3">
            <input
              type="text"
              className="input input-bordered input-primary w-full max-w-xs"
              value={shorten}
              readOnly
            />
            <button
              type="button"
              onClick={handleCopy}
              className="btn btn-primary mt-3"
            >
              Copy Link
            </button>
          </div>
        )}
      </form>
      <div className="container"></div>
    </header>
  );
}

export default Input;
