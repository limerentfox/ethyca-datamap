export interface RootObject {
  description: string;
  fidesKey: string;
  name: string;
  privacyDeclarations: PrivacyDeclaration[];
  systemDependencies: string[];
  systemType: string;
}

export interface PrivacyDeclaration {
    dataCategories: string[];
    dataSubjects: string[];
    dataUse: string;
    name: string;
}