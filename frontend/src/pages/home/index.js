
import  {useNavigate} from 'react-router-dom'
export default function Home(){
const navigate = useNavigate();	
	return (
		<div>
		   <p>hello world</p>
			<button onClick={()=>navigate('/instructor') }> navegar to instructor</button>

		</div>
	)
}