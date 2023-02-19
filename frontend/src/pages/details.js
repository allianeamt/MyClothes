import { useEffect, useState } from 'react';
import { getData, updateSpecifications } from '../api/details.js';
import { useHistory } from 'react-router-dom';
import saveIcon from '../pictures/save.png';
import homeIcon from '../pictures/home.png';
import ordersIcon from '../pictures/cart.png';

const Details = () => {
    const history = useHistory();
    const [specifications, setSpecifications] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getData().then((data) => {
            setSpecifications(data);
            setIsLoaded(true);
        });
    }, []);

    function handleChange (index, indexMeasurement, value, field) {
        setSpecifications(specifications.map((specification, i) => {
              if (i === index) {
                if (field === "category") {
                    return {
                        ...specification,
                            [field]: value
                    }
                }
                else {
                    return {
                        ...specification,
                            measurements: specification.measurements.map((measurement, j) => {
                                if (j === indexMeasurement) {
                                    return {
                                        ...measurement,
                                        [field]: value
                                    }
                                }
                                return measurement
                            })
                    }
                }

              }
              return specification
         }))
    }

    function saveSpecifications () {
        updateSpecifications(specifications);
    }

    return (
        <>
        <img alt="home" src={homeIcon} className="icon-right-corner" onClick={() => {history.push('/')}}/>
        <img alt="orders" src={ordersIcon} className="icon-right-corner" onClick={() => {history.push('/orders')}}/>
        <center>
            <h2>Specification</h2>
            <img alt="save" src={saveIcon} className="icon-small-page" onClick={saveSpecifications}/>
            {isLoaded ? 
            <div>
                <table className='table-css'>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Name</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {specifications.map((categories, index) => (
                        categories.measurements.map((specification, indexMeasurement) => (
                            <tr key = {indexMeasurement}>
                                <td className='small'><input type = "text" defaultValue={categories.category} className = "field" onChange = {(e) => {handleChange(index, indexMeasurement, e.target.value, "category")}}/></td>
                                <td className='small'><input type = "text" defaultValue={specification.name} className = "field" onChange = {(e) => {handleChange(index, indexMeasurement, e.target.value, "name")}}/></td>
                                <td className='small'><input type = "text" defaultValue={specification.value} className = "field" onChange = {(e) => {handleChange(index, indexMeasurement, e.target.value, "value")}}/></td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
            </div> : <div>Loading...</div>}
        </center>
        </>
    );
}

export { Details };