import { useHistory } from 'react-router-dom';
import cartIcon from '../pictures/cart.png'
import detailsIcon from '../pictures/details.png'

const Home = () => {
    const history = useHistory();

    return (
        <center>
        <h1>MyClothes</h1>
        <img alt="cart" src={cartIcon} className = "image" onClick = {() => {history.push('/orders')}}/>
        <img alt="details" src={detailsIcon} onClick = {() => {history.push('/details')}}/>
        </center>
    );
}

export { Home };