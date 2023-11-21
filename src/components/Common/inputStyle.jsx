export const makeTheme = (theme) => ({
    ...theme,
    borderRadius: 12,
    colors: {
       ...theme.colors,
       primary25: 'rgb(145, 145, 145)',
       primary: 'rgb(145, 145, 145)',
    },
})
  
export const customStyles = {
    option: (provided, state) => ({
        ...provided,
        padding: 5,
        borderRadius: 5
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
        return { ...provided, opacity, transition };
    }
}