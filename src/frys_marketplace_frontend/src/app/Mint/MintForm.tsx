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
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Create NFT</h1>
      <p className="text-base md:text-lg mb-8">
        Mint your NFT to the blockchain
      </p>

      <div className="mb-4">
        <label htmlFor="collectionName" className="block text-sm font-medium">
          Collection Name
        </label>
        <input
          id="collectionName"
          type="text"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          className="mt-1 block w-full p-2 bg-white border border-gray-600 rounded-md text-black"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="imageDescription" className="block text-sm font-medium">
          Image Description
        </label>
        <textarea
          id="imageDescription"
          rows={3}
          value={imageDescription}
          onChange={(e) => setImageDescription(e.target.value)}
          className="mt-1 block w-full p-2 bg-white border border-gray-600 rounded-md text-black"
          required
        ></textarea>
      </div>

      <div className="mb-6">
        <label htmlFor="price" className="block text-sm font-medium">
          Price (in ICP)
        </label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          className="mt-1 block w-full p-2 bg-white border border-gray-600 rounded-md text-black"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-black py-2 rounded-lg font-bold"
      >
        Create NFT
      </button>
    </form>
  );
};

export default MintForm;
