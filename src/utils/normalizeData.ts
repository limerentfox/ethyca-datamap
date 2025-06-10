export interface RawSystem {
  fides_key: string;
  name: string;
  description: string;
  system_type: string;
  privacy_declarations: {
    name: string;
    data_categories: string[];
    data_use: string;
  }[];
  system_dependencies: string[];
}

export interface NormalizedSystem {
  id: string;
  name: string;
  type: string;
  description: string;
  dataUses: string[];
  dataCategories: string[];
}

export function normalizeSystemData(systems: RawSystem[]) {
  return systems.map((sys) => {
    const uses = new Set<string>();
    const categories = new Set<string>();

    sys.privacy_declarations.forEach((decl) => {
      if (decl.data_use) uses.add(decl.data_use);
      decl.data_categories.forEach((cat) => {
        const leaf = cat.split('.').pop();
        if (leaf) categories.add(leaf);
      });
    });

    return {
      id: sys.fides_key,
      name: sys.name,
      type: sys.system_type,
      description: sys.description,
      dataUses: Array.from(uses),
      dataCategories: Array.from(categories),
    };
  });
}