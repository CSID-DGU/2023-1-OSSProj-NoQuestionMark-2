type InfoProps = {
    name: string;
    width: string;
    height: string;
};

const SubmitButton = ({name,width,height}: InfoProps) => {
    return (<><input type='submit' value={name} style={{width:`${width}`, height:`${height}`}}/></>);
}

export default SubmitButton;