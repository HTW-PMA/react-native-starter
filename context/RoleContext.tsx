import React, { createContext, useContext, useState } from 'react';

type RoleContextType = {
  role: string;
  setRole: (value: string) => void;
};

// Erstellt einen RoleContext mit undefined als Standartwert.
const RoleContext = createContext<RoleContextType | undefined>(undefined);

// Ermöglicht das nutzen des RoleContext für alle Komponenten die vom Provider umschlossen sind.
export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<string>('');

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export default RoleContext;