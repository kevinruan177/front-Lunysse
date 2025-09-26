//componente responsavel por emimir notificaçao
import { AuthProvider } from "./context/AuthContext";
//importaçao do arquivo authProviderresponsavel pela autenticaçao
 
//importaçao do appRoutes
 import { AppRoutes } from "./routes/AppRoutes";
 
 //construçao do codigo principal
 function App(){
    return(
      <AuthProvider>
          <AppRoutes/>
      </AuthProvider>
    )
 }
 export default App;