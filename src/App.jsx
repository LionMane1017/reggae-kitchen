import React, { useState, useEffect } from 'react';
import KalebAgent from './components/KalebAgent';
import MagneticButton from './components/MagneticButton';
import RevealOnScroll from './components/RevealOnScroll';
import { FLAVORS, AI_RECIPE_DB, CREW, MILESTONES } from './data/models';

const App = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiResult, setAiResult] = useState(null);
  const [isAiThinking, setIsAiThinking] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [aiResult, isAiThinking, isCartOpen]);

  const addToCart = (item) => setCart(prev => [...prev, item]);
  const subtotal = cart.reduce((s, i) => s + i.price, 0).toFixed(2);

  const handleAiGeneration = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    setIsAiThinking(true);
    setAiResult(null);
    setTimeout(() => {
      const found = AI_RECIPE_DB.find(r => r.triggerWords.some(w => aiInput.toLowerCase().includes(w))) || AI_RECIPE_DB[0];
      setAiResult({ ...found, flavorObject: FLAVORS.find(f => f.id === found.requiredFlavor) });
      setIsAiThinking(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c]">
      {/* Rasta Top Bar */}
      <div className="w-full h-1.5 bg-gradient-to-r from-rasta-green via-rasta-gold to-rasta-red fixed top-0 z-[500]" />
      <KalebAgent onAddToCart={addToCart} />

      {/* Ticker */}
      <div className="bg-rasta-red h-8 overflow-hidden flex items-center relative z-[110] border-b border-black/20 mt-1.5">
        <div className="flex whitespace-nowrap ticker-scroll items-center font-black text-[10px] uppercase tracking-widest text-white/90">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-8">Someone in Brampton just joined the Burn Club! &bull; New Masala Batch live! &bull; Free Shipping over $50!</span>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-9.5 w-full z-50 transition-all ${scrolled ? 'bg-black/80 backdrop-blur-xl py-3 shadow-2xl' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <i data-lucide="flame" className="text-rasta-red h-8 w-8 fire-glow"></i>
            <h1 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">Reggae <span className="text-gradient-gold">Kitchen</span></h1>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://raggaekitchen.online/" target="_blank" rel="noopener noreferrer" className="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-rasta-gold transition-all flex items-center space-x-2 bg-white/5 px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/10">
              <i data-lucide="globe" className="h-3.5 w-3.5"></i>
              <span>Corporate Site</span>
            </a>
            <button onClick={() => setIsCartOpen(true)} className="relative p-3 bg-white/5 rounded-full hover:bg-rasta-green text-white transition-all shadow-lg border border-white/10">
              <i data-lucide="shopping-cart" className="h-5 w-5"></i>
              {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-rasta-red text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-black">{cart.length}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-bg min-h-[95vh] flex items-center px-8 relative -mt-8 pt-8">
        <div className="max-w-4xl mx-auto glass-card p-12 rounded-[4rem] animate-slide-up-fade relative overflow-hidden backdrop-blur-3xl border border-white/10 shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-rasta-gold/20">
            <div className="h-full bg-rasta-gold w-1/3 animate-shimmer"></div>
          </div>
          <h1 className="text-7xl md:text-9xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-6">Authentic <span className="text-gradient-gold">Heat.</span></h1>
          <p className="text-xl md:text-2xl text-zinc-400 mb-10 border-l-4 border-rasta-green pl-6 font-medium max-w-2xl">Eye-tahl is vital. (Rhymes with a-towel). Experience the pure frequency of Wayne Reid's five-flavor legacy.</p>
          <div className="flex flex-wrap gap-4">
            <MagneticButton onClick={() => document.getElementById('flavors').scrollIntoView({ behavior: 'smooth' })} className="bg-rasta-red text-white font-black px-12 py-6 rounded-2xl shadow-2xl hover:bg-red-700 uppercase tracking-widest text-sm">Shop Matrix</MagneticButton>
            <MagneticButton onClick={() => document.getElementById('ai-chef').scrollIntoView({ behavior: 'smooth' })} className="bg-white/5 text-rasta-gold font-black px-12 py-6 rounded-2xl border border-rasta-gold/30 hover:bg-white/10 uppercase tracking-widest text-sm backdrop-blur-md">AI Pantry Chef</MagneticButton>
            <a href="https://raggaekitchen.online/" target="_blank" rel="noopener noreferrer" className="bg-white/5 text-zinc-300 font-black px-12 py-6 rounded-2xl border border-white/10 hover:bg-white/10 uppercase tracking-widest text-sm backdrop-blur-md flex items-center space-x-2 transition-all">
              <i data-lucide="globe" className="h-4 w-4"></i>
              <span>Corporate Site</span>
            </a>
          </div>
        </div>
      </header>

      {/* AI Pantry Chef */}
      <section id="ai-chef" className="py-32 bg-[#080808] border-b border-white/5 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-8 relative z-10">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">The AI <span className="text-gradient-gold">Pantry</span> Chef</h2>
              <p className="text-zinc-500 mt-4 font-medium uppercase tracking-widest text-xs">Tell us what you have. Kaleb's network will synthesize the dish.</p>
            </div>
            <form onSubmit={handleAiGeneration} className="relative group mb-16">
              <div className="absolute -inset-1 bg-gradient-to-r from-rasta-green via-rasta-gold to-rasta-red rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <input type="text" value={aiInput} onChange={e => setAiInput(e.target.value)} placeholder="e.g., chicken, rice, mango..." className="relative w-full bg-[#0c0c0c] border border-white/10 rounded-3xl p-6 text-white outline-none focus:border-rasta-gold transition-all shadow-inner text-lg" />
              <button type="submit" className="absolute right-3 top-3 bg-rasta-gold text-black font-black px-8 py-3 rounded-2xl hover:bg-yellow-400 transition-colors">Synthesize</button>
            </form>
          </RevealOnScroll>
          {isAiThinking && <div className="text-center text-rasta-gold font-black animate-pulse font-mono tracking-widest uppercase">Querying Sovereign Recipe Database...</div>}
          {aiResult && (
            <div className="glass-card p-10 rounded-[3.5rem] border-2 border-rasta-green/40 animate-slide-up-fade shadow-[0_0_80px_rgba(0,155,58,0.1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10"><i data-lucide="chef-hat" className="h-32 w-32 text-rasta-gold"></i></div>
              <div className="flex justify-between items-start mb-6 pb-6 border-b border-white/10">
                <div>
                  <span className="text-[10px] text-rasta-green font-black uppercase tracking-widest mb-2 block">Dish Synthesized</span>
                  <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">{aiResult.title}</h3>
                  <div className="mt-2 flex items-center text-zinc-500 font-bold text-xs uppercase tracking-widest">
                    <i data-lucide="clock" className="h-3 w-3 mr-1"></i> Time: {aiResult.time}
                  </div>
                </div>
              </div>
              <p className="text-zinc-300 mb-10 text-lg font-medium leading-relaxed border-l-4 border-rasta-gold pl-6">{aiResult.desc}</p>
              <div className="bg-black/40 p-8 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center border border-white/10 backdrop-blur-md">
                <div className="flex items-center space-x-6 mb-6 md:mb-0">
                  <div className={`h-16 w-16 ${aiResult.flavorObject.color} rounded-2xl flex items-center justify-center text-white/50 border border-white/20 shadow-inner`}>
                    <i data-lucide="flame" className="h-8 w-8"></i>
                  </div>
                  <div>
                    <span className="block text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Required Sauce</span>
                    <span className="block text-xl text-white font-black uppercase tracking-tighter">{aiResult.flavorObject.name}</span>
                    <span className="text-rasta-gold font-mono text-sm">${aiResult.flavorObject.price}</span>
                  </div>
                </div>
                <button onClick={() => addToCart(aiResult.flavorObject)} className="w-full md:w-auto bg-rasta-gold text-black font-black px-10 py-5 rounded-2xl uppercase text-xs shadow-xl hover:bg-yellow-400 transition-all active:scale-95">Add To Stash</button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Flavor Matrix */}
      <section id="flavors" className="py-32 px-8 max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">The <span className="text-gradient-gold">Flavor</span> Matrix</h2>
            <p className="text-zinc-500 mt-4 uppercase tracking-[0.3em] font-black text-xs">Wayne Reid's foundational architectures</p>
          </div>
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {FLAVORS.map((f, i) => (
            <RevealOnScroll key={f.id} delay={i * 100}>
              <div className="glass-card p-10 rounded-[3rem] flex flex-col h-full group hover:border-rasta-gold/50 transition-all duration-500 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-white/5 group-hover:bg-rasta-gold/20 transition-colors"></div>
                <div className={`h-2.5 w-20 ${f.color} rounded-full mb-8 shadow-inner`}></div>
                <h3 className="text-4xl font-black text-white uppercase mb-4 tracking-tighter leading-none transition-colors group-hover:text-rasta-gold">{f.name}</h3>
                <p className="text-zinc-400 mb-10 font-medium leading-relaxed text-lg">{f.desc}</p>
                <div className="mt-auto flex justify-between items-center pt-8 border-t border-white/5">
                  <div>
                    <span className="block text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Vault Price</span>
                    <span className="text-3xl font-black text-white tracking-tighter">${f.price}</span>
                  </div>
                  <button onClick={() => addToCart(f)} className="bg-white/5 hover:bg-rasta-green p-5 rounded-2xl transition-all shadow-xl border border-white/10 group-hover:border-rasta-green/50">
                    <i data-lucide="shopping-cart" className="h-6 w-6 text-white"></i>
                  </button>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Corporate Legacy Milestones */}
      <section className="py-24 px-8 max-w-7xl mx-auto border-t border-white/5">
        <RevealOnScroll>
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">The <span className="text-gradient-gold">Legend</span> of Wayne Reid</h2>
            <p className="text-zinc-500 mt-4 uppercase tracking-[0.3em] font-black text-xs">Corporate milestones & sovereign achievements</p>
          </div>
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {MILESTONES.map((s, i) => (
            <RevealOnScroll key={i} delay={i * 100}>
              <div className="glass-card p-12 rounded-[3.5rem] group hover:border-rasta-gold/50 transition-all duration-700 hover:bg-black/80 shadow-2xl">
                <span className="text-rasta-gold text-[11px] font-black uppercase tracking-[0.3em] mb-3 block">{s.partner}</span>
                <h3 className="text-4xl font-black text-white uppercase mb-6 tracking-tight leading-none transition-colors group-hover:text-rasta-gold">{s.title}</h3>
                <p className="text-zinc-400 leading-relaxed font-bold text-lg">{s.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Burn Club Cinematic */}
      <section className="py-40 bg-black relative overflow-hidden group/section">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80')] bg-cover bg-fixed opacity-50 mix-blend-luminosity group-hover/section:scale-110 transition-transform duration-[12000ms]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c] via-rasta-red/30 to-[#0c0c0c]"></div>
        <div className="max-w-5xl mx-auto px-8 relative z-10">
          <div className="glass-card p-16 md:p-24 rounded-[5rem] text-center border-white/20 backdrop-blur-3xl relative overflow-hidden shadow-[0_0_100px_rgba(206,17,38,0.3)]">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-rasta-gold/20"><div className="h-full bg-rasta-gold w-1/3 animate-shimmer"></div></div>
            <i data-lucide="flame" className="h-20 w-20 text-rasta-gold mx-auto mb-10 fire-glow"></i>
            <h2 className="text-7xl md:text-9xl font-black text-white uppercase tracking-tighter mb-8 drop-shadow-2xl leading-none">Burn <span className="text-gradient-gold">Club</span></h2>
            <p className="text-2xl text-zinc-200 mb-12 font-bold max-w-2xl mx-auto leading-relaxed">The ultimate monthly arsenal delivery. Secured for <span className="text-rasta-gold font-black bg-black/60 px-5 py-2 rounded-2xl border border-rasta-gold/30 inline-block cursor-default shadow-inner">$59.99</span>.</p>
            <button onClick={() => addToCart({ id: 'burn', name: 'Burn Club Sub', price: 59.99 })} className="bg-rasta-gold text-black font-black px-16 py-8 rounded-[2.5rem] text-2xl shadow-[0_0_60px_rgba(252,209,22,0.5)] hover:scale-105 transition-transform uppercase tracking-[0.2em] border-2 border-yellow-300 active:scale-95">Join The Fire</button>
          </div>
        </div>
      </section>

      {/* Cart Vault */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[600] flex justify-end">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-[#0c0c0c] border-l border-white/10 p-10 flex flex-col h-full animate-slide-up-fade shadow-2xl">
            <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-8">
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter flex items-center"><i data-lucide="lock" className="mr-4 h-8 w-8 text-rasta-gold"></i> The Vault</h2>
              <button onClick={() => setIsCartOpen(false)} className="hover:rotate-90 transition-transform p-2 bg-white/5 rounded-full"><i data-lucide="x" className="h-6 w-6 text-zinc-500"></i></button>
            </div>
            <div className="flex-grow space-y-6 overflow-y-auto no-scrollbar pr-2">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-zinc-700 opacity-50 uppercase font-black tracking-widest">
                  <i data-lucide="package" className="h-16 w-16 mb-4"></i>
                  <span>Vault Empty</span>
                </div>
              ) : (
                cart.map((item, i) => (
                  <div key={i} className="bg-white/5 p-6 rounded-3xl flex justify-between items-center border border-white/10 group hover:bg-white/10 transition-colors shadow-lg">
                    <div>
                      <span className="block font-black text-white uppercase tracking-tighter text-lg leading-none mb-1">{item.name}</span>
                      <span className="text-rasta-gold font-mono text-sm font-bold tracking-tighter">${item.price}</span>
                    </div>
                    <button onClick={() => setCart(cart.filter((_, idx) => idx !== i))} className="p-3 bg-black/40 rounded-xl text-zinc-600 hover:text-rasta-red transition-colors"><i data-lucide="trash-2" className="h-5 w-5"></i></button>
                  </div>
                ))
              )}
            </div>
            <div className="mt-10 border-t border-white/10 pt-10">
              <div className="flex justify-between items-center mb-8 text-3xl font-black text-white tracking-tighter"><span>Subtotal</span><span>${subtotal}</span></div>
              <button className="w-full bg-rasta-green text-white font-black py-6 rounded-3xl uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(0,155,58,0.4)] hover:bg-green-600 transition-all active:scale-95 text-lg">Secure Checkout</button>
            </div>
          </div>
        </div>
      )}

      {/* The Sovereign Crew Section */}
      <section id="crew" className="py-32 px-8 max-w-7xl mx-auto border-t border-white/5 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-rasta-gold/20 to-transparent"></div>
        <RevealOnScroll>
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">The <span className="text-gradient-gold">Sovereign</span> Crew</h2>
            <p className="text-zinc-500 mt-4 uppercase tracking-[0.3em] font-black text-xs">The legendary minds behind the fire</p>
          </div>
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CREW.map((member, i) => (
            <RevealOnScroll key={member.name} delay={i * 100}>
              <div className="glass-card p-8 rounded-[3rem] flex flex-col h-full group hover:border-rasta-gold/40 transition-all duration-500 relative overflow-hidden shadow-2xl bg-black/40">
                <div className="absolute top-0 left-0 w-full h-1 bg-white/5 group-hover:bg-gradient-to-r group-hover:from-rasta-green group-hover:via-rasta-gold group-hover:to-rasta-red transition-all"></div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center text-rasta-gold font-black text-2xl border border-white/10 group-hover:border-rasta-gold/30 group-hover:bg-white/10 transition-all">
                    {member.initial}
                  </div>
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${member.badgeColor}`}>
                      {member.role}
                    </span>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter mt-1.5 group-hover:text-rasta-gold transition-colors leading-none">{member.name}</h3>
                  </div>
                </div>
                <div className="space-y-4 mt-4 pt-6 border-t border-white/5 flex-grow">
                  <a href={`mailto:${member.email}`} className="flex items-center space-x-3 text-zinc-400 hover:text-white transition-colors group/link">
                    <div className="p-2.5 bg-white/5 rounded-xl group-hover/link:bg-rasta-gold/10 group-hover/link:text-rasta-gold transition-colors">
                      <i data-lucide="mail" className="h-4 w-4"></i>
                    </div>
                    <span className="text-xs font-medium font-mono truncate max-w-[190px]">{member.email}</span>
                  </a>
                  <a href={`tel:${member.phone.replace(/[^0-9]/g, '')}`} className="flex items-center space-x-3 text-zinc-400 hover:text-white transition-colors group/link">
                    <div className="p-2.5 bg-white/5 rounded-xl group-hover/link:bg-rasta-gold/10 group-hover/link:text-rasta-gold transition-colors">
                      <i data-lucide="phone" className="h-4 w-4"></i>
                    </div>
                    <span className="text-xs font-medium font-mono">{member.phone}</span>
                  </a>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 text-center bg-[#080808] border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-rasta-gold/20 to-transparent"></div>
        <h2 className="text-white font-black uppercase tracking-[0.4em] text-2xl mb-2 text-gradient-gold">Reggae Kitchen</h2>
        <div className="mb-4">
          <a href="https://raggaekitchen.online/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-rasta-gold transition-colors">
            <i data-lucide="globe" className="h-3.5 w-3.5"></i>
            <span>Visit Corporate Site (.online)</span>
          </a>
        </div>
        <p className="text-zinc-600 font-mono text-[10px] tracking-widest uppercase mb-10">Brampton, ON &bull; MCNEIL LEGACY ARCHITECTURE &bull; SYS.AUTH.001</p>
        <div className="flex justify-center space-x-6 mb-12">
          <div className="h-1.5 w-12 bg-rasta-green rounded-full"></div>
          <div className="h-1.5 w-12 bg-rasta-gold rounded-full"></div>
          <div className="h-1.5 w-12 bg-rasta-red rounded-full"></div>
        </div>
        <p className="text-zinc-800 text-[8px] font-mono tracking-widest uppercase opacity-50">Sovereign Domain Protection Active &bull; No Stalls &bull; No Squeezes</p>
      </footer>
    </div>
  );
};

export default App;
