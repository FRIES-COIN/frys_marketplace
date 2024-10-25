import React, { useState } from "react";

interface MintFormProps {}

const MintForm: React.FC<MintFormProps> = () => {
  const [collectionName, setCollectionName] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [price, setPrice] = useState<number | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (price === undefined) {
      alert("Please enter a price.");
      return;
    }

    try {
      const result = await mintNFT(collectionName, imageDescription, price);
      alert(`NFT Minted! ID: ${result}`);
    } catch (err) {
      console.error(err);
      alert("Error minting NFT");
    }
  };

  const mintNFT = async (name: string, description: string, price: number) => {
    console.log("Minting NFT:", name, description, price);
    return Math.floor(Math.random() * 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-start justify-start"
    >
      <section className="w-full max-w-[32rem] mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-42 font-body text-gray-300">
          Create NFT
        </h1>
        <p className="text-base md:text-lg mb-4 font-title text-gray-400">
          Mint your NFT to the blockchain
        </p>

        <div className="mb-6">
          <label
            htmlFor="collectionName"
            className="block text-sm font-medium text-gray-300 font-body mb-2"
          >
            Collection Name
          </label>
          <input
            id="collectionName"
            type="text"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            className="mt-1 block w-full p-2 bg-gray-500 border border-gray-600 rounded-[42px] font-body text-white"
            required
            placeholder="Enter collection name"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="imageDescription"
            className="block text-sm font-medium text-gray-300 font-body mb-2"
          >
            Image Description
          </label>
          <textarea
            id="imageDescription"
            rows={3}
            value={imageDescription}
            onChange={(e) => setImageDescription(e.target.value)}
            className="mt-1 block w-full p-2 bg-gray-500 border border-gray-600 rounded-[22px] font-body text-white"
            required
            placeholder="What's your NFT about?"
          ></textarea>
        </div>

        <div className="mb-8">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-300 font-body mb-2"
          >
            Price (in ICP)
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="mt-1 block w-full p-2 bg-gray-500 border border-gray-600 rounded-[42px] font-body text-white"
            required
            placeholder="Enter price"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-black py-2 rounded-lg font-bold"
        >
          Create NFT
        </button>
      </section>
    </form>
  );
};

export default MintForm;
