
import React, { useState } from 'react';

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

const Contact: React.FC = () => {
    const [status, setStatus] = useState<SubmissionStatus>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        // Simulate network request with a chance of failure
        setTimeout(() => {
            if (Math.random() > 0.1) { // 90% success rate
                setStatus('success');
                (e.target as HTMLFormElement).reset();
                 setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                 setTimeout(() => setStatus('idle'), 5000);
            }
        }, 1500);
    };
    
    const isSubmitting = status === 'submitting';

    return (
        <section id="contact" className="py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">Get In Touch</h2>
                    <p className="text-lg text-gray-500 dark:text-gray-400 mt-4">Have a project in mind? We'd love to hear from you.</p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Name</label>
                            <input type="text" id="name" name="name" required className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                         <div>
                            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Email</label>
                            <input type="email" id="email" name="email" required className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                         <div>
                            <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Message</label>
                            <textarea id="message" name="message" rows={5} required className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                        <div className="text-center">
                             <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 disabled:bg-blue-400 disabled:cursor-wait">
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                             {status === 'success' && (
                                <p className="mt-4 text-green-600 dark:text-green-400">Thank you for your message! We'll get back to you shortly.</p>
                            )}
                             {status === 'error' && (
                                <p className="mt-4 text-red-600 dark:text-red-400">Something went wrong. Please try again.</p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
