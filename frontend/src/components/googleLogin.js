import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function GoogleAuthButton() {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post('/api/auth/google', {
          credential: tokenResponse.credential || tokenResponse.access_token,
        });

        const { token, retailer } = res.data;
        localStorage.setItem('authToken', token);

        // Redirect after login
        window.location.href = '/layout';
      } catch (err) {
        console.error('Google OAuth failed:', err);
        alert('Google sign-in failed');
      }
    },
    onError: () => {
      console.log('Login Failed');
      alert('Google sign-in failed');
    },
    flow: 'implicit', // required for browser-based token flow
  });

  return (
    <button
      onClick={() => login()}
      className=" w-full bg-white border border-gray-300 text-black px-4 py-2 rounded-lg shadow flex items-center space-x-3 hover:shadow-md transition"
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google"
        className="w-5 h-5"
      />
      <span>Sign in with Google</span>
      <span className='text-blue-500 text-xl'>- coming soon</span>
    </button>
  );
}

export default GoogleAuthButton;
