"use client";

import { useState, useEffect } from "react";
import Image from "next/image"; // ✅ Import next/image
import { supabase } from "@/lib/supabaseClient";

interface Book {
  id: string;
  cover?: string;
  title: string;
  description: string;
  price: string;
  link?: string;
}

export default function OfferSection() {
  const [featuredBook, setFeaturedBook] = useState<Book | null>(null);

  useEffect(() => {
    async function fetchFeaturedBook() {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("id", { ascending: true })
        .limit(1);

      if (error) {
        console.error("Error fetching featured book:", error);
        return;
      }

      if (data.length > 0) {
        setFeaturedBook({
          id: data[0].id,
          cover: data[0].cover || "/placeholder.jpg",
          title: data[0].title,
          description: data[0].description,
          price: data[0].price ? `$${data[0].price}` : "Coming Soon",
          link: data[0].link || undefined,
        });
      }
    }

    fetchFeaturedBook();
  }, []);

  return (
    <section className="shadow-md py-16 px-8 flex flex-col items-center">
      <h2 className="text-5xl font-bold text-center text-gray-900 mb-6">Book of the Week</h2>

      {featuredBook ? (
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row items-center p-6">
          {/* Book Cover */}
          <Image
            src={featuredBook.cover ?? "/book1.jpg"} // ✅ Use next/image
            alt={featuredBook.title}
            width={192} // ✅ Set width
            height={256} // ✅ Set height
            className="object-contain rounded-md"
          />

          {/* Book Info */}
          <div className="flex-1 md:ml-6 text-center md:text-left">
            <h3 className="text-xl font-semibold text-gray-900">{featuredBook.title}</h3>
            <p className="text-gray-600 mt-2">{featuredBook.description}</p>

            {/* Price & CTA */}
            <p className="text-blue-600 font-bold text-lg mt-4">{featuredBook.price}</p>
            {featuredBook.link ? (
              <a
                href={featuredBook.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
              >
                Buy Now
              </a>
            ) : (
              <button className="mt-4 px-6 py-3 bg-gray-400 text-white font-semibold rounded-md cursor-not-allowed">
                Coming Soon
              </button>
            )}

            {/* Optional Countdown Text */}
            <p className="text-red-500 text-sm mt-2">⏳ Limited-time feature!</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Loading book of the week...</p>
      )}
    </section>
  );
}

