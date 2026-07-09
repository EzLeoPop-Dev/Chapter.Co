import Link from 'next/link';

export default function LogoutPage() {
  return (
    <div className="min-h-screen flex bg-[#f7f7f4] text-[#26251e] selection:bg-[#f54e00] selection:text-white font-[-apple-system,BlinkMacSystemFont,'Inter','Segoe_UI',Roboto,sans-serif]">
      
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-amber-900/60 z-10 mix-blend-multiply"></div>
        <img 
          src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1200&auto=format&fit=crop" 
          alt="Books and Coffee" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 p-16 text-white max-w-lg">
          <h2 className="text-[42px] font-normal tracking-[-1.26px] leading-tight mb-6">
            "See you in the next chapter."
          </h2>
          <p className="text-white/80 text-lg tracking-wide">Thank you for reading with us.</p>
        </div>
      </div>

      {/* Right Side - Message */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
        
        {/* Background Decorative Blobs */}
        <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob"></div>
        <div className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-2000"></div>

        <div className="w-full max-w-md backdrop-blur-xl bg-white/40 border border-white/60 rounded-[2.5rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative z-10 text-center">
          
          <Link href="/" className="inline-block text-[24px] font-normal tracking-[-0.48px] bg-clip-text text-transparent bg-gradient-to-r from-[#26251e] to-[#5a5852] mb-8 hover:opacity-80 transition-opacity">
            Chapter.Co
          </Link>
          
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-orange-100/80 border border-orange-200/50 mb-6 shadow-sm">
            <svg className="h-10 w-10 text-[#f54e00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-[32px] font-normal tracking-[-0.64px] text-[#26251e] mb-2">Signed Out</h1>
          <p className="text-[#5a5852] mb-8">You have successfully logged out of your account.</p>

          <Link 
            href="/auth/login"
            className="inline-block w-full py-3.5 px-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-white text-[#26251e] font-medium hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
          >
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
