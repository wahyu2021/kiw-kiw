/**
 * CuteFooter Component
 * 
 * Footer minimalis dengan pesan selamat istirahat dan ucapan penutup.
 * Desain sederhana dengan glassmorphism dan elemen dekoratif.
 */
export default function CuteFooter() {
  return (
    <footer className="relative py-20 px-6 text-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-400/30"></div>
        <span className="text-pink-300/30 text-lg">✿</span>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-400/30"></div>
      </div>

      <div className="max-w-sm mx-auto">
        <div className="glass-card p-8 mb-8">
          <p className="text-pink-100/90 text-lg mb-4">
            🌙 <span className="gradient-text font-medium">Selamat istirahat...</span>
          </p>
          <p className="text-pink-200/60 text-sm leading-relaxed">
            Semoga tidurmu nyenyak malam ini. 
            <br/>Besok adalah hari baru yang lebih baik!
          </p>
        </div>

        <p className="text-pink-200/60 text-sm mb-3">
          Dibuat hanya buatmu, ANJAYYYY SLEBEWWW
        </p>
        
        <div className="flex items-center justify-center gap-2 text-pink-300/40 text-xs mb-6">
          <span>✦</span>
          <span>✿</span>
          <span>✦</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-pink-500/5 blur-3xl rounded-full"></div>
    </footer>
  );
}
