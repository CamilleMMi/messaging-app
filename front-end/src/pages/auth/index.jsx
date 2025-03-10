import React, { useState, useEffect } from 'react';
import Background from '@/assets/images/login2.png';
import Victory from '@/assets/svg/victory.svg';
import { Tabs } from '@/components/ui/tabs';
import { TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfigPassword] = useState("");
    const [activeTab, setActiveTab] = useState("login");

    useEffect(() => {
        setEmail("");
        setPassword("");
        setConfigPassword("");
    }, [activeTab]);

    const handleLogin = async () => {};

    const handleSignup = async () => {};

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
                                <TabsTrigger value="signup" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:font-semibold data-[state=active]:border-b-green-500 p-3 transition-all duration-300">
                                    Signup
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                                <Input placeholder="Email" type="email" className="rounded-full p-6" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <Input placeholder="Password" type="password" className="rounded-full p-6" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <Button className="rounded-full p-6" onClick={handleLogin}>
                                    Login
                                </Button>
                            </TabsContent>
                            <TabsContent className="flex flex-col gap-5 mt-10" value="signup">
                                <Input placeholder="Email" type="email" className="rounded-full p-6" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <Input placeholder="Password" type="password" className="rounded-full p-6" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <Input placeholder="Confirm Password" type="password" className="rounded-full p-6" value={confirmPassword} onChange={(e) => setConfigPassword(e.target.value)}/>
                                <Button className="rounded-full p-6" onClick={handleSignup}>
                                    Signup
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