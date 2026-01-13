// ==========================
// SUPABASE CONFIG
// ==========================
const SUPABASE_URL = "https://ejpobxmuvubxjaofwnue.supabase.com";
const SUPABASE_KEY = "sb_publishable_vsAqJjiLD2twwQkE5qTMYA_9PH2mmY8";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

// ==========================
// CARREGAR FICHA
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  carregarFicha();
});

async function carregarFicha() {
  const personagemId = localStorage.getItem("personagem_id");

  if (!personagemId) {
    alert("Nenhum personagem selecionado.");
    window.location.href = "index.html";
    return;
  }

  // 1️⃣ Buscar personagem
  const { data: personagem, error } = await supabaseClient
    .from("personagens")
    .select("*")
    .eq("id", personagemId)
    .single();

  if (error) {
    console.error(error);
    alert("Erro ao carregar personagem.");
    return;
  }

  // 2️⃣ Preencher dados básicos
  document.getElementById("nome-personagem").textContent = personagem.nome;
  document.getElementById("classe-nex").textContent =
    `${personagem.classe} — NEX ${personagem.nex}%`;

  // 3️⃣ Atributos
  document.getElementById("for").textContent = personagem.forca;
  document.getElementById("agi").textContent = personagem.agilidade;
  document.getElementById("int").textContent = personagem.intelecto;
  document.getElementById("pre").textContent = personagem.presenca;
  document.getElementById("vig").textContent = personagem.vigor;

  // 4️⃣ Status
  document.getElementById("pv").textContent = personagem.pv;
  document.getElementById("pe").textContent = personagem.pe;
  document.getElementById("san").textContent = personagem.sanidade;

  // 5️⃣ Perícias
  carregarPericias(personagem.id);
}

async function carregarPericias(personagemId) {
  const { data: pericias, error } = await supabaseClient
    .from("pericias")
    .select("*")
    .eq("personagem_id", personagemId);

  if (error) {
    console.error(error);
    return;
  }

  const lista = document.getElementById("lista-pericias");
  lista.innerHTML = "";

  pericias.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.nome} +${p.bonus}`;
    lista.appendChild(li);
  });
}
