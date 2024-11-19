const Login: React.FC = () => {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold text-center text-yellow-600">Login</h2>
          <form>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mt-4 border rounded focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mt-4 border rounded focus:outline-none"
            />
            <button
              type="submit"
              className="w-full p-3 mt-6 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default Login;
  