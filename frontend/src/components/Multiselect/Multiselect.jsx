import Select from "react-select";
const customStyles = {
  placeholder: (provided, state) => ({
    ...provided,
    textAlign: "left",
    fontSize: "13px",
  }),
  menu: (provided, state) => ({
    ...provided,
    width: "100%",
    textAlign: "left",
    padding: 10,
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

function CustomSelect({ options, onChange, isMulti, placeholder }) {
  return (
    <>
      <Select
        closeMenuOnSelect={true}
        styles={customStyles}
        isMulti={isMulti}
        options={options}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
}

export default CustomSelect;

{/* <CustomSelect
isMulti={false}
onChange={onChangeInput}
options={options}
placeholder={"Unesite studente"}
/>

const options = [
  { label: "Redovan", value: "redovan" },
  { label: "Vanredan", value: "vanredan" },
]; */}

// const onChangeInput = (e) => {
//   const options = [...e];
//   let label = options[0].label
  
//     setFormData((prevState) => ({ 
//       ...prevState,
//       studentStatus: label
//   }))
  
//   // const student = [];
//   // options.forEach((option) => student.push(option.label));
//   // setFormData((prevState) => ({
//   //   ...prevState,
//   //   studentStatus: student,
//   // }));
  
// };