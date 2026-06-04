import React, { useState, useEffect, useRef } from 'react';
import { generateSpeech } from '../utils/audio';

const KalebAgent = ({ onAddToCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{
    role: 'kaleb',
    text: "Blessed love. I am Kaleb. Step into the kitchen, for Eye-tahl is vital. (Eye-tahl rhymes with a-towel). How can I guide your fire today?"
  }]);
  const [input, setInput] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [isOpen, messages, isSpeaking]);

  const speakText = async (text) => {
    if (audioRef.current) audioRef.current.pause();
    setIsSpeaking(true);
    const audio = await generateSpeech(text);
    if (audio) {
      audioRef.current = audio;
      audio.onended = () => setIsSpeaking(false);
      audio.play();
    } else {
      setIsSpeaking(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input.toLowerCase();
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');

    setTimeout(async () => {
      let response = "The wind whispers through the pimento trees, but for your kitchen, I suggest looking into the Flavor Matrix below.";
      if (userMsg.includes("eye-tahl") || userMsg.includes("ital")) {
        response = "Eye-tahl is vital, my friend. (Phonetic: Eye-tahl). It means pure, natural, and tuned to the frequency of the sun. No salt, no chemical—just the pure volatile oils of the scotch bonnet pepper.";
      } else if (userMsg.includes("chicken")) {
        response = "For the yard chicken, 'The Original' is the master foundation. It brings the true thyme and allspice fire. Shall I add it to your stash?";
      } else if (userMsg.includes("vegan") || userMsg.includes("masala")) {
        response = "The Brampton Masala is a sacred fusion. It brings South Asian warmth to the Caribbean fire. Perfect for the Eye-tahl life.";
      } else if (userMsg.includes("designation") || userMsg.includes("government") || userMsg.includes("canada")) {
        response = "Ah, the Sovereign Vow! We are the first Caribbean food product officially recognized and designated as a certified Canadian Product by the federal government. A historic achievement for the culture.";
      } else if (userMsg.includes("loblaw")) {
        response = "Loblaws saw the excellence first. They architected the label that carries the flame today. A true vanguard partnership for Wayne Reid.";
      } else if (userMsg.includes("sobey")) {
        response = "Sobeys brought the fire across the provinces. A national scaling strategy to reach every household.";
      } else if (userMsg.includes("dossier") || userMsg.includes("invest")) {
        response = "The network is expanding. For a deeper look into the economics of Eye-tahl, simply request the dossier. The frequency of growth is high.";
      }
      setMessages(prev => [...prev, { role: 'kaleb', text: response }]);
      await speakText(response);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[300]">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-rasta-gold text-black p-4 rounded-full shadow-[0_0_30px_rgba(252,209,22,0.5)] border-2 border-black animate-float group relative"
        >
          <i data-lucide="message-circle" className="h-6 w-6 group-hover:scale-125 transition-transform"></i>
          <span className="absolute -top-2 -right-2 bg-rasta-red text-white text-[8px] font-black px-2 py-1 rounded-full animate-pulse">VOICE</span>
        </button>
      ) : (
        <div className="glass-card w-80 md:w-96 rounded-[2.5rem] overflow-hidden flex flex-col border border-rasta-gold/30 shadow-2xl animate-slide-up-fade bg-black/95">
          <div className="bg-rasta-gold p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className={`h-8 w-8 rounded-full bg-black flex items-center justify-center text-rasta-gold font-black text-xs ${isSpeaking ? 'animate-pulse' : ''}`}>K</div>
              <div>
                <span className="text-black font-black uppercase text-xs tracking-widest block">Elder Kaleb</span>
                {isSpeaking && <span className="text-[8px] text-black/60 font-bold uppercase tracking-tighter">Speaking...</span>}
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-black/50 hover:text-black transition-transform hover:rotate-90">
              <i data-lucide="x" className="h-5 w-5"></i>
            </button>
          </div>
          <div className="h-64 overflow-y-auto p-4 space-y-4 no-scrollbar bg-black/40">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-medium leading-relaxed group relative ${m.role === 'user' ? 'bg-white/10 text-white' : 'bg-rasta-gold/10 text-rasta-gold border border-rasta-gold/20'}`}>
                  {m.text}
                  {m.role === 'kaleb' && (
                    <button onClick={() => speakText(m.text)} className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <i data-lucide="volume-2" className="h-3 w-3 text-rasta-gold"></i>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="p-4 border-t border-white/10 flex space-x-2 bg-black/60">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about Eye-tahl..."
              className="flex-grow bg-white/5 rounded-xl px-4 py-2 text-xs text-white outline-none focus:ring-1 focus:ring-rasta-gold"
            />
            <button type="submit" className="bg-rasta-gold text-black px-3 py-2 rounded-xl transition-all hover:bg-yellow-400">
              <i data-lucide="send" className="h-4 w-4"></i>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default KalebAgent;
