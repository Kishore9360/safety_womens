import { useState, useEffect } from 'react';

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

const STORAGE_KEY = 'emergency_contacts';

export const useEmergencyContacts = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (contact: Omit<EmergencyContact, 'id'>) => {
    setContacts(prev => [...prev, { ...contact, id: crypto.randomUUID() }]);
  };

  const removeContact = (id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  return { contacts, addContact, removeContact };
};
