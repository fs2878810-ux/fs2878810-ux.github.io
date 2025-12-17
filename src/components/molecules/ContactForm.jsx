import {useState, useRef, useMemo} from "react";

function Label(props){
    return(
        <label className="block text-sm font-medium text-gray-700">
            {props.children}
        </label>
    );
}

function Input({props, ...rest}){
    return(
        <input 
        className="mt-1 block w-full rounded-lg p-4 border border-gray-300 hover:border-red-500 transition-all duration-300"
        {...rest}
        />
    );
}


function TextArea({props, ...rest}){
    return(
        <textarea 
        className="mt-1 block w-full rounded-lg p-4 border border-gray-300 hover:border-red-500 transition-all duration-300"
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
        setLoading(true);
        setTimeout(() =>{
            setLoading(false);
            nameRef.current.value = "";
            emailRef.current.value = "";
            messageRef.current.value = "";
        }, 2000);
    }

    const SubmitButton = useMemo(() => {
        return(
            <button
                type="submit"
                className="mt-4 w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-black"
                onClick={handleSubmit}
            >
                {loading ? "Sending..." : "Send"}
            </button>
        );
    }, [loading]);

    return(
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Us</h2>
            <fieldset className="w-full flex flex-col gap-4" disabled={loading}>
                <Label>Name</Label>
                <Input placeholder="Your name" ref={nameRef} />
                <Label>Email</Label>
                <Input type="email" placeholder="Your Email" ref={emailRef} />
                <Label>Message</Label>
                <TextArea placeholder="Your message" rows={6} ref={messageRef} />
                {SubmitButton}
            </fieldset>
        </div>
    );
}