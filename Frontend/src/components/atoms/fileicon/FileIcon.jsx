import {FaJs , FaHtml5 , FaCss3 , FaReact , FaGitAlt } from 'react-icons/fa'
import { BsFiletypeJson } from "react-icons/bs";
import { TbFileTypeSvg } from "react-icons/tb";
export default function FileIcon({extension}) {
    const iconMapper ={
        "js":<FaJs color='yellow' style={{height:'25px',width:'25px' }}/>,
        "html":<FaHtml5 color='red' style={{height:'25px',width:'25px' }}/>,
        "css":<FaCss3 color='skyBlue' style={{height:'25px',width:'25px' }}/>,
        "jsx":<FaReact color='dodgerBlue' style={{height:'25px',width:'25px' }}/>,
        "json":<BsFiletypeJson color='limeGreen' style={{height:'25px',width:'25px'}}/>,
        "gitignore":<FaGitAlt color='crimson' style={{height:'25px',width:'25px' }}/>,
        "svg":<TbFileTypeSvg color='magenta' style={{height:'25px',width:'25px' }}/>
    }
  return (
    <>
        {iconMapper[extension]}
    </>
   
  )
}
