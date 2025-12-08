import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, logout } from '../store/slices/authSlice';
import { setUserData } from '../store/slices/userSlice';
import { getUserByEmail } from '../services/userServices';

const AuthSync = () => {
    const { user, isLoaded, isSignedIn } = useUser();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const syncUser = async () => {
            if (isLoaded && isSignedIn && user) {
                const email = user.primaryEmailAddress?.emailAddress;

                if (email) {
                    try {
                        // Check if user exists in our DB
                        const dbUser = await getUserByEmail(email);

                        if (dbUser && dbUser.user) {
                            // User exists, sync Redux state
                            dispatch(login({
                                data: dbUser.user,
                                type: dbUser.user.type
                            }));

                            if (dbUser.profile) {
                                dispatch(setUserData(dbUser.profile));
                            }
                        } else {
                            // User is authenticated in Clerk but not in our DB
                            // Redirect to signup/role selection if not already there
                            if (window.location.pathname !== '/signup' &&
                                window.location.pathname !== '/register-seeker' &&
                                window.location.pathname !== '/register-business') {
                                // You might want to auto-fill the email in the registration form
                                // For now, let's just let them know or redirect
                                // navigate('/signup');
                                console.log("User not found in DB, please complete registration");
                            }
                        }
                    } catch (error) {
                        console.error("Error syncing user:", error);
                    }
                }
            } else if (isLoaded && !isSignedIn) {
                // Handle logout
                dispatch(logout());
            }
        };

        syncUser();
    }, [user, isLoaded, isSignedIn, dispatch, navigate]);

    return null; // This component handles side effects only
};

export default AuthSync;
