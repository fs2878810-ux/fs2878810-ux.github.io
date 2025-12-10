import {useState, useRef, useMemo} from "react";

function Label(props){
    return(
        <label className="block text-sm font-medium text-gray-700">
            {props.children}
        </label>
    );
}

function Input(props, ...rest){
    return(
        <input 
        type={props.type || "text"}
        className="mt-1 block w-full rounded-lg p-4 border border-white hover:border-red-500 transition-all duration-300"
        placeholder={props.placeholder || ""}
        {...rest}
        />
    );
}


function TextArea(props, ...rest){
    return(
        <textarea 
        type={props.type || "text"}
        className="mt-1 block w-full rounded-lg p-4 border border-white hover:border-red-500 transition-all duration-300"
        placeholder={props.placeholder || ""}
        rows={props.rows || 4}
        {...rest}
        />
    );
}

export default function ContactForm(){
    const [loading, setLoading] = useState(false);
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const messageRef = useRef(null);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(false);
        setTimeout(() =>{
        nameRef.current.value = "";
        emailRef.current.value = "";
        messageRef.current.value = "";
    }, 2000);
}

    const SubmitButton = useMemo(() => {
        if (loading){
            return(
                <>loading...</>
            );
        }
        return(
            <button
                type="submit"
                className="mt-4 w-full bg-reg-500 text-white py-3 rounded-lg hover:bg-red-600 transition-all duration-300"
                onClick={handleSubmit}
            >
                Send
            </button>
        );
    }, [loading]);

    return(
        <>
            <fieldset className="w-full flex flex-col gap-4" disabled={loading}>
                <label>Name</label>
                <Input placeholder="Your name" ref ={nameRef} />
                <label>Email</label>
                <Input type="email" placeholder="Your Email" ref={emailRef} />
                <label>Message</label>
                <TextArea placeholder="You message" rows={6} ref={messageRef} />
                {SubmitButton}
            </fieldset>
        </>
    );
}