export interface Property {
  id: string;
  title: string;
  city: string;
  price: number;
  surface: number;
}

let properties: Property[] = [
  {
    id: '1',
    title: 'Appartement moderne',
    city: 'Tunis',
    price: 150000,
    surface: 60,
  },
  {
    id: '2',
    title: 'Villa avec piscine',
    city: 'Sousse',
    price: 450000,
    surface: 200,
  },
];

export const getAll = () => properties;
export const getById = (id: string) => properties.find(p => p.id === id);
export const create = (data: Omit<Property, 'id'>) => {
  const newProp = { id: crypto.randomUUID(), ...data };
  properties.push(newProp);
  return newProp;
};
export const update = (id: string, data: Partial<Property>) => {
  const index = properties.findIndex(p => p.id === id);
  if (index === -1) return null;
  properties[index] = { ...properties[index], ...data };
  return properties[index];
};
export const remove = (id: string) => {
  const before = properties.length;
  properties = properties.filter(p => p.id !== id);
  return properties.length < before;
};