"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";



export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  const { productId } = params;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/product/${productId}`);

      } catch (error) {
        if (error.response && error.response.status === 404) {
          router.push("/404");
        } else {
          setError("Failed to load product");
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();

  }, [productId, router]);



  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500 bg-red-100 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
      <h1>Product-details</h1>
  );
}
