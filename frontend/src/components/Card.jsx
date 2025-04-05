export default function Card({ word, colour }) {
    const bgClassMap = {
      blue: "bg-cyan-400 hover:bg-cyan-500",
      red: "bg-red-700 hover:bg-red-800",
      black: "bg-neutral-800 hover:bg-neutral-900",
      normal: "bg-gray-400 hover:bg-gray-400",
    };
  
    const classes = `w-32 h-20 flex items-center justify-center rounded-lg shadow-md text-xl font-semibold cursor-pointer transition ${bgClassMap[colour] || bgClassMap.normal}`;
  
    return (
      <div className={classes}>
        {word}
      </div>
    );
  }
  