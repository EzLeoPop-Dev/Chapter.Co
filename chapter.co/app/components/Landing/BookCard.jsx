import React from 'react';

export default function BookCard({ title, author, price, rating, reviews, coverTheme }) {
    return (
        <div className="group cursor-pointer flex flex-col h-full">
            {/* Book Image Container */}
            <div className="backdrop-blur-sm bg-white/50 border border-white/60 p-6 rounded-[2rem] mb-4 flex justify-center items-center h-72 shadow-[0_4px_20px_rgb(0,0,0,0.03)] group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 relative overflow-hidden">
                <div className={`w-36 h-52 ${coverTheme} rounded-r-xl rounded-l-sm shadow-xl flex flex-col justify-center items-center text-center p-3 relative group-hover:scale-105 group-hover:rotate-2 transition-all duration-500 z-10`}>
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/20 rounded-l-sm"></div>
                    <h3 className="text-white text-base font-bold tracking-widest leading-tight">{title.toUpperCase()}</h3>
                    <p className="text-white/60 text-[9px] mt-4 tracking-[0.2em]">{author.toUpperCase()}</p>
                </div>
                {/* Glow effect behind book */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Book Details */}
            <div className="px-2 flex flex-col flex-grow justify-between">
                <div>
                    <div className="flex items-center text-xs text-slate-500 mb-1.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" className="mr-1">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        <span className="font-bold text-slate-700 mr-1.5">{rating}</span>
                        <span className="font-light">({reviews})</span>
                    </div>
                    <h3 className="font-bold text-base text-slate-800 mb-1 group-hover:text-primary transition-colors line-clamp-1">{title}</h3>
                    <p className="text-xs text-slate-500 mb-3 font-light">{author}</p>
                </div>

                <div className="flex justify-between items-center mt-auto">
                    <span className="text-lg font-extrabold text-slate-800">${price}</span>
                    <button className="bg-slate-100/80 backdrop-blur-sm text-slate-600 p-2 rounded-xl hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/30 transition-all duration-300">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}