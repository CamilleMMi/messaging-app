import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { useAppStore } from '@/store';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
    const { userInfo } = useAppStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo.profileSetup) {
            toast.error("Please complete your profile setup first");
            navigate("/profile");
        }
    }, [userInfo, navigate]);

    return (
        <div>
            <h1>Chat</h1>
        </div>
    );
}

export default Chat;