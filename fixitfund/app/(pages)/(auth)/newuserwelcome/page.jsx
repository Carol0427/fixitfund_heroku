"use client";
import { CircleUser, LogIn, UserPen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import Select from 'react-select';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../../_lib/firebase';

const NewUserWelcome = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [accountType, setType] = useState('');
    const router = useRouter();
    const [token, setToken] = useState('');
    useEffect(() => {
      if (typeof window !== "undefined") {
          const savedToken = localStorage.getItem("Token");
          setToken(savedToken);
      }
  }, []);
    if(!auth.currentUser){
        return router.push("/");
    }
    const userId = auth.currentUser.uid;
    const userEmail = auth.currentUser.email;

    

    const classOptions = [
        { value: 'civ', label: 'Civilian'},
        { value: 'wor', label: 'Contractor'},
        { value: 'und', label: 'Undecided'},
    ]

    const handleSelectChange = (selectedOption) => {
        setType(selectedOption.value);
        console.log(accountType)
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(firstName.trim() === "" || lastName.trim() === "" || accountType.trim() === ""){
            console.log(firstName, lastName, accountType)
            setFirstName("");    
            setLastName("");
            setType("");

            return toast.error("Please do not leave inputs blank !");
        }

        try {
            const data = {
                uid: userId,
                email: userEmail,
                firstName: firstName,
                lastName: lastName,
                userClass: accountType
            }
            const response = await fetch("/api/createuser", {
              method: "POST",
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
            
              router.push("/");
          } catch (error) {
            console.error('Error in post request:', error);
          } 
    }

  return (
    <div className="min-h-screen bg-[#FFFAF1] flex items-center justify-center">
        <ToastContainer/>
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-8">
        <h1 className="text-3xl font-bold text-center text-black mb-6">Please Select To Continue</h1>
        <form className="space-y-6">
          <div>
            <label htmlFor="firstName" className="block mb-2 font-medium text-gray-700">
              <CircleUser className="inline-block w-5 h-5 mr-2" />
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              required
              className="w-full p-3 border border-gray-300 text-black rounded-md focus:ring-purple-500 focus:border-purple-500"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-2 font-medium text-gray-700">
              <CircleUser className="inline-block w-5 h-5 mr-2" />
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              required
              className="w-full p-3 border border-gray-300 text-black rounded-md focus:ring-purple-500 focus:border-purple-500"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 font-medium text-gray-700">
              <UserPen className="inline-block w-5 h-5 mr-2" />
              Account Type
            </label>
            <Select
              id="accountType"
              className="w-full p-3 border border-gray-300 text-black rounded-md focus:ring-purple-500 focus:border-purple-500"
              placeholder="Select Account Type"
              instanceId={useId()}
                options={classOptions}
                closeMenuOnSelect={true}
              value={accountType}
              onChange={(e) => handleSelectChange(e)}
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-lightblue text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-purple-700 transition duration-300"
          >
            <LogIn className="inline-block w-5 h-5 mr-2" />
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewUserWelcome;