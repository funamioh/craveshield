"use client";

import { Product } from "@/lib/productDatabase";

interface DecisionButtonsProps {
  product: Product;
  onDecision: (choice: 'resist' | 'alternative' | 'original') => void;
}

export default function DecisionButtons({ product, onDecision }: DecisionButtonsProps) {
  return (
    <div className="mt-4 space-y-3">
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
        What would you like to do?
      </p>
      
      <div className="space-y-2">
        {/* Resist Completely */}
        <button
          onClick={() => onDecision('resist')}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-3 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 text-sm font-medium shadow-md flex items-center justify-between"
        >
          <span>🚫 I&apos;ll resist the craving completely</span>
          <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
            Save {product.calories} cal
          </span>
        </button>

        {/* Try Alternative */}
        <button
          onClick={() => onDecision('alternative')}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 text-sm font-medium shadow-md flex items-center justify-between"
        >
          <span>🥗 I&apos;ll try the healthy alternative</span>
          <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
            Save {product.calories - product.alternative.calories} cal
          </span>
        </button>

        {/* Go with Original */}
        <button
          onClick={() => onDecision('original')}
          className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white px-4 py-3 rounded-lg hover:from-gray-500 hover:to-gray-600 transition-all duration-200 text-sm font-medium shadow-md flex items-center justify-between"
        >
          <span>🍔 I&apos;ll go with the original craving</span>
          <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
            No savings
          </span>
        </button>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
        Your choice will be tracked in your savings dashboard
      </p>
    </div>
  );
}