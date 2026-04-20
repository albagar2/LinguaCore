import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

interface TranslationContextType {
  dictionary: Record<string, string>;
  loading: boolean;
}

const TranslationContext = createContext<TranslationContextType>({ dictionary: {}, loading: true });

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dictionary, setDictionary] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/vocabulary')
      .then(res => {
        const dict: Record<string, string> = {};
        res.data.data.forEach((item: any) => {
          dict[item.word.toLowerCase()] = item.translation || item.meaning;
        });
        setDictionary(dict);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <TranslationContext.Provider value={{ dictionary, loading }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslationDict = () => useContext(TranslationContext);
