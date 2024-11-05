
export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    thumbnail: string;
    quantity?:number;

  }
  
  export interface ProductShowcaseProps {
    products: Product[];          
    loading: boolean;               
    error: string | null;           
    currentPage: number;          
    setCurrentPage: (update: (prev: number) => number) => void;
    totalPages: number;             // Total number of pagination pages
  }
  

export interface Category {
    name: string;
   
  }
  

  export interface Order {
    id: number;                      // Unique identifier for the order
    items: Product[];                // Array of products included in the order
    totalPrice: number;              // Total price of the order
    date: string;                    // Date of the order (ISO string format)
    userId?: string;                 // Optional user ID to track who made the order
}
