import {create} from 'zustand';
import axios from '../lib/axios';
import {toast}from 'react-hot-toast';
import { LogOut } from 'lucide-react';

export const useUserStore = create((set, get) => ({
    user:null,
    loading:false,
    checkingAuth:false,

    signup:async({name, email, password, confirmPassword})=>{
        set({loading:true});

        if(password !== confirmPassword) {

            set({loading:false});
            return toast.error("Passwords do not match");   
        }
        try{
            const res=await axios.post('/auth/signup', {name, email, password});
            set({user:res.data.user, loading:false});
        }catch(error){
            set({loading:false});
            return toast.error(error.response.data.message ||"An error occurred while signing up");
        }
    },

    login: async (email, password) => {
		set({ loading: true });

		try {
			const res = await axios.post("/auth/login", { email, password });

			set({ user: res.data, loading: false });
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.message || "An error occurred");
		}
	},
    logout:async()=>{
    try {
        await axios.post('/auth/logout');
        set({user:null});
    } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred while logging out");
    }
    },

    chechAuth:async()=>{
        try{
            const response= await axios.get('/auth/profile');
            set({user:response.data, checkingAuth:false});
        }catch(error){
            set({checkingAuth:false, user:null})
        }
    },
    

}));