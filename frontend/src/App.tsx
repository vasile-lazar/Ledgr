import {AppRoutes} from './routes/AppRoutes';
import {LoadingProvider} from "./context/LoadingContext.tsx";
import {AxiosProvider} from "./axios";
import {AuthProvider} from "./context/AuthContext.tsx";
import {Toaster} from "react-hot-toast";
import {ThemeProvider} from "./context/ThemeContext.tsx";

export default function App() {
    return (
        <LoadingProvider>
            <AxiosProvider>
                <AuthProvider>
                    <ThemeProvider>
                        <Toaster/>
                        <AppRoutes/>
                    </ThemeProvider>
                </AuthProvider>
            </AxiosProvider>
        </LoadingProvider>
    );
}