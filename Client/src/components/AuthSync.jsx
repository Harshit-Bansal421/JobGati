import { useEffect, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { login, logout } from '../store/slices/authSlice';
import { setUserData } from '../store/slices/userSlice';
import { setClerkUser, clearClerkUser } from '../store/slices/clerkSlice';
import { getUserByEmail } from '../services/userServices';

const AuthSync = () => {
    const { user, isLoaded, isSignedIn } = useUser();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const hasRedirected = useRef(false);

    useEffect(() => {
        const syncUser = async () => {
            if (isLoaded && isSignedIn && user) {
                const email = user.primaryEmailAddress?.emailAddress;
                console.log("📧 Email extracted:", email);

                // Save Clerk user data to Redux
                const serializableUser = {
                    id: user.id,
                    fullName: user.fullName,
                    primaryEmailAddress: {
                        emailAddress: user.primaryEmailAddress?.emailAddress
                    },
                    imageUrl: user.imageUrl,
                    firstName: user.firstName,
                    lastName: user.lastName
                };
                dispatch(setClerkUser(serializableUser));
                console.log("✅ Clerk user saved to Redux");

                if (email) {
                    try {
                        console.log("🔍 Checking database for user...");
                        const dbUser = await getUserByEmail(email);
                        console.log("📊 Database query result:", dbUser);

                        // If user exists in DB, load their data
                        if (dbUser && dbUser.user) {
                            console.log("✅ User found in database!");

                            dispatch(login({
                                data: dbUser.user,
                                type: dbUser.user.type
                            }));

                            if (dbUser.profile) {
                                dispatch(setUserData(dbUser.profile));
                            }
                        }


                        // Only redirect to dashboard once after login
                        const currentPath = location.pathname;

                        // Redirect only if not on dashboard and haven't redirected yet
                        if (currentPath !== '/user-dashboard' && !hasRedirected.current) {
                            console.log("🚀 Navigating to /user-dashboard after Clerk login");
                            hasRedirected.current = true;
                            navigate('/user-dashboard', { replace: true });
                        } else if (currentPath === '/user-dashboard') {
                            hasRedirected.current = true; // Mark as redirected if already on dashboard
                            console.log("✅ Already on dashboard");
                        }

                    } catch (error) {
                        console.error("❌ Error syncing user:", error);

                        // On error, redirect once if not on dashboard
                        if (location.pathname !== '/user-dashboard' && !hasRedirected.current) {
                            console.log("🚀 Error occurred - Navigating to /user-dashboard");
                            hasRedirected.current = true;
                            navigate('/user-dashboard', { replace: true });
                        }
                    }
                } else {
                    console.warn("⚠️ No email found in Clerk user object");
                }
            } else if (isLoaded && !isSignedIn) {
                console.log("🚪 User logged out");
                hasRedirected.current = false; // Reset redirect flag on logout
                dispatch(logout());
                dispatch(clearClerkUser());
            } else {
                console.log("⏳ Waiting for Clerk to load...");
            }
        };

        syncUser();
    }, [user, isLoaded, isSignedIn, dispatch, navigate, location]);

    return null;
};

export default AuthSync;
