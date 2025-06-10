import React, { useState, useMemo } from 'react';
import rawSystems from '../../data/sample_data.json';
import { normalizeSystemData, type NormalizedSystem } from '../../utils/normalizeData';

const systems = normalizeSystemData(rawSystems);

const extractUniqueValues = (items: NormalizedSystem[], key: keyof NormalizedSystem) => {
  const values = new Set<string>();
  items.forEach((item) => {
    (item[key] as string[]).forEach((val) => values.add(val));
  });
  return Array.from(values);
};

const GridDataMap: React.FC = () => {
  const [selectedUse, setSelectedUse] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredSystems = useMemo(() => {
    return systems.filter((sys) => {
      const matchesUse = selectedUse ? sys.dataUses.includes(selectedUse) : true;
      const matchesCat = selectedCategory ? sys.dataCategories.includes(selectedCategory) : true;
      return matchesUse && matchesCat;
    });
  }, [selectedUse, selectedCategory]);

  const grouped = useMemo(() => {
    return filteredSystems.reduce((acc, sys) => {
      if (!acc[sys.type]) acc[sys.type] = [];
      acc[sys.type].push(sys);
      return acc;
    }, {} as Record<string, NormalizedSystem[]>);
  }, [filteredSystems]);

  const allUses = extractUniqueValues(systems, 'dataUses');
  const allCategories = extractUniqueValues(systems, 'dataCategories');

  return (
    <div className="w-full p-4">
      <div className="flex gap-4 mb-6">
        <select
          className="border p-2 rounded"
          value={selectedUse}
          onChange={(e) => setSelectedUse(e.target.value)}
        >
          <option value="">All Data Uses</option>
          {allUses.map((use, i) => (
            <option key={i} value={use}>{use}</option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {allCategories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(grouped).map(([type, systems]) => (
          <div key={type} className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-bold mb-2">{type}</h2>
            <div className="space-y-4">
              {systems.map((sys, i) => (
                <div key={i} className="border rounded p-3">
                  <h3 className="font-semibold text-lg">{sys.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{sys.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {sys.dataCategories.map((cat) => (
                      <span key={cat} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{cat}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridDataMap;