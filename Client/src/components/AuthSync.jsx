import { useEffect, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useDispatch, useSelector } from 'react-redux';
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
    const initialLoadComplete = useRef(false);

    // Get profile completion status from Redux
    const { profileData } = useSelector((state) => state.clerk);

    useEffect(() => {
        const syncUser = async () => {
            if (isLoaded && isSignedIn && user) {
                const email = user.primaryEmailAddress?.emailAddress;
                console.log("📧 Email extracted:", email);

                // Save Clerk user data to Redux
                dispatch(setClerkUser(user));
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

                        // Only redirect to dashboard on FIRST login (not on every page load)
                        // Check if this is the initial load after login
                        if (!initialLoadComplete.current && !hasRedirected.current) {
                            const currentPath = location.pathname;

                            // Only redirect if user is on login/signup pages or root
                            const shouldRedirect = currentPath === '/' ||
                                currentPath === '/login' ||
                                currentPath === '/signup' ||
                                currentPath.includes('sign-in') ||
                                currentPath.includes('sign-up');

                            if (shouldRedirect) {
                                console.log("🚀 First login detected - Navigating to /user-dashboard");
                                hasRedirected.current = true;
                                navigate('/user-dashboard', { replace: true });
                            }

                            initialLoadComplete.current = true;
                        }

                    } catch (error) {
                        console.error("❌ Error syncing user:", error);

                        // On error during first load, redirect to dashboard
                        if (!initialLoadComplete.current && !hasRedirected.current) {
                            const currentPath = location.pathname;
                            const shouldRedirect = currentPath === '/' ||
                                currentPath === '/login' ||
                                currentPath === '/signup';

                            if (shouldRedirect) {
                                console.log("🚀 Error occurred - Navigating to /user-dashboard");
                                hasRedirected.current = true;
                                navigate('/user-dashboard', { replace: true });
                            }

                            initialLoadComplete.current = true;
                        }
                    }
                } else {
                    console.warn("⚠️ No email found in Clerk user object");
                }
            } else if (isLoaded && !isSignedIn) {
                console.log("🚪 User logged out");
                hasRedirected.current = false;
                initialLoadComplete.current = false;
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
