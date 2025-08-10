import { useEffect, useState } from "react"

export default function RandomColor(){

    const [typeOfColor, setTypeOfColor] = useState("hex");
    const [color, setColor] = useState("#000000");

    function utility(length){
        return Math.floor(Math.random()*length)
    }

    function handleCreateRandomHexColor(){
        const hex = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
        let hexColor = "#";

        for(let i=0;i<6;i++){
            hexColor += hex[utility(hex.length)]
        }
        console.log(hexColor); 
        setColor(hexColor);
    }

    function handleCreateRandomRgbColor(){
        let r = utility(256);
        let g = utility(256);
        let b = utility(256);

        setColor(`rgb(${r},${g},${b})`);
    }

    useEffect(() => {
     if (typeOfColor === 'rgb') handleCreateRandomRgbColor();
     else handleCreateRandomHexColor(); 
    }, [typeOfColor])
    
    return(
    <div style={{
        width:"100vw",
        height:"100vh",
        background:color,
        margin:0,
        padding:0,
        overflow:"hidden",
        
    }}>
            <button onClick={() => setTypeOfColor('hex')} >HEX Color</button>
            <button onClick={() => setTypeOfColor('rgb')} >RGB Color</button>
            <button onClick={typeOfColor === 'hex' ? handleCreateRandomHexColor : handleCreateRandomRgbColor} >Generate Random Color</button> 
            <div style={{ 
                display:"flex",
                marginTop:"50px",
                color:'#fff',
                fontSize:'30px',
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"column",
                gap:'20px' 


            }}>
                <h3>{typeOfColor === 'rgb' ? 'RGB Color' : 'HEX Color'}</h3>
                    <h1>{color}</h1>
            </div>
    </div>

    )
}
