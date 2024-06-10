import { createContext, useContext } from 'react'

const ServiceContext = createContext()

export const ServiceProvider = ({ children, value }) => (
  <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
)

export const useService = () => {
  const context = useContext(ServiceContext)
  if (!context) {
    throw new Error('useService must be used within a ServiceProvider')
  }
  return context
}
