type InfoProps = {
    name : string
}

const SubmitButton = ({name}: InfoProps) => {
    return (<><input type="submit" value={name}/></>);
}

export default SubmitButton;