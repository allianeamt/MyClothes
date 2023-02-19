import { useState, useEffect } from 'react'
import { getData, updateData } from '../api/materials.js'
import Select from 'react-select'
import { useHistory } from 'react-router-dom'
import { GetCountries } from './countries.js'
import saveIcon from '../pictures/save.png'
import homeIcon from '../pictures/home.png'
import detailsIcon from '../pictures/details.png'

const Orders = () => {
    const history = useHistory()
    const [materials, setMaterials] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const customStyles = {
        option: (defaultStyles, state) => ({
          ...defaultStyles,
          color: state.isSelected ? "#212529" : "#fff",
          backgroundColor: state.isSelected ? "#a0a0a0" : "#212529",
        }),
    
        control: (defaultStyles) => ({
          ...defaultStyles,
          backgroundColor: "#5a5a5d",
          padding: "10px",
          border: "1px solid #282c34",
          boxShadow: "1px solid #282c34",
          '&:hover': {
             border: "1px solid #282c34"
          }
        }),

        menuList: (provided, state) => ({
            ...provided,
            paddingLeft: "10px",
            paddingRight: "10px",
         }),

        dropdownIndicator: base => ({
            ...base,
            color: "#282c34",
        }),
        singleValue: (defaultStyles) => ({ ...defaultStyles, color: "black" }),
      };

    function handleChange (index, value, field) {
        setMaterials(materials.map((material, i) => {
               if (i === index) {
                 return {

                      ...material,
                         [field]: value
                 }
               }
               return material
          }))
    }

    function saveMaterials () {
        updateData(materials);
        setEditingRow(-1);
    }

    function RenderFields (material) {
        const currencyOptions = [{value: 'USD', label: 'USD'}, {value: 'EUR', label: 'EUR'}, {value: 'JPY', label: 'JPY'}, {value: 'GBP', label: 'GBP'}, {value: 'AUD', label: 'AUD'}, {value: 'CAD', label: 'CAD'}, {value: 'CHF', label: 'CHF'}, {value: 'CNY', label: 'CNY'}, {value: 'SEK', label: 'SEK'}, {value: 'NZD', label: 'NZD'}, {value: 'MXN', label: 'MXN'}, {value: 'SGD', label: 'SGD'}, {value: 'HKD', label: 'HKD'}, {value: 'NOK', label: 'NOK'}, {value: 'KRW', label: 'KRW'}, {value: 'TRY', label: 'TRY'}, {value: 'RUB', label: 'RUB'}, {value: 'INR', label: 'INR'}, {value: 'BRL', label: 'BRL'}, {value: 'TWD', label: 'TWD'}, {value: 'ZAR', label: 'ZAR'}, {value: 'PLN', label: 'PLN'}]
        const countryOptions = GetCountries
        console.log(countryOptions);
        console.log(currencyOptions)
        const options = [{value: 'kg', label: 'kg'}, {value: 'g', label: 'g'}, {value: 'lb', label: 'lb'}, {value: 'm', label: 'm'}, {value: 'cm', label: 'cm'}, {value: 'ft', label: 'ft'}, {value: 'in', label: 'in'}];

        return (
            <>
            <div className='input-big'>
                <input type='text' className="big-input" placeHolder="Title" defaultValue={material.material !== undefined ? material.material.title : ''} onChange = {(e) => {handleChange(material.index, e.target.value, "title")}}/>
                <input type='text' className="big-input" placeHolder="URL" defaultValue={material.material !== undefined ? material.material.url : ''} onChange = {(e) => {handleChange(material.index, e.target.value, "url")}}/>
            </div>
            <div className='input-big'>
                <input type='text' className="small-input" placeHolder="Color" defaultValue={material.material !== undefined ? material.material.color : ''} onChange = {(e) => {handleChange(material.index, e.target.value, "color")}}/>
                <input type='text' className="small-input" placeHolder="Code" defaultValue={material.material !== undefined ? material.material.code : ''} onChange = {(e) => {handleChange(material.index, e.target.value, "code")}}/>
                <input type='text' className="small-input" placeHolder="Placement" defaultValue={material.material !== undefined ? material.material.placement : ''} onChange = {(e) => {handleChange(material.index, e.target.value, "placement")}}/>
                <input type='text' className="small-input" placeHolder="Supplier" defaultValue={material.material !== undefined ? material.material.supplier : ''} onChange = {(e) => {handleChange(material.index, e.target.value, "supplier")}}/>
            </div>
            <div className='input-big'>
                <input type='text' className="medium-input" placeHolder="Quantity" defaultValue={material.material !== undefined ? material.material.quantity : ''} onChange = {(e) => {handleChange(material.index, e.target.value, "quantity")}}/>
                <input type='text' className="medium-input" placeHolder="Price per unit" defaultValue={material.material !== undefined ? material.material.unit_price : ''} onChange = {(e) => {handleChange(material.index, e.target.value, "unit_price")}}/>
                <input type='text' className="medium-input" placeHolder="Total Price" defaultValue={material.material !== undefined ? material.material.total_price : ''} onChange = {(e) => {handleChange(material.index, e.target.value, "total_price")}}/>
            </div>
            <div>
            <Select className='super-input' isMulti styles = {customStyles} options={options} defaultValue={material.material !== undefined ? material.material.measurement_unit.map((unit) => {return {value: unit, label: unit}}) : ''} onChange = {(e) => {handleChange(material.index, e.map((unit) => {return unit.value}), "measurement_unit")}}/>
            </div>
            <div className='input-big'>
                <Select className='small-super-input' styles={customStyles} options={countryOptions} defaultValue={material.material !== undefined ? {value: material.material.origin_country, label: material.material.origin_country} : ''} onChange = {(e) => {handleChange(material.index, e.value, "origin_country")}}/>
                <Select className='small-super-input' styles={customStyles} options={currencyOptions} defaultValue={material.material !== undefined ? {value: material.material.currency, label: material.material.currency} : ''} onChange = {(e) => {handleChange(material.index, e.value, "currency")}}/>
            </div>
            </>
        )
    }

    useEffect(() => {
        getData().then((data) => {
            setMaterials(data);
            setIsLoaded(true);
        });
    }, []);

    const [rows, setRows] = useState([])
    const [editingRow , setEditingRow] = useState(-1)
    const [addRow , setAddRow] = useState(false)

    return (
        <>
        <img alt="home" src={homeIcon} className="icon-right-corner" onClick={() => {history.push('/')}}/>
        <img alt="details" src={detailsIcon} className="icon-right-corner" onClick={() => {history.push('/details')}}/>
        <center>
            <div>
                <h2>Your materials</h2>
                <img alt="save" src={saveIcon} className="icon-small-page" onClick = {() => {saveMaterials()}}/>
            </div>
            {isLoaded ? 
            <div>
                <table className='table-css'>
                <tbody>
                    {materials.map((material, index) => (
                        <>
                        <tr key = {index}>
                            <td><label onClick={
                                () => {setEditingRow(index); setAddRow(false)}
                            }>{material.title}</label></td>
                        </tr>
                        <tr key = {"edit" + {index}}>
                            {editingRow === index ? <td className='edit'>{RenderFields ({material: material, index: index})}</td> : null}
                        </tr>
                        </>
                    ))}
                </tbody>
            </table>
            </div> : <div>Loading...</div>}
        </center>
        </>
    )
}

export { Orders }