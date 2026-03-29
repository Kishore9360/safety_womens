import { useState } from 'react';
import { UserPlus, Trash2, Phone, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEmergencyContacts, EmergencyContact } from '@/hooks/useEmergencyContacts';

const EmergencyContacts = () => {
  const { contacts, addContact, removeContact } = useEmergencyContacts();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', relation: '' });

  const handleAdd = () => {
    if (form.name && form.phone) {
      addContact(form);
      setForm({ name: '', phone: '', relation: '' });
      setShowForm(false);
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-coral" />
          <h3 className="font-display font-semibold text-foreground">Emergency Contacts</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setShowForm(!showForm)}>
          <UserPlus className="w-4 h-4" />
        </Button>
      </div>

      {showForm && (
        <div className="space-y-2 mb-4 p-3 bg-secondary rounded-lg">
          <Input
            placeholder="Name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="bg-background"
          />
          <Input
            placeholder="Phone number"
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            className="bg-background"
          />
          <Input
            placeholder="Relation (e.g., Mother, Friend)"
            value={form.relation}
            onChange={e => setForm(f => ({ ...f, relation: e.target.value }))}
            className="bg-background"
          />
          <Button variant="safe" size="sm" onClick={handleAdd} className="w-full">
            Add Contact
          </Button>
        </div>
      )}

      {contacts.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-4">
          No contacts added yet. Add trusted contacts for emergencies.
        </p>
      ) : (
        <div className="space-y-2">
          {contacts.map((contact: EmergencyContact) => (
            <div key={contact.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-sos/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-sos" />
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">{contact.name}</p>
                  <p className="text-xs text-muted-foreground">{contact.phone} · {contact.relation}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeContact(contact.id)}>
                <Trash2 className="w-4 h-4 text-muted-foreground hover:text-sos" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmergencyContacts;
