import React, { useState, useEffect } from 'react';
import Background from '@/assets/images/login2.png';
import { Tabs } from '@/components/ui/tabs';
import { TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { isValidEmail } from '@/helpers/email.helper-1.0.0';
import { isValidPassword } from '@/helpers/password.helper-1.0.0';
import apiClient from '@/configurations/api-client.configuration-1.0.0';
import { useAppStore } from '@/store';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const navigate = useNavigate();

    const { userInfo, setUserInfo } = useAppStore();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [activeTab, setActiveTab] = useState("login");

    useEffect(() => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    }, [activeTab]);

    const validateRegister = () => {
        if (!email || !password || !confirmPassword) {
            toast.error("Please fill in all the fields");
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return false;
        }
        if (!isValidEmail(email)) {
            toast.error("Invalid email format");
            return false;
        }
        if (!isValidPassword(password)) {
            toast.error("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.");
            return false;
        }
        
        return true;
    };

    const validateLogin = () => {
        if (!email || !password) {
            toast.error("Please fill in all the fields");
            return false;
        }
        if (!isValidEmail(email)) {
            toast.error("Invalid email format");
            return false;
        }

        return true;
    };

    const handleLogin = async () => {
        if (validateLogin()) {
            const response = await apiClient.post("/auth/login", {
                email,
                password
            });

            if (response.status === 200) {
                setUserInfo(response.data.user);
                localStorage.setItem("userInfo", JSON.stringify(response.data));
                if (response.data.user.profileSetup) {
                    toast.success("Login successful");
                    navigate("/chat");
                } else {
                    toast.success("Login successful");
                    navigate("/profile");
                }
            }
        }
    };

    const handleRegister = async () => {
        if (validateRegister()) {
            const response = await apiClient.post("/auth/register", {
                email,
                password
            });

            if (response.status === 201) {
                setUserInfo(response.data.user);
                toast.success("Account created successfully");
                navigate("/profile");
            }
        }
    };

    return (
        <div className="h-[100vh] w-[100vw] flex items-center justify-center">
            <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
                <div className="flex flex-col gap-10 items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center justify-center">
                            <h1 className="text-5xl font-bold md:text-6xl mb-6">Welcome</h1>
                        </div>
                        <p className="font-medium text-center">
                            Fill in the details to get started
                        </p>
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-2/4">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="login" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:font-semibold data-[state=active]:border-b-green-500 p-3 transition-all duration-300">
                                    Login
                                </TabsTrigger>
                                <TabsTrigger value="register" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:font-semibold data-[state=active]:border-b-green-500 p-3 transition-all duration-300">
                                    Register
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                                <Input placeholder="Email" type="email" className="rounded-full p-6" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <Input placeholder="Password" type="password" className="rounded-full p-6" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <Button className="rounded-full p-6" onClick={handleLogin}>
                                    Login
                                </Button>
                            </TabsContent>
                            <TabsContent className="flex flex-col gap-5 mt-10" value="register">
                                <Input placeholder="Email" type="email" className="rounded-full p-6" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <Input placeholder="Password" type="password" className="rounded-full p-6" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <Input placeholder="Confirm Password" type="password" className="rounded-full p-6" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                                <Button className="rounded-full p-6" onClick={handleRegister}>
                                    Register
                                </Button>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
                <div className="hidden xl:flex justify-center items-center">
                    <img src={Background} alt="background login" className="h-[356px]"/>
                </div>
            </div>
        </div>
    );
}

export default Auth;