import './EditorButton.css'
export const EditorButton = ({isActive})=>{
    function handleClick() {
        
    }
    return (
        <button
        className="editor-button"
        style={{
            color: isActive ?'white' :'#957D8B',  
            backgroundColor: isActive?'#303342':'#4a4859'  
        }}
        onClick={handleClick}
        >file</button> 
    ) 
}