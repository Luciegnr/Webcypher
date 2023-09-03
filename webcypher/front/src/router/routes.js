import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./auth/private_route";

import Layout from "@layouts/layout";
import LayoutAuth from "@layouts/layout_auth";

const Signin = lazy(() => import("@pages/auth/Signin"));
const Signup = lazy(() => import("@pages/auth/Signup"));
const Token = lazy(() => import("@pages/auth/Token"));
const User = lazy(() => import("@pages/user/Account"));
const ListUser = lazy(() => import("@pages/user/List.js"));
const CreateRoom = lazy(() => import("@pages/room/Create"));
const ListRoom = lazy(() => import("@pages/room/List"));
const DetailsRoom = lazy(() => import("@pages/room/Details"));
const Mediatheque = lazy(() => import("@pages/mediatheque/List.js"));

const Not = lazy(() => import("@router/not_found"));
const Private = lazy(() => import("@pages/chat/Chat"))

export const RouterConfig = () => {
    return (
        <div>
            <Routes>
                {/* NOTE public screen */}
                <Route element={<Layout />}>
                    <Route path="/" element={<Navigate to="/connexion" />} />
                    <Route path="/connexion" element={<Signin />} />
                    <Route path="/inscription" element={<Signup />} />
                    <Route path="/token" element={<Token />} />
                    <Route path="/connexion/:token" element={<Signin />} />
                </Route>

                {/* NOTE private screen */}
                <Route element={<PrivateRoute />}>
                    <Route element={<LayoutAuth />}>
                        <Route path="/private" element={<Private />} />
                        <Route path="/parametre-compte" element={<User />} />
                        <Route path="/liste-user" element={<ListUser />} />
                        <Route path="/nouvelle-room" element={<CreateRoom />} />
                        <Route path="/liste-room" element={<ListRoom />} />
                        <Route path="/details-room/:id" element={<DetailsRoom />} />
                        <Route path="/mediatheque" element={<Mediatheque />} />
                    </Route>
                </Route>

                {/* NOTE not found */}
                <Route path="*" element={<Not />} />
            </Routes>
        </div>
    );
};

