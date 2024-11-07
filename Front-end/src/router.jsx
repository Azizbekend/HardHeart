import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { RequireAuth } from './hoc/RequireAuth';
import { Layout, LikePage, Main, Profile, ProfileWindow, Search, Complaints, Chat, Errors, ChatPanel } from './views/Imports/pages'

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />} >
        <Route index element={<Main />} />

        <Route path="profile" element={
            <RequireAuth role={['user']}>
                <Profile />
            </RequireAuth>
        } />

        {/* Роутер для пользователя */}
        <Route path="profileWindow/:panel/" element={
            <RequireAuth role={["user", "admin"]}>
                <ProfileWindow />
            </RequireAuth>
        } >

            <Route index element={<Search />} />
            <Route path="like" element={<LikePage />} />
            <Route path="chat/:idChat" element={<Chat />} />
            <Route path="chatpanel/" element={<ChatPanel />} />

            <Route path="complaints" element={
                <RequireAuth role={["admin"]}>
                    <Complaints />
                </RequireAuth>
            } />
        </Route>
        <Route path='*' element={<Navigate to={"/error/404"} />} />
        <Route path='error/:codeNum' element={<Errors />} />
    </Route>
))

export default router;