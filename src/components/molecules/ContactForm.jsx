import { useState, useRef, useMemo } from "react";

function Label({ children }) {
    return (
        <label className="block text-sm font-medium text-gray-700">
            {children}
        </label>
    );
}

function Input({ ...rest }) {
    return (
        <input
            className="mt-1 block w-full rounded-lg p-4 border border-gray-300 hover:border-red-500 transition-all duration-300"
            {...rest}
        />
    );
}

function TextArea({ ...rest }) {
    return (
        <textarea
            className="mt-1 block w-full rounded-lg p-4 border border-gray-300 hover:border-red-500 transition-all duration-300"
            {...rest}
        />
    );
}

export default function ContactForm() {

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const messageRef = useRef(null);

    const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbz4hyE06j9PdG2Y3kGth54C1w4vbhB0yZCWTRjpNskzICqMWAbVVrsBzzxbQ-aas9Vxsw/exec ";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        const formData = {
            nombre: nameRef.current.value,
            correo: emailRef.current.value,
            mensaje: messageRef.current.value,
        };

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            setMessage({
                type: "success",
                text: "¡Mensaje enviado exitosamente! Te contactaré pronto.",
            });

            nameRef.current.value = "";
            emailRef.current.value = "";
            messageRef.current.value = "";

        } catch (error) {
            setMessage({
                type: "error",
                text: "Hubo un error al enviar el mensaje. Intenta de nuevo.",
            });
        } finally {
            setLoading(false);
        }
    };

    const SubmitButton = useMemo(() => {
        return (
            <button
                type="submit"
                className="mt-4 w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-black"
                disabled={loading}
            >
                {loading ? "Sending..." : "Send"}
            </button>
        );
    }, [loading]);

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Contact Us
            </h2>

            <form onSubmit={handleSubmit}>
                <fieldset className="w-full flex flex-col gap-4" disabled={loading}>
                    <Label>Name</Label>
                    <Input placeholder="Your name" ref={nameRef} required />

                    <Label>Email</Label>
                    <Input type="email" placeholder="Your Email" ref={emailRef} required />

                    <Label>Message</Label>
                    <TextArea
                        placeholder="Your message"
                        rows={6}
                        ref={messageRef}
                        required
                    />

                    {SubmitButton}
                </fieldset>
            </form>

            {message.text && (
                <p
                    className={`mt-4 text-center text-sm font-medium ${
                        message.type === "success"
                            ? "text-green-600"
                            : "text-red-600"
                    }`}
                >
                    {message.text}
                </p>
            )}
        </div>
    );
}
