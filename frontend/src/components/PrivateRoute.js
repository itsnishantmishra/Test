import { useAuth } from "./AuthContext";
import Login from "./Login";
const PrivateRoute = ({ children}) => {
  const { isAuthenticated } = useAuth();
  
  


  if (!isAuthenticated) {
     return (
         
        <div className="flex flex-col min-h-screen">
          
          {/* Page Content */}
          
                <Login />
        </div>
      ); // Simulate clicking the login button
   // Prevent rendering the protected content
  }

  return children;
};

export default PrivateRoute;