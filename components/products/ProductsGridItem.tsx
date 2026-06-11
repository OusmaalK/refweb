// components/products/ProductsGridItem.tsx
'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ProductsGridItemProps } from './types';

export const ProductsGridItem = memo(({ t, product }: ProductsGridItemProps) => {
  return (
    <div className="bg-[#1e293b] rounded-lg overflow-hidden border border-gray-800 hover:border-orange-500 transition">
      <div className="relative aspect-4/3 bg-gray-800">
        <Image 
          src={product.image} 
          alt={product.title} 
          fill 
          className="object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
          <p className="text-white text-xs font-bold text-center">
            {product.title}
          </p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">
          {product.title} <span className="text-orange-500 font-normal">{product.subtitle}</span>
        </h3>
        <p className="text-sm text-gray-300 mb-3">{product.specs.composition}</p>
        
        <div className="space-y-1 text-xs text-gray-400">
          {Object.entries(product.specs)
            .filter(([key]) => key !== 'composition')
            .map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span>{t.products_page[key] || key}</span>
                <span className="text-gray-300">{String(value)}</span>
              </div>
            ))}
        </div>

        <Link 
          href="#"
          className="mt-4 block w-full border border-orange-500/50 hover:border-orange-500 text-orange-500 hover:text-white hover:bg-orange-500 px-4 py-2 rounded text-xs font-bold text-center transition"
        >
          {t.products_page.view_specs}
        </Link>
      </div>
    </div>
  );
});

ProductsGridItem.displayName = 'ProductsGridItem';