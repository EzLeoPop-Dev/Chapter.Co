import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex bg-[#F2EEE7] text-[#1A1A1A] selection:bg-[#C8861A] selection:text-white font-[-apple-system,BlinkMacSystemFont,'Inter','Segoe_UI',Roboto,sans-serif]">
      
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/60 z-10 mix-blend-multiply"></div>
        <img 
          src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1200&auto=format&fit=crop" 
          alt="Books Collection" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 p-16 text-white max-w-lg">
          <h2 className="text-[42px] font-normal tracking-[-1.26px] leading-tight mb-6">
            "Books are a uniquely portable magic."
          </h2>
          <p className="text-white/80 text-lg tracking-wide">― Stephen King</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
        
        {/* Background Decorative Blobs */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob"></div>
        <div className="absolute bottom-[20%] left-[-5%] w-96 h-96 bg-tertiary rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute top-[40%] right-[20%] w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob"></div>

        <div className="w-full max-w-md backdrop-blur-xl bg-white/40 border border-white/60 rounded-[2.5rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative z-10">
          
          <div className="text-center mb-8">
            <Link href="/" className="inline-block text-[24px] font-normal tracking-[-0.48px] bg-clip-text text-transparent bg-gradient-to-r from-[#1A1A1A] to-[#1A1A1A] mb-6 hover:opacity-80 transition-opacity">
              Chapter.Co
            </Link>
            <h1 className="text-[32px] font-normal tracking-[-0.64px] text-[#1A1A1A] mb-2">Create an Account</h1>
            <p className="text-[#1A1A1A]">Join Chapter.Co today</p>
          </div>

          <form className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#1A1A1A] mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-4 py-3 rounded-2xl bg-white/50 border border-[#e6e5e0] text-[#1A1A1A] placeholder-[#a09c92] focus:outline-none focus:ring-2 focus:ring-primary transition-all backdrop-blur-sm"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#1A1A1A] mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 rounded-2xl bg-white/50 border border-[#e6e5e0] text-[#1A1A1A] placeholder-[#a09c92] focus:outline-none focus:ring-2 focus:ring-primary transition-all backdrop-blur-sm"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#1A1A1A] mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-3 rounded-2xl bg-white/50 border border-[#e6e5e0] text-[#1A1A1A] placeholder-[#a09c92] focus:outline-none focus:ring-2 focus:ring-primary transition-all backdrop-blur-sm"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 mt-4 rounded-2xl bg-gradient-to-r from-primary to-primary text-white font-medium hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#1A1A1A]">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-medium text-[#C8861A] hover:text-primary transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
