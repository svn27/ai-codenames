export default function Card({ word, colour, state, onClick }) {
    const bgClassMap = {
      blue: "bg-blue-600 hover:bg-blue-600",
      red: "bg-red-900 hover:bg-red-900",
      black: "bg-neutral-800 hover:bg-neutral-800",
      neutral: "bg-yellow-500 hover:bg-yellow-500",
      normal: "bg-gray-400 hover:bg-gray-300",
    };

    console.log("Card Props:", word, colour, state);

    let classes = "";
    if (state === true){
        classes = `w-32 h-20 flex items-center justify-center rounded-lg shadow-md text-xl font-semibold cursor-pointer transition ${bgClassMap[colour] || bgClassMap.normal}`;
    }
    else {
        classes = `w-32 h-20 flex items-center justify-center rounded-lg shadow-md text-xl font-semibold cursor-pointer transition ${bgClassMap["normal"] || bgClassMap.normal}`;
    }
    //classes = `w-32 h-20 flex items-center justify-center rounded-lg shadow-md text-xl font-semibold cursor-pointer transition ${bgClassMap[colour] || bgClassMap.normal}`;
  
    return (
      <div className={classes} onClick={onClick}>
        {word}
      </div>
    );
  }
  