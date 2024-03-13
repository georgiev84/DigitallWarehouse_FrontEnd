import React from 'react'
import { createContext, useState, useEffect } from 'react'

type NavigationContextType = {
  active: string;
  selectActiveLink: (value: string) => void;
}

const NavigationContext = createContext<NavigationContextType>({
  active: '',
  selectActiveLink: () => { }
});

type Props = {
  children: any,

}

export const NavigationProvider = ({ children }: Props) => {
  const [active, setActive] = useState('');

  useEffect(() => {
    console.log('active link - ' + active);
  }, [active]); 

  const selectActiveLink = (link:string) => {
    console.log("select clicked")
    setActive(link)
    
  }

  return (
    <NavigationContext.Provider value={{
      active,
      selectActiveLink
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationContext