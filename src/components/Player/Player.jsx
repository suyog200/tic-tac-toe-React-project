import { useState } from "react";
import SymbolSelector from "../SymbolSelector/SymbolSelector";

export default function Player({initialName,symbol, isActive, onChangeName, onSelectedSymbol}) {
    const [playerName , setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEdit() {
        setIsEditing(isEditing => !isEditing);
        if(isEditing) {
            onChangeName(symbol, playerName); 
        }
    }

    function handleChange(event) {
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;

    if(isEditing) {
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>;
    }

  return (
    <li className={isActive ? 'active' : undefined}>
    <span className="player">
        {editablePlayerName}
        <SymbolSelector 
        selectedSymbol={symbol} 
        onSelectSymbol={onSelectedSymbol}
        />
    </span>  
    <button onClick={handleEdit}>{isEditing ? 'save' : 'edit'}</button>
    </li>
  );
}

