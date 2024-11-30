import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { RequireAuth } from './hoc/RequireAuth';
import { Layout, LikePage, Main, Profile, ProfileWindow, Search, Complaints, Chat, Errors, ChatPanel } from './views/Imports/pages'
import Block from './views/pages/Block/Block';
import SearchOne from './views/pages/ProfileWindow/Windows/Search/SearchOne';
import Documens from './views/pages/Documens/Documens';

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />} >
        <Route index element={<Main />} />
        <Route path='documen/:name' element={<Documens />} />
        <Route path="profile" element={
            <RequireAuth role={['user']}>
                <Profile />
            </RequireAuth>
        } />
        <Route path="profileWindow/:panel/" element={
            <RequireAuth role={["user", "admin"]}>
                <ProfileWindow />
            </RequireAuth>
        } >
            <Route index element={<Search />} />
            <Route path="SearchOne/:idUser" element={<SearchOne />} />
            <Route path="like" element={<LikePage />} />
            <Route path="chat/:idChat/:idUserFriend" element={<Chat />} />
            <Route path="chatpanel/" element={<ChatPanel />} />
            <Route path="complaints" element={
                <RequireAuth role={["admin"]}>
                    <Complaints />
                </RequireAuth>
            } />
        </Route>
        <Route path='block' element={<Block />} />
        <Route path='*' element={<Navigate to={"/error/404"} />} />
        <Route path='error/:codeNum' element={<Errors />} />
    </Route>
))
export default router;