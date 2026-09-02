import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

export const ArtGalleryFields = ({ artworks, setArtworks }) => {
  const handleAddArtwork = () => {
    setArtworks([
      ...artworks,
      {
        id: `art-${Date.now()}`,
        title: 'New Art Piece',
        medium: 'Oil on Canvas',
        size: '24x36"',
        price: '₦350,000',
        image: '',
        available: true
      }
    ]);
  };

  const handleUpdateArtwork = (index, field, value) => {
    const updated = [...artworks];
    updated[index][field] = value;
    setArtworks(updated);
  };

  return (
    <div className="p-5 rounded-2xl bg-[#00BCFF]/5 border border-[#00BCFF]/20 space-y-4">
      <div className="flex items-center justify-between border-b border-[#00BCFF]/20 pb-2">
        <h4 className="text-xs font-extrabold uppercase text-[#00BCFF] flex items-center gap-1.5">
          <ImageIcon className="w-4 h-4" />
          <span>Art Gallery Portfolio ({artworks.length} Pieces)</span>
        </h4>
        <button
          type="button"
          onClick={handleAddArtwork}
          className="px-3 py-1 rounded-lg bg-[#00BCFF] text-slate-950 font-bold text-[10px] hover:bg-cyan-400 cursor-pointer transition-all active:scale-95"
        >
          + Add Artwork
        </button>
      </div>
      <div className="space-y-3">
        {artworks.map((art, idx) => (
          <div key={art.id || idx} className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={art.title}
                onChange={(e) => handleUpdateArtwork(idx, 'title', e.target.value)}
                placeholder="Artwork Title"
                className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white"
              />
              <input
                type="text"
                value={art.price}
                onChange={(e) => handleUpdateArtwork(idx, 'price', e.target.value)}
                placeholder="Price e.g. ₦450,000 ($350)"
                className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white"
              />
            </div>
            <input
              type="text"
              value={art.medium}
              onChange={(e) => handleUpdateArtwork(idx, 'medium', e.target.value)}
              placeholder="Medium e.g. Oil & Acrylic on Canvas"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtGalleryFields;
