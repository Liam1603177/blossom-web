import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet, apiAuthPost, apiAuthPut, apiAuthDelete, apiUpload } from "../services/api";

const categorias = ["tortas","cookies","almuerzo","cupcake"];

export default function AdminPanel(){
	const [items,setItems]=useState([]);
	const [form,setForm]=useState({ nombre:"", categoria:"tortas", precio:0, descripcion:"", ingredientes:"", imagen:"" });
	const [editId,setEditId]=useState(null);
	const nav = useNavigate();

		useEffect(()=>{
			// si no hay token, a login
			if(!localStorage.getItem("admintoken")) nav("/admin");
			cargar();
		},[nav]);

	async function cargar(){
		const data = await apiGet("/products",{ limit: 100 });
		setItems(data.items || []);
	}

	function onChange(e){
		const { name, value } = e.target;
		setForm(f=>({ ...f, [name]: value }));
	}

	async function onUpload(e){
		const file = e.target.files?.[0];
		if(!file) return;
		const { url } = await apiUpload(file);
		setForm(f=>({ ...f, imagen: url }));
	}

	async function onSubmit(e){
		e.preventDefault();
		const payload = {
			...form,
			precio: Number(form.precio)||0,
			ingredientes: form.ingredientes
				? form.ingredientes.split(",").map(s=>s.trim()).filter(Boolean)
				: []
		};
		if(editId){
			await apiAuthPut(`/products/${editId}`, payload);
		}else{
			await apiAuthPost("/products", payload);
		}
		setForm({ nombre:"", categoria:"tortas", precio:0, descripcion:"", ingredientes:"", imagen:"" });
		setEditId(null);
		await cargar();
	}

	function onEdit(p){
		setEditId(p._id);
		setForm({
			nombre: p.nombre || "",
			categoria: p.categoria || "tortas",
			precio: p.precio || 0,
			descripcion: p.descripcion || "",
			ingredientes: (p.ingredientes||[]).join(", "),
			imagen: p.imagen || ""
		});
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	async function onDelete(id){
		if(!confirm("¿Eliminar producto?")) return;
		await apiAuthDelete(`/products/${id}`);
		await cargar();
	}

	function logout(){
		localStorage.removeItem("admintoken");
		nav("/admin");
	}

	return (
		<div style={{maxWidth:960, margin:"2rem auto", padding:"0 1rem"}}>
			<div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
				<h2>Panel de Blossom</h2>
				<button onClick={logout}>Salir</button>
			</div>

			<form onSubmit={onSubmit} style={{display:"grid", gap:".6rem", margin:"1rem 0 2rem"}}>
				<input name="nombre" placeholder="Nombre" value={form.nombre} onChange={onChange} required />
				<div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:".6rem"}}>
					<select name="categoria" value={form.categoria} onChange={onChange}>
						{categorias.map(c=> <option key={c} value={c}>{c}</option>)}
					</select>
					<input name="precio" type="number" min="0" placeholder="Precio" value={form.precio} onChange={onChange} />
				</div>
				<textarea name="descripcion" placeholder="Descripción" rows={3} value={form.descripcion} onChange={onChange} />
				<input name="ingredientes" placeholder="Ingredientes (coma separados)" value={form.ingredientes} onChange={onChange} />
				<div style={{display:"grid", gap:".5rem"}}>
					<input type="file" accept="image/*" onChange={onUpload} />
					{form.imagen && <img src={form.imagen} alt="preview" style={{maxWidth:240, borderRadius:8}}/>}
				</div>
				<button>{editId ? "Guardar cambios" : "Crear producto"}</button>
			</form>

			<hr />

			<h3 style={{marginTop:"1rem"}}>Productos</h3>
			<div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))", gap:"1rem", marginTop:".5rem"}}>
				{items.map(p=>(
					<div key={p._id} style={{background:"#fff", borderRadius:12, padding:12, boxShadow:"0 4px 12px #0001"}}>
						<img src={p.imagen} alt={p.nombre} style={{width:"100%", height:140, objectFit:"cover", borderRadius:8}}/>
						<div style={{display:"grid", gap:".25rem", marginTop:8}}>
							<strong>{p.nombre}</strong>
							<small>{p.categoria} · ${p.precio}</small>
							<div style={{display:"flex", gap:".4rem", marginTop:6}}>
								<button onClick={()=>onEdit(p)}>Editar</button>
								<button onClick={()=>onDelete(p._id)} style={{background:"#c62828", color:"#fff"}}>Eliminar</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
