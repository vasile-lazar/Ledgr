import { Route, Routes } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Upload from '../pages/Upload';
import Statements from '../pages/Statements';
import Transactions from '../pages/Transactions';
import Budgets from '../pages/Budgets';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import { usePageNavigation } from './usePageNavigation';

export default function AppRoutes() {
 const onNavigate = usePageNavigation();

 return (
   <Routes>
     <Route path="/" element={<Landing />} />
     <Route path="/login" element={<Login onNavigate={onNavigate} />} />
     <Route path="/register" element={<Register onNavigate={onNavigate} />} />

     <Route element={<AppLayout />}>
       <Route path="/dashboard" element={<Dashboard onNavigate={onNavigate} />} />
       <Route path="/upload" element={<Upload onNavigate={onNavigate} />} />
       <Route path="/statements" element={<Statements onNavigate={onNavigate} />} />
       <Route path="/transactions" element={<Transactions />} />
       <Route path="/budgets" element={<Budgets />} />
       <Route path="/profile" element={<Profile />} />
     </Route>

     <Route path="*" element={<NotFound onNavigate={onNavigate} />} />
   </Routes>
 );
}
