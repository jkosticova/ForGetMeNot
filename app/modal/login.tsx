import React, {useState} from "react";
import {Modal} from "~/modal/modal";

const LoginPage = () => {
    interface FormData {
        email: string;
        password: string;
        [key: string]: string;  // Add index signature
    }

    interface FormErrors {
        email: string;
        password: string;
        [key: string]: string;  // Add index signature
    }

    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({
        email: '',
        password: ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        // Update form data
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));

        // Clear validation errors
        setFormErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Perform validation
        const validationErrors: FormErrors = Object.keys(formData).reduce((errors, name) => {
            if (formData[name] === '') {
                errors[name as keyof FormErrors] = `Pole ${name} je povinné`;
            } else if (name === 'email' && !/^\S+@\S+\.\S+$/.test(formData[name])) {
                errors[name as keyof FormErrors] = 'Neplatný email';
            } else if (name === 'password' && formData[name].length < 8) {
                errors[name as keyof FormErrors] = 'Heslo musí mať aspoň 8 znakov';
            }
            return errors;
        }, {} as FormErrors);

        // Update form errors
        setFormErrors(validationErrors);

        // Check if there are any validation errors
        if (Object.values(validationErrors).every((error) => error === '')) {
            // Perform login logic here
            console.log('Login form submitted:', formData);
        }
    };

    return (
        <div className="login-form">
            <h2>Prihlásenie</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={formErrors.email ? 'error' : ''}
                    />
                    {formErrors.email && (
                        <span className="error-message">{formErrors.email}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Heslo:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={formErrors.password ? 'error' : ''}
                    />
                    {formErrors.password && (
                        <span className="error-message">{formErrors.password}</span>
                    )}
                </div>

                <button type="submit" className="submit-btn">
                    Prihlásiť
                </button>
            </form>
        </div>
    );
};


export const Login = ({ isOpen, onClose }: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    if (!isOpen) return null;

    return (
        <Modal onClose={onClose}>
            <LoginPage></LoginPage>
        </Modal>
    );
};