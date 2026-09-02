import React from 'react';
import { ShoppingBag } from 'lucide-react';

export const BusinessVendorFields = ({ products, setProducts }) => {
  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        id: `prod-${Date.now()}`,
        name: 'New Product',
        price: '₦20,000',
        desc: 'Product specs & details',
        image: ''
      }
    ]);
  };

  const handleUpdateProduct = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  return (
    <div className="p-5 rounded-2xl bg-[#00BCFF]/5 border border-[#00BCFF]/20 space-y-4">
      <div className="flex items-center justify-between border-b border-[#00BCFF]/20 pb-2">
        <h4 className="text-xs font-extrabold uppercase text-[#00BCFF] flex items-center gap-1.5">
          <ShoppingBag className="w-4 h-4" />
          <span>Merchant Store Products ({products.length} Items)</span>
        </h4>
        <button
          type="button"
          onClick={handleAddProduct}
          className="px-3 py-1 rounded-lg bg-[#00BCFF] text-slate-950 font-bold text-[10px] hover:bg-cyan-400 cursor-pointer transition-all active:scale-95"
        >
          + Add Product
        </button>
      </div>
      <div className="space-y-3">
        {products.map((prod, idx) => (
          <div key={prod.id || idx} className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={prod.name}
                onChange={(e) => handleUpdateProduct(idx, 'name', e.target.value)}
                placeholder="Product Name"
                className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white"
              />
              <input
                type="text"
                value={prod.price}
                onChange={(e) => handleUpdateProduct(idx, 'price', e.target.value)}
                placeholder="Price e.g. ₦25,000"
                className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white"
              />
            </div>
            <input
              type="text"
              value={prod.desc}
              onChange={(e) => handleUpdateProduct(idx, 'desc', e.target.value)}
              placeholder="Product Specs / Description"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessVendorFields;
