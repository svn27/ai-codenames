export default function Card({ word, colour }) {
    const bgClassMap = {
      blue: "bg-blue-600 hover:bg-blue-600",
      red: "bg-red-900 hover:bg-red-900",
      black: "bg-neutral-800 hover:bg-neutral-800",
      normal: "bg-gray-400 hover:bg-gray-400",
    };
  
    const classes = `w-32 h-20 flex items-center justify-center rounded-lg shadow-md text-xl font-semibold cursor-pointer transition ${bgClassMap[colour] || bgClassMap.normal}`;
  
    return (
      <div className={classes}>
        {word}
      </div>
    );
  }
  