
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiLogin } from "../services/api";

export default function AdminLogin(){
	const [email,setEmail]=useState("");
	const [password,setPassword]=useState("");
	const [error,setError]=useState("");
	const nav = useNavigate();

	async function onSubmit(e){
		e.preventDefault();
		setError("");
		try{
			const { token } = await apiLogin(email,password);
			localStorage.setItem("admintoken", token);
			nav("/admin/panel");
		}catch{ setError("Email o clave inválidos"); }
	}

	return (
		<div style={{maxWidth:360, margin:"4rem auto"}}>
			<h2>Panel Blossom – Login</h2>
			<form onSubmit={onSubmit} style={{display:"grid", gap:"0.75rem"}}>
				<input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
				<input type="password" placeholder="Clave" value={password} onChange={e=>setPassword(e.target.value)} />
				{error && <small style={{color:"crimson"}}>{error}</small>}
				<button>Ingresar</button>
			</form>
		</div>
	);
}
