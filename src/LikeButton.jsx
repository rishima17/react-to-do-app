import {useState} from "react";
export default function LikeButton(){
    let [isLiked,setIsLiked]=useState(false);
    let[clicked,setClicked]=useState(0);

    let toggleLike=() =>{
        setIsLiked(!isLiked);
        setClicked(clicked+1);
    }
    let likeStyle={color:"red"};
    return(
        <div>
            <h>clicks={clicked}</h>
            <p onClick={toggleLike} >
                {isLiked ?(<i className="fa-solid fa-heart"style={likeStyle}></i>):(<i className="fa-regular fa-heart"></i>)
                 }  
                
            </p>
        </div>
    )

}