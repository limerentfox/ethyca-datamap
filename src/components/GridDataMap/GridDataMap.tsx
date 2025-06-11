import React, { useEffect, useState, useMemo } from 'react';
import { ArrowRight, ChevronDown, ChevronRight } from 'lucide-react';
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
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [highlightedDependencies, setHighlightedDependencies] = useState<Set<string>>(new Set());
  const [activeTriggers, setActiveTriggers] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleDependencies = (fidesKey: string, dependencies: string[]) => {
    if (activeTriggers.has(fidesKey)) {
      setActiveTriggers(new Set());
      setHighlightedDependencies(new Set());
    } else {
      const newActive = new Set([fidesKey]);
      const newHighlights = new Set(dependencies);
      setActiveTriggers(newActive);
      setHighlightedDependencies(newHighlights);
    }
  };

  useEffect(() => {
    setHighlightedDependencies(new Set());
    setActiveTriggers(new Set());
  }, [selectedUse, selectedCategory]);

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
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="border p-2 rounded shadow-sm"
          value={selectedUse}
          onChange={(e) => setSelectedUse(e.target.value)}
        >
          <option value="">All Data Uses</option>
          {allUses.map((use) => (
            <option key={use} value={use}>{use}</option>
          ))}
        </select>

        <select
          className="border p-2 rounded shadow-sm"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {allCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Systems by Type */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 transition-all duration-300">
        {Object.entries(grouped).map(([type, systems]) => {
          const visibleSystems = systems.filter((sys) =>
            highlightedDependencies.size > 0
              ? highlightedDependencies.has(sys.id) || activeTriggers.has(sys.id)
              : true
          );

          if (highlightedDependencies.size > 0 && visibleSystems.length === 0) return null;

          return (
            <div key={type} className="bg-white rounded shadow p-4 transition-all duration-300 ease-in-out">
              <h2 className="text-xl font-bold mb-4 border-b pb-2">{type}</h2>
              <div className="space-y-4">
                {visibleSystems.map((sys) => {
                  const isExpanded = expandedIds.has(sys.id);
                  const isActive = activeTriggers.has(sys.id);
                  const isHighlighted = highlightedDependencies.has(sys.id);
                  const shouldHighlight = isHighlighted;
                  const showButton = selectedUse === '' && selectedCategory === '';

                  return (
                    <div
                      key={sys.id}
                      className={`rounded border p-4 shadow-sm transition-all duration-300 ease-in-out transform ${
                        shouldHighlight ? 'bg-yellow-100 border-yellow-500 scale-[1.02]' : 'bg-white border-gray-300'
                      }`}
                    >
                      <div
                        className="flex items-center justify-between cursor-pointer mb-1"
                        onClick={() => toggleExpanded(sys.id)}
                      >
                        <h3 className="font-semibold text-lg">{sys.name}</h3>
                        {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </div>

                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isExpanded ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
                        } text-sm text-gray-700 mb-2`}
                      >
                        {sys.description}
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs mb-2">
                        {sys.dataCategories.map((cat) => (
                          <span key={cat} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{cat}</span>
                        ))}
                      </div>

                      {showButton && sys.systemDependencies.length > 0 && !isHighlighted && (
                        <button
                          className={`text-xs font-medium px-3 py-1 rounded transition-all duration-200 cursor-pointer inline-flex items-center gap-1
                            ${isActive
                              ? 'bg-red-100 text-red-800 hover:bg-red-200'
                              : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
                          onClick={() => toggleDependencies(sys.id, sys.systemDependencies)}
                        >
                          {isActive ? (
                            'Hide Dependencies'
                          ) : (
                            <>
                              <span>See Dependencies</span>
                              <ArrowRight size={14} />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GridDataMap;
