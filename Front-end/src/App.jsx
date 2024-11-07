import { RouterProvider } from "react-router-dom";
import router from './router.jsx'
import "./assets/styles/App.css";
import { AuthProvider } from './hoc/AuthProvider';

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App
