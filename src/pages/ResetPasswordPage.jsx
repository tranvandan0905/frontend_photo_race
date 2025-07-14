import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { verifypassword } from "../services/user.services";

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    const [pasword, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await verifypassword(
                token,
                pasword,
                email,

            );
            setMessage("Đặt lại mật khẩu thành công!");
        } catch (err) {
            setMessage("Có lỗi xảy ra khi đặt lại mật khẩu.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Nhập mật khẩu mới</h3>
            <input
                type="password"
                value={pasword}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu mới"
                required
            />
            <button type="submit">Xác nhận</button>
            <p>{message}</p>
        </form>
    );
};

export default ResetPasswordPage;
