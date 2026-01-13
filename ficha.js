const SUPABASE_URL = "https://ejpobxmuvubxjaofwnue.supabase.co";
const SUPABASE_KEY = "sb_publishable_vsAqJjiLD2twwQkE5qTMYA_9PH2mmY8";

const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function carregarFicha() {
  const id = localStorage.getItem('personagem_id');

  const { data } = await db
    .from('personagens')
    .select('*')
    .eq('id', id)
    .single();

  document.getElementById('nome').innerText = data.nome;
  document.getElementById('classe').innerText = `${data.classe} • NEX ${data.nex}%`;

  document.getElementById('pv').innerText = data.pv;
  document.getElementById('pe').innerText = data.pe;
  document.getElementById('san').innerText = data.san;

  document.getElementById('for').innerText = data.forca;
  document.getElementById('agi').innerText = data.agilidade;
  document.getElementById('int').innerText = data.intelecto;
  document.getElementById('pre').innerText = data.presenca;
  document.getElementById('vig').innerText = data.vigor;
}

carregarFicha();
