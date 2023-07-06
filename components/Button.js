import { styled } from "styled-components"
import css from "styled-jsx/css"
import { primary } from "@/lib/colors"

export const ButtonStyle = css`
background-color: ${primary};
color:#fff;
padding: 5px 15px;
border-radius:5px;
cursor:pointer;
display:inline-flex;
align-items:center;
text-decoration: none;
font-family: 'Poppins', sans-serif;
font-weight:400;
svg{
    height:16px;
    margin-right:5px;
}

${props => props.block && css`
    display:block;
    width:100%;
`}

${props => props.white && !props.outline && css`
background-color: #fff;
color: #000;
`}

${props => props.white && props.outline && css`
background-color: transparent;
color: #fff;
border: 1px solid  ${primary};
`}  



${props => props.primary  && !props.outline && css`
background-color:${primary};
color:#fff;
border: 1px solid ${primary};
`}

${props => props.primary && props.outline && css`
background-color:transparent;
border: 1px solid ${primary};
color:${primary};
`}

${props => props.size === 'l' && css`
    font-size:1.2rem;
    padding:10px 20px;
    svg{
        height:20px;
    }
`}

`


 const StyledButton = styled.button`
   ${ButtonStyle}
`
export default function Button({ children, ...rest }) {
    return (
        <StyledButton {...rest}>
            {children}
        </StyledButton>
    )
}