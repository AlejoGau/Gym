'use client';

import React, { useState, useEffect } from 'react';

export default function GeneratorPage() {
  // Input states
  const [name, setName] = useState('FORGE FITNESS');
  const [slogan, setSlogan] = useState('ENTRENÁ AL LÍMITE');
  const [primary, setPrimary] = useState('#caf300');
  const [secondary, setSecondary] = useState('#ff571a');
  const [accent, setAccent] = useState('#171e00');
  const [city, setCity] = useState('Palermo');
  const [whatsapp, setWhatsapp] = useState('5491123456789');
  const [instagram, setInstagram] = useState('forgefitness');
  const [logo, setLogo] = useState('');
  const [image, setImage] = useState('');
  const [trial, setTrial] = useState('Clase de prueba gratis');

  const [origin, setOrigin] = useState('https://tudominio.com');
  const [copied, setCopied] = useState(false);

  // States for URL shortening
  const [shortUrl, setShortUrl] = useState('');
  const [shortening, setShortening] = useState(false);
  const [copiedShort, setCopiedShort] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  // Clear the generated short URL if any customization field is edited
  useEffect(() => {
    setShortUrl('');
  }, [name, slogan, primary, secondary, accent, city, whatsapp, instagram, logo, image, trial]);

  // Handles image uploading, resizing it to a max-dimension of 100px, 
  // and converting it to a compressed base64 string to fit in URL queries
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 100; // Optimal size for navbar logo
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const base64 = canvas.toDataURL('image/png');
          setLogo(base64);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Shortens the long generated URL using our server-side TinyURL proxy endpoint
  const handleShorten = async () => {
    if (shortUrl || shortening) return;
    setShortening(true);
    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: finalUrl }),
      });
      if (!res.ok) throw new Error('Shortening failed');
      const data = await res.json();
      if (data.shortUrl) {
        setShortUrl(data.shortUrl);
      }
    } catch (err) {
      console.error('Error shortening URL:', err);
    } finally {
      setShortening(false);
    }
  };

  const handleCopyShort = async () => {
    if (!shortUrl) return;
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedShort(true);
      setTimeout(() => setCopiedShort(false), 2000);
    } catch (err) {
      console.error('Failed to copy short URL:', err);
    }
  };

  // Generate the customized URL
  const generateUrl = () => {
    const params = new URLSearchParams();
    
    // Add parameters if they differ from standard default or are filled
    if (name) params.set('name', name);
    if (slogan) params.set('slogan', slogan);
    if (primary) params.set('primary', primary);
    if (secondary) params.set('secondary', secondary);
    if (accent) params.set('accent', accent);
    if (city) params.set('city', city);
    if (whatsapp) params.set('whatsapp', whatsapp);
    if (instagram) params.set('instagram', instagram);
    if (logo) params.set('logo', logo);
    if (image) params.set('image', image);
    if (trial) params.set('trial', trial);

    return `${origin}/?${params.toString()}`;
  };

  const finalUrl = generateUrl();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(finalUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#e5e2e1] font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
            {logo && (logo.startsWith('http') || logo.startsWith('/') || logo.includes('.') || logo.startsWith('data:image')) ? (
              <img src={logo} alt={name} className="max-w-full max-h-full p-1.5 object-contain" />
            ) : (
              <span className="material-symbols-outlined text-primary-fixed text-[30px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                {logo || 'bolt'}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">GENERADOR DE DEMOS: {name || 'GYM'}</h1>
            <p className="text-on-surface-variant text-sm mt-1">Crea enlaces personalizados para cada gimnasio en segundos.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-2 space-y-6 bg-[#1e1e1e] p-6 sm:p-8 rounded-xl border border-white/5">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-fixed">tune</span> Datos de Personalización
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Nombre del Gimnasio</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#121212] border border-white/10 text-white rounded-lg p-3 focus:ring-1 focus:ring-primary-fixed focus:border-primary-fixed outline-none text-sm"
                />
              </div>

              {/* Slogan */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Eslogan Principal</label>
                <input
                  type="text"
                  value={slogan}
                  onChange={(e) => setSlogan(e.target.value)}
                  className="w-full bg-[#121212] border border-white/10 text-white rounded-lg p-3 focus:ring-1 focus:ring-primary-fixed focus:border-primary-fixed outline-none text-sm"
                />
              </div>

              {/* City */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Ciudad / Barrio</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#121212] border border-white/10 text-white rounded-lg p-3 focus:ring-1 focus:ring-primary-fixed focus:border-primary-fixed outline-none text-sm"
                />
              </div>

              {/* Trial */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Texto Promoción / Trial</label>
                <input
                  type="text"
                  value={trial}
                  onChange={(e) => setTrial(e.target.value)}
                  className="w-full bg-[#121212] border border-white/10 text-white rounded-lg p-3 focus:ring-1 focus:ring-primary-fixed focus:border-primary-fixed outline-none text-sm"
                />
              </div>

              {/* WhatsApp */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">WhatsApp (Sin + ni espacios)</label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="Ej: 5491123456789"
                  className="w-full bg-[#121212] border border-white/10 text-white rounded-lg p-3 focus:ring-1 focus:ring-primary-fixed focus:border-primary-fixed outline-none text-sm"
                />
              </div>

              {/* Instagram */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Instagram Usuario (Sin @)</label>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="Ej: powerfit"
                  className="w-full bg-[#121212] border border-white/10 text-white rounded-lg p-3 focus:ring-1 focus:ring-primary-fixed focus:border-primary-fixed outline-none text-sm"
                />
              </div>

              {/* Logo Selector & URL Input */}
              <div className="space-y-3 sm:col-span-2 bg-[#121212] p-4 rounded-lg border border-white/5">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Logo o Ícono de la Marca</label>
                
                {/* Preset Icons Selector */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {[
                    { id: 'bolt', label: 'Rayo', icon: 'bolt' },
                    { id: 'fitness_center', label: 'Mancuerna', icon: 'fitness_center' },
                    { id: 'shield', label: 'Escudo', icon: 'shield' },
                    { id: 'monitoring', label: 'Cardio', icon: 'monitoring' },
                    { id: 'emoji_events', label: 'Trofeo', icon: 'emoji_events' },
                    { id: 'sports_martial_arts', label: 'Combate', icon: 'sports_martial_arts' }
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setLogo(preset.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                        logo === preset.id
                          ? 'bg-primary-fixed text-on-primary-fixed border-primary-fixed shadow-[0_0_10px_rgba(0,0,0,0.5)]'
                          : 'border-white/10 hover:bg-white/5 text-on-surface-variant hover:text-white'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">{preset.icon}</span>
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Custom URL Input, File Upload & Real-Time Preview */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <div className="flex-1 w-full">
                      <input
                        type="text"
                        value={logo.startsWith('data:image') ? '[Imagen Cargada]' : logo}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val !== '[Imagen Cargada]') {
                            setLogo(val);
                          }
                        }}
                        placeholder="Escribe un ícono de material (ej: bolt, fitness_center) o pega una URL..."
                        className="w-full bg-[#1e1e1e] border border-white/10 text-white rounded-lg p-3 focus:ring-1 focus:ring-primary-fixed focus:border-primary-fixed outline-none text-sm font-sans"
                      />
                    </div>

                    {/* File Upload Selector */}
                    <div className="w-full sm:w-auto">
                      <label className="w-full sm:w-auto px-4 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95">
                        <span className="material-symbols-outlined text-[18px]">upload</span>
                        SUBIR LOGO
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Real-time logo preview box */}
                    <div className="w-12 h-12 rounded-lg bg-[#121212] border border-white/10 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                      {logo && (logo.startsWith('http') || logo.startsWith('/') || logo.includes('.') || logo.startsWith('data:image')) ? (
                        <img
                          src={logo}
                          alt="Preview"
                          className="max-w-full max-h-full p-2 object-contain"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <span className="material-symbols-outlined text-primary-fixed text-[24px]">
                          {logo || 'bolt'}
                        </span>
                      )}
                    </div>
                  </div>

                  {logo.startsWith('data:image') && (
                    <div className="flex items-center justify-between bg-primary-fixed/5 border border-primary-fixed/20 rounded-lg p-2.5">
                      <span className="text-xs text-primary-fixed font-bold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        Imagen optimizada y cargada correctamente
                      </span>
                      <button
                        type="button"
                        onClick={() => setLogo('bolt')}
                        className="text-xs text-red-400 hover:text-red-300 font-bold transition-colors cursor-pointer"
                      >
                        Quitar Imagen
                      </button>
                    </div>
                  )}
                </div>
                
                <p className="text-[10px] text-on-surface-variant leading-relaxed">
                  Puedes subir tu propia imagen PNG/SVG transparente (se optimizará automáticamente para caber en el enlace), hacer clic en un ícono rápido, o pegar una URL directa.
                </p>
              </div>

              {/* Hero Image URL */}
              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">URL Imagen Principal Hero (Opcional)</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Ej: https://tudominio.com/hero.jpg"
                  className="w-full bg-[#121212] border border-white/10 text-white rounded-lg p-3 focus:ring-1 focus:ring-primary-fixed focus:border-primary-fixed outline-none text-sm"
                />
              </div>
            </div>

            {/* Colors Subsection */}
            <div className="border-t border-white/5 pt-6 mt-6">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-fixed">palette</span> Paleta de Colores
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Primary Color Picker */}
                <div className="space-y-2 bg-[#121212] p-3 rounded-lg border border-white/5 flex items-center justify-between">
                  <div>
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase block">Color Principal</label>
                    <span className="text-xs font-mono text-white block mt-0.5">{primary}</span>
                  </div>
                  <input
                    type="color"
                    value={primary}
                    onChange={(e) => setPrimary(e.target.value)}
                    className="w-10 h-10 border-0 bg-transparent cursor-pointer rounded overflow-hidden"
                  />
                </div>

                {/* Secondary Color Picker */}
                <div className="space-y-2 bg-[#121212] p-3 rounded-lg border border-white/5 flex items-center justify-between">
                  <div>
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase block">Color Secundario</label>
                    <span className="text-xs font-mono text-white block mt-0.5">{secondary}</span>
                  </div>
                  <input
                    type="color"
                    value={secondary}
                    onChange={(e) => setSecondary(e.target.value)}
                    className="w-10 h-10 border-0 bg-transparent cursor-pointer rounded overflow-hidden"
                  />
                </div>

                {/* Accent Color Picker */}
                <div className="space-y-2 bg-[#121212] p-3 rounded-lg border border-white/5 flex items-center justify-between">
                  <div>
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase block">Color Texto Botones</label>
                    <span className="text-xs font-mono text-white block mt-0.5">{accent}</span>
                  </div>
                  <input
                    type="color"
                    value={accent}
                    onChange={(e) => setAccent(e.target.value)}
                    className="w-10 h-10 border-0 bg-transparent cursor-pointer rounded overflow-hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Generator Preview Output Column */}
          <div className="space-y-6">
            {/* Action card */}
            <div className="bg-[#1e1e1e] p-6 rounded-xl border border-white/5 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-fixed">link</span> Enlace Generado
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                  Este es el link personalizado para tu cliente. Al hacer click, la página cargará con todos los datos seleccionados.
                </p>

                {shortUrl ? (
                  <div className="space-y-2 mb-4">
                    <label className="text-[10px] font-bold text-green-400 uppercase tracking-wider block flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">bolt</span> ENLACE CORTO OPTIMIZADO
                    </label>
                    <div className="bg-[#121212] border border-green-500/30 rounded-lg p-4 font-mono text-xs text-green-400 break-all select-all leading-normal">
                      {shortUrl}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 mb-4">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">Enlace Largo (Contiene datos de imagen)</label>
                    <div className="bg-[#121212] border border-white/10 rounded-lg p-4 font-mono text-xs text-primary-fixed break-all min-h-[120px] select-all leading-normal">
                      {finalUrl}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3 mt-6">
                {/* Shorten Button or Copy Short Link */}
                {!shortUrl ? (
                  <button
                    onClick={handleShorten}
                    disabled={shortening}
                    className="w-full py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px] animate-pulse">
                      {shortening ? 'sync' : 'auto_fix_high'}
                    </span>
                    {shortening ? 'GENERANDO ENLACE CORTO...' : 'ACORTAR ENLACE (RECOMENDADO)'}
                  </button>
                ) : (
                  <button
                    onClick={handleCopyShort}
                    className={`w-full py-3.5 rounded-lg font-bold transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer ${
                      copiedShort
                        ? 'bg-green-500 text-white'
                        : 'bg-green-600 text-white hover:bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.2)]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {copiedShort ? 'check_circle' : 'content_copy'}
                    </span>
                    {copiedShort ? '¡COPIADO!' : 'COPIAR ENLACE CORTO'}
                  </button>
                )}

                {/* Copy Button (Long Link - only visible if short link not generated) */}
                {!shortUrl && (
                  <button
                    onClick={handleCopy}
                    className={`w-full py-3.5 rounded-lg font-bold transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer ${
                      copied
                        ? 'bg-green-500 text-white'
                        : 'bg-primary-fixed text-on-primary-fixed hover:brightness-110'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {copied ? 'check_circle' : 'content_copy'}
                    </span>
                    {copied ? '¡COPIADO!' : 'COPIAR ENLACE LARGO'}
                  </button>
                )}

                {/* Open/Preview Link Button */}
                <a
                  href={shortUrl || finalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-lg font-bold transition-all border border-white/10 hover:bg-white/5 text-center flex items-center justify-center gap-2 active:scale-95 block"
                >
                  <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                  PREVISUALIZAR DEMO
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
