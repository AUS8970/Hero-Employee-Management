import useAuth from '../hook/useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@material-tailwind/react';
import useAxiosPublic from '../hook/useAxiosPublic';

const SocialLogin = () => {

  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleGoogleSignIn = async () => {
    try {
      const data = await signInWithGoogle()
      const user = data?.user;
      const userInfo = {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        role: 'Employee',
        isVerified: false,
      };

      const response = await axiosPublic.post("/users", userInfo);
      if (response.data.insertedId) {
        toast.success("Data Save Successful!");
        navigate("/");
      }

      toast.success('Login Successful');
      navigate("/");
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  };

  return (
    <div  className='justify-center items-center mt-4 space-x-2 cursor-pointer' >
      <Button 
        onClick={handleGoogleSignIn}
        variant="outlined"
        className="flex w-full items-center justify-center gap-2"
      >
        <img
          src="https://docs.material-tailwind.com/icons/google.svg"
          alt="google"
          className="h-4 w-4"
        />
        Sign in with Google
      </Button>
      <div className="my-4 flex items-center gap-2">
        <span className="h-[1px] w-1/2 bg-blue-gray-100" />
        <Typography variant="small" color="blue-gray">
          Or
        </Typography>
        <span className="h-[1px] w-1/2 bg-blue-gray-100" />
      </div>
    </div>
  );
};

export default SocialLogin;