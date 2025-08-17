const BASE = import.meta.env.VITE_API_URL;

function authHeaders(){
  const t = localStorage.getItem("admintoken");
  return t ? { Authorization: `Bearer ${t}` } : {};
}

export async function apiLogin(email, password) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login fallido");
  return res.json();
}

export async function apiGet(path, params={}){
  const url = new URL(`${BASE}${path}`);
  Object.entries(params).forEach(([k,v])=> v!=null && url.searchParams.set(k,v));
  const res = await fetch(url);
  if(!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
  return res.json();
}

export async function apiAuthPost(path, body){
  const res = await fetch(`${BASE}${path}`,{
    method:"POST",
    headers:{ "Content-Type":"application/json", ...authHeaders() },
    body: JSON.stringify(body)
  });
  if(!res.ok) throw new Error(`POST ${path} -> ${res.status}`);
  return res.json();
}

export async function apiAuthPut(path, body){
  const res = await fetch(`${BASE}${path}`,{
    method:"PUT",
    headers:{ "Content-Type":"application/json", ...authHeaders() },
    body: JSON.stringify(body)
  });
  if(!res.ok) throw new Error(`PUT ${path} -> ${res.status}`);
  return res.json();
}

export async function apiAuthDelete(path){
  const res = await fetch(`${BASE}${path}`,{ method:"DELETE", headers:{ ...authHeaders() } });
  if(!res.ok) throw new Error(`DELETE ${path} -> ${res.status}`);
  return res.json();
}

export async function apiUpload(file){
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(`${BASE}/upload`, { method:"POST", headers:{ ...authHeaders() }, body: fd });
  if(!res.ok) throw new Error("Upload falló");
  return res.json(); // { url }
}
