"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Book {
  id: string;
  cover?: string;
  title: string;
  description: string;
  price: string;
  link?: string;
}

const mockBooks: Book[] = Array.from({ length: 16 }).map((_, i) => ({
  id: `mock-${i + 1}`,
  cover: `/book${(i % 9) + 1}.jpg`,
  title: `Book Title ${i + 1}`,
  description: "This is a short description of the book.",
  price: "Coming Soon",
  link: undefined,
}));

async function fetchBooks(): Promise<Book[]> {
  try {
    const { data, error } = await supabase.from("books").select("*");
    if (error) throw error;

    return data.map((book) => ({
      id: book.id,
      cover: book.cover || "book1.jpg",
      title: book.title,
      description: book.description,
      price: book.price ? `$${book.price}` : "Coming Soon",
      link: book.link || undefined,
    }));
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

export default function BooksSection() {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 8;

  useEffect(() => {
    async function loadBooks() {
      const fetchedBooks = await fetchBooks();
      if (fetchedBooks.length > 0) {
        setBooks([...fetchedBooks, ...mockBooks.slice(fetchedBooks.length)]);
      }
    }
    loadBooks();
  }, []);

  const paginatedBooks = books.slice(currentPage * booksPerPage, (currentPage + 1) * booksPerPage);
  const totalPages = Math.ceil(books.length / booksPerPage);

  return (
    <div id="books" className="relative bg-white py-16 px-8 w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Available Books</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedBooks.map((book) => (
          <div key={book.id} className="bg-white rounded-lg shadow-md p-4 relative">
            <Image src={book.cover || "/book1.jpg"} alt={book.title} width={300} height={400} className="w-full h-64 object-contain rounded-md" />
            <h3 className="text-lg font-semibold mt-4">{book.title}</h3>
            <p className="text-gray-500 text-sm mt-2">{book.description}</p>
            <p className="text-blue-600 font-bold mt-2">{book.price}</p>
            {book.link ? (
              <a href={book.link} target="_blank" rel="noopener noreferrer" className="block mt-4 text-center text-blue-600 border border-blue-600 py-2 rounded hover:bg-blue-600 hover:text-white">
                Buy Now
              </a>
            ) : (
              <button className="block w-full mt-4 text-center text-gray-500 border border-gray-400 py-2 rounded cursor-not-allowed">
                Coming Soon
              </button>
            )}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            className="p-2 bg-gray-300 rounded-full hover:bg-gray-400 disabled:opacity-50"
            disabled={currentPage === 0}
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <div className="flex space-x-2">
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => setCurrentPage(pageIndex)}
                className={`w-3 h-3 rounded-full transition-all ${pageIndex === currentPage ? "bg-blue-600 scale-125" : "bg-gray-300"}`}
                aria-label={`Go to page ${pageIndex + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
            className="p-2 bg-gray-300 rounded-full hover:bg-gray-400 disabled:opacity-50"
            disabled={currentPage === totalPages - 1}
            aria-label="Next Page"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      )}
    </div>
  );
}

