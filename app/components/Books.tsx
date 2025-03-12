"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient"; // ✅ Import Supabase client
import { ChevronLeft, ChevronRight } from "lucide-react";

// Define the type for a book
interface Book {
  id: string;
  cover?: string;
  title: string;
  description: string;
  price: string;
  link?: string;
}

// ✅ Mock data (used if Supabase has no books)
const mockBooks: Book[] = Array.from({ length: 16 }).map((_, index) => ({
  id: `mock-${index + 1}`,
  cover: `/book${(index % 9) + 1}.jpg`, // Use numbered placeholders
  title: `Book Title ${index + 1}`,
  description: "This is a short description of the book.",
  price: "Coming Soon", // Default price for placeholders
  link: undefined, // No link for placeholders
}));

// ✅ Function to fetch books from Supabase
async function fetchBooks(): Promise<Book[]> {
  const { data, error } = await supabase.from("books").select("*");

  if (error) {
    console.error("Error fetching books:", error);
    return [];
  }

  return data.map((book) => ({
    id: book.id,
    cover: book.cover || "/placeholder.jpg",
    title: book.title,
    description: book.description,
    price: book.price ? `$${book.price}` : "Coming Soon",
    link: book.link || undefined, // Use link if available
  }));
}

export default function BooksSection() {
  const [books, setBooks] = useState<Book[]>(mockBooks); // Start with placeholders
  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 8;

  useEffect(() => {
    async function loadBooks() {
      try {
        const fetchedBooks = await fetchBooks();
        if (fetchedBooks.length > 0) {
          setBooks([...fetchedBooks, ...mockBooks.slice(fetchedBooks.length)]);
        }
        
      } catch (error) {
        console.error("Error fetching books:", error);
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
        {paginatedBooks.map((book, index) => (
          <div key={book.id} className="bg-white rounded-lg shadow-md p-4 relative">
            <img src={book.cover} alt={book.title} className="w-full h-64 object-contain rounded-md" />
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

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} className="p-2 bg-gray-300 rounded-full hover:bg-gray-400" disabled={currentPage === 0}>
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        <div className="flex space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button key={index} onClick={() => setCurrentPage(index)} className={`w-3 h-3 rounded-full transition-all ${index === currentPage ? "bg-blue-600 scale-125" : "bg-gray-300"}`} />
          ))}
        </div>

        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))} className="p-2 bg-gray-300 rounded-full hover:bg-gray-400" disabled={currentPage === totalPages - 1}>
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
}

